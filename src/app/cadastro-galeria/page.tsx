"use client";
import { useState } from "react";
import ImageUpload from "@/app/Components/ImageUpload";

interface FormData {
  title: string;
  descricao: string;
  date: string;
  imageUrl: string;
  imageAlt: string;
  imageWidth: string;
  imageHeight: string;
}

export default function CadastroGaleriaPage() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    descricao: "",
    date: "",
    imageUrl: "",
    imageAlt: "",
    imageWidth: "",
    imageHeight: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const dataToSend = {
        ...formData,
        imageWidth: formData.imageWidth ? parseInt(formData.imageWidth) : null,
        imageHeight: formData.imageHeight
          ? parseInt(formData.imageHeight)
          : null,
        date: formData.date ? new Date(formData.date) : null,
      };

      const response = await fetch("/api/admin/galeria", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Imagem cadastrada na galeria com sucesso!",
        });
        setFormData({
          title: "",
          descricao: "",
          date: "",
          imageUrl: "",
          imageAlt: "",
          imageWidth: "",
          imageHeight: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: "Erro ao cadastrar. Tente novamente.",
        });
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      setSubmitStatus({
        type: "error",
        message: "Erro ao cadastrar. Tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Cadastro na Galeria
            </h1>
            <p className="text-gray-600">
              Compartilhe suas imagens na nossa galeria.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Título da Imagem *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Título da sua imagem"
              />
            </div>

            <div>
              <ImageUpload
                onImageUpload={(imageUrl) =>
                  setFormData((prev) => ({ ...prev, imageUrl }))
                }
                currentImageUrl={formData.imageUrl}
                label="Imagem da Galeria"
                required={true}
              />
            </div>

            <div>
              <label
                htmlFor="imageAlt"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Texto Alternativo
              </label>
              <input
                type="text"
                id="imageAlt"
                name="imageAlt"
                value={formData.imageAlt}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Descrição da imagem para acessibilidade"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Data da Imagem
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="imageWidth"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Largura (px)
                </label>
                <input
                  type="number"
                  id="imageWidth"
                  name="imageWidth"
                  value={formData.imageWidth}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="800"
                />
              </div>

              <div>
                <label
                  htmlFor="imageHeight"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Altura (px)
                </label>
                <input
                  type="number"
                  id="imageHeight"
                  name="imageHeight"
                  value={formData.imageHeight}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="600"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="descricao"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Descrição da Imagem
              </label>
              <textarea
                id="descricao"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                placeholder="Conte a história por trás da imagem, contexto, localização..."
              />
            </div>

            {submitStatus.type && (
              <div
                className={`p-4 rounded-lg ${
                  submitStatus.type === "success"
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : "bg-red-100 text-red-700 border border-red-300"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Cadastrando..." : "Adicionar à Galeria"}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Dicas para uma boa imagem
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg
                      className="w-6 h-6 text-blue-600"
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
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Qualidade
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Use imagens de boa resolução
                  </p>
                </div>

                <div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">Formato</h4>
                  <p className="text-gray-600 text-sm">
                    JPG, PNG ou GIF são aceitos
                  </p>
                </div>

                <div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Descrição
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Conte a história da imagem
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
