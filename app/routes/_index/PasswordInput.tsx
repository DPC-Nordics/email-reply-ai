import clsx from "clsx";
import FormField from "~/components/FormField";

export default function PasswordInput({
  id,
  name,
}: {
  id: string;
  name: string;
}): JSX.Element {
  return (
    <FormField
      id={id}
      label="Passcode"
      required
      helpText="4 digit code"
      className="!w-28"
    >
      <input
        id={id}
        type="password"
        name={name}
        required
        maxLength={4}
        pattern="[0-9]{4}"
        className={clsx(
          "!w-full rounded-md text-center text-3xl p-0 h-[42px] border-gray-400",
          "invalid:ring-2 invalid:ring-red-500 invalid:bg-red-50"
        )}
      />
    </FormField>
  );
}
