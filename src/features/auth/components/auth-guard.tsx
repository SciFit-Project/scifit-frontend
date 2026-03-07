"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "../../../api/api";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      const token = localStorage.getItem("token");
      const supaToken = await getSession();
      if (token || supaToken) {
        setIsAuthenticated(true);
      } else {
        router.replace("/login");
      }
    };
    fetchToken();
  }, [router]);

  if (!isAuthenticated) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}
