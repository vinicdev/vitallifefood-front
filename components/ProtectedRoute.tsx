"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  fallback?: React.ReactNode;
}

export default function ProtectedRoute({
  children,
  redirectTo = "/auth/admin",
  fallback = <div>Carregando...</div>,
}: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      console.log("ProtectedRoute - Usuário não autenticado, redirecionando");
      router.push(redirectTo);
    }
  }, [isAuthenticated, loading, router, redirectTo]);

  // Mostrar loading enquanto verifica autenticação
  if (loading) {
    return <>{fallback}</>;
  }

  // Se não estiver autenticado, não renderizar nada (será redirecionado)
  if (!isAuthenticated) {
    return null;
  }

  // Se estiver autenticado, renderizar o conteúdo
  return <>{children}</>;
}
