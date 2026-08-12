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
    body: "Give your agent the task. Friction stays out of the way.",
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

export const openConventions = [
  {
    number: "01",
    label: "Persistent guidance",
    title: "AGENTS.md",
    body: "Carries capture guidance during normal work. Portable repository setup manages one Friction block without claiming the shared file belongs to one client.",
    command: "friction setup standard",
  },
  {
    number: "02",
    label: "Explicit workflows",
    title: "Agent Skills",
    body: "Packages friction-review and friction-fix as on-demand workflows. .agents/skills is the preferred cross-client location where the agent supports it.",
    command: "friction setup skills",
  },
  {
    number: "03",
    label: "Private data plane",
    title: "Friction CLI",
    body: "Stores observations locally and handles deterministic setup, lifecycle, and doctor commands without embedding an AI model.",
    command: "friction doctor",
  },
] as const;

export const integrationGroups = [
  {
    status: "Managed",
    description:
      "Validated preview, apply, update, diagnosis, and undo for the named scope.",
    items: [
      {
        name: "Codex",
        scope: "User + repository",
        note: "Native user setup and shared repository guidance.",
      },
      {
        name: "Claude Code",
        scope: "User + repository",
        note: "Native rules and skill directories.",
      },
      {
        name: "Agent Skills",
        scope: "User + repository + workspace",
        note: "Explicit lifecycle for shared friction-review and friction-fix skills.",
      },
    ],
  },
  {
    status: "Project standard",
    description:
      "Validated root AGENTS.md plus repository .agents/skills for compatible clients.",
    items: [
      {
        name: "Open-standard setup",
        scope: "Repository",
        note: "Portable guidance with generic source attribution.",
      },
    ],
  },
  {
    status: "Workspace managed",
    description:
      "Explicit workspace setup is implemented, with real-client validation still in progress.",
    items: [
      {
        name: "OpenClaw",
        scope: "Explicit workspace",
        note: "Each agent workspace and runtime is configured independently.",
      },
      {
        name: "Hermes Agent",
        scope: "Explicit workspace",
        note: "Precedence-aware instructions and native skills.",
      },
    ],
  },
  {
    status: "Manual or partial",
    description:
      "Friction provides the safe managed pieces and exact manual steps for the rest.",
    items: [
      {
        name: "Warp",
        scope: "User + repository",
        note: "User capture is manual; repository setup uses the project standard.",
      },
      {
        name: "Generic",
        scope: "Any shell-capable agent",
        note: "Output-only guidance with an explicit source and shell transport.",
      },
    ],
  },
  {
    status: "Compatible, unverified",
    description:
      "The client documents the conventions, but Friction has not passed its real-client acceptance path.",
    items: [
      {
        name: "OpenCode",
        scope: "User + repository",
        note: "Setup avoids shadowing an existing CLAUDE.md fallback.",
      },
      {
        name: "Pi",
        scope: "User + repository",
        note: "Context or skill loading can be disabled by client settings.",
      },
    ],
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
