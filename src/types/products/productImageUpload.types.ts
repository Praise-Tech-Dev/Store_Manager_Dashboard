
export interface ProductImageUploadProps {
  value?: Blob | string;
  onChange: (image?: Blob) => void;
  error?: string;
}
