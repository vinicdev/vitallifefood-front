import axios from "axios";
import {
  LoginCredentials,
  RegisterData,
  AuthResponse,
  AddressData,
  CepResponse,
  UserProfile,
  ApiResponse,
} from "../types/api";
import { secureTokenService } from "./secureTokenService";

// Serviço seguro para gerenciamento de tokens
export const tokenService = {
  // Salvar tokens de forma segura
  setTokens: (authData: AuthResponse) => {
    try {
      console.log("tokenService.setTokens chamado com:", {
        hasToken: !!authData.token,
        hasRefreshToken: !!authData.refreshToken,
        expiresIn: authData.expiresIn,
        hasUser: !!authData.user,
      });

      // Salvar access token como cookie seguro
      secureTokenService.setAccessToken(
        authData.token,
        authData.expiresIn || 3600
      );

      // Salvar refresh token como cookie seguro se existir
      if (authData.refreshToken) {
        secureTokenService.setRefreshToken(
          authData.refreshToken,
          authData.expiresIn || 3600
        );
      }

      // Salvar dados do usuário no localStorage (não sensíveis)
      if (authData.user) {
        secureTokenService.setUser(authData.user);
      }

      console.log("Tokens salvos com sucesso");
    } catch (error) {
      console.error("Erro ao salvar tokens:", error);
    }
  },

  // Obter access token
  getAccessToken: (): string | null => {
    const token = secureTokenService.getAccessToken();
    console.log("tokenService.getAccessToken:", !!token);
    return token;
  },

  // Obter refresh token
  getRefreshToken: (): string | null => {
    const token = secureTokenService.getRefreshToken();
    console.log("tokenService.getRefreshToken:", !!token);
    return token;
  },

  // Verificar se o token está expirado
  isTokenExpired: (): boolean => {
    const expired = secureTokenService.isTokenExpired();
    console.log("tokenService.isTokenExpired:", expired);
    return expired;
  },

  // Verificar se o usuário está autenticado
  isAuthenticated: (): boolean => {
    const isAuth = secureTokenService.isAuthenticated();
    console.log("tokenService.isAuthenticated:", isAuth);
    return isAuth;
  },

  // Limpar todos os tokens
  clearTokens: () => {
    console.log("tokenService.clearTokens chamado");
    secureTokenService.clearTokens();
  },

  // Obter dados do usuário
  getUser: () => {
    const user = secureTokenService.getUser();
    console.log("tokenService.getUser:", user);
    return user;
  },
};

// Configuração base do axios
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3004/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = tokenService.getAccessToken();
    if (token && !tokenService.isTokenExpired()) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirecionar para login se não autorizado
      tokenService.clearTokens();
      window.location.href = "/auth/client";
    }
    return Promise.reject(error);
  }
);

// Serviços específicos
export const cepService = {
  searchCep: async (cep: string): Promise<CepResponse> => {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return response.data;
  },
};

export const authService = {
  login: async (
    credentials: LoginCredentials
  ): Promise<ApiResponse<AuthResponse>> => {
    try {
      const response = await api.post("/auth/login", credentials);

      console.log("Resposta da API:", response.data);
      console.log("Status da resposta:", response.status);

      // Verificar se a resposta tem a estrutura esperada
      if (response.data && response.data.token) {
        // Se a API retorna diretamente o token (sem wrapper)
        if (!response.data.user) {
          console.error(
            "Resposta da API não contém dados do usuário:",
            response.data
          );
          return {
            success: false,
            message: "Resposta da API inválida: dados do usuário ausentes",
            data: {} as AuthResponse,
          };
        }

        const authData = {
          token: response.data.token,
          refreshToken: response.data.refreshToken,
          expiresIn: response.data.expiresIn,
          user: response.data.user,
        };

        console.log("Dados de autenticação processados:", authData);
        tokenService.setTokens(authData);

        return {
          success: true,
          data: authData,
          message: "Login realizado com sucesso",
        };
      } else if (response.data.success && response.data.data) {
        // Se a API retorna com wrapper padrão
        console.log("Dados de autenticação (wrapper):", response.data.data);
        tokenService.setTokens(response.data.data);
        return response.data;
      } else {
        console.error("Estrutura de resposta inesperada:", response.data);
        return {
          success: false,
          message: "Formato de resposta inválido",
          data: {} as AuthResponse,
        };
      }
    } catch (error: unknown) {
      console.error("Erro no login:", error);
      if (error && typeof error === "object" && "response" in error) {
        console.error("Resposta de erro:", (error as any).response?.data);
      }
      throw error;
    }
  },

  register: async (
    userData: RegisterData
  ): Promise<ApiResponse<AuthResponse>> => {
    try {
      const response = await api.post("/auth/register", userData);

      console.log("Resposta do registro:", response.data);

      // Verificar se a resposta tem a estrutura esperada
      if (response.data && response.data.token) {
        if (!response.data.user) {
          console.error(
            "Resposta da API não contém dados do usuário:",
            response.data
          );
          return {
            success: false,
            message: "Resposta da API inválida: dados do usuário ausentes",
            data: {} as AuthResponse,
          };
        }

        const authData = {
          token: response.data.token,
          refreshToken: response.data.refreshToken,
          expiresIn: response.data.expiresIn,
          user: response.data.user,
        };

        tokenService.setTokens(authData);

        return {
          success: true,
          data: authData,
          message: "Registro realizado com sucesso",
        };
      } else if (response.data.success && response.data.data) {
        tokenService.setTokens(response.data.data);
        return response.data;
      } else {
        return {
          success: false,
          message: "Formato de resposta inválido",
          data: {} as AuthResponse,
        };
      }
    } catch (error: unknown) {
      console.error("Erro no registro:", error);
      throw error;
    }
  },

  logout: () => {
    tokenService.clearTokens();
  },

  // Método para renovar token (se necessário)
  refreshToken: async (): Promise<ApiResponse<AuthResponse>> => {
    const refreshToken = tokenService.getRefreshToken();
    if (!refreshToken) {
      throw new Error("Refresh token não encontrado");
    }

    const response = await api.post("/auth/refresh", { refreshToken });

    // Salvar novos tokens
    if (response.data.success && response.data.data) {
      tokenService.setTokens(response.data.data);
    }

    return response.data;
  },
};

export const userService = {
  getProfile: async (): Promise<ApiResponse<UserProfile>> => {
    const response = await api.get("/user/profile");
    return response.data;
  },

  updateProfile: async (
    userData: Partial<UserProfile>
  ): Promise<ApiResponse<UserProfile>> => {
    const response = await api.put("/user/profile", userData);
    return response.data;
  },
};

export const addressService = {
  createAddress: async (
    addressData: AddressData
  ): Promise<ApiResponse<AddressData>> => {
    const response = await api.post("/address", addressData);
    return response.data;
  },

  getUserAddresses: async (): Promise<ApiResponse<AddressData[]>> => {
    const response = await api.get("/address");
    return response.data;
  },

  updateAddress: async (
    id: string,
    addressData: Partial<AddressData>
  ): Promise<ApiResponse<AddressData>> => {
    const response = await api.put(`/address/${id}`, addressData);
    return response.data;
  },

  deleteAddress: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/address/${id}`);
    return response.data;
  },
};

export default api;
