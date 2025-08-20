"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "./ProtectedRoute";

interface Usuario {
  id: string;
  nome: string;
  email: string;
  role: string;
  ativo: boolean;
  createdAt: string;
}

function GerenciarUsuariosContent() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [editando, setEditando] = useState<string | null>(null);
  const [usuarioEditando, setUsuarioEditando] = useState<Partial<Usuario>>({});
  const router = useRouter();

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = async () => {
    try {
      const response = await fetch("/api/admin/usuarios");
      if (response.ok) {
        const data = await response.json();
        setUsuarios(data);
      } else {
        setErro("Erro ao carregar usuários");
      }
    } catch (error) {
      setErro("Erro ao carregar usuários");
    } finally {
      setCarregando(false);
    }
  };

  const handleEditar = (usuario: Usuario) => {
    setEditando(usuario.id);
    setUsuarioEditando(usuario);
  };

  const handleSalvar = async () => {
    if (!editando) return;

    try {
      const response = await fetch(`/api/admin/usuarios/${editando}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuarioEditando),
      });

      if (response.ok) {
        setEditando(null);
        setUsuarioEditando({});
        carregarUsuarios();
      } else {
        setErro("Erro ao atualizar usuário");
      }
    } catch (error) {
      setErro("Erro ao atualizar usuário");
    }
  };

  const handleExcluir = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este usuário?")) return;

    try {
      const response = await fetch(`/api/admin/usuarios/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        carregarUsuarios();
      } else {
        setErro("Erro ao excluir usuário");
      }
    } catch (error) {
      setErro("Erro ao excluir usuário");
    }
  };

  const handleCancelar = () => {
    setEditando(null);
    setUsuarioEditando({});
  };

  const handleLogout = async () => {
    try {
      // Fazer logout removendo o cookie
      await fetch("/api/admin/usuarios/logout", { method: "POST" });
      router.push("/admin-usuarios");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  if (carregando) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Gerenciar Usuários
              </h1>
              <div className="flex space-x-2">
                <button
                  onClick={() => router.push("/admin-usuarios")}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                >
                  Voltar
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                >
                  Sair
                </button>
              </div>
            </div>

            {erro && (
              <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {erro}
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nome
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Função
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {usuarios.map((usuario) => (
                    <tr key={usuario.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editando === usuario.id ? (
                          <input
                            type="text"
                            value={usuarioEditando.nome || ""}
                            onChange={(e) =>
                              setUsuarioEditando({
                                ...usuarioEditando,
                                nome: e.target.value,
                              })
                            }
                            className="border border-gray-300 rounded-md px-3 py-2 w-full"
                          />
                        ) : (
                          <div className="text-sm font-medium text-gray-900">
                            {usuario.nome}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editando === usuario.id ? (
                          <input
                            type="email"
                            value={usuarioEditando.email || ""}
                            onChange={(e) =>
                              setUsuarioEditando({
                                ...usuarioEditando,
                                email: e.target.value,
                              })
                            }
                            className="border border-gray-300 rounded-md px-3 py-2 w-full"
                          />
                        ) : (
                          <div className="text-sm text-gray-900">
                            {usuario.email}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editando === usuario.id ? (
                          <select
                            value={usuarioEditando.role || ""}
                            onChange={(e) =>
                              setUsuarioEditando({
                                ...usuarioEditando,
                                role: e.target.value,
                              })
                            }
                            className="border border-gray-300 rounded-md px-3 py-2 w-full"
                          >
                            <option value="admin">Admin</option>
                            <option value="usuario">Usuário</option>
                          </select>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {usuario.role}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editando === usuario.id ? (
                          <select
                            value={usuarioEditando.ativo?.toString() || ""}
                            onChange={(e) =>
                              setUsuarioEditando({
                                ...usuarioEditando,
                                ativo: e.target.value === "true",
                              })
                            }
                            className="border border-gray-300 rounded-md px-3 py-2 w-full"
                          >
                            <option value="true">Ativo</option>
                            <option value="false">Inativo</option>
                          </select>
                        ) : (
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              usuario.ativo
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {usuario.ativo ? "Ativo" : "Inativo"}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {editando === usuario.id ? (
                          <div className="flex space-x-2">
                            <button
                              onClick={handleSalvar}
                              className="text-green-600 hover:text-green-900"
                            >
                              Salvar
                            </button>
                            <button
                              onClick={handleCancelar}
                              className="text-gray-600 hover:text-gray-900"
                            >
                              Cancelar
                            </button>
                          </div>
                        ) : (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditar(usuario)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleExcluir(usuario.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Excluir
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GerenciarUsuarios() {
  return (
    <ProtectedRoute>
      <GerenciarUsuariosContent />
    </ProtectedRoute>
  );
}
