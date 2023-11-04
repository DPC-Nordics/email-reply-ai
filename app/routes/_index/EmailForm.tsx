import { Form, useNavigation } from "@remix-run/react";
import { useId } from "react";
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
}: {
  error: string | undefined;
}): JSX.Element {
  const id = useId();
  const emailTextId = `${id}-${emailTextName}`;
  const languageId = `${id}-${languageName}`;
  const passwordId = `${id}-${passwordName}`;

  return (
    <Card className="flex-1">
      <Form className="flex flex-col gap-4" method="POST">
        <EmailInput id={emailTextId} name={emailTextName} />

        <div className="flex gap-4">
          <LanguageSelect id={languageId} name={languageName} />
          <PasswordInput id={passwordId} name={passwordName} />
        </div>

        <fieldset>
          <ActionButton className="w-full" action={FormAction.ALL}>
            Classify, summarise and generate reply (all)
          </ActionButton>
        </fieldset>
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
}: {
  action: FormAction;
  children?: string;
  className?: string;
}) {
  const { state } = useNavigation();
  const disabled = state === "submitting";

  return (
    <Button
      variant="filled"
      type="submit"
      className={className}
      name="_action"
      value={action}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}
