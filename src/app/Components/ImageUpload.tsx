"use client";
import { useState, useRef } from "react";

export default function ImageUpload({
  onImageUpload,
  currentImageUrl,
  label = "Upload de Imagem",
  required = false,
  pageType = "geral",
  showPageTypeSelector = false,
}: any) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    currentImageUrl || null
  );
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(
    currentImageUrl || null
  );
  const [selectedPageType, setSelectedPageType] = useState(pageType);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: any) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar tipo de arquivo
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!allowedTypes.includes(file.type)) {
      setUploadError(
        "Tipo de arquivo não permitido. Use apenas imagens (JPEG, PNG, GIF, WebP)"
      );
      return;
    }

    // Validar tamanho (máximo 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setUploadError("Arquivo muito grande. Tamanho máximo: 5MB");
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("pageType", selectedPageType);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Usar a URL que sabemos que funciona
        const fullImageUrl = `${window.location.origin}${result.imageUrl}`;
        setPreviewUrl(fullImageUrl);
        setUploadedImageUrl(result.imageUrl);
        onImageUpload(result.imageUrl);
        setUploadError(null);
      } else {
        setUploadError(result.error || "Erro ao fazer upload da imagem");
      }
    } catch (error) {
      console.error("Erro no upload:", error);
      setUploadError("Erro ao fazer upload da imagem");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    onImageUpload("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && "*"}
      </label>

      {/* Seletor de tipo de página */}
      {showPageTypeSelector && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Tipo de Página
          </label>
          <select
            value={selectedPageType}
            onChange={(e: any) => setSelectedPageType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="sobre">Sobre</option>
            <option value="projetos">Projetos</option>
            <option value="publicacoes">Publicações</option>
            <option value="equipe">Equipe</option>
            <option value="galeria">Galeria</option>
            <option value="geral">Geral</option>
          </select>
          <p className="text-xs text-gray-500">
            A imagem será organizada na pasta correspondente com data e mês
          </p>
        </div>
      )}

      <div className="space-y-4">
        {/* Preview da imagem */}
        {previewUrl && (
          <div className="relative">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg border border-gray-300"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              ×
            </button>
          </div>
        )}

        {/* Área de upload */}
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {isUploading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <span className="text-sm text-gray-600">
                    Fazendo upload...
                  </span>
                </div>
              ) : (
                <>
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">
                      Clique para fazer upload
                    </span>{" "}
                    ou arraste e solte
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF ou WebP (máx. 5MB)
                  </p>
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileSelect}
              disabled={isUploading}
            />
          </label>
        </div>

        {/* Mensagem de erro */}
        {uploadError && (
          <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {uploadError}
          </div>
        )}

        {/* Informações adicionais */}
        <p className="text-xs text-gray-500">
          A imagem será salva localmente no servidor na pasta:{" "}
          <strong>
            uploads/{selectedPageType}/{new Date().getFullYear()}/
            {String(new Date().getMonth() + 1).padStart(2, "0")}-
            {new Date().toLocaleString("pt-BR", { month: "long" })}
          </strong>
          . Formatos aceitos: JPEG, PNG, GIF, WebP. Tamanho máximo: 5MB.
        </p>
      </div>
    </div>
  );
}
