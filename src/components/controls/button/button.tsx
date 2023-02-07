import { ButtonProps } from "./button-props";

export const Button = ({
  type,
  buttonClasses,
  children,
  onClick,
  ...rest
}: ButtonProps) => {
  let oClasses: string[] = [
    "px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md transition duration-150 ease-in-out ml-1",
    buttonClasses,
  ];
  let oType: "button" | "submit" | "reset" | undefined = undefined;
  if (type === "button") {
    oType = "button";
  } else if (type === "reset") {
    oType = "reset";
  } else if (type === "submit") {
    oType = "submit";
  }

  return (
    <button
      {...rest}
      type={oType}
      className={oClasses.join(" ")}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
