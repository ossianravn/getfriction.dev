"use client";

import { CheckIcon, CopyIcon, TerminalIcon, Trash2Icon } from "lucide-react";
import type { ComponentProps, HTMLAttributes } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Ansi } from "@/components/ai-elements/ansi-renderer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TerminalContextType {
  output: string;
  isStreaming: boolean;
  autoScroll: boolean;
  onClear?: () => void;
}

const TerminalContext = createContext<TerminalContextType>({
  autoScroll: true,
  isStreaming: false,
  output: "",
});

export type TerminalHeaderProps = HTMLAttributes<HTMLDivElement>;

export function TerminalHeader({
  className,
  children,
  ...props
}: TerminalHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b border-border px-4 py-3",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export type TerminalTitleProps = HTMLAttributes<HTMLDivElement>;

export function TerminalTitle({
  className,
  children,
  ...props
}: TerminalTitleProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 text-base text-muted-foreground [&_svg]:size-4",
        className,
      )}
      {...props}
    >
      <TerminalIcon aria-hidden="true" />
      {children ?? "Terminal"}
    </div>
  );
}

export type TerminalStatusProps = HTMLAttributes<HTMLDivElement>;

export function TerminalStatus({
  className,
  children,
  ...props
}: TerminalStatusProps) {
  const { isStreaming } = useContext(TerminalContext);

  if (!isStreaming) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex items-center gap-2 text-xs text-muted-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export type TerminalActionsProps = HTMLAttributes<HTMLDivElement>;

export function TerminalActions({
  className,
  children,
  ...props
}: TerminalActionsProps) {
  return (
    <div className={cn("flex items-center gap-1", className)} {...props}>
      {children}
    </div>
  );
}

export type TerminalCopyButtonProps = ComponentProps<typeof Button> & {
  onCopy?: () => void;
  onError?: (error: Error) => void;
  timeout?: number;
};

export function TerminalCopyButton({
  onCopy,
  onError,
  timeout = 2000,
  children,
  className,
  ...props
}: TerminalCopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<number>(0);
  const { output } = useContext(TerminalContext);

  const copyToClipboard = useCallback(async () => {
    if (typeof window === "undefined" || !navigator.clipboard?.writeText) {
      onError?.(new Error("Clipboard API not available"));
      return;
    }

    try {
      await navigator.clipboard.writeText(output);
      setIsCopied(true);
      onCopy?.();
      timeoutRef.current = window.setTimeout(() => setIsCopied(false), timeout);
    } catch (error) {
      onError?.(error as Error);
    }
  }, [onCopy, onError, output, timeout]);

  useEffect(
    () => () => {
      window.clearTimeout(timeoutRef.current);
    },
    [],
  );

  const Icon = isCopied ? CheckIcon : CopyIcon;

  return (
    <Button
      aria-label={isCopied ? "Terminal output copied" : "Copy terminal output"}
      className={cn("shrink-0", className)}
      onClick={copyToClipboard}
      size="icon-sm"
      variant="ghost"
      {...props}
    >
      {children ?? <Icon data-icon="inline-start" />}
    </Button>
  );
}

export type TerminalClearButtonProps = ComponentProps<typeof Button>;

export function TerminalClearButton({
  children,
  className,
  ...props
}: TerminalClearButtonProps) {
  const { onClear } = useContext(TerminalContext);

  if (!onClear) {
    return null;
  }

  return (
    <Button
      aria-label="Clear terminal output"
      className={cn("shrink-0", className)}
      onClick={onClear}
      size="icon-sm"
      variant="ghost"
      {...props}
    >
      {children ?? <Trash2Icon data-icon="inline-start" />}
    </Button>
  );
}

export type TerminalContentProps = HTMLAttributes<HTMLDivElement>;

export function TerminalContent({
  className,
  children,
  ...props
}: TerminalContentProps) {
  const { output, isStreaming, autoScroll } = useContext(TerminalContext);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoScroll && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [autoScroll, output]);

  return (
    <div
      aria-label="Terminal output"
      className={cn(
        "max-h-96 overflow-auto p-5 font-mono text-base leading-relaxed",
        className,
      )}
      ref={containerRef}
      role="region"
      tabIndex={0}
      {...props}
    >
      {children ?? (
        <pre className="whitespace-pre-wrap break-words">
          <Ansi>{output}</Ansi>
          {isStreaming ? (
            <span
              aria-hidden="true"
              className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-foreground"
            />
          ) : null}
        </pre>
      )}
    </div>
  );
}

export type TerminalProps = HTMLAttributes<HTMLDivElement> & {
  output: string;
  isStreaming?: boolean;
  autoScroll?: boolean;
  onClear?: () => void;
};

export function Terminal({
  output,
  isStreaming = false,
  autoScroll = true,
  onClear,
  className,
  children,
  ...props
}: TerminalProps) {
  const contextValue = useMemo(
    () => ({ autoScroll, isStreaming, onClear, output }),
    [autoScroll, isStreaming, onClear, output],
  );

  return (
    <TerminalContext.Provider value={contextValue}>
      <div
        className={cn(
          "flex flex-col overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-2xl",
          className,
        )}
        {...props}
      >
        {children ?? (
          <>
            <TerminalHeader>
              <TerminalTitle />
              <div className="flex items-center gap-1">
                <TerminalStatus />
                <TerminalActions>
                  <TerminalCopyButton />
                  {onClear ? <TerminalClearButton /> : null}
                </TerminalActions>
              </div>
            </TerminalHeader>
            <TerminalContent />
          </>
        )}
      </div>
    </TerminalContext.Provider>
  );
}
