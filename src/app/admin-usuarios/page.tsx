"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminUsuariosLogin() {
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      const response = await fetch("/api/admin/usuarios/verificar-senha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ senha }),
      });

      console.log("📡 Resposta da API:", response.status, response.statusText);

      if (response.ok) {
        // Senha correta, redirecionar para a página de administração
        console.log("✅ API retornou OK, tentando redirecionar...");
        try {
          router.push("/admin-usuarios/gerenciar");
          console.log("✅ Redirecionamento iniciado");
        } catch (redirectError) {
          console.error("❌ Erro no redirecionamento:", redirectError);
        }
      } else {
        const data = await response.json();
        setErro(data.message || "Senha incorreta");
      }
    } catch (error) {
      setErro("Erro ao verificar senha");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Administração de Usuários
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Digite a senha de administrador para continuar
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="senha" className="sr-only">
              Senha
            </label>
            <input
              id="senha"
              name="senha"
              type="password"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Senha de administrador"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          {erro && (
            <div className="text-red-600 text-sm text-center">{erro}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={carregando}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {carregando ? "Verificando..." : "Acessar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
