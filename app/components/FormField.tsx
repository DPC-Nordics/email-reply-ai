import clsx from "clsx";

export type FormFieldProps = React.ComponentPropsWithoutRef<"fieldset"> & {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
  helpText?: string;
};

export default function FormField({
  id,
  label,
  required,
  children,
  helpText,
  ...props
}: FormFieldProps): JSX.Element {
  return (
    <fieldset
      {...props}
      className={clsx(props.className, "flex flex-col gap-2")}
    >
      <label htmlFor={id} className="font-bold text-sm uppercase">
        {label} {required ? <span className="text-red-500">*</span> : null}
      </label>

      {children}

      {helpText ? (
        <small className="text-xs text-gray-600">{helpText}</small>
      ) : null}
    </fieldset>
  );
}
