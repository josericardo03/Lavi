"use client";
import { useState, useEffect } from "react";
import { fetchAPI } from "@/app/lib/strapi"; // Importando a função fetchAPI

// Define interface for Legislation data from Strapi
interface LegislationData {
  id: number;
  documentId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  links: string; // Changed from complex object to simple string
}

export default function Legislation() {
  const [legislations, setLegislations] = useState<LegislationData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);

  const itemsPerPage = 3;

  useEffect(() => {
    async function fetchLegislations() {
      try {
        setIsLoading(true);
        const result = await fetchAPI("/legislations");
        console.log(result); // Log para verificar a estrutura da resposta

        setLegislations(result.data);
        setTotalPages(Math.ceil(result.meta.pagination.total / itemsPerPage));
        setIsLoading(false);
      } catch (err) {
        console.error("Erro ao buscar legislações:", err);
        setError(
          err instanceof Error ? err.message : "Ocorreu um erro desconhecido"
        );
        setIsLoading(false);
      }
    }

    fetchLegislations();
  }, []);

  // Calcular o índice do primeiro e último item a serem exibidos
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = legislations.slice(indexOfFirstItem, indexOfLastItem);

  if (isLoading) {
    return <div className="text-center mt-10">Carregando...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500">
        <p>Erro ao carregar legislações:</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 mt-5 gap-5 max-w-7xl mx-auto px-2">
      {currentItems.map((leis) => (
        <div key={leis.id} className="bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-2 p-4">{leis.title}</h3>
          <h4 className="text-sm text-gray-600 dark:text-gray-300 p-4">
            {leis.content}
          </h4>
          <div className="p-4">
            <h4 className="font-bold mb-2">Link Relacionado:</h4>
            <ul>
              <li>
                <a
                  href={leis.links}
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {leis.links}
                </a>
              </li>
            </ul>
          </div>
        </div>
      ))}

      {/*  Paginação */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-purple-600 hover:bg-purple-50 hover:text-purple-700 border border-purple-200 hover:border-purple-300"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Anterior
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 rounded-full transition-all duration-200 ${
                currentPage === page
                  ? "bg-purple-600 text-white"
                  : "bg-white text-purple-600 hover:bg-purple-50 border border-purple-200 hover:border-purple-300"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-purple-600 hover:bg-purple-50 hover:text-purple-700 border border-purple-200 hover:border-purple-300"
          }`}
        >
          Próxima
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
