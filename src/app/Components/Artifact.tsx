"use client"; // Adicione isso se estiver usando o Next.js com componentes de cliente
import { useState } from "react";

// Dados fictícios para artefatos
const data = [
  {
    title: "Artefato 1: Título do Artefato 1",
    content: "Conteúdo do artefato 1.",
    linksRelacionados: [
      { titulo: "Link Relacionado 1", url: "https://example.com/1" },
      { titulo: "Link Relacionado 2", url: "https://example.com/2" },
    ],
  },
  {
    title: "Artefato 2: Título do Artefato 2",
    content: "Conteúdo do artefato 2.",
    linksRelacionados: [
      { titulo: "Link Relacionado 3", url: "https://example.com/3" },
      { titulo: "Link Relacionado 4", url: "https://example.com/4" },
    ],
  },
  {
    title: "Artefato 3: Título do Artefato 3",
    content: "Conteúdo do artefato 3.",
    linksRelacionados: [
      { titulo: "Link Relacionado 5", url: "https://example.com/5" },
      { titulo: "Link Relacionado 6", url: "https://example.com/6" },
    ],
  },
  {
    title: "Artefato 4: Título do Artefato 4",
    content: "Conteúdo do artefato 4.",
    linksRelacionados: [
      { titulo: "Link Relacionado 7", url: "https://example.com/7" },
      { titulo: "Link Relacionado 8", url: "https://example.com/8" },
    ],
  },
  {
    title: "Artefato 5: Título do Artefato 5",
    content: "Conteúdo do artefato 5.",
    linksRelacionados: [
      { titulo: "Link Relacionado 9", url: "https://example.com/9" },
      { titulo: "Link Relacionado 10", url: "https://example.com/10" },
    ],
  },
  // Adicione mais artefatos conforme necessário
];

export default function Artifact() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Defina quantos artefatos você deseja exibir por página

  // Calcular o índice do primeiro e último item a serem exibidos
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Calcular o número total de páginas
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 mt-5 gap-5 max-w-5xl mx-auto px-2">
      {currentItems.map((art, idx) => (
        <div key={idx} className="bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-2 p-4">{art.title}</h3>
          <h4 className="text-sm text-gray-600 dark:text-gray-300 p-4">
            {art.content} {/* Renderizando o conteúdo diretamente */}
          </h4>
          <div className="p-4">
            <h4 className="font-bold mb-2">Links Relacionados:</h4>
            <ul>
              {art.linksRelacionados.map((link, linkIdx) => (
                <li key={linkIdx}>
                  <a href={link.url} className="text-blue-500 hover:underline">
                    {link.titulo}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      {/* Botões de Paginação */}
      <div className="flex justify-center mt-5">
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
