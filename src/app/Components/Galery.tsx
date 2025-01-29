"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchAPI } from "@/app/lib/strapi";

// Definindo a interface para a foto
interface Foto {
  id: number;
  documentId: string;
  Title: string;
  Descricao: string;
  Date: string | null;
  Images: {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats?: {
      thumbnail?: {
        url: string;
      };
      medium?: {
        url: string;
      };
      small?: {
        url: string;
      };
    };
    url: string;
  };
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
        const result = await fetchAPI("/galerys?populate=*"); // Ajuste a rota conforme necessário
        console.log("-------")
        console.log(result); // Verifique a estrutura da resposta
        
        if (result?.data && Array.isArray(result.data)) {
          setPhotos(result.data);
          setTotalPages(Math.ceil(result.meta.pagination.total / itemsPerPage)); // Calcule o total de páginas
        } else {
          console.error("Dados recebidos não estão no formato esperado:", result);
          setPhotos([]); // Garante que `photos` será um array vazio em caso de erro
        }
      } catch (error) {
        console.error("Erro ao buscar fotos:", error);
        setPhotos([]); // Garante que o estado não fica indefinido em caso de erro
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
    <div className="md:p-10 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-5">Nossa Galeria</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {currentPhotos.map((photo) => {
          // Pega a URL da imagem a partir de 'photo.Images.url'
          const imageUrl = photo.Images?.formats?.small?.url
  ? `http://localhost:1337${photo.Images.formats.small.url}` // Corrigido para concatenar sem as aspas extras
  : `http://localhost:1337${photo.Images.url}`;

          return (
            <div 
              key={photo.id} 
              className="bg-white rounded-lg shadow-md p-5 cursor-pointer"
              onClick={() => handlePhotoClick(photo)}
            >
              <Image
                src={imageUrl}
                alt={photo.Title}
                width={400}
                height={300}
                className="rounded-lg mb-3"
              />
              <h3 className="text-lg font-bold">{photo.Title}</h3>
              <p className="text-sm text-gray-600">{photo.Descricao}</p>
              <p className="text-sm text-blue-500">{photo.Date}</p>
            </div>
          );
        })}
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

      {/* Modal para exibir a foto em detalhes */}
      {selectedPhoto && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-white p-5 rounded-lg max-w-xl w-full">
            <h3 className="text-xl font-bold mb-4">{selectedPhoto.Title}</h3>
            <Image
              src={`http://localhost:1337${selectedPhoto.Images.url}`}
              alt={selectedPhoto.Title}
              width={800}
              height={600}
              className="rounded-lg mb-4"
            />
            <p className="text-sm text-gray-600 mb-2">{selectedPhoto.Descricao}</p>
            <p className="text-sm text-blue-500 mb-4">Data: {selectedPhoto.Date}</p>
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
