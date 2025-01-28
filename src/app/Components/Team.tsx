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

      {/* Paginação */}
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
};

export default Team;
