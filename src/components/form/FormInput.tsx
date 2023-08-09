import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";

export type Props = {
  disabled?: boolean | undefined;
  type?: string | undefined;
  label?: string | undefined;
  placeholder?: string | undefined;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;

}

export const FormInput = ({ onChange, type, disabled, label, placeholder }: Props) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label>{label}</Label>
      <Input
        type={type || "text"}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  )
}
