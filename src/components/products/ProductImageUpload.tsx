import { useState, useRef, type ChangeEvent, type DragEvent } from "react";
import { X } from "lucide-react";
import {
  IMAGE_ACCEPT,
  prepareImageForStorage,
} from "@/utils/products/fileUpload.util";
import type { ProductImageUploadProps } from "@/types/products";
import CloudIcon from "@/assets/icons/cloud.svg?react";
import { ProductImage } from "./ProductImage";
import { BlobImage } from "../shared/BlobImage";

export const ProductImageUpload = ({
  value,
  onChange,
  error,
}: ProductImageUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [processingError, setProcessingError] = useState<string>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProcessFile = async (file: File) => {
    setProcessingError(undefined);
    try {
      onChange(await prepareImageForStorage(file));
    } catch (err) {
      setProcessingError(
        err instanceof Error ? err.message : "Could not process the image.",
      );
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleProcessFile(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleProcessFile(file);
  };

  const handleRemove = () => {
    setProcessingError(undefined);
    onChange(undefined);
  };

  const message = error ?? processingError;

  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-semibold text-text-gray leading-4 tracking-[0.55px] align-middle">
        Product Image
      </label>
      {value ? (
        <div className="relative flex h-[97.33px] w-full items-center justify-center rounded-lg border-2 border-[#C7C4DB]/30 p-6 border-dashed">
          {typeof value === "string" ? (
            <ProductImage
              src={value}
              alt="Product preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <BlobImage
              blob={value}
              alt="Product preview"
              className="w-full h-full object-cover"
            />
          )}
          <button
            type="button"
            onClick={handleRemove}
            className="absolute right-2 top-2 rounded-full bg-slate-800/60 p-1 text-white hover:bg-slate-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`flex cursor-pointer flex-col gap-2 items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors ${
            isDragging
              ? "border-primary bg-indigo-50/50"
              : "border-slate-200 bg-white hover:bg-slate-50"
          }`}
        >
          <CloudIcon className="h-[21.33px] w-[29.33px] text-text-gray" />
          <p className="text-xs text-text-gray font-normal leading-4 tracking-normal align-middle">
            Click or drag to upload image
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept={IMAGE_ACCEPT}
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>
      )}
      {message && <p className="text-xs text-rose-500">{message}</p>}
    </div>
  );
};
