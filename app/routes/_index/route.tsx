import {
  json,
  type ActionFunctionArgs,
  type TypedResponse,
} from "@remix-run/node";

import Card from "~/components/Card";
import EmailForm from "./EmailForm";
import { useActionData, useNavigation, useRouteError } from "@remix-run/react";
import EmailResult, { EmailResultProps } from "./EmailResult";
import { extractDataFromRequest, handleGeneration } from "./helpers.server";
import { useEffect, useState } from "react";

export async function loader() {
  return null;
}

export async function action({
  request,
}: ActionFunctionArgs): Promise<
  TypedResponse<EmailResultProps & { error?: string }>
> {
  try {
    const { action, text, language } = await extractDataFromRequest(request);
    return json(await handleGeneration(action, text, language));
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : String(e) });
  }
}

export default function Index() {
  const data = useActionData<typeof action>();
  const { state } = useNavigation();
  const [isStale, setIsStale] = useState(false);

  useEffect(() => {
    if (state === "loading") setIsStale(false);
  }, [state]);

  return (
    <main className={"flex flex-wrap gap-4 items-start justify-center w-full"}>
      <EmailForm error={data?.error} setStale={() => setIsStale(true)} />
      <EmailResult {...data} isStale={isStale} />
    </main>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <Card className="flex-1" header="Error occurred">
      <pre>{JSON.stringify(error, null, 2)}</pre>
      <p>Refresh to start again!</p>
    </Card>
  );
}
