import formsPlugin from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.tsx", "./app/**/*.ts"],
  theme: {
    extend: {},
  },
  plugins: [formsPlugin],
};
