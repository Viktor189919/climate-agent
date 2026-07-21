import { EAiProvider } from "./v1";

export const WH_PER_PROMPT: Record<EAiProvider, number> = {
  [EAiProvider.GOOGLE]: 0.24,
  [EAiProvider.OPEN_AI]: 0.34,
  [EAiProvider.ANTHROPIC]: 0.35,
};

export const EU_US_AVG_CO2_INTENSITY = 300;
export const AVG_KWH_CHARGE_SMARTPHONE = 0.020;