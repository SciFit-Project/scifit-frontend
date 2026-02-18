"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { createUser } from "@/lib/auth/auth";

export default function Page() {
  useEffect(() => {
    const hash = window.location.hash;

    if (!hash) return;

    const params = new URLSearchParams(hash.substring(1));

    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");

    if (access_token && refresh_token) {
      supabase.auth.setSession({
        access_token,
        refresh_token,
      }).then(() => {
        //  Save to database
        const saveUser = async () => {
          await createUser();
        }
        saveUser();
        window.location.href = "/home";
      });
    }
  }, []);

  return <div>Logging in...</div>;
}
