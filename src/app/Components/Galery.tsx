"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Galeria } from "@/types/database";

// Definindo a interface para a foto
interface Foto {
  id: string;
  title: string;
  descricao?: string;
  date?: Date;
  imageUrl?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  createdAt: Date;
  updatedAt: Date;
}

const Galery = () => {
  const [photos, setPhotos] = useState<Foto[]>([]); // Tipando o estado
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Defina quantos itens você deseja exibir por página
  const [totalPages, setTotalPages] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState<Foto | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/admin/galeria");
        if (response.ok) {
          const result = await response.json();
          console.log("-------");
          console.log(result); // Verifique a estrutura da resposta

          if (Array.isArray(result)) {
            setPhotos(result);
            setTotalPages(Math.ceil(result.length / itemsPerPage));
          } else {
            console.error(
              "Dados recebidos não estão no formato esperado:",
              result
            );
            setPhotos([]);
          }
        } else {
          console.error("Erro ao buscar fotos da galeria");
          setPhotos([]);
        }
      } catch (error) {
        console.error("Erro ao buscar fotos:", error);
        setPhotos([]);
      }
    };

    fetchData();
  }, []);

  // Calcular os índices das fotos a serem exibidas na página atual
  const indexOfLastPhoto = currentPage * itemsPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - itemsPerPage;
  const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);

  const handlePhotoClick = (photo: Foto) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <div className="md:p-10 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-5">Nossa Galeria</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {currentPhotos.map((photo) => {
          return (
            <div
              key={photo.id}
              className="bg-white rounded-lg shadow-md p-5 cursor-pointer"
              onClick={() => handlePhotoClick(photo)}
            >
              {photo.imageUrl && (
                <Image
                  src={photo.imageUrl}
                  alt={photo.imageAlt || photo.title}
                  width={400}
                  height={300}
                  className="rounded-lg mb-3"
                />
              )}
              <h3 className="text-lg font-bold">{photo.title}</h3>
              {photo.descricao && (
                <p className="text-sm text-gray-600">{photo.descricao}</p>
              )}
              {photo.date && (
                <p className="text-sm text-blue-500">
                  {new Date(photo.date).toLocaleDateString("pt-BR")}
                </p>
              )}
            </div>
          );
        })}
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

      {/* Modal para exibir a foto em detalhes */}
      {selectedPhoto && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-white p-5 rounded-lg max-w-xl w-full">
            <h3 className="text-xl font-bold mb-4">{selectedPhoto.title}</h3>
            {selectedPhoto.imageUrl && (
              <Image
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.imageAlt || selectedPhoto.title}
                width={800}
                height={600}
                className="rounded-lg mb-4"
              />
            )}
            {selectedPhoto.descricao && (
              <p className="text-sm text-gray-600 mb-2">
                {selectedPhoto.descricao}
              </p>
            )}
            {selectedPhoto.date && (
              <p className="text-sm text-blue-500 mb-4">
                Data: {new Date(selectedPhoto.date).toLocaleDateString("pt-BR")}
              </p>
            )}
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Galery;
