import { WH_PER_PROMPT } from "@/types/calculations";
import { EAiProvider } from "@/types/v1"

export function calculateCO2Emissions(token_count: number, ai_provider: EAiProvider, grid_g_co2_per_kWh_intensity?: number): number {

  const globalAvgCo2intensity = 300;
  const gridCo2intensity = grid_g_co2_per_kWh_intensity ?? globalAvgCo2intensity;
  const wHperPrompt = WH_PER_PROMPT[ai_provider];
  const tokensPerPrompt = 200;
  const wHperToken = wHperPrompt / tokensPerPrompt;
  const totalWh = token_count * wHperToken;
  const totalKWH = totalWh / 1000;

  return totalKWH * gridCo2intensity;
}
