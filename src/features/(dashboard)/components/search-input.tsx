import { useState, useEffect } from "react";
import { Input, type InputProps } from "@/components/ui/input";
import { IconSearch } from "@tabler/icons-react";
import { useDebouncedCallback } from "use-debounce";

interface SearchInputProps extends Omit<InputProps, "value" | "onChange"> {
  value: string;
  onChange: (value: string) => void;
  debounceTime?: number;
}

export function SearchInput({
  value,
  onChange,
  debounceTime = 300,
  className,
  ...props
}: SearchInputProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const debouncedOnChange = useDebouncedCallback((val: string) => {
    onChange(val);
  }, debounceTime);

  const handleLocalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setLocalValue(newVal);
    debouncedOnChange(newVal);
  };

  return (
    <div
      className={`relative flex-1 min-w-[200px] max-w-sm ${className || ""}`}
    >
      <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        value={localValue}
        onChange={handleLocalChange}
        className="pl-9"
        {...props}
      />
    </div>
  );
}
