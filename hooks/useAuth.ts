import { useState, useEffect } from "react";
import { authService, tokenService } from "@/services/api";
import { LoginCredentials, RegisterData, AuthResponse } from "@/types/api";

export const useAuth = () => {
  const [user, setUser] = useState<AuthResponse["user"] | null>(null);
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
    } catch (error: unknown) {
      console.error("Erro no login (catch):", error);

      let errorMessage = "Erro no login";
      if (error && typeof error === "object") {
        const errorObj = error as any;
        console.error("Detalhes do erro:", {
          message: errorObj.message,
          response: errorObj.response?.data,
          status: errorObj.response?.status,
        });

        errorMessage =
          errorObj.response?.data?.message ||
          errorObj.message ||
          "Erro no login";
      }

      return {
        success: false,
        message: errorMessage,
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
    } catch (error: unknown) {
      let errorMessage = "Erro no registro";
      if (error && typeof error === "object") {
        const errorObj = error as any;
        errorMessage = errorObj.response?.data?.message || "Erro no registro";
      }

      return {
        success: false,
        message: errorMessage,
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
    } catch (error: unknown) {
      logout(); // Se não conseguir renovar, fazer logout

      let errorMessage = "Erro ao renovar token";
      if (error && typeof error === "object") {
        const errorObj = error as any;
        errorMessage =
          errorObj.response?.data?.message || "Erro ao renovar token";
      }

      return {
        success: false,
        message: errorMessage,
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
