import api from "@/lib/api/api";
import { supabase } from "@/lib/supabaseClient";
import { GoogleSync, LoginByEmail } from "../services/auth";
import { toast } from "sonner";
import { LoginInput } from "../schema/auth.schema";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const router = useRouter();

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/callback`,
      },
    });
    if (error) throw error;
    return data;
  };

  const signOutGoogle = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    window.location.reload();
  };
  const LoginGoogleSync = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const response = await GoogleSync(user);
      if (!response) return;
      return response;
    } catch (e: any) {
      toast.error(JSON.parse(e.message).message);
    }
  };

  // Auth Email
  const EmailLogin = async (data: LoginInput) => {
    try {
      const response = await LoginByEmail(data);
      localStorage.setItem("token", response.token);
      toast.success("Login Success");
      router.push("/dashboard");
    } catch (e: any) {
      toast.error(JSON.parse(e.message).message);
    }
  };

  return { signInWithGoogle, signOutGoogle, LoginGoogleSync, EmailLogin };
};
