import  *  as z from "zod"

export const UserCredentials = z.object({
  email: z.string().email(),
  password: z.string().min(10).max(100)
});