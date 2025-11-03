import { useState, useCallback } from "react";

/**
 * useClipboard - Copy text to clipboard with state tracking
 * @param timeout - Reset copied state after timeout (ms)
 * @returns [copiedText, copy, copied]
 */

export function useClipboard(
  timeout = 2000
): [string | null, (text: string) => Promise<void>, boolean] {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text: string) => {
      if (!navigator?.clipboard) {
        console.warn("Clipboard not supported");
        return;
      }

      try {
        await navigator.clipboard.writeText(text);
        setCopiedText(text);
        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, timeout);
      } catch (error) {
        console.warn("Copy failed", error);
        setCopiedText(null);
        setCopied(false);
      }
    },
    [timeout]
  );

  return [copiedText, copy, copied];
}
