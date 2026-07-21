import  *  as z from "zod"

const ProviderEnum = z.enum(["google", "open_ai", "anthropic"]);

type ProviderEnum = z.infer<typeof ProviderEnum>;

export const UserCredentials = z.object({
  email: z.email(),
  password: z.string().min(10).max(100)
});

export const V1RequestBody = z.object({
  token_count: z.number().int().positive(),
  ai_provider: ProviderEnum,
  grid_g_co2_per_kWh_intensity: z.number().positive().optional(),
});

