"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "../../../api/api";
import { useAuthStore } from "../store/use-auth-store";
import { RefreshToken } from "../services/auth";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { accessToken, setAccessToken } = useAuthStore();

  useEffect(() => {
    const fetchToken = async () => {
      const supaToken = await getSession();

      if (accessToken || supaToken) {
        setIsAuthenticated(true);
        setIsLoading(false);
        return;
      }

      try {
        const response = await RefreshToken();
        if (setAccessToken && response.accessToken) {
          setAccessToken(response.accessToken);
          setIsLoading(false);
          setIsAuthenticated(true);
        } else {
          throw new Error("Refresh failed");
        }
      } catch (error) {
        router.replace("/login");
      } finally {
        setIsLoading(false);
      }
    };
    fetchToken();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  if (!isAuthenticated) return null;

  return <>{children}</>;
}
