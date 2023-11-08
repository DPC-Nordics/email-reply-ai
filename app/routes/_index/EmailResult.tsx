import { useNavigation } from "@remix-run/react";
import clsx from "clsx";
import { TextButton } from "~/components/Button";
import Card from "~/components/Card";
import CopyIcon from "~/components/CopyIcon";
import FormField from "~/components/FormField";
import RefreshIcon from "~/components/RefreshIcon";
import TickIcon from "~/components/TickIcon";
import useCopy from "~/utils/useCopy";

export type EmailResultProps = {
  classification?: string;
  summary?: string;
  reply?: string;
  isStale?: boolean;
};

export default function EmailResult(props: EmailResultProps): JSX.Element {
  const { classification, reply, summary, isStale } = props;
  const { state } = useNavigation();
  const isLoading = state !== "idle";

  const empty = !classification && !reply && !summary;
  const outdated = !isLoading && !empty && isStale;

  return (
    <Card
      className={clsx("flex-1", outdated && "sepia")}
      header={
        <div className="flex justify-between">
          <span>Output {outdated ? "(Outdated)" : ""}</span>
          {isLoading && <RefreshIcon />}
        </div>
      }
    >
      {empty ? (
        <p className="text-center text-gray-500">Nothing generated yet.</p>
      ) : null}

      <Result label="Classification" value={classification} />
      <Result label="Summary" value={summary} />
      <Result label="Generated reply" value={reply} />
    </Card>
  );
}

function Result({
  value,
  label,
}: {
  value?: string;
  label: string;
}): JSX.Element | null {
  if (!value) return null;

  return (
    <FormField id={label} label={label} action={<CopyButton value={value} />}>
      {value}
    </FormField>
  );
}

function CopyButton({ value }: { value: string }) {
  const [copy, isCopied] = useCopy();

  return (
    <TextButton type="button" disabled={isCopied} onClick={() => copy(value)}>
      {isCopied ? (
        <>
          Copied <TickIcon />
        </>
      ) : (
        <>
          Copy <CopyIcon />
        </>
      )}
    </TextButton>
  );
}
