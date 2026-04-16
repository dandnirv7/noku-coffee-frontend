import { Control, FieldValues, Path } from "react-hook-form";
import { ComponentProps } from "react";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface FormTextFieldProps<T extends FieldValues> extends Omit<
  ComponentProps<typeof Input>,
  "name"
> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  required?: boolean;
}

export function FormTextField<T extends FieldValues>({
  control,
  name,
  label,
  required,
  className,
  ...props
}: FormTextFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label} {required && <span className="text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            <Input
              className={`rounded-xl bg-slate-50 border-slate-200 h-11 ${className || ""}`}
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
