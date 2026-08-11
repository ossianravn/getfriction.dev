import {
  Terminal,
  TerminalActions,
  TerminalContent,
  TerminalCopyButton,
  TerminalHeader,
  TerminalTitle,
} from "@/components/ai-elements/terminal";
import { savedObservations } from "@/content";

const divider = `\u001b[90m${"-".repeat(66)}\u001b[0m`;

function formatObservation(observation: (typeof savedObservations)[number]) {
  return [
    divider,
    `\u001b[33m\u25cf OPEN\u001b[0m - \u001b[90m${observation.time}\u001b[0m - \u001b[36m${observation.id}\u001b[0m`,
    `\u001b[90mrepo ${observation.repository} - branch ${observation.branch}\u001b[0m`,
    "",
    `\u001b[90m|\u001b[0m ${observation.body}`,
  ].join("\n");
}

const observationOutput = savedObservations
  .map(formatObservation)
  .join("\n\n");

export function CaptureTerminal() {
  return (
    <Terminal
      aria-label="Example saved Friction observations"
      className="capture__terminal"
      output={observationOutput}
    >
      <TerminalHeader>
        <TerminalTitle>friction list - 3 open</TerminalTitle>
        <TerminalActions>
          <TerminalCopyButton
            aria-label="Copy example observations"
            title="Copy example observations"
          />
        </TerminalActions>
      </TerminalHeader>
      <TerminalContent aria-label="Three synthetic saved observations" />
    </Terminal>
  );
}
