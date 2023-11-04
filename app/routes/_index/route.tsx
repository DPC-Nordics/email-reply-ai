import {
  json,
  type ActionFunctionArgs,
  type TypedResponse,
} from "@remix-run/node";

import Card from "~/components/Card";
import EmailForm from "./EmailForm";
import env from "~/utils/env";
import {
  classifyEmail,
  generateEmailReply,
  summariseEmail,
} from "~/service/email-service.server";
import { useActionData, useRouteError } from "@remix-run/react";
import EmailResult, { EmailResultProps } from "./EmailResult";
import { FormAction } from "~/utils/constants";

export async function loader() {
  return null;
}

export async function action({ request }: ActionFunctionArgs): Promise<
  TypedResponse<
    EmailResultProps & {
      error?: string;
    }
  >
> {
  if (request.method !== "POST") return json({ error: "Method not allowed" });
  if (!env.PASSWORD) return json({ error: "Password not set" });

  try {
    const formData = await request.formData();

    const variant = formData.get("_action");
    const text = formData.get("email-text")?.toString();
    const password = formData.get("password")?.toString();
    const language = formData.get("language")?.toString() || "sv";

    if (password !== env.PASSWORD) return json({ error: "Wrong password" });
    if (!text) return json({ error: "No email-text provided" });

    if (variant === FormAction.CLASSIFY) {
      return json({ classification: await classifyEmail(text, language) });
    }
    if (variant === FormAction.SUMMARISE) {
      return json({ summary: await summariseEmail(text, language) });
    }
    if (variant === FormAction.GENERATE_REPLY) {
      return json({ reply: await generateEmailReply(text, language) });
    }
    if (variant === "all") {
      const [classification, summary, reply] = await Promise.all([
        classifyEmail(text, language),
        summariseEmail(text, language),
        generateEmailReply(text, language),
      ]);

      return json({ classification, summary, reply });
    }
  } catch (error) {
    if (error instanceof Error) return json({ error: error.message });
    return json({ error: "Unknown error, " + String(error) });
  }

  throw new Response("Variant not supported", { status: 404 });
}

export default function Index() {
  const data = useActionData<typeof action>();

  return (
    <main className={"flex flex-wrap gap-4 items-start justify-center w-full"}>
      <EmailForm error={data?.error} />
      <EmailResult {...data} />
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
