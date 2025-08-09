"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ImageUpload from "../../Components/ImageUpload";

interface SobreData {
  id: string;
  titulo: string;
  descricao?: string;
  conteudo?: string;
  imagem_principal?: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function AdminSobre() {
  const [sobreData, setSobreData] = useState<SobreData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    conteudo: "",
    imagem_principal: "",
  });

  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/sobre");
      if (response.ok) {
        const data = await response.json();
        setSobreData(data);
      } else {
        console.error("Erro ao buscar dados sobre");
      }
    } catch (error) {
      console.error("Erro ao buscar dados sobre:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        // Atualizar
        const response = await fetch(`/api/admin/sobre/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setEditingId(null);
          setFormData({
            titulo: "",
            descricao: "",
            conteudo: "",
            imagem_principal: "",
          });
          fetchData();
        }
      } else {
        // Criar novo
        const response = await fetch("/api/admin/sobre", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setFormData({
            titulo: "",
            descricao: "",
            conteudo: "",
            imagem_principal: "",
          });
          fetchData();
        }
      }
    } catch (error) {
      console.error("Erro ao salvar dados sobre:", error);
    }
  };

  const handleEdit = (item: SobreData) => {
    setEditingId(item.id);
    setFormData({
      titulo: item.titulo,
      descricao: item.descricao || "",
      conteudo: item.conteudo || "",
      imagem_principal: item.imagem_principal || "",
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja deletar esta entrada?")) {
      try {
        const response = await fetch(`/api/admin/sobre/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          fetchData();
        }
      } catch (error) {
        console.error("Erro ao deletar entrada sobre:", error);
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      titulo: "",
      descricao: "",
      conteudo: "",
      imagem_principal: "",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Gerenciar Sobre
            </h1>
            <p className="text-gray-600 mt-2">
              Gerencie o conteúdo da página principal sobre
            </p>
          </div>
          <Link
            href="/admin"
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Voltar ao Painel
          </Link>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {editingId ? "Editar Entrada" : "Nova Entrada"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título *
              </label>
              <input
                type="text"
                required
                value={formData.titulo}
                onChange={(e) =>
                  setFormData({ ...formData, titulo: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Título da página sobre"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição
              </label>
              <input
                type="text"
                value={formData.descricao}
                onChange={(e) =>
                  setFormData({ ...formData, descricao: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Descrição breve"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Conteúdo
              </label>
              <textarea
                rows={6}
                value={formData.conteudo}
                onChange={(e) =>
                  setFormData({ ...formData, conteudo: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Conteúdo completo da página (HTML permitido)"
              />
            </div>

            <ImageUpload
              onImageUpload={(imageUrl) =>
                setFormData({ ...formData, imagem_principal: imageUrl })
              }
              currentImageUrl={formData.imagem_principal}
              label="Imagem Principal"
            />

            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingId ? "Atualizar" : "Criar"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Lista de Entradas */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Entradas Existentes
            </h2>
          </div>

          {sobreData.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              Nenhuma entrada encontrada. Crie uma nova entrada acima.
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {sobreData.map((item) => (
                <div key={item.id} className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {item.titulo}
                      </h3>
                      {item.descricao && (
                        <p className="text-gray-600 mb-2">{item.descricao}</p>
                      )}
                      {item.conteudo && (
                        <div className="text-gray-700 text-sm mb-2">
                          <strong>Conteúdo:</strong>{" "}
                          {item.conteudo.substring(0, 100)}...
                        </div>
                      )}
                      <div className="text-xs text-gray-500">
                        Criado em:{" "}
                        {new Date(item.createdAt).toLocaleDateString("pt-BR")}
                      </div>
                    </div>

                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(item)}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                      >
                        Deletar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
