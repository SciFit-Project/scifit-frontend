import api from "@/api/api";
import { LoginInput, SignupInput } from "../schema/auth.schema";

export const GoogleSyncLogin = async (user: any) => {
  const response = await api
    .url("/api/auth/google-sync-login")
    .post({
      id: user?.id,
      email: user?.email,
      avatar: user?.user_metadata.avatar_url,
      fullname: user?.user_metadata.full_name,
    })
    .json();

  return response;
};

export const GoogleSyncRegister = async (user: any) => {
  const response = await api
    .url("/api/auth/google-sync-register")
    .post({
      id: user?.id,
      email: user?.email,
      avatar: user?.user_metadata.avatar_url,
      fullname: user?.user_metadata.full_name,
    })
    .json();

  return response;
};

export const LoginByEmail = async (data: LoginInput) => {
  const response = await api.url("/api/auth/login").post(data).json<any>();
  return response;
};
export const SignupByEmail = async (data: SignupInput) => {
  const response = await api
    .url("/api/auth/signup")
    .post({
      email: data.email,
      fullname: data.fullname,
      password: data.password,
    })
    .json<any>();
  return response;
};
