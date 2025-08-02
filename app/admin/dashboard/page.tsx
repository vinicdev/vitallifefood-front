"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";
import React from "react";

export default function AdminDashboard() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">
                Dashboard Administrativo
              </h1>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card de informações do usuário */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-blue-900 mb-4">
                  Informações do Usuário
                </h2>
                <div className="space-y-2">
                  <p>
                    <strong>Email:</strong> {user?.email}
                  </p>
                  <p>
                    <strong>ID:</strong> {user?.id}
                  </p>
                  <p>
                    <strong>Nome:</strong> {user?.name || "Não informado"}
                  </p>
                </div>
              </div>

              {/* Card de estatísticas */}
              <div className="bg-green-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-green-900 mb-4">
                  Estatísticas
                </h2>
                <div className="space-y-2">
                  <p>
                    <strong>Pedidos:</strong> 0
                  </p>
                  <p>
                    <strong>Usuários:</strong> 0
                  </p>
                  <p>
                    <strong>Produtos:</strong> 0
                  </p>
                </div>
              </div>

              {/* Card de ações rápidas */}
              <div className="bg-purple-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-purple-900 mb-4">
                  Ações Rápidas
                </h2>
                <div className="space-y-2">
                  <button className="w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
                    Novo Produto
                  </button>
                  <button className="w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
                    Ver Pedidos
                  </button>
                  <button className="w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
                    Configurações
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Bem-vindo ao Painel Administrativo!
              </h2>
              <p className="text-gray-600">
                Esta é uma página protegida que só pode ser acessada após o
                login. O middleware e o componente ProtectedRoute garantem que
                apenas usuários autenticados possam ver este conteúdo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
