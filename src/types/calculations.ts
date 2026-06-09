import { EAiProvider } from "./v1";

export const WH_PER_PROMPT: Record<EAiProvider, number> = {
  [EAiProvider.GOOGLE]: 0.24,
  [EAiProvider.OPEN_AI]: 0.34,
  [EAiProvider.ANTHROPIC]: 0.35,
};