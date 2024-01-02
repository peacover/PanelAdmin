// import { createClient } from "@supabase/supabase-js";

export const cookieName: string = process.env.COOKIE_NAME || "acc";
export const jwtSecret = process.env.JWT_SECRET || "secret";
export const SUP_URL = process.env.SUPABASE_PROJECT_URL as string;
export const SUP_KEY = process.env.SUPABASE_API_KEY as string;
// export const supabase = createClient(SUP_URL, SUP_KEY);