// Interfaces para o banco de dados
export interface Equipe {
  id: string;
  nome: string;
  descricao?: string;
  tipo?: string;
  email?: string;
  foto?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Galeria {
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

export interface Legislacao {
  id: string;
  title: string;
  content?: string;
  links?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Orientacao {
  id: string;
  title: string;
  content?: string;
  links?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Artefatos {
  id: string;
  title: string;
  content?: string;
  links?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Contatos {
  id: string;
  nome: string;
  email: string;
  assunto?: string;
  descricao?: string;
  status: string;
  createdAt: Date;
}

export interface Usuarios {
  id: string;
  nome: string;
  email: string;
  senhaHash: string;
  role: string;
  ativo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Uploads {
  id: string;
  nomeOriginal: string;
  nomeArquivo: string;
  caminho: string;
  tipo?: string;
  tamanho?: number;
  mimeType?: string;
  createdAt: Date;
}
