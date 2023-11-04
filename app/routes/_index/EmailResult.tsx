import { useNavigation } from "@remix-run/react";
import Card from "~/components/Card";
import FormField from "~/components/FormField";

export type EmailResultProps = {
  classification?: string;
  summary?: string;
  reply?: string;
};

export default function EmailResult(props: EmailResultProps): JSX.Element {
  const { classification, reply, summary } = props;
  const { state } = useNavigation();
  const isLoading = state !== "idle";

  if (isLoading)
    return (
      <Card className="flex-1 self-stretch justify-center">
        <p className="text-center text-gray-500">Loading...</p>
      </Card>
    );

  if (!classification && !reply && !summary)
    return (
      <Card className="flex-1 self-stretch justify-center">
        <p className="text-center text-gray-500">
          Nothing generated yet. <br />
          Click a button to see results.
        </p>
      </Card>
    );

  return (
    <Card className="flex-1">
      {classification ? (
        <FormField id="classify" label="Classification">
          {classification}
        </FormField>
      ) : null}
      {summary ? (
        <FormField id="summary" label="Summary">
          {summary}
        </FormField>
      ) : null}
      {reply ? (
        <FormField id="reply" label="Generated reply">
          {reply}
        </FormField>
      ) : null}
    </Card>
  );
}
