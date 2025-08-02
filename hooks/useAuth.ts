import { useState, useEffect } from "react";
import { authService, tokenService } from "@/services/api";
import { LoginCredentials, RegisterData, AuthResponse } from "@/types/api";

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar autenticação ao carregar o hook
    checkAuth();
  }, []);

  const checkAuth = () => {
    const isAuth = tokenService.isAuthenticated();
    const userData = tokenService.getUser();

    setIsAuthenticated(isAuth);
    setUser(userData);
    setLoading(false);
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      console.log("Tentando fazer login com:", credentials);
      const response = await authService.login(credentials);

      console.log("Resposta do authService:", response);

      if (response.success) {
        checkAuth(); // Atualizar estado após login
        console.log("Login bem-sucedido, estado atualizado");
        return { success: true, data: response.data };
      } else {
        console.error("Login falhou:", response.message);
        return { success: false, message: response.message };
      }
    } catch (error: any) {
      console.error("Erro no login (catch):", error);
      console.error("Detalhes do erro:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });

      return {
        success: false,
        message:
          error.response?.data?.message || error.message || "Erro no login",
      };
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      const response = await authService.register(userData);

      if (response.success) {
        checkAuth(); // Atualizar estado após registro
        return { success: true, data: response.data };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Erro no registro",
      };
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const refreshToken = async () => {
    try {
      const response = await authService.refreshToken();

      if (response.success) {
        checkAuth(); // Atualizar estado após refresh
        return { success: true, data: response.data };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error: any) {
      logout(); // Se não conseguir renovar, fazer logout
      return {
        success: false,
        message: error.response?.data?.message || "Erro ao renovar token",
      };
    }
  };

  return {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    refreshToken,
    checkAuth,
  };
};
