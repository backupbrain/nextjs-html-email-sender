import { Button } from "@/components/ui/button";

export type Props = {
  disabled?: boolean | undefined;
  variant?: string;
  children?: React.ReactNode | React.ReactNode[] | undefined | null;
  onClick?: () => void;
}
export const FormButton = ({ disabled, variant, children, onClick }: Props) => {
  return (
    <Button disabled={disabled} onClick={onClick}>{children}</Button>
  )
}
