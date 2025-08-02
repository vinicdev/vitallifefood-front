// Serviço seguro para gerenciamento de tokens usando cookies
export const secureTokenService = {
  // Salvar access token como cookie seguro
  setAccessToken: (token: string, expiresIn: number) => {
    const expiresAt = new Date(Date.now() + expiresIn * 1000);
    const cookieString = `accessToken=${token}; expires=${expiresAt.toUTCString()}; path=/; secure; samesite=strict`;

    console.log("Criando cookie accessToken:", {
      token: token.substring(0, 20) + "...",
      expiresAt: expiresAt.toUTCString(),
      cookieString: cookieString.substring(0, 50) + "...",
    });

    document.cookie = cookieString;

    // Verificar se o cookie foi criado
    setTimeout(() => {
      const savedToken = secureTokenService.getAccessToken();
      console.log("Cookie accessToken criado:", !!savedToken);
    }, 100);
  },

  // Salvar refresh token como cookie seguro
  setRefreshToken: (token: string, expiresIn: number) => {
    const expiresAt = new Date(Date.now() + expiresIn * 1000);
    const cookieString = `refreshToken=${token}; expires=${expiresAt.toUTCString()}; path=/; secure; samesite=strict`;

    console.log("Criando cookie refreshToken:", {
      token: token.substring(0, 20) + "...",
      expiresAt: expiresAt.toUTCString(),
    });

    document.cookie = cookieString;

    // Verificar se o cookie foi criado
    setTimeout(() => {
      const savedToken = secureTokenService.getRefreshToken();
      console.log("Cookie refreshToken criado:", !!savedToken);
    }, 100);
  },

  // Obter access token do cookie
  getAccessToken: (): string | null => {
    const cookies = document.cookie.split(";");
    const accessTokenCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("accessToken=")
    );

    if (accessTokenCookie) {
      const token = accessTokenCookie.split("=")[1];
      console.log("Access token encontrado:", token.substring(0, 20) + "...");
      return token;
    }

    console.log("Access token não encontrado");
    return null;
  },

  // Obter refresh token do cookie
  getRefreshToken: (): string | null => {
    const cookies = document.cookie.split(";");
    const refreshTokenCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("refreshToken=")
    );

    if (refreshTokenCookie) {
      const token = refreshTokenCookie.split("=")[1];
      console.log("Refresh token encontrado:", token.substring(0, 20) + "...");
      return token;
    }

    console.log("Refresh token não encontrado");
    return null;
  },

  // Verificar se o token está expirado (baseado no nome do cookie)
  isTokenExpired: (): boolean => {
    const cookies = document.cookie.split(";");
    const accessTokenCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("accessToken=")
    );

    const isExpired = !accessTokenCookie;
    console.log("Token expirado:", isExpired);
    return isExpired;
  },

  // Limpar todos os tokens
  clearTokens: () => {
    console.log("Limpando todos os cookies");
    // Limpar cookies
    document.cookie =
      "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Limpar dados do usuário do localStorage
    localStorage.removeItem("user");
    console.log("Cookies limpos");
  },

  // Salvar dados do usuário no localStorage (não sensíveis)
  setUser: (user: any) => {
    console.log("Salvando dados do usuário:", user);
    localStorage.setItem("user", JSON.stringify(user));
  },

  // Obter dados do usuário
  getUser: () => {
    try {
      const user = localStorage.getItem("user");
      const parsedUser = user ? JSON.parse(user) : null;
      console.log("Dados do usuário obtidos:", parsedUser);
      return parsedUser;
    } catch (error) {
      console.error("Erro ao obter dados do usuário:", error);
      return null;
    }
  },

  // Verificar se está autenticado
  isAuthenticated: (): boolean => {
    const token = secureTokenService.getAccessToken();
    const isAuth = !!token && !secureTokenService.isTokenExpired();
    console.log("Usuário autenticado:", isAuth);
    return isAuth;
  },
};
