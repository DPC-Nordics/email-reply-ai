// import env from "~/utils/env";

const BASE_URL = "https://summariseemail.azurewebsites.net/api";

export async function classifyEmail(text: string, language: string) {
  // const code = env.KEY_CLASSIFY_TEXT;
  // if (!code) throw new Error("Missing API key for classification");

  const searchParams = new URLSearchParams();
  searchParams.append("email-text", text);
  searchParams.append("language", language);
  // searchParams.append("code", code);

  const res = await fetch(
    `${BASE_URL}/classifyEmail?${searchParams.toString()}`,
    { method: "POST" }
  );

  return res.text();
}

export async function summariseEmail(text: string, language: string) {
  // const code = env.KEY_SUMMARISE_TEXT;
  // if (!code) throw new Error("Missing API key for summarisation");

  const searchParams = new URLSearchParams();
  searchParams.append("email-text", text);
  searchParams.append("language", language);
  // searchParams.append("code", code);

  const res = await fetch(`${BASE_URL}/summarize?${searchParams.toString()}`, {
    method: "POST",
  });

  return res.text();
}

export async function generateEmailReply(text: string, language: string) {
  // const code = env.KEY_GENERATE_REPLY;
  // if (!code) throw new Error("Missing API key for generating email reply");

  const searchParams = new URLSearchParams();
  searchParams.append("email-text", text);
  searchParams.append("language", language);
  // searchParams.append("code", code);

  const res = await fetch(
    `${BASE_URL}/generateReply?${searchParams.toString()}`,
    { method: "POST" }
  );

  return res.text();
}
