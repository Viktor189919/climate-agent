export enum EAiProvider {
  GOOGLE = "google",
  OPEN_AI = "open_ai",
  ANTHROPIC = "anthropic"
}

export const EXPECTED_V1_FORMAT = {
  token_count: {type: "int", minimum: 0},
  ai_provider: Object.values(EAiProvider).join(" | "),
  grid_g_co2_per_kWh_density: {type: "number", minimum: 0},
} as const;
