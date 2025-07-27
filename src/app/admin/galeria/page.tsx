"use client";
import { useState, useEffect } from "react";
import { Galeria } from "@/types/database";
import Link from "next/link";

export default function AdminGaleria() {
  const [imagens, setImagens] = useState<Galeria[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    descricao: "",
    date: "",
    imageUrl: "",
    imageAlt: "",
    imageWidth: "",
    imageHeight: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Buscar imagens da galeria
  const fetchImagens = async () => {
    try {
      const response = await fetch("/api/admin/galeria");
      const data = await response.json();
      setImagens(data);
    } catch (error) {
      console.error("Erro ao buscar imagens:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImagens();
  }, []);

  // Salvar imagem
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingId
        ? `/api/admin/galeria/${editingId}`
        : "/api/admin/galeria";

      const method = editingId ? "PUT" : "POST";

      const dataToSend = {
        ...formData,
        imageWidth: formData.imageWidth ? parseInt(formData.imageWidth) : null,
        imageHeight: formData.imageHeight
          ? parseInt(formData.imageHeight)
          : null,
        date: formData.date ? new Date(formData.date) : null,
      };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        setFormData({
          title: "",
          descricao: "",
          date: "",
          imageUrl: "",
          imageAlt: "",
          imageWidth: "",
          imageHeight: "",
        });
        setEditingId(null);
        setShowForm(false);
        fetchImagens();
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  };

  // Editar imagem
  const handleEdit = (imagem: Galeria) => {
    setFormData({
      title: imagem.title,
      descricao: imagem.descricao || "",
      date: imagem.date
        ? new Date(imagem.date).toISOString().split("T")[0]
        : "",
      imageUrl: imagem.imageUrl || "",
      imageAlt: imagem.imageAlt || "",
      imageWidth: imagem.imageWidth?.toString() || "",
      imageHeight: imagem.imageHeight?.toString() || "",
    });
    setEditingId(imagem.id);
    setShowForm(true);
  };

  // Deletar imagem
  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja deletar esta imagem?")) return;

    try {
      const response = await fetch(`/api/admin/galeria/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchImagens();
      }
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Gerenciar Galeria
          </h1>
          <Link
            href="/admin"
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Voltar ao Painel
          </Link>
        </div>

        {/* Botão para adicionar novo */}
        <div className="mb-6">
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              setFormData({
                title: "",
                descricao: "",
                date: "",
                imageUrl: "",
                imageAlt: "",
                imageWidth: "",
                imageHeight: "",
              });
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            {showForm ? "Cancelar" : "Adicionar Imagem"}
          </button>
        </div>

        {/* Formulário */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {editingId ? "Editar Imagem" : "Adicionar Nova Imagem"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL da Imagem *
                </label>
                <input
                  type="url"
                  required
                  value={formData.imageUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, imageUrl: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Texto Alternativo
                </label>
                <input
                  type="text"
                  value={formData.imageAlt}
                  onChange={(e) =>
                    setFormData({ ...formData, imageAlt: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Largura (px)
                  </label>
                  <input
                    type="number"
                    value={formData.imageWidth}
                    onChange={(e) =>
                      setFormData({ ...formData, imageWidth: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Altura (px)
                  </label>
                  <input
                    type="number"
                    value={formData.imageHeight}
                    onChange={(e) =>
                      setFormData({ ...formData, imageHeight: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição
                </label>
                <textarea
                  value={formData.descricao}
                  onChange={(e) =>
                    setFormData({ ...formData, descricao: e.target.value })
                  }
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
                >
                  {editingId ? "Atualizar" : "Salvar"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setFormData({
                      title: "",
                      descricao: "",
                      date: "",
                      imageUrl: "",
                      imageAlt: "",
                      imageWidth: "",
                      imageHeight: "",
                    });
                  }}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Lista de imagens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {imagens.map((imagem) => (
            <div
              key={imagem.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {imagem.imageUrl && (
                <img
                  src={imagem.imageUrl}
                  alt={imagem.imageAlt || imagem.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{imagem.title}</h3>
                {imagem.descricao && (
                  <p className="text-gray-700 mb-2">{imagem.descricao}</p>
                )}
                {imagem.date && (
                  <p className="text-sm text-gray-500 mb-2">
                    {new Date(imagem.date).toLocaleDateString("pt-BR")}
                  </p>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(imagem)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(imagem.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                  >
                    Deletar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {imagens.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            Nenhuma imagem cadastrada ainda.
          </div>
        )}
      </div>
    </div>
  );
}
