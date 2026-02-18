import wretch from "wretch";
import { supabase } from "../supabaseClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

const getSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token;
}
const api = wretch(API_URL)
    .options({
        credentials: "include",
    })
    .auth(`Bearer ${await getSession() ?? ""}`);

export default api;
