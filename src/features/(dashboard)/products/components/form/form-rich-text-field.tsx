import { Control, FieldValues, Path } from "react-hook-form";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { RichTextEditor } from "@/components/ui/rich-text-editor";

interface FormRichTextFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function FormRichTextField<T extends FieldValues>({
  control,
  name,
  label,
  required,
  placeholder,
  className,
  disabled,
}: FormRichTextFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel>
              {label} {required && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <div className={disabled ? "opacity-50 pointer-events-none" : ""}>
              <RichTextEditor
                value={field.value || ""}
                onChange={field.onChange}
                placeholder={placeholder}
              />
            </div>
          </FormControl>
          <div className="min-h-5">
            <FormMessage className="text-xs m-0" />
          </div>
        </FormItem>
      )}
    />
  );
}
