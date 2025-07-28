"use client";
import { useState } from "react";

interface FormData {
  nome: string;
  email: string;
  assunto: string;
  descricao: string;
}

const Form = () => {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    assunto: "",
    descricao: "",
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
      const formUrl =
        "https://docs.google.com/forms/d/e/1FAIpQLScA8Wfy9r6GRMwcYiGYQwgGKsjCrAwhphpJQpN9jxBy5dhPYA/formResponse";

      console.log("Dados sendo enviados:", formData);

      const formDataToSend = new URLSearchParams();

      // IDs corretos do seu formulário Google
      formDataToSend.append("entry.1304055501", formData.nome); // Nome
      formDataToSend.append("entry.836518939", formData.email); // Email
      formDataToSend.append("entry.94813773", formData.assunto); // Assunto
      formDataToSend.append("entry.1582187158", formData.descricao); // Descrição

      // Enviar usando fetch com no-cors
      await fetch(formUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formDataToSend,
      });

      // Mostrar mensagem de sucesso
      setSubmitStatus({
        type: "success",
        message: "Formulário enviado com sucesso!",
      });

      // Limpar o formulário
      setFormData({ nome: "", email: "", assunto: "", descricao: "" });
    } catch (error) {
      console.error("Erro ao enviar:", error);
      setSubmitStatus({
        type: "error",
        message: "Erro ao enviar formulário. Tente novamente.",
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Entre em Contato
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="nome"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nome
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              required
              value={formData.nome}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="assunto"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Assunto
            </label>
            <input
              type="text"
              id="assunto"
              name="assunto"
              required
              value={formData.assunto}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="descricao"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Descrição
            </label>
            <textarea
              id="descricao"
              name="descricao"
              required
              value={formData.descricao}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors resize-none"
            />
          </div>

          {submitStatus.type && (
            <div
              className={`p-4 rounded-lg ${
                submitStatus.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {submitStatus.message}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              background: "linear-gradient(to right, #A4D3FF, #F6A8D7)",
            }}
            className={`w-full py-3 px-4 text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:opacity-80 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
