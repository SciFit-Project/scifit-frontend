import api from "@/lib/api/api";
import { LoginInput, SignupInput } from "../schema/auth.schema";

export const GoogleSync = async (user: any) => {
  const response = await api
    .url("/api/auth/google-sync")
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
