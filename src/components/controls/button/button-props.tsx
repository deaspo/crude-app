import { PropsWithChildren } from "react";
import { AdditionalProps } from "components/utils";

export interface ButtonProps extends PropsWithChildren<AdditionalProps> {
  type: "button" | "submit" | "reset";
  buttonClasses: string;
  onClick?: () => void;
}
