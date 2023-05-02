import clsx from "clsx";
import { ComponentPropsWithoutRef, FC, ReactNode } from "react";

interface InputGroupProps extends ComponentPropsWithoutRef<"td"> {
  extraCssClass?: string;
  textColor?: string;
  children: string | ReactNode;
}

export const ColumnStyled: FC<InputGroupProps> = ({
  extraCssClass,
  children,
  textColor = "text-gray-900",
  ...otherProps
}) => (
  <td
    className={clsx(
      "text-md border  px-4 py-3 text-center",
      textColor,
      extraCssClass
    )}
    {...otherProps}
  >
    {children}
  </td>
);
