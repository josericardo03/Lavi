"use client"; // Adicione isso se estiver usando o Next.js com componentes de cliente
import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchAPI } from "@/app/lib/strapi"; // Importando a função fetchAPI

// Definindo a interface para um membro da equipe
interface TeamMember {
  id: number;
  nome: string;
  descricao: string;
  tipo: string;
  email: string;
  foto?: {
    url: string; // URL da imagem, se aplicável
  };
}

const Team = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]); // Tipando o estado
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Defina quantos membros você deseja exibir por página
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchAPI("/equipes?populate=*"); // Ajuste a rota conforme necessário
      console.log(result); // Verifique a estrutura da resposta
      setTeamMembers(result.data); // Acesse a propriedade 'data'
      setTotalPages(Math.ceil(result.meta.pagination.total / itemsPerPage)); // Calcule o total de páginas
    };
    fetchData();
  }, []);

  // Calcular os índices dos membros a serem exibidos na página atual
  const indexOfLastMember = currentPage * itemsPerPage;
  const indexOfFirstMember = indexOfLastMember - itemsPerPage;
  const currentMembers = teamMembers.slice(
    indexOfFirstMember,
    indexOfLastMember
  );

  return (
    <div className="md:p-10 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-5">Nossa Equipe</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {currentMembers.map((member) => (
          <div key={member.id} className="bg-white rounded-lg shadow-md p-5">
            {member.foto && (
              <Image
                src={"http://localhost:1337" + member.foto.url} // Acesse a URL da imagem
                alt={member.nome}
                width={400}
                height={300}
                className="rounded-full mb-3"
              />
            )}
            <h3 className="text-lg font-bold">{member.nome}</h3>
            <p className="text-sm text-gray-600">{member.tipo}</p>
            <p className="text-sm">{member.descricao}</p>
            <p className="text-sm text-blue-500">{member.email}</p>
          </div>
        ))}
      </div>

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
};

export default Team;
