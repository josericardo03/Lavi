"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface LoginData {
  email: string;
  senha: string;
}

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    senha: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Login bem-sucedido
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminUser", JSON.stringify(data.user));

        // Salvar token em cookie também para o middleware
        document.cookie = `adminToken=${data.token}; path=/; max-age=86400; secure; samesite=strict`;

        router.push("/admin");
      } else {
        setError(data.error || "Erro ao fazer login");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 to-pink-300 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 bg-white rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-900">La</span>
            <span className="text-2xl font-bold text-gray-900">Vi</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Acesso Administrativo
          </h2>
          <p className="mt-2 text-center text-sm text-white/90">
            Faça login para acessar o painel administrativo
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="admin@lavi.com"
              />
            </div>

            <div>
              <label
                htmlFor="senha"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Senha <span className="text-red-500">*</span>
              </label>
              <input
                id="senha"
                name="senha"
                type="password"
                required
                value={formData.senha}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Sua senha"
              />
            </div>

            {error && (
              <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
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
                {isSubmitting ? "Entrando..." : "Entrar"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
            >
              ← Voltar para o site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
