import { cn } from "@/lib/utils";
import type { MouseEventHandler, ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonTypes = "button" | "submit" | "reset";
type ButtonStyles = "outline" | "ghost" | "default";

interface Props {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  type?: ButtonTypes;
  disabled?: boolean;
  style?: ButtonStyles;
}

export function CustomButton({
  children,
  onClick,
  className,
  type = "button",
  disabled = false,
  style = "default",
}: Props) {
  const classNames = [
    styles.button,
    styles[style],
    className,
  ];

  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={cn(...classNames)}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
