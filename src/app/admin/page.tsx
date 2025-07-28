"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
      document.cookie =
        "adminToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      router.push("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Painel Administrativo - Lavi
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Sair
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Equipe */}
          <Link href="/admin/equipe" className="group">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600">
                    Equipe
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Gerenciar membros da equipe
                  </p>
                </div>
                <div className="text-blue-500 group-hover:text-blue-600">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* Galeria */}
          <Link href="/admin/galeria" className="group">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600">
                    Galeria
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Gerenciar imagens da galeria
                  </p>
                </div>
                <div className="text-blue-500 group-hover:text-blue-600">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* Legislação */}
          <Link href="/admin/legislacao" className="group">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600">
                    Legislação
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Gerenciar documentos legais
                  </p>
                </div>
                <div className="text-blue-500 group-hover:text-blue-600">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* Orientação */}
          <Link href="/admin/orientacao" className="group">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600">
                    Orientação
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Gerenciar guias e orientações
                  </p>
                </div>
                <div className="text-blue-500 group-hover:text-blue-600">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* Artefatos */}
          <Link href="/admin/artefatos" className="group">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600">
                    Artefatos
                  </h3>
                  <p className="text-gray-600 mt-2">Gerenciar artefatos</p>
                </div>
                <div className="text-blue-500 group-hover:text-blue-600">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* Contatos */}
          <Link href="/admin/contatos" className="group">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600">
                    Contatos
                  </h3>
                  <p className="text-gray-600 mt-2">Ver mensagens recebidas</p>
                </div>
                <div className="text-blue-500 group-hover:text-blue-600">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
