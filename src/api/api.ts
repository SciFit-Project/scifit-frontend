import wretch from "wretch";
import { supabase } from "../config/db/supabaseClient";
import { useAuthStore } from "@/features/auth/store/use-auth-store";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export const getSession = async () => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const token = useAuthStore.getState().accessToken;

    return session?.access_token || token || null;
  } catch (error) {
    return null;
  }
};

const authMiddleware =
  () =>
  (next: (url: string, opts: any) => any) =>
  async (url: string, opts: any) => {

    const token = await getSession();
    
    const updatedOpts = {
      ...opts,
      headers: {
        ...opts.headers,
        Authorization: token ? `Bearer ${token}` : "",
      },
    };

    return next(url, updatedOpts);
  };

const api = wretch(API_URL).middlewares([authMiddleware()]).options({
  mode: "cors",
  credentials: "include",
});

export default api;
