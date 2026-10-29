import { CREATE_ORDER_DEFAULT_VALUES, PAYMENT_STATUS_OPTIONS, type CreatableShippingStatus } from "@/constants/orders";
import { useDashboardUsers } from "@/hooks/users";
import { useOrderStore } from "@/store/useOrderStore";
import type { CreateOrderModalProps, PaymentStatus } from "@/types/orders";
import { buildNewOrderInput, getShippingSelectOptions, resolveShippingStatus } from "@/utils/orders";
import { getCustomerName } from "@/utils/user.utils";
import { createOrderSchema, type CreateOrderFormInput, type CreateOrderFormValues } from "@/validationSchema/createOrder.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Modal } from "../shared/Modal";
import { Input } from "../shared/Input";
import { Select } from "../shared/Select";

export const CreateOrderModal = ({
  isOpen,
  onClose,
  onCreated,
}: CreateOrderModalProps) => {
  const createOrder = useOrderStore((state) => state.createOrder);
  const { data: users = [] } = useDashboardUsers();

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    setError,
    formState: { errors },
  } = useForm<CreateOrderFormInput, undefined, CreateOrderFormValues>({
    resolver: zodResolver(createOrderSchema),
    mode: "onBlur",
    defaultValues: CREATE_ORDER_DEFAULT_VALUES,
  });

  const paymentStatus = useWatch({ control, name: "paymentStatus" });
  const shippingOptions = getShippingSelectOptions({ paymentStatus });
  const userOptions = [
    { value: "", label: "Select customer" },
    ...users.map((user) => ({
      value: String(user.id),
      label: getCustomerName(user),
    })),
  ];

  const handlePaymentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const next = event.target.value as PaymentStatus;
    setValue(
      "shippingStatus",
      resolveShippingStatus({
        paymentStatus: next,
        shippingStatus: getValues("shippingStatus") as CreatableShippingStatus,
      }),
    );
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (values: CreateOrderFormValues) => {
    const user = users.find((u) => u.id === Number(values.userId));
    if (!user) {
      setError("userId", { message: "Selected customer was not found" });
      return;
    }
    createOrder(buildNewOrderInput({ values, user }));
    reset();
    onCreated();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      variant="default"
      title="Create New Order"
      bodyClassName="p-3 md:p-6"
      confirmText="Create Order"
      confirmFormId="create-order-form"
      footerLayout="full"
    >
      <form
        id="create-order-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <div className="">
          <Controller
            name="userId"
            control={control}
            render={({ field }) => (
              <Select
                label="Customer"
                options={userOptions}
                value={field.value}
                onChange={field.onChange}
                className="bg-[#F2F4F6]"
                error={errors.userId?.message}
              />
            )}
          />
        </div>
        <div>
          <Input
            label="Total Amount"
            placeholder=""
            type=""
            inputMode="decimal"
            {...register("total")}
            error={errors.total?.message}
          />
        </div>

        <div className="">
          <Select
            label="Payment Status"
            options={PAYMENT_STATUS_OPTIONS}
            {...register("paymentStatus", { onChange: handlePaymentChange })}
            
          />
        </div>
        <div className="">
          <Controller
            name="shippingStatus"
            control={control}
            render={({ field }) => (
              <Select
                label="Shipping Status"
                options={shippingOptions}
                value={field.value}
                onChange={field.onChange}
                className="bg-[#F2F4F6]"
                error={errors.shippingStatus?.message}
              />
            )}
          />
        </div>
      </form>
    </Modal>
  );
  
};
