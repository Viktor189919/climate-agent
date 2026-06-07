export enum AiProvider {
  GOOGLE = "google",
  OPEN_AI = "open_ai",
  ANTHROPIC = "anthropic"
}

export const WH_PER_PROMPT: Record<AiProvider, number> = {
  [AiProvider.GOOGLE]: 0.24,
  [AiProvider.OPEN_AI]: 0.34,
  [AiProvider.ANTHROPIC]: 0.35,
};

export function isAiProvider(value: string): value is AiProvider {
  return Object.values(AiProvider).includes(value as AiProvider);
}
