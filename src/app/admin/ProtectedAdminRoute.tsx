"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

export default function ProtectedAdminRoute({
  children,
}: ProtectedAdminRouteProps) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Verificar se existe o cookie de autenticação
        const response = await fetch("/api/auth/verificar-sessao");

        if (response.ok) {
          // Se estiver autenticado, mostrar o conteúdo
          setIsLoading(false);
        } else {
          // Se não estiver autenticado, redirecionar para login
          console.log("Não autenticado, redirecionando para login");
          router.push("/login");
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        router.push("/login");
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
