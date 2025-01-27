"use client";
import { useState } from "react";

// Adicione isso se estiver usando o Next.js com componentes de cliente

// Dados fictícios para a legislação
const data = [
  {
    title: "Lei 1: Título da Legislação 1",
    content: [
      { _type: "block", children: [{ text: "Conteúdo da legislação 1." }] },
    ],
    linksRelacionados: [
      { titulo: "Link Relacionado 1", url: "https://example.com/1" },
      { titulo: "Link Relacionado 2", url: "https://example.com/2" },
    ],
  },
  {
    title: "Lei 2: Título da Legislação 2",
    content: [
      { _type: "block", children: [{ text: "Conteúdo da legislação 2." }] },
    ],
    linksRelacionados: [
      { titulo: "Link Relacionado 3", url: "https://example.com/3" },
      { titulo: "Link Relacionado 4", url: "https://example.com/4" },
    ],
  },
  {
    title: "Lei 3: Título da Legislação 3",
    content: [
      { _type: "block", children: [{ text: "Conteúdo da legislação 3." }] },
    ],
    linksRelacionados: [
      { titulo: "Link Relacionado 5", url: "https://example.com/5" },
      { titulo: "Link Relacionado 6", url: "https://example.com/6" },
    ],
  },
  {
    title: "Lei 4: Título da Legislação 4",
    content: [
      { _type: "block", children: [{ text: "Conteúdo da legislação 4." }] },
    ],
    linksRelacionados: [
      { titulo: "Link Relacionado 7", url: "https://example.com/7" },
      { titulo: "Link Relacionado 8", url: "https://example.com/8" },
    ],
  },
  {
    title: "Lei 5: Título da Legislação 5",
    content: [
      { _type: "block", children: [{ text: "Conteúdo da legislação 5." }] },
    ],
    linksRelacionados: [
      { titulo: "Link Relacionado 9", url: "https://example.com/9" },
      { titulo: "Link Relacionado 10", url: "https://example.com/10" },
    ],
  },
  // Adicione mais leis conforme necessário
];

export default function Legislation() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Defina quantas legislações você deseja exibir por página

  // Calcular o índice do primeiro e último item a serem exibidos
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Calcular o número total de páginas
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 mt-5 gap-5 max-w-5xl mx-auto px-2">
      {currentItems.map((leis, idx) => (
        <div key={idx} className="bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-2 p-4">{leis.title}</h3>
          <h4 className="text-sm text-gray-600 dark:text-gray-300 p-4">
            {leis.content.map((block, blockIdx) => (
              <p key={blockIdx}>{block.children[0].text}</p>
            ))}
          </h4>
          <div className="p-4">
            <h4 className="font-bold mb-2">Links Relacionados:</h4>
            <ul>
              {leis.linksRelacionados.map((link, linkIdx) => (
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
