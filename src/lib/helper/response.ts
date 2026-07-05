import type { ZodSafeParseError } from "zod"
import { EXPECTED_V1_FORMAT } from "@/types/v1"
 
export function unauthorizedV1Res() {
  return {message: {message: "Unauthorized"}, status: {status: 401}}
}

export function serverErrorRes() {
  return {message: {message: "Internal server error"}, status: {status: 500}}
}

export function transformZodErrors(validation: ZodSafeParseError<{
    token_count: number;
    ai_provider: "google" | "open_ai" | "anthropic";
    grid_g_co2_per_kWh_density?: number | undefined;
}>, receivedData: any) {

  const errors = validation.error.issues.map((i) => {
    const field = i.path[0] as keyof typeof EXPECTED_V1_FORMAT;
    const expected = EXPECTED_V1_FORMAT[field] ?? "unknown format";

    const error: any = {
      field: i.path[0], 
      code: i.code, 
      received: {
        type: typeof receivedData[i.path[0]],
        value: receivedData[i.path[0]]
      },
      expected: expected
    }

    return error;
  })
      
  return errors;
}