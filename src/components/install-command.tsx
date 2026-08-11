import { useState } from "react";

import {
  Snippet,
  SnippetAddon,
  SnippetCopyButton,
  SnippetInput,
  SnippetText,
} from "@/components/ai-elements/snippet";
import { installCommand } from "@/content";
import { cn } from "@/lib/utils";

type CopyState = "idle" | "copied" | "failed";

type InstallCommandProps = {
  className?: string;
  prompt?: string;
};

export function InstallCommand({ className, prompt = "$" }: InstallCommandProps) {
  const [copyState, setCopyState] = useState<CopyState>("idle");

  const label =
    copyState === "copied"
      ? "Install command copied"
      : copyState === "failed"
        ? "Copy failed"
        : "Copy install command";

  return (
    <Snippet className={cn("install-command", className)} code={installCommand}>
      <SnippetAddon>
        <SnippetText aria-hidden="true">{prompt}</SnippetText>
      </SnippetAddon>
      <SnippetInput aria-label="Install Friction command" spellCheck={false} />
      <SnippetAddon align="inline-end">
        <SnippetCopyButton
          aria-label={label}
          onCopy={() => setCopyState("copied")}
          onError={() => setCopyState("failed")}
          title={label}
        />
      </SnippetAddon>
      <span aria-live="polite" className="visually-hidden">
        {copyState === "idle" ? "" : label}
      </span>
    </Snippet>
  );
}
