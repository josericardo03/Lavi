# 📁 Sistema de Upload Organizado por Data e Página

## 🎯 **Objetivo**

Organizar automaticamente as imagens enviadas por upload em pastas separadas por:

- **Tipo de página** (sobre, projetos, publicações, equipe, galeria)
- **Ano** (2024, 2025, etc.)
- **Mês** (01-janeiro, 02-fevereiro, etc.)

## 🗂️ **Estrutura de Pastas Criada**

```
public/uploads/
├── sobre/
│   ├── 2024/
│   │   ├── 01-janeiro/
│   │   ├── 02-fevereiro/
│   │   ├── 03-marco/
│   │   └── ...
│   └── 2025/
│       └── ...
├── projetos/
│   ├── 2024/
│   │   ├── 01-janeiro/
│   │   └── ...
│   └── 2025/
├── publicacoes/
│   └── ...
├── equipe/
│   └── ...
└── galeria/
    └── ...
```

## 🚀 **Como Usar**

### **1. Componente Básico (Sem Seleção de Página)**

```tsx
import ImageUpload from "@/app/Components/ImageUpload";

<ImageUpload
  onImageUpload={setImageUrl}
  currentImageUrl={imageUrl}
  label="Upload de Imagem"
  pageType="sobre" // Define automaticamente a pasta
  required={true}
/>;
```

### **2. Componente com Seletor de Página**

```tsx
<ImageUpload
  onImageUpload={setImageUrl}
  currentImageUrl={imageUrl}
  label="Upload de Imagem"
  showPageTypeSelector={true} // Mostra dropdown para selecionar página
  required={true}
/>
```

### **3. Exemplo Completo**

```tsx
"use client";
import { useState } from "react";
import ImageUpload from "@/app/Components/ImageUpload";

export default function MinhaPagina() {
  const [imagem, setImagem] = useState("");

  return (
    <div>
      <h1>Minha Página</h1>

      <ImageUpload
        onImageUpload={setImagem}
        currentImageUrl={imagem}
        label="Imagem Principal"
        pageType="sobre"
        showPageTypeSelector={true}
        required={true}
      />

      {imagem && (
        <div>
          <p>Imagem carregada:</p>
          <img src={imagem} alt="Preview" />
        </div>
      )}
    </div>
  );
}
```

## 🔧 **Propriedades do Componente**

| Propriedade            | Tipo                    | Padrão               | Descrição                                  |
| ---------------------- | ----------------------- | -------------------- | ------------------------------------------ |
| `onImageUpload`        | `(url: string) => void` | -                    | Callback chamado quando upload é concluído |
| `currentImageUrl`      | `string`                | `""`                 | URL atual da imagem (para preview)         |
| `label`                | `string`                | `"Upload de Imagem"` | Rótulo do campo                            |
| `required`             | `boolean`               | `false`              | Se o campo é obrigatório                   |
| `pageType`             | `string`                | `"geral"`            | Tipo da página (sobre, projetos, etc.)     |
| `showPageTypeSelector` | `boolean`               | `false`              | Se deve mostrar seletor de tipo de página  |

## 📋 **Tipos de Página Disponíveis**

- **`sobre`** → `uploads/sobre/ano/mes-nome/`
- **`projetos`** → `uploads/projetos/ano/mes-nome/`
- **`publicacoes`** → `uploads/publicacoes/ano/mes-nome/`
- **`equipe`** → `uploads/equipe/ano/mes-nome/`
- **`galeria`** → `uploads/galeria/ano/mes-nome/`
- **`geral`** → `uploads/geral/ano/mes-nome/`

## 📅 **Formato de Data**

- **Ano:** 2024, 2025, etc.
- **Mês:** 01-janeiro, 02-fevereiro, 03-marco, etc.
- **Nome do mês:** Em português brasileiro

## 🎨 **Exemplo de Uso nas Páginas Admin**

### **Página Sobre**

```tsx
<ImageUpload
  onImageUpload={setImagemSobre}
  currentImageUrl={imagemSobre}
  label="Imagem da Página Sobre"
  pageType="sobre"
  required={true}
/>
```

### **Página Projetos**

```tsx
<ImageUpload
  onImageUpload={setImagemProjeto}
  currentImageUrl={imagemProjeto}
  label="Imagem do Projeto"
  pageType="projetos"
  required={true}
/>
```

### **Página Publicações**

```tsx
<ImageUpload
  onImageUpload={setImagemPublicacao}
  currentImageUrl={imagemPublicacao}
  label="Imagem da Publicação"
  pageType="publicacoes"
  required={true}
/>
```

## 🔍 **URLs Geradas**

Após o upload, as imagens ficarão disponíveis em URLs como:

- `/uploads/sobre/2024/12-dezembro/1703123456789-abc123.jpg`
- `/uploads/projetos/2024/12-dezembro/1703123456789-def456.png`
- `/uploads/equipe/2024/12-dezembro/1703123456789-ghi789.webp`

## ⚠️ **Validações**

- **Tipos permitidos:** JPEG, JPG, PNG, GIF, WebP
- **Tamanho máximo:** 5MB
- **Campo obrigatório:** `pageType` deve ser especificado
- **Formato de nome:** `timestamp-randomstring.extensao`

## 🚀 **Benefícios**

1. **Organização automática** por tipo de conteúdo
2. **Separação temporal** por ano e mês
3. **Facilita backup** e manutenção
4. **Evita conflitos** de nomes de arquivo
5. **Estrutura clara** para desenvolvedores
6. **URLs organizadas** e previsíveis

## 🔧 **Personalização**

Para adicionar novos tipos de página, edite o componente `ImageUpload.tsx`:

```tsx
<select
  value={selectedPageType}
  onChange={(e) => setSelectedPageType(e.target.value)}
>
  <option value="sobre">Sobre</option>
  <option value="projetos">Projetos</option>
  <option value="publicacoes">Publicações</option>
  <option value="equipe">Equipe</option>
  <option value="galeria">Galeria</option>
  <option value="geral">Geral</option>
  <option value="novo-tipo">Novo Tipo</option> {/* Adicione aqui */}
</select>
```

## 📝 **Notas Importantes**

- As pastas são criadas automaticamente se não existirem
- O sistema usa `fs/promises` para operações assíncronas
- Todas as imagens são validadas antes do upload
- O nome do arquivo é único (timestamp + string aleatória)
- As pastas seguem o padrão brasileiro de nomes de meses
