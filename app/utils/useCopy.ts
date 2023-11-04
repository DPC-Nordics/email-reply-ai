import { useState } from "react";

type CopyFn = (text: string) => Promise<boolean>; // Return success

export default function useCopy(): [CopyFn, boolean] {
  const [isCopied, setCopied] = useState(false);

  const copy: CopyFn = async (text) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported");
      return false;
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

      return true;
    } catch (error) {
      console.warn("Copy failed", error);
      setCopied(false);
      return false;
    }
  };

  return [copy, isCopied];
}
