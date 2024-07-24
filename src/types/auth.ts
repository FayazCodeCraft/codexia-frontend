import { LoginSchema, SignupSchema } from "@/schemas/auth";
import type { z } from "zod";

export type Login = z.infer<typeof LoginSchema>;
export type SignUp = z.infer<typeof SignupSchema>;
