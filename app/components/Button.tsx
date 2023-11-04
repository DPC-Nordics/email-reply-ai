import clsx from "clsx";
import { forwardRef } from "react";

export type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  variant?: "filled" | "outline";
};

const Button = forwardRef(function Button(
  props: ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
): JSX.Element {
  return (
    <button
      type="button"
      {...props}
      className={generateClassName(props)}
      ref={ref}
    />
  );
});

export default Button;

function generateClassName(props: ButtonProps) {
  const baseClasses = clsx(
    props.className,
    "py-2 px-4 border border-green-800 rounded-md"
  );
  if (props.disabled) return clsx(baseClasses, "bg-gray-400 text-gray-800");

  return clsx(
    baseClasses,
    "cursor-pointer",
    "hover:bg-green-700 hover:text-green-100 active:bg-green-900 active:text-green-100",
    props.variant === "filled"
      ? "bg-green-800 text-green-100"
      : "bg-transparent text-green-800"
  );
}

export function TextButton(props: React.ComponentPropsWithoutRef<"button">) {
  return (
    <button
      {...props}
      className={clsx(
        props.className,
        "flex justify-end items-center text-green-600 hover:text-green-500 active:text-green-700 "
      )}
    />
  );
}
