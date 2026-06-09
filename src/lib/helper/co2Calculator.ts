import { WH_PER_PROMPT } from "@/types/calculations";
import { EAiProvider } from "@/types/v1"

export function calculateCO2Emissions(token_count: number, ai_provider: EAiProvider, grid_g_co2_per_kWh_density?: number): number {

  const globalAvgCo2Density = 300;
  const gridCo2Density = grid_g_co2_per_kWh_density ?? globalAvgCo2Density;
  const wHperPrompt = WH_PER_PROMPT[ai_provider];
  const tokensPerPrompt = 200;
  const wHperToken = wHperPrompt / tokensPerPrompt;
  const totalWh = token_count * wHperToken;
  const totalKWH = totalWh / 1000;

  return totalKWH * gridCo2Density;
}
