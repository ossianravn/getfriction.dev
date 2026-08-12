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

export const skillWorkflow = [
  {
    number: "01",
    label: "During the task",
    title: "Capture what got in the way",
    body: "A short instruction tells your agent when a problem is worth saving. It leaves one private note, then keeps working.",
    action: "Keep working. Your agent records the note.",
    mechanismType: "CLI command",
    mechanismName: "friction add",
  },
  {
    number: "02",
    label: "When you want the pattern",
    title: "Review with a skill",
    body: "The friction-review skill groups repeated notes and checks likely causes against the current code. It never changes anything.",
    action: "Ask your agent to review your Friction notes.",
    mechanismType: "Agent Skill",
    mechanismName: "friction-review",
  },
  {
    number: "03",
    label: "When you approve a fix",
    title: "Fix with a skill",
    body: "The friction-fix skill works only on the verified problem you name. It fixes that scope, verifies the result, and resolves only the notes it addressed.",
    action: "Ask your agent to fix the verified problem you name.",
    mechanismType: "Agent Skill",
    mechanismName: "friction-fix",
  },
] as const;

export const integrationGroups = [
  {
    status: "Available now",
    description:
      "Friction v0.1.4 can install its capture instruction and both skills for these coding agents.",
    items: [
      {
        name: "Codex",
        scope: "User or repository",
        note: "Enable Friction across your projects or for one repository.",
      },
      {
        name: "Claude Code",
        scope: "User or repository",
        note: "Install the same capture, review, and fix workflow.",
      },
      {
        name: "Agent Skills",
        scope: "Review and fix",
        note: "Use friction-review for read-only analysis. friction-fix requires an explicitly named problem.",
      },
    ],
  },
  {
    status: "Coming in 0.2",
    description:
      "The next release adds setup for more agents. That setup is built and is now being tested in real sessions.",
    items: [
      {
        name: "OpenCode and Pi",
        scope: "User or repository",
        note: "Friction installs the instructions and skills each agent uses.",
      },
      {
        name: "OpenClaw and Hermes",
        scope: "Each agent environment",
        note: "Set up each isolated agent where it actually runs.",
      },
      {
        name: "Warp",
        scope: "Guided setup",
        note: "Project setup is handled for you. User-wide setup includes one manual rule step.",
      },
      {
        name: "Other coding agents",
        scope: "Any shell-capable agent",
        note: "Generate portable instructions when your agent is not listed yet.",
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
