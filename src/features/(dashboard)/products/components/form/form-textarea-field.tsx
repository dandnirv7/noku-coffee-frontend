import { Control, FieldValues, Path } from "react-hook-form";
import { ComponentProps } from "react";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

interface FormTextAreaFieldProps<T extends FieldValues> extends Omit<
  ComponentProps<typeof Textarea>,
  "name"
> {
  control: Control<T>;
  name: Path<T>;
  label?: string; // Opsional karena kadang label dipisah seperti di bagian deskripsi AI
  required?: boolean;
}

export function FormTextAreaField<T extends FieldValues>({
  control,
  name,
  label,
  required,
  className,
  ...props
}: FormTextAreaFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel>
              {label} {required && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <Textarea
              className={`rounded-xl bg-slate-50 border-slate-200 resize-none ${className || ""}`}
              {...field}
              {...props}
            />
          </FormControl>
          <div className="min-h-5">
            <FormMessage className="text-xs m-0" />
          </div>
        </FormItem>
      )}
    />
  );
}
