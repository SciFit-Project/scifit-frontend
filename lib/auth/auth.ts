import api from "../api/api";
import { supabase } from "../supabaseClient";

export const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/callback`,
        },
    });

    if (error) throw error;
    return data;
}

export const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    window.location.reload();
}

export const getSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
}

export const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    return {
        id: user?.id,
        email: user?.email,
        avatar: user?.user_metadata.avatar_url,
        name: user?.user_metadata.full_name,
    };
}

export const GoogleSync = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    const res = await api.url("/api/auth/google-sync").post({
        id: user?.id,
        email: user?.email,
        avatar: user?.user_metadata.avatar_url,
        fullname: user?.user_metadata.full_name,
    }).json();
    
    if(!res) return
    return res;
}