"use client";

import CardForm from "@/components/cardForm";
import AuthRoute from "@/components/AuthRoute";
import { useAuth } from "@/hooks/useAuth";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Admin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { login, logout, isAuthenticated } = useAuth();

  const handleLogin = async (credentials: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    setError("");

    try {
      console.log("Tentando login admin com:", credentials);
      const result = await login(credentials);

      console.log("Resultado do login:", result);

      if (result.success) {
        console.log("Login admin realizado com sucesso!");
        // Redirecionar para dashboard admin
        router.push("/admin/dashboard");
      } else {
        console.error("Login admin falhou:", result.message);
        setError(result.message || "Erro no login");
      }
    } catch (error: unknown) {
      console.error("Erro no login admin:", error);
      setError("Erro interno do servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    console.log("Logout admin realizado");
    router.push("/auth/admin");
  };

  return (
    <AuthRoute>
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 pt-4 pb-4">
        <CardForm
          buttonText={loading ? "Entrando..." : "Entrar"}
          isRegister={false}
          onSubmit={handleLogin}
        />

        {error && <div className="text-red-500 text-center mt-4">{error}</div>}

        {/* Botão de logout para teste */}
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout Admin
          </button>
        )}
      </div>
    </AuthRoute>
  );
}
