import clsx from "clsx";

export type FormFieldProps = React.ComponentPropsWithoutRef<"fieldset"> & {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
  helpText?: string;
  action?: React.ReactNode;
};

export default function FormField({
  id,
  label,
  required,
  children,
  helpText,
  action,
  ...props
}: FormFieldProps): JSX.Element {
  return (
    <fieldset
      {...props}
      className={clsx(props.className, "flex flex-col gap-2")}
    >
      <div className="flex justify-between items-center">
        <label htmlFor={id} className="font-bold text-sm uppercase">
          {label} {required ? <span className="text-red-500">*</span> : null}
        </label>

        {action}
      </div>

      {children}

      {helpText ? (
        <small className="text-xs text-gray-600">{helpText}</small>
      ) : null}
    </fieldset>
  );
}
