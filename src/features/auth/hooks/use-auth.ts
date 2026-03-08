"use client";
import { SignupInput, UserResponse } from "./../schema/auth.schema";
import { supabase } from "@/config/db/supabaseClient";
import {
  GetUserProfile,
  GoogleSyncLogin,
  GoogleSyncRegister,
  LoginByEmail,
  SignupByEmail,
  UserLogout,
} from "../services/auth";
import { toast } from "sonner";
import { LoginInput } from "../schema/auth.schema";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../store/use-auth-store";

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setAccessToken, logout } = useAuthStore();

  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/callback?type=login`,
      },
    });
    if (error) throw error;
    return data;
  };

  const registerWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/callback?type=register`,
      },
    });
    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      logout();
      queryClient.clear();
      const response = await UserLogout();
      if (!response) return toast.success("Logout failed");
      window.location.reload();
    } catch (error: any) {
      toast.error(error.message || "Logout failed");
    }
  };

  const LoginGoogleSync = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const response = await GoogleSyncLogin(user);
      if (!response) return;
      return response;
    } catch (e: any) {
      toast.error(JSON.parse(e.message).message);
    }
  };

  const RegisterGoogleSync = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const response = await GoogleSyncRegister(user);
      if (!response) return;
      return response;
    } catch (e: any) {
      toast.error(JSON.parse(e.message).message);
    }
  };

  const EmailLogin = async (data: LoginInput) => {
    try {
      const { accessToken } = await LoginByEmail(data);

      setAccessToken(accessToken);

      toast.success("Login success");
      router.push("/dashboard");
    } catch (e: any) {
      toast.error(JSON.parse(e.message).message);
    }
  };

  const EmailSignUp = async (data: SignupInput) => {
    try {
      await SignupByEmail(data);
      toast.success("Sign up success. Please login.");
      router.push("/login");
    } catch (e: any) {
      toast.error(JSON.parse(e.message).message);
    }
  };

  const UserProfile = useQuery<UserResponse>({
    queryKey: ["me"],
    queryFn: GetUserProfile,
    staleTime: 1000 * 60 * 10,
    retry: false,
  });

  return {
    signInWithGoogle,
    signOut,
    LoginGoogleSync,
    EmailLogin,
    EmailSignUp,
    registerWithGoogle,
    RegisterGoogleSync,
    UserProfile,
  };
};
