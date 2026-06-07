import { AiProvider, WH_PER_PROMPT } from "@/types/calculations";

export function calculateCO2Emissions(token_count: number, ai_provider: AiProvider, grid_co2_per_kWh_density?: number,): number {

  const globalAvgCo2Density = 300;
  const gridCo2Density = grid_co2_per_kWh_density ?? globalAvgCo2Density;
  const wHperPrompt = WH_PER_PROMPT[ai_provider];
  const tokensPerPrompt = 200;
  const wHperToken = wHperPrompt / tokensPerPrompt;
  const totalWh = token_count * wHperToken;
  const totalKWH = totalWh / 1000;
  
  return totalKWH * gridCo2Density;
}
