import { create } from "zustand";
import { UserResponse } from "../schema/auth.schema";

interface AuthState {
  accessToken: string | null;
  user: UserResponse | null;
  setAccessToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  setAccessToken: (token) => set({ accessToken: token }),
  logout: () => set({ accessToken: null, user: null }),
}));
