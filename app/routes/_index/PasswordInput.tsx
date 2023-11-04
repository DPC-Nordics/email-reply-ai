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
      label="Password"
      required
      helpText="4 digit code"
      className="flex-1"
    >
      <input
        id={id}
        type="password"
        name={name}
        required
        maxLength={4}
        pattern="[0-9]{4}"
      />
    </FormField>
  );
}
