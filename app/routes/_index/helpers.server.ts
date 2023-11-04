import { FormAction } from "~/utils/constants";
import type { EmailResultProps } from "./EmailResult";
import {
  classifyEmail,
  generateEmailReply,
  summariseEmail,
} from "~/service/email-service.server";
import env from "~/utils/env";

export async function extractDataFromRequest(request: Request) {
  if (request.method !== "POST") throw new Error("Method not allowed");
  if (!env.PASSWORD) throw new Error("Password not set");

  const formData = await request.formData();

  const action = formData.get("_action") as FormAction;
  const text = formData.get("email-text")?.toString();
  const password = formData.get("password")?.toString();
  const language = formData.get("language")?.toString() || "Swedish";

  if (password !== env.PASSWORD) throw new Error("Wrong password");
  if (!text) throw new Error("No email-text provided");

  return { action, text, language };
}

export async function handleGeneration(
  action: FormAction,
  text: string,
  language: string
): Promise<EmailResultProps & { error?: string }> {
  try {
    if (action === FormAction.CLASSIFY) {
      return { classification: await classifyEmail(text) };
    }
    if (action === FormAction.SUMMARISE) {
      return { summary: await summariseEmail(text) };
    }
    if (action === FormAction.GENERATE_REPLY) {
      return { reply: await generateEmailReply(text, language) };
    }
    if (action === "all") {
      const [classification, summary, reply] = await Promise.all([
        classifyEmail(text),
        summariseEmail(text),
        generateEmailReply(text, language),
      ]);

      return { classification, summary, reply };
    }

    return { error: "Action not supported" };
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
    return { error: "Unknown error, " + String(error) };
  }
}
