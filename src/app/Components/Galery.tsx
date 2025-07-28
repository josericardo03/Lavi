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
                <div className="relative w-full pb-[75%] mb-3">
                  <Image
                    src={photo.imageUrl}
                    alt={photo.imageAlt || photo.title}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 pr-4">
                  {selectedPhoto.title}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {selectedPhoto.imageUrl && (
                <div className="mb-4">
                  <Image
                    src={selectedPhoto.imageUrl}
                    alt={selectedPhoto.imageAlt || selectedPhoto.title}
                    width={1920}
                    height={1080}
                    className="w-full h-auto rounded-lg object-contain max-h-[60vh]"
                    style={{ maxWidth: "100%" }}
                  />
                </div>
              )}

              <div className="space-y-3">
                {selectedPhoto.descricao && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Descrição:
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {selectedPhoto.descricao}
                    </p>
                  </div>
                )}

                {selectedPhoto.date && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Data:</h4>
                    <p className="text-sm text-blue-500">
                      {new Date(selectedPhoto.date).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 text-sm sm:text-base"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Galery;
