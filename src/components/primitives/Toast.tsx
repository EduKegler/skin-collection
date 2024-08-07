import { Toast as BaseToast } from "flowbite-react";

type ToastProps = {
  text: string;
  onDismiss: () => void;
};

export function Toast({ text, onDismiss }: ToastProps) {
  return (
    <BaseToast className="fixed">
      <div className="ml-3 text-sm font-normal">{text}</div>
      <BaseToast.Toggle onDismiss={onDismiss} />
    </BaseToast>
  );
}
