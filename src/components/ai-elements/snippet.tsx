"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import type { ComponentProps } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";

interface SnippetContextType {
  code: string;
}

const SnippetContext = createContext<SnippetContextType>({ code: "" });

export type SnippetProps = ComponentProps<typeof InputGroup> & {
  code: string;
};

export function Snippet({
  code,
  className,
  children,
  ...props
}: SnippetProps) {
  const contextValue = useMemo(() => ({ code }), [code]);

  return (
    <SnippetContext.Provider value={contextValue}>
      <InputGroup
        className={cn(
          "min-h-14 rounded-xl bg-card font-mono shadow-sm",
          className,
        )}
        {...props}
      >
        {children}
      </InputGroup>
    </SnippetContext.Provider>
  );
}

export type SnippetAddonProps = ComponentProps<typeof InputGroupAddon>;

export function SnippetAddon(props: SnippetAddonProps) {
  return <InputGroupAddon {...props} />;
}

export type SnippetTextProps = ComponentProps<typeof InputGroupText>;

export function SnippetText({
  className,
  ...props
}: SnippetTextProps) {
  return (
    <InputGroupText
      className={cn("pl-2 font-normal text-muted-foreground", className)}
      {...props}
    />
  );
}

export type SnippetInputProps = Omit<
  ComponentProps<typeof InputGroupInput>,
  "readOnly" | "value"
>;

export function SnippetInput({
  className,
  ...props
}: SnippetInputProps) {
  const { code } = useContext(SnippetContext);

  return (
    <InputGroupInput
      className={cn("h-full text-base text-foreground md:text-base", className)}
      readOnly
      value={code}
      {...props}
    />
  );
}

export type SnippetCopyButtonProps = ComponentProps<typeof InputGroupButton> & {
  onCopy?: () => void;
  onError?: (error: Error) => void;
  timeout?: number;
};

export function SnippetCopyButton({
  onCopy,
  onError,
  timeout = 2000,
  children,
  className,
  ...props
}: SnippetCopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<number>(0);
  const { code } = useContext(SnippetContext);

  const copyToClipboard = useCallback(async () => {
    if (typeof window === "undefined" || !navigator.clipboard?.writeText) {
      onError?.(new Error("Clipboard API not available"));
      return;
    }

    try {
      if (!isCopied) {
        await navigator.clipboard.writeText(code);
        setIsCopied(true);
        onCopy?.();
        timeoutRef.current = window.setTimeout(
          () => setIsCopied(false),
          timeout,
        );
      }
    } catch (error) {
      onError?.(error as Error);
    }
  }, [code, isCopied, onCopy, onError, timeout]);

  useEffect(
    () => () => {
      window.clearTimeout(timeoutRef.current);
    },
    [],
  );

  const Icon = isCopied ? CheckIcon : CopyIcon;

  return (
    <InputGroupButton
      aria-label={isCopied ? "Copied" : "Copy"}
      className={className}
      onClick={copyToClipboard}
      size="icon-sm"
      title={isCopied ? "Copied" : "Copy"}
      {...props}
    >
      {children ?? <Icon data-icon="inline-start" />}
    </InputGroupButton>
  );
}
