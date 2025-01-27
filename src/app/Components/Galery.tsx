"use client"; // Adicione isso se estiver usando o Next.js com componentes de cliente
import Image from "next/image";
import { useState } from "react";

// Definindo a interface para a foto
interface Foto {
  imagem: string;
  descricao: string;
  data: string;
}

// Definindo a interface para o vídeo
interface Video {
  id: number;
  ano: number;
  fotos: Foto[];
}

// Gerando dados fictícios para vídeos
const data: Video[] = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  ano: 2021 + (index % 3), // Para simular anos diferentes
  fotos: [
    {
      imagem: `https://via.placeholder.com/400x300?text=Foto+${index + 1}`,
      descricao: `Descrição aleatória da Foto ${index + 1}`,
      data: `0${(index % 12) + 1}/01/202${Math.floor(index / 12)}`,
    },
  ],
}));

export default function Galery() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Defina quantas fotos você deseja exibir por página
  const [selectedPhoto, setSelectedPhoto] = useState<Foto | null>(null); // Estado para o modal

  // Calcular o índice do primeiro e último item a serem exibidos
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data
    .flatMap((video) => video.fotos)
    .slice(indexOfFirstItem, indexOfLastItem);

  // Calcular o número total de páginas
  const totalPages = Math.ceil(
    data.flatMap((video) => video.fotos).length / itemsPerPage
  );

  const handlePhotoClick = (foto: Foto) => {
    setSelectedPhoto(foto);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <div className="md:p-10 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {currentItems.map((foto, index) => (
          <div key={index} className="mb-5 relative overflow-hidden">
            <div
              className="group cursor-pointer relative"
              onClick={() => handlePhotoClick(foto)}
            >
              <Image
                src={foto.imagem}
                alt={foto.descricao}
                width={400}
                height={300}
                className="transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center">
                <p>{foto.descricao}</p>
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

      {/* Modal para exibir a foto, data e descrição */}
      {selectedPhoto && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-white p-5 rounded-lg">
            <h3 className="text-lg font-bold">{selectedPhoto.descricao}</h3>
            <Image
              src={selectedPhoto.imagem}
              alt={selectedPhoto.descricao}
              width={600}
              height={400}
              className="my-4"
            />
            <p className="text-sm text-gray-600">Data: {selectedPhoto.data}</p>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
