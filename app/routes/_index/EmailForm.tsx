import { Form, useNavigation } from "@remix-run/react";
import { useId, useRef } from "react";
import Button from "~/components/Button";
import Card from "~/components/Card";
import EmailInput from "./EmailInput";
import LanguageSelect from "./LanguageSelect";
import PasswordInput from "./PasswordInput";
import { FormAction } from "~/utils/constants";

const emailTextName = "email-text";
const languageName = "language";
const passwordName = "password";

export default function EmailForm({
  error,
  setStale,
}: {
  error: string | undefined;
  setStale: () => void;
}): JSX.Element {
  const id = useId();
  const emailTextId = `${id}-${emailTextName}`;
  const languageId = `${id}-${languageName}`;
  const passwordId = `${id}-${passwordName}`;

  const inputRef = useRef<{ click: () => void }>(null);
  const handleButtonClick = () => inputRef.current?.click();

  return (
    <Card className="flex-1" header="Input">
      <Form className="flex flex-col gap-4" method="POST">
        <fieldset className="flex gap-2">
          <Button className="w-2/3" onClick={handleButtonClick}>
            Upload email text file
          </Button>
          <Button type="reset" className="w-1/3">
            Reset form
          </Button>
        </fieldset>

        <EmailInput
          id={emailTextId}
          name={emailTextName}
          ref={inputRef}
          onChange={setStale}
        />

        <div className="flex gap-4">
          <PasswordInput id={passwordId} name={passwordName} />
          <LanguageSelect id={languageId} name={languageName} />
        </div>

        <ActionButton className="w-full" action={FormAction.ALL}>
          Classify, summarise and generate reply (all)
        </ActionButton>

        <fieldset className="flex gap-4">
          <ActionButton action={FormAction.CLASSIFY} />
          <ActionButton action={FormAction.SUMMARISE} />
          <ActionButton className="w-full" action={FormAction.GENERATE_REPLY} />
        </fieldset>
        {error && <p className="text-red-500">Error: {error}</p>}
      </Form>
    </Card>
  );
}

function ActionButton({
  action,
  children = action,
  className,
  disabled,
}: {
  action: FormAction;
  children?: string;
  className?: string;
  disabled?: boolean;
}) {
  const { state } = useNavigation();

  return (
    <Button
      variant="filled"
      type="submit"
      className={className}
      name="_action"
      value={action}
      disabled={disabled || state === "submitting"}
    >
      {children}
    </Button>
  );
}
