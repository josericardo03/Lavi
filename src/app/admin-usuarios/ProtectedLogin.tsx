"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ProtectedLoginProps {
  children: React.ReactNode;
}

export default function ProtectedLogin({ children }: ProtectedLoginProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Verificar se já existe o cookie de autenticação
        const response = await fetch("/api/admin/usuarios/verificar-sessao");

        if (response.ok) {
          // Se já estiver autenticado, redirecionar para gerenciamento
          router.push("/admin-usuarios/gerenciar");
        } else {
          // Se não estiver autenticado, mostrar a página de login
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Verificando autenticação...</div>
      </div>
    );
  }

  return <>{children}</>;
}
