import { Control, FieldValues, Path } from "react-hook-form";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormSelectFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: { label: string; value: string }[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

export function FormSelectField<T extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder = "Pilih salah satu",
  required,
  disabled,
}: FormSelectFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label} {required && <span className="text-red-500">*</span>}
          </FormLabel>
          <Select
            disabled={disabled}
            onValueChange={field.onChange}
            value={field.value}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger className="rounded-xl bg-slate-50 border-slate-200 h-11">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="min-h-5">
            <FormMessage className="text-xs m-0" />
          </div>
        </FormItem>
      )}
    />
  );
}
