export const installCommand = "npm install --global @ossianravn/friction";
export const packageVersion = "0.1.4";

export const productLinks = {
  github: "https://github.com/ossianravn/Friction",
  npm: "https://www.npmjs.com/package/@ossianravn/friction",
} as const;

export const workflow = [
  {
    number: "01",
    title: "Work normally",
    body: "Give Codex or Claude Code the task. Friction stays out of the way.",
  },
  {
    number: "02",
    title: "Capture the obstacle",
    body: "The agent leaves one short private note, then continues the main task.",
  },
  {
    number: "03",
    title: "Review when ready",
    body: "Ask the agent to group repeats and verify likely causes against the code.",
  },
  {
    number: "04",
    title: "Authorize one fix",
    body: "You choose the verified problem. Nothing changes without your approval.",
  },
] as const;

export const savedObservations = [
  {
    id: "fr_7e2c4a0d1b5f6c8e9a4d0f2b6c1e3a5d",
    time: "2026-08-11 14:25 UTC",
    repository: "docs-site",
    branch: "main",
    body: "While updating an already-merged documentation branch, Git refused the switch because a local README would be overwritten. This added a scoped stash, fast-forward, and restore step.",
  },
  {
    id: "fr_93b7d1e4a8c2f6057b9d3e1a4c6f8b20",
    time: "2026-08-11 13:40 UTC",
    repository: "cli-tool",
    branch: "release/0.1",
    body: "While validating a release, the first full check failed after focused checks passed. This required isolated reruns to distinguish a transient suite interaction from a real regression.",
  },
  {
    id: "fr_b5e1c8a4d7f20963e1b5c8a4d7f20963",
    time: "2026-08-11 08:53 UTC",
    repository: "sample-app",
    branch: "feature/setup",
    body: "While inspecting the component setup, the package runner could not write its cache in the default sandbox. This cost one failed command and an escalated retry.",
  },
] as const;

export const privacyFacts = [
  "Local storage",
  "No account",
  "No telemetry",
  "No background process",
  "No transcript collection",
  "Explicit fixes and sharing",
] as const;

export const changelog = [
  {
    version: "0.1.4",
    date: "11 Aug 2026",
    dateTime: "2026-08-11",
    items: ["Improved terminal observation cards"],
  },
  {
    version: "0.1.3",
    date: "11 Aug 2026",
    dateTime: "2026-08-11",
    items: ["Documented safe package update migration"],
  },
  {
    version: "0.1.2",
    date: "11 Aug 2026",
    dateTime: "2026-08-11",
    items: ["Clearer human-readable CLI output"],
  },
] as const;
