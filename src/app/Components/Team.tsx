"use client";
import Image from "next/image";
import { useState } from "react";

// Dados fictícios para a equipe
const data = [
  {
    foto: "https://via.placeholder.com/500",
    nome: "Nome do Membro 1",
    descricao: "Descrição do membro 1.",
    tipo: "docente",
    email: "membro1@example.com",
  },
  {
    foto: "https://via.placeholder.com/500",
    nome: "Nome do Membro 2",
    descricao: "Descrição do membro 2.",
    tipo: "bolsista",
    email: "membro2@example.com",
  },
  {
    foto: "https://via.placeholder.com/500",
    nome: "Nome do Membro 3",
    descricao: "Descrição do membro 3.",
    tipo: "colaborador",
    email: "membro3@example.com",
  },
  {
    foto: "https://via.placeholder.com/500",
    nome: "Nome do Membro 4",
    descricao: "Descrição do membro 4.",
    tipo: "docente",
    email: "membro4@example.com",
  },
  {
    foto: "https://via.placeholder.com/500",
    nome: "Nome do Membro 5",
    descricao: "Descrição do membro 5.",
    tipo: "bolsista",
    email: "membro5@example.com",
  },
  {
    foto: "https://via.placeholder.com/500",
    nome: "Nome do Membro 6",
    descricao: "Descrição do membro 6.",
    tipo: "colaborador",
    email: "membro6@example.com",
  },
  {
    foto: "https://via.placeholder.com/500",
    nome: "Nome do Membro 7",
    descricao: "Descrição do membro 7.",
    tipo: "docente",
    email: "membro7@example.com",
  },
  {
    foto: "https://via.placeholder.com/500",
    nome: "Nome do Membro 8",
    descricao: "Descrição do membro 8.",
    tipo: "bolsista",
    email: "membro8@example.com",
  },
  {
    foto: "https://via.placeholder.com/500",
    nome: "Nome do Membro 9",
    descricao: "Descrição do membro 9.",
    tipo: "colaborador",
    email: "membro9@example.com",
  },
  {
    foto: "https://via.placeholder.com/500",
    nome: "Nome do Membro 10",
    descricao: "Descrição do membro 10.",
    tipo: "docente",
    email: "membro10@example.com",
  },
];

export default function Team() {
  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 8;

  // Calcular o índice do primeiro e último membro a serem exibidos
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = data.slice(indexOfFirstMember, indexOfLastMember);

  // Calcular o número total de páginas
  const totalPages = Math.ceil(data.length / membersPerPage);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5 max-w-5xl mx-auto px-2">
        {currentMembers.map((equipe, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-md">
            <div className="grid grid-cols-2">
              <div className="col-span-1">
                <Image
                  src={equipe.foto}
                  alt="Foto da Equipe"
                  width={500}
                  height={500}
                  className="object-cover w-full h-[200px] rounded-t-lg"
                />
              </div>
              <div className="col-span-1 p-4">
                <h3 className="text-lg font-bold mb-2">{equipe.nome}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {equipe.descricao}
                </p>
                <p className="mt-2">
                  {equipe.tipo === "docente"
                    ? "Docente"
                    : equipe.tipo === "bolsista"
                    ? "Bolsista"
                    : "Colaborador Externo"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {equipe.email}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

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
