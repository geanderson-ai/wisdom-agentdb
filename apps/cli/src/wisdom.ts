#!/usr/bin/env node
const baseUrl = process.env.WISDOM_AGENTDB_URL ?? "http://127.0.0.1:8000";

type FlagMap = Record<string, string | boolean>;

interface ParsedArgs {
  positional: string[];
  flags: FlagMap;
}

interface ApiErrorPayload {
  detail?: unknown;
}

function usage(): void {
  console.log(`Wisdom AgentDB CLI

Usage:
  wisdom health
  wisdom add <text> [--scope project|session|user|agent|workspace] [--project-id ID]
  wisdom search <query> [--scope ...] [--top-k N]

Environment:
  WISDOM_AGENTDB_URL  API base URL (default: http://127.0.0.1:8000)
`);
}

function parseArgs(argv: string[]): ParsedArgs {
  const positional: string[] = [];
  const flags: FlagMap = {};

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) {
      positional.push(token);
      continue;
    }

    const key = token.slice(2);
    const next = argv[index + 1];
    if (next && !next.startsWith("--")) {
      flags[key] = next;
      index += 1;
    } else {
      flags[key] = true;
    }
  }

  return { positional, flags };
}

async function request(path: string, options: RequestInit = {}): Promise<unknown> {
  const response = await fetch(`${baseUrl}${path}`, {
    headers: { "content-type": "application/json" },
    ...options,
  });

  const contentType = response.headers.get("content-type") ?? "";
  const body = contentType.includes("application/json")
    ? (await response.json()) as unknown
    : await response.text();

  if (!response.ok) {
    const errorPayload = body as ApiErrorPayload | string;
    throw new Error(
      typeof errorPayload === "string"
        ? errorPayload
        : JSON.stringify(errorPayload.detail ?? errorPayload, null, 2),
    );
  }

  return body;
}

async function main(): Promise<void> {
  const [command, ...rest] = process.argv.slice(2);
  if (!command || command === "--help" || command === "-h") {
    usage();
    process.exitCode = 0;
    return;
  }

  const { positional, flags } = parseArgs(rest);

  try {
    if (command === "health") {
      const data = await request("/health");
      console.log(JSON.stringify(data, null, 2));
      return;
    }

    if (command === "add") {
      const text = positional.join(" ");
      if (!text) {
        throw new Error('Missing text. Example: wisdom add "remember X"');
      }

      const metadata = flags.metadata ? JSON.parse(String(flags.metadata)) : {};
      const tags = flags.tags ? String(flags.tags).split(",").filter(Boolean) : [];

      const payload = {
        text,
        scope: flags.scope ?? "project",
        user_id: flags["user-id"] ?? undefined,
        agent_id: flags["agent-id"] ?? undefined,
        session_id: flags["session-id"] ?? undefined,
        project_id: flags["project-id"] ?? undefined,
        workspace_id: flags["workspace-id"] ?? undefined,
        tags,
        metadata,
      };

      const data = await request("/v1/memory", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      console.log(JSON.stringify(data, null, 2));
      return;
    }

    if (command === "search") {
      const query = positional.join(" ");
      if (!query) {
        throw new Error('Missing query. Example: wisdom search "project rules"');
      }

      const data = await request("/v1/search", {
        method: "POST",
        body: JSON.stringify({
          query,
          scope: flags.scope ?? undefined,
          top_k: flags["top-k"] ? Number(flags["top-k"]) : 5,
        }),
      });
      console.log(JSON.stringify(data, null, 2));
      return;
    }

    throw new Error(`Unknown command: ${command}`);
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}

void main();

