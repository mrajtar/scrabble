'use client'
import { useAuth } from "@/app/lib/AuthContext";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function ProtectedLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/user/singin?returnUrl=${pathname}`);
    }
  }, [user, loading, pathname, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return <>{children}</>;
}
