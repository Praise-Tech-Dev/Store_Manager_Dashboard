import { CREATE_ORDER_DEFAULT_VALUES, PAYMENT_STATUS_OPTIONS, type CreatableShippingStatus } from "@/constants/orders";
import { useDashboardUsers } from "@/hooks/users";
import { useOrderStore } from "@/store/useOrderStore";
import { type CreateOrderModalProps, type PaymentStatus } from "@/types/orders";
import { buildNewOrderInput, calculateItemsTotal, getShippingSelectOptions, resolveShippingStatus } from "@/utils/orders";
import { getCustomerName } from "@/utils/user.utils";
import { createOrderSchema, type CreateOrderFormInput, type CreateOrderFormValues } from "@/validationSchema/createOrder.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";
import { Modal } from "../shared/Modal";
import { Input } from "../shared/Input";
import { Select } from "../shared/Select";
import { useDashboardProducts } from "@/hooks/products";
import { createProductMap } from "@/utils/products/product.utils";
import { Minus } from "lucide-react";
import { truncateText } from "@/utils/truncateText.utils";
import { MAX_OPTION_TITLE_LENGTH } from "@/constants/max.option.length.constants";
import { formatCurrency } from "@/utils/statistics.utils";
import { isSellableProduct } from "@/types/products/isSellableProduct.types";
import { buildStockUpdates, findInsufficientStock, reservesStock } from "@/utils/orders/stock.utils";
import { useProductStore } from "@/store/useProductStore";

export const CreateOrderModal = ({
  isOpen,
  onClose,
  onCreated,
}: CreateOrderModalProps) => {
  const createOrder = useOrderStore((state) => state.createOrder);
  const { data: users = [] } = useDashboardUsers();
  const { data: products = [] } = useDashboardProducts();
  const productMap = createProductMap(products);
  const recordEdit = useProductStore((state) => state.recordEdit);
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

  const productOptions = [
    { value: "", label: "Select product" },
    ...products
      .filter((product) => isSellableProduct(product))
      .map((product) => ({
        value: String(product.id),
        label: `${truncateText({ text: product.title, maxLength: MAX_OPTION_TITLE_LENGTH })} · ${formatCurrency(product.price)}
        `
        ,
      })),
  ];

  const { fields, append, remove } = useFieldArray({ control, name: "items" });

  const watchedItems = useWatch({ control, name: "items" }) ?? [];
  const previewTotal = calculateItemsTotal({
    items: watchedItems.map((item) => ({
      productId: Number(item.productId),
      quantity: Number(item.quantity) || 0,
    })),
    productMap,
  });

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

    const issues = findInsufficientStock({ items: values.items, productMap });
    if (issues.length > 0) {
      issues.forEach(({ index, available }) =>
        setError(`items.${index}.quantity`, {
          message: `Only ${available} in stock`,
        }),
      );
      return;
    }

    createOrder(buildNewOrderInput({ values, items: values.items, user, productMap }));

    // failed payments don't take stock
    if (reservesStock({ paymentStatus: values.paymentStatus })) {
      buildStockUpdates({ items: values.items, productMap }).forEach(
        ({ productId, ...payload }) => recordEdit(productId, payload),
      );
    }

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
        <div className="space-y-3">
          <span className="text-sm font-medium">Items</span>

          <div className="max-h-64 space-y-3 overflow-y-auto pr-1">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2 sm:grid-cols-[minmax(0,1fr)_5rem_auto] sm:gap-3"
              >
                <div className="col-span-2 min-w-0 sm:col-span-1">
                  <Controller
                    name={`items.${index}.productId`}
                    control={control}
                    render={({ field: productField }) => (
                      <Select
                        options={productOptions}
                        value={productField.value}
                        onChange={productField.onChange}
                        error={errors.items?.[index]?.productId?.message}
                        className=""
                      />
                    )}
                  />
                </div>

                <div className="min-w-0">
                  <Input
                    type="number"
                    min={1}
                    step={1}
                    {...register(`items.${index}.quantity`)}
                    error={errors.items?.[index]?.quantity?.message}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => remove(index)}
                  disabled={fields.length === 1}
                  aria-label="Remove item"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:hover:bg-slate-200"
                >
                  <Minus className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => append({ productId: "", quantity: "1" })}
          >
            + Add item
          </button>
        </div>

        <div className="flex justify-between">
          <span>Total</span>
          <span className="font-semibold tabular-nums">
            {formatCurrency(previewTotal)}
          </span>
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
