"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Verificar se existe o cookie de autenticação
        const response = await fetch("/api/admin/usuarios/verificar-sessao");

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          // Se não estiver autenticado, redirecionar para login
          router.push("/admin-usuarios");
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        router.push("/admin-usuarios");
      } finally {
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

  if (!isAuthenticated) {
    return null; // Será redirecionado pelo useEffect
  }

  return <>{children}</>;
}
