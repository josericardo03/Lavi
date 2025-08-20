"use client";
import { useState } from "react";
import ImageUpload from "./ImageUpload";

export default function ImageUploadExample() {
  const [sobreImage, setSobreImage] = useState("");
  const [projetosImage, setProjetosImage] = useState("");
  const [publicacoesImage, setPublicacoesImage] = useState("");
  const [equipeImage, setEquipeImage] = useState("");
  const [galeriaImage, setGaleriaImage] = useState("");

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Exemplo de Upload de Imagens Organizadas
      </h1>

      {/* Upload para página Sobre */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Página Sobre
        </h2>
        <ImageUpload
          onImageUpload={setSobreImage}
          currentImageUrl={sobreImage}
          label="Imagem da página Sobre"
          pageType="sobre"
          showPageTypeSelector={true}
          required={true}
        />
        {sobreImage && (
          <div className="mt-4">
            <p className="text-sm text-gray-600">URL da imagem:</p>
            <p className="text-xs text-gray-500 font-mono bg-gray-100 p-2 rounded">
              {sobreImage}
            </p>
          </div>
        )}
      </div>

      {/* Upload para página Projetos */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Página Projetos
        </h2>
        <ImageUpload
          onImageUpload={setProjetosImage}
          currentImageUrl={projetosImage}
          label="Imagem da página Projetos"
          pageType="projetos"
          showPageTypeSelector={true}
          required={true}
        />
        {projetosImage && (
          <div className="mt-4">
            <p className="text-sm text-gray-600">URL da imagem:</p>
            <p className="text-xs text-gray-500 font-mono bg-gray-100 p-2 rounded">
              {projetosImage}
            </p>
          </div>
        )}
      </div>

      {/* Upload para página Publicações */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Página Publicações
        </h2>
        <ImageUpload
          onImageUpload={setPublicacoesImage}
          currentImageUrl={publicacoesImage}
          label="Imagem da página Publicações"
          pageType="publicacoes"
          showPageTypeSelector={true}
          required={true}
        />
        {publicacoesImage && (
          <div className="mt-4">
            <p className="text-sm text-gray-600">URL da imagem:</p>
            <p className="text-xs text-gray-500 font-mono bg-gray-100 p-2 rounded">
              {publicacoesImage}
            </p>
          </div>
        )}
      </div>

      {/* Upload para página Equipe */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Página Equipe
        </h2>
        <ImageUpload
          onImageUpload={setEquipeImage}
          currentImageUrl={equipeImage}
          label="Imagem da página Equipe"
          pageType="equipe"
          showPageTypeSelector={true}
          required={true}
        />
        {equipeImage && (
          <div className="mt-4">
            <p className="text-sm text-gray-600">URL da imagem:</p>
            <p className="text-xs text-gray-500 font-mono bg-gray-100 p-2 rounded">
              {equipeImage}
            </p>
          </div>
        )}
      </div>

      {/* Upload para página Galeria */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Página Galeria
        </h2>
        <ImageUpload
          onImageUpload={setGaleriaImage}
          currentImageUrl={galeriaImage}
          label="Imagem da página Galeria"
          pageType="galeria"
          showPageTypeSelector={true}
          required={true}
        />
        {galeriaImage && (
          <div className="mt-4">
            <p className="text-sm text-gray-600">URL da imagem:</p>
            <p className="text-xs text-gray-500 font-mono bg-gray-100 p-2 rounded">
              {galeriaImage}
            </p>
          </div>
        )}
      </div>

      {/* Resumo da estrutura de pastas */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          Estrutura de Pastas Criada
        </h3>
        <div className="text-sm text-blue-800 space-y-1">
          <p>
            <strong>uploads/</strong>
          </p>
          <p className="ml-4">
            <strong>sobre/</strong>
          </p>
          <p className="ml-8">
            <strong>2024/</strong>
          </p>
          <p className="ml-12">
            <strong>12-dezembro/</strong>
          </p>
          <p className="ml-16">imagem-upload.jpg</p>

          <p className="ml-4">
            <strong>projetos/</strong>
          </p>
          <p className="ml-8">
            <strong>2024/</strong>
          </p>
          <p className="ml-12">
            <strong>12-dezembro/</strong>
          </p>
          <p className="ml-16">imagem-upload.jpg</p>

          <p className="ml-4">
            <strong>publicacoes/</strong>
          </p>
          <p className="ml-8">
            <strong>2024/</strong>
          </p>
          <p className="ml-12">
            <strong>12-dezembro/</strong>
          </p>
          <p className="ml-16">imagem-upload.jpg</p>

          <p className="ml-4">
            <strong>equipe/</strong>
          </p>
          <p className="ml-8">
            <strong>2024/</strong>
          </p>
          <p className="ml-12">
            <strong>12-dezembro/</strong>
          </p>
          <p className="ml-16">imagem-upload.jpg</p>

          <p className="ml-4">
            <strong>galeria/</strong>
          </p>
          <p className="ml-8">
            <strong>2024/</strong>
          </p>
          <p className="ml-12">
            <strong>12-dezembro/</strong>
          </p>
          <p className="ml-16">imagem-upload.jpg</p>
        </div>
      </div>
    </div>
  );
}
