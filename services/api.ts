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

// Configuração base do axios
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
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
      localStorage.removeItem("token");
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
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },

  register: async (
    userData: RegisterData
  ): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post("/auth/register", userData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
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
