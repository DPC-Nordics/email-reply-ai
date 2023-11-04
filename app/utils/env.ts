const env = {
  KEY_CLASSIFY_TEXT: process.env.classify_text,
  KEY_SUMMARISE_TEXT: process.env.summarise_key,
  KEY_GENERATE_REPLY: process.env.generate_reply_key,
  PASSWORD: process.env.password,
} as const;

export default env;
