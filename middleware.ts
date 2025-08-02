import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rotas que precisam de autenticação
const protectedRoutes = [
  "/admin/",
  "/dashboard",
  "/profile",
  "/orders",
  "/settings",
];

// Rotas de autenticação (não devem ser acessadas se já estiver logado)
const authRoutes = ["/auth/admin", "/auth/register", "/auth/login"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Verificar se é uma rota protegida
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Verificar se é uma rota de autenticação
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Obter token do cookie
  const accessToken = request.cookies.get("accessToken")?.value;
  const isAuthenticated = !!accessToken;

  // Se tentar acessar rota protegida sem estar logado
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/auth/admin", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Se tentar acessar rota de auth estando logado
  if (isAuthRoute && isAuthenticated) {
    const dashboardUrl = new URL("/admin/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // Permitir acesso normal
  return NextResponse.next();
}

// Configurar quais rotas o middleware deve interceptar
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
