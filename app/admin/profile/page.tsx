import { useServerAuth } from "@/hooks/useServerAuth";

export default function AdminProfile() {
  // Verificar autenticação no lado do servidor
  const { requireAuth } = useServerAuth();
  requireAuth(); // Redireciona para login se não estiver autenticado

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Perfil do Administrador
          </h1>

          <div className="space-y-4">
            <div className="border-b pb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Informações Pessoais
              </h2>
              <p className="text-gray-600">
                Esta página só pode ser acessada por usuários autenticados. A
                verificação é feita no lado do servidor usando o middleware.
              </p>
            </div>

            <div className="border-b pb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Configurações
              </h2>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Alterar Senha
                </button>
                <button className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                  Configurações de Notificação
                </button>
                <button className="w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
                  Preferências de Privacidade
                </button>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Segurança
              </h2>
              <p className="text-gray-600 mb-4">
                Esta página é protegida por múltiplas camadas de segurança:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Middleware do Next.js (verificação no servidor)</li>
                <li>Componente ProtectedRoute (verificação no cliente)</li>
                <li>Cookies seguros (HttpOnly, Secure, SameSite)</li>
                <li>Hook useServerAuth (verificação adicional)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
