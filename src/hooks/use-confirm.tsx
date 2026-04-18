import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ButtonProps } from "@/components/ui/button";

interface ConfirmOptions {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: ButtonProps["variant"];
}

export function useConfirm() {
  const [promise, setPromise] = useState<{ resolve: (value: boolean) => void } | null>(null);
  const [options, setOptions] = useState<ConfirmOptions | null>(null);

  const confirm = (options: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setOptions(options);
      setPromise({ resolve });
    });
  };

  const handleClose = () => {
    setPromise(null);
    setOptions(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const ConfirmDialog = () => (
    <AlertDialog open={promise !== null} onOpenChange={(open) => !open && handleCancel()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{options?.title}</AlertDialogTitle>
          <AlertDialogDescription>{options?.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>
            {options?.cancelText || "Batal"}
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} variant={options?.variant}>
            {options?.confirmText || "Lanjutkan"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return [ConfirmDialog, confirm] as const;
}
