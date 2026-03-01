"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AuthCallbackPage() {
  const { LoginGoogleSync } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const hash = window.location.hash;
        if (!hash) return;

        const params = new URLSearchParams(hash.substring(1));
        const access_token = params.get("access_token");
        const refresh_token = params.get("refresh_token");

        if (access_token && refresh_token) {
          const { error: sessionError } = await supabase.auth.setSession({
            access_token,
            refresh_token,
          });

          if (sessionError) throw sessionError;

          await LoginGoogleSync();

          // router.replace("/");
        }
      } catch (err: any) {
        console.error("Auth error:", err);
        setError("Login failed please try again...");
        toast.error("Login failed please try again...")
      }
    };

    handleAuth();
  }, [LoginGoogleSync, router]);

  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-pulse">Loggin in...</div>
    </div>
  );
}