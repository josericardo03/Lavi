"use client";
import { useState, useEffect } from "react";
import { Contatos } from "@/types/database";
import Link from "next/link";

export default function AdminContatos() {
  const [contatos, setContatos] = useState<Contatos[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>("todos");

  // Buscar contatos
  const fetchContatos = async () => {
    try {
      const response = await fetch("/api/admin/contatos");
      const data = await response.json();
      setContatos(data);
    } catch (error) {
      console.error("Erro ao buscar contatos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContatos();
  }, []);

  // Atualizar status do contato
  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/contatos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchContatos();
      }
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  // Deletar contato
  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja deletar este contato?")) return;

    try {
      const response = await fetch(`/api/admin/contatos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchContatos();
      }
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };

  // Filtrar contatos por status
  const filteredContatos =
    selectedStatus === "todos"
      ? contatos
      : contatos.filter((contato) => contato.status === selectedStatus);

  if (loading) {
    return <div className="p-8 text-center">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Gerenciar Contatos
          </h1>
          <Link
            href="/admin"
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Voltar ao Painel
          </Link>
        </div>

        {/* Filtros */}
        <div className="mb-6 flex gap-4">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="todos">Todos os Status</option>
            <option value="novo">Novo</option>
            <option value="respondido">Respondido</option>
            <option value="arquivado">Arquivado</option>
          </select>

          <div className="text-sm text-gray-600">
            Total: {filteredContatos.length} contato(s)
          </div>
        </div>

        {/* Lista de contatos */}
        <div className="space-y-6">
          {filteredContatos.map((contato) => (
            <div key={contato.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{contato.nome}</h3>
                  <p className="text-blue-500">{contato.email}</p>
                </div>
                <div className="flex gap-2">
                  <select
                    value={contato.status}
                    onChange={(e) =>
                      handleStatusChange(contato.id, e.target.value)
                    }
                    className={`px-3 py-1 rounded text-sm border ${
                      contato.status === "novo"
                        ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                        : contato.status === "respondido"
                        ? "bg-green-100 text-green-800 border-green-300"
                        : "bg-gray-100 text-gray-800 border-gray-300"
                    }`}
                  >
                    <option value="novo">Novo</option>
                    <option value="respondido">Respondido</option>
                    <option value="arquivado">Arquivado</option>
                  </select>
                  <button
                    onClick={() => handleDelete(contato.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                  >
                    Deletar
                  </button>
                </div>
              </div>

              {contato.assunto && (
                <div className="mb-3">
                  <h4 className="font-semibold mb-1">Assunto:</h4>
                  <p className="text-gray-700">{contato.assunto}</p>
                </div>
              )}

              {contato.descricao && (
                <div className="mb-3">
                  <h4 className="font-semibold mb-1">Mensagem:</h4>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {contato.descricao}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>
                  Status:{" "}
                  <span className="font-semibold">{contato.status}</span>
                </span>
                <span>
                  Recebido em:{" "}
                  {new Date(contato.createdAt).toLocaleDateString("pt-BR")} às{" "}
                  {new Date(contato.createdAt).toLocaleTimeString("pt-BR")}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredContatos.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            {selectedStatus === "todos"
              ? "Nenhum contato recebido ainda."
              : `Nenhum contato com status "${selectedStatus}".`}
          </div>
        )}
      </div>
    </div>
  );
}
