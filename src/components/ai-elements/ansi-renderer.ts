import AnsiImport from "ansi-to-react";

type AnsiRenderer = typeof AnsiImport;
type AnsiInteropModule = AnsiRenderer | { default: AnsiRenderer };

const ansiModule = AnsiImport as AnsiInteropModule;

export const Ansi =
  typeof ansiModule === "function" ? ansiModule : ansiModule.default;
