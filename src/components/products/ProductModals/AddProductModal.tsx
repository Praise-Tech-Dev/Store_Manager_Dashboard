import { useMemo } from "react";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateProduct } from "@/hooks/products";
import type { AddProductModalProps } from "@/types/products/productModal";
import {
  addProductSchema,
  type AddProductFormInput,
  type AddProductFormValues,
} from "@/validationSchema";
import { CATEGORY_OPTIONS } from "@/constants/products/productCategoryOptions.constants";
import { Modal } from "../../shared/Modal";
import { Input } from "../../shared/Input";
import { Select } from "../../shared/Select";
import { ProductImageUpload } from "../ProductImageUpload";

export const AddProductModal = ({
  isOpen,
  onClose,
  existingProducts = [],
  onSuccess,
}: AddProductModalProps) => {
  const { mutate: createProduct, isPending } = useCreateProduct();

  // Re-memoize schema whenever existingProducts list updates
  const schema = useMemo(
    () => addProductSchema(existingProducts),
    [existingProducts],
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AddProductFormInput, unknown, AddProductFormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      title: "",
      sku: "",
      price: 0,
      category: "",
      image: undefined,
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit: SubmitHandler<AddProductFormValues> = (data) => {
    createProduct(
      {
        title: data.title,
        sku: data.sku,
        price: data.price,
        category: data.category,
        description: "",
        image: data.image,
      },
      {
        onSuccess: () => {
          handleClose();
          onSuccess?.();
        },
      },
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      variant="default"
      title="Add New Product"
      bodyClassName="p-6"
      confirmText="Create Product"
      confirmFormId="add-product-form"
      confirmLoading={isPending}
      footerLayout="full"
    >
      <form
        id="add-product-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <div>
          <Input
            label="Product Name"
            placeholder="e.g. Wireless Headphones"
            {...register("title")}
            error={errors.title?.message}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            label="SKU"
            placeholder="SKU-000"
            {...register("sku")}
            error={errors.sku?.message}
          />
          <Input
            label="Price"
            type="number"
            step="0.01"
            placeholder="0.00"
            {...register("price")}
            error={errors.price?.message}
          />
        </div>

        <div>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                label="Category"
                options={CATEGORY_OPTIONS}
                value={field.value}
                onChange={field.onChange}
                className="bg-[#F2F4F6]"
                error={errors.category?.message}
              />
            )}
          />
        </div>

        <div>
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <ProductImageUpload
                value={field.value}
                onChange={field.onChange}
                error={errors.image?.message}
              />
            )}
          />
        </div>
      </form>
    </Modal>
  );
};
