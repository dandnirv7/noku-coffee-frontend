"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function PasswordInput({ className, ...props }: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        {...props}
        type={isVisible ? "text" : "password"}
        className={`pr-10 ${className ?? ""}`}
      />

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => setIsVisible(!isVisible)}
        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
        tabIndex={-1}
      >
        {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
      </Button>
    </div>
  );
}
