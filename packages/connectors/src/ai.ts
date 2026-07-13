/**
 * IA — assistant de rédaction interne (abstraction Anthropic | OpenAI).
 * Rôle : générer les contenus de DULEME Content OS (article, newsletter,
 * versions LinkedIn / Instagram, brief visuel).
 *
 * Piloté par AI_PROVIDER ("anthropic" par défaut) + la clé correspondante.
 * Dégradable : sans clé, `isAiConfigured()` = false et `generateText` lève
 * NotConfiguredError (l'app gère le repli).
 */
import { httpJson, NotConfiguredError, ConnectorError } from "./http";

type Provider = "anthropic" | "openai";

function provider(): Provider {
  return (process.env.AI_PROVIDER as Provider) || "anthropic";
}

export function isAiConfigured(): boolean {
  return provider() === "openai"
    ? Boolean(process.env.OPENAI_API_KEY)
    : Boolean(process.env.ANTHROPIC_API_KEY);
}

export function aiProviderLabel(): string {
  if (provider() === "openai") return "OpenAI (ChatGPT)";
  return "Anthropic (Claude)";
}

export async function generateText(input: {
  system?: string;
  prompt: string;
  maxTokens?: number;
}): Promise<string> {
  const maxTokens = input.maxTokens ?? 1500;
  if (provider() === "openai") {
    const key = process.env.OPENAI_API_KEY;
    if (!key) throw new NotConfiguredError("ai");
    const res = await httpJson<{ choices: { message: { content: string } }[] }>(
      "ai",
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        timeoutMs: 60000,
        headers: {
          authorization: `Bearer ${key}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: process.env.AI_MODEL || "gpt-4o",
          max_tokens: maxTokens,
          messages: [
            ...(input.system ? [{ role: "system", content: input.system }] : []),
            { role: "user", content: input.prompt },
          ],
        }),
      },
    );
    return res.choices?.[0]?.message?.content?.trim() ?? "";
  }

  // Anthropic (défaut)
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) throw new NotConfiguredError("ai");
  const res = await httpJson<{ content: { type: string; text: string }[] }>(
    "ai",
    "https://api.anthropic.com/v1/messages",
    {
      method: "POST",
      timeoutMs: 60000,
      headers: {
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.AI_MODEL || "claude-sonnet-5",
        max_tokens: maxTokens,
        ...(input.system ? { system: input.system } : {}),
        messages: [{ role: "user", content: input.prompt }],
      }),
    },
  );
  const text = res.content?.find((c) => c.type === "text")?.text;
  if (!text) throw new ConnectorError("ai", "réponse vide");
  return text.trim();
}

export async function aiHealthCheck(): Promise<{ ok: boolean; detail: string }> {
  if (!isAiConfigured())
    return { ok: false, detail: `${aiProviderLabel()} — clé absente` };
  try {
    const out = await generateText({ prompt: "Réponds uniquement: OK", maxTokens: 10 });
    return { ok: true, detail: `${aiProviderLabel()} — ${out.slice(0, 20)}` };
  } catch (e) {
    return { ok: false, detail: e instanceof Error ? e.message : "Erreur" };
  }
}
