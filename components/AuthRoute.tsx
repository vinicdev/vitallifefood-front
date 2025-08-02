"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AuthRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  fallback?: React.ReactNode;
}

export default function AuthRoute({
  children,
  redirectTo = "/admin/dashboard",
  fallback = <div>Carregando...</div>,
}: AuthRouteProps) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      console.log("AuthRoute - Usuário já autenticado, redirecionando");
      router.push(redirectTo);
    }
  }, [isAuthenticated, loading, router, redirectTo]);

  // Mostrar loading enquanto verifica autenticação
  if (loading) {
    return <>{fallback}</>;
  }

  // Se estiver autenticado, não renderizar nada (será redirecionado)
  if (isAuthenticated) {
    return null;
  }

  // Se não estiver autenticado, renderizar o conteúdo (página de login)
  return <>{children}</>;
}
