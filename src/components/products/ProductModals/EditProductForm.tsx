import { Input } from "@/components/shared/Input";
import { Modal } from "@/components/shared/Modal";
import { Select } from "@/components/shared/Select";
import { CATEGORY_OPTIONS } from "@/constants/products/productCategoryOptions.constants";
import { DEFAULT_PUBLISH_STATUS, PUBLISH_STATUS_OPTIONS } from "@/constants/products/publishStatus.constants";
import { useUpdateProduct } from "@/hooks/products";
import type { EditProductFormProps } from "@/types/products";
import { editProductSchema, type EditProductFormInput, type EditProductFormValues } from "@/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyhole, Save } from "lucide-react";
import { useMemo } from "react";
import { Controller, useForm, useWatch, type SubmitHandler } from "react-hook-form";
import { StockHealth } from "../StockHealth";
import { RadioGroup } from "@/components/shared/RadioGroup";

export const EditProductForm = ({
  isOpen,
  product,
  existingProducts = [],
  onClose,
  onSuccess,
  onRequestDelete,
}: EditProductFormProps) => {
  
  const { mutate: editProduct, isPending } = useUpdateProduct();

  const schema = useMemo(
    () => editProductSchema(existingProducts, product.id),
    [existingProducts, product.id],
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<EditProductFormInput>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      title: product.title,
      price: product.price,
      category: product.category,
      description: product.description ?? "",
      stockCount: product.stockCount ?? 0,
      publishStatus: product.publishStatus ?? DEFAULT_PUBLISH_STATUS,
    },
  });

  const stockInput = useWatch({ control, name: "stockCount" });
  const liveStock = Math.max(
    0,
    Number.isFinite(stockInput) ? Math.max(0, stockInput) : 0,
  );

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit: SubmitHandler<EditProductFormValues> = (values) => {
    if (!isDirty) return;
    editProduct(
      { id: product.id, payload: values },
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
      title="Edit Product"
      subtitle={`Update details for ${product.sku}`}
      maxWidth="xl"
      bodyClassName="p-3 md:p-6"
      confirmText="Save Changes"
      confirmFormId="edit-product-form"
      confirmLoading={isPending}
      confirmDisabled={!isDirty}
      confirmIcon={<Save className="h-[13.5px] w-[13.5px] text-white" />}
      deleteText="Delete Product"
      onDelete={onRequestDelete ? () => onRequestDelete(product) : undefined}
    >
      <form
        id="edit-product-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <section className="space-y-4">
          <h4 className="text-xs font-semibold tracking-wide text-text-gray">
            Basic Information
          </h4>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Product Name"
              error={errors.title?.message}
              {...register("title")}
            />
            <Input
              label="SKU"
              value={product.sku}
              readOnly
              className="bg-[#F2F4F6]"
              iconRight={<LockKeyhole className="w-3 h-[15.75px] text-text-gray" />}
            />
            <Input
              label="Price"
              type="number"
              step="0.01"
              placeholder="0.00"
              error={errors.price?.message}
              {...register("price", { valueAsNumber: true })}
            />
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

          <div className="space-y-1.5">
            <label
              htmlFor="edit-description"
              className="text-sm font-medium text-text-default"
            >
              Description
            </label>
            <textarea
              id="edit-description"
              rows={3}
              placeholder="Add a product description"
              className="w-full resize-none rounded-lg border border-border-subtle bg-white p-3 text-sm outline-none focus:border-[#4F46E5]"
              {...register("description")}
            />
            {errors.description?.message && (
              <p className="text-xs text-danger">
                {errors.description.message}
              </p>
            )}
          </div>
        </section>

        <section className="space-y-4 border-t border-[#E0E3E5] pt-6">
          <h4 className="text-xs font-semibold tracking-wide text-text-gray">
            Inventory Management
          </h4>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Stock Count"
              type="number"
              step="1"
              error={errors.stockCount?.message}
              {...register("stockCount", { valueAsNumber: true })}
            />
            <Controller
              name="publishStatus"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  label="Status"
                  name={field.name}
                  options={PUBLISH_STATUS_OPTIONS}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.publishStatus?.message}
                />
              )}
            />
          </div>

          <StockHealth stockCount={liveStock} />
        </section>
      </form>
    </Modal>
  );
};