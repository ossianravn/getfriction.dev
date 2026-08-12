import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { createServer } from "node:net";
import { fileURLToPath } from "node:url";

const host = "127.0.0.1";
const projectRoot = fileURLToPath(new URL("../", import.meta.url));

function reservePort() {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.once("error", reject);
    server.listen(0, host, () => {
      const address = server.address();

      if (!address || typeof address === "string") {
        server.close();
        reject(new Error("Could not reserve a local port."));
        return;
      }

      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(address.port);
      });
    });
  });
}

async function waitForServer(url, serverProcess, getOutput) {
  let lastError;

  for (let attempt = 0; attempt < 40; attempt += 1) {
    if (serverProcess.exitCode !== null) {
      throw new Error(
        `SSR server exited with code ${serverProcess.exitCode}.\n${getOutput()}`,
      );
    }

    try {
      return await fetch(url);
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  throw new Error(`SSR server did not start.\n${getOutput()}`, {
    cause: lastError,
  });
}

async function stopServer(serverProcess) {
  if (serverProcess.exitCode !== null) {
    return;
  }

  serverProcess.kill("SIGTERM");
  await once(serverProcess, "exit");
}

const port = await reservePort();
const origin = `http://${host}:${port}`;
const serverProcess = spawn(process.execPath, ["./dist/server/entry.mjs"], {
  cwd: projectRoot,
  env: {
    ...process.env,
    HOST: host,
    PORT: String(port),
  },
  stdio: ["ignore", "pipe", "pipe"],
});

let serverOutput = "";
const captureOutput = (chunk) => {
  serverOutput += chunk.toString();
};

serverProcess.stdout.on("data", captureOutput);
serverProcess.stderr.on("data", captureOutput);

try {
  const homeResponse = await waitForServer(
    `${origin}/`,
    serverProcess,
    () => serverOutput,
  );
  const homeHtml = await homeResponse.text();

  assert.equal(homeResponse.status, 200);
  assert.match(homeHtml, /Your agent finished the task\./);
  assert.match(homeHtml, /Local-first feedback for coding agents/);
  assert.match(
    homeHtml,
    /Three steps\. Two Agent Skills\. You stay in control\./,
  );
  assert.match(homeHtml, /Your part/);
  assert.match(homeHtml, /What Friction uses/);
  assert.match(homeHtml, /CLI command/);
  assert.match(homeHtml, /Agent Skill/);
  assert.match(
    homeHtml,
    /Use Friction with the coding agent you already have\./,
  );
  assert.match(homeHtml, /Coming in 0\.2/);
  assert.doesNotMatch(
    homeHtml,
    /Workspace managed|Private data plane|deterministic setup catalog/,
  );
  assert.match(
    homeHtml,
    /Remote and sandboxed agents need Friction installed inside that\s+environment/,
  );
  assert.match(homeHtml, /rel="canonical" href="https:\/\/getfriction\.dev\/"/);
  assert.match(homeHtml, /type="application\/ld\+json"/);

  const robotsResponse = await fetch(`${origin}/robots.txt`);
  const robots = await robotsResponse.text();
  assert.equal(robotsResponse.status, 200);
  assert.match(robots, /Sitemap: https:\/\/getfriction\.dev\/sitemap-index\.xml/);

  const sitemapResponse = await fetch(`${origin}/sitemap-index.xml`);
  assert.equal(sitemapResponse.status, 200);

  const socialImageResponse = await fetch(`${origin}/og-friction.png`);
  assert.equal(socialImageResponse.status, 200);
  assert.equal(socialImageResponse.headers.get("content-type"), "image/png");

  const missingResponse = await fetch(`${origin}/prototype/home`);
  assert.equal(missingResponse.status, 404);

  console.log("SSR smoke passed: page, SEO endpoints, social image, and 404.");
} finally {
  await stopServer(serverProcess);
}
