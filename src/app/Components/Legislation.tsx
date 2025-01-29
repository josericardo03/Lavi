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

  const itemsPerPage = 2;

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
        console.error('Erro ao buscar legislações:', err);
        setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido');
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
    <div className="grid grid-cols-1 md:grid-cols-1 mt-5 gap-5 max-w-5xl mx-auto px-2">
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

      {/* Botões de Paginação */}
      <div className="flex justify-between mt-5">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 ${
            currentPage === 1 ? "bg-gray-300" : "bg-blue-500 hover:bg-blue-600"
          } text-white rounded-l transition duration-200`}
        >
          Anterior
        </button>
        <span className="px-4 py-2 flex items-center text-lg font-semibold">
          {`Página ${currentPage} de ${totalPages}`}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className={`px-4 py-2 ${
            currentPage === totalPages
              ? "bg-gray-300"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white rounded-r transition duration-200`}
        >
          Próxima
        </button>
      </div>
    </div>
  );
}
