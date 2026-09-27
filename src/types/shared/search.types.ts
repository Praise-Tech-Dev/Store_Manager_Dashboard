export interface SearchInputProps extends Omit<React.ComponentPropsWithoutRef<"input">, "size"> {
    onClear: () => void;
    containerClassName?: string;
}