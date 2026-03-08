import wretch from "wretch";
import { supabase } from "../config/db/supabaseClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export const getSession = async () => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const token = localStorage.getItem("token")
    return session?.access_token || token || null;
  } catch (error) {
    return null;
  }
};

const api = wretch(API_URL)
  .options({
    credentials: "include",
  })
  .auth(`Bearer ${(await getSession()) ?? ""}`);

export default api;
