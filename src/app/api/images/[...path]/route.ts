import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const imagePath = params.path.join("/");
    const fullPath = join(process.cwd(), "public", "uploads", imagePath);

    // Verificar se o arquivo existe
    if (!existsSync(fullPath)) {
      return new NextResponse("Imagem não encontrada", { status: 404 });
    }

    // Ler o arquivo
    const imageBuffer = await readFile(fullPath);

    // Determinar o tipo MIME baseado na extensão
    const ext = imagePath.split(".").pop()?.toLowerCase();
    let contentType = "image/jpeg"; // padrão

    switch (ext) {
      case "png":
        contentType = "image/png";
        break;
      case "gif":
        contentType = "image/gif";
        break;
      case "webp":
        contentType = "image/webp";
        break;
      case "jpg":
      case "jpeg":
        contentType = "image/jpeg";
        break;
    }

    // Retornar a imagem com o tipo MIME correto
    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000", // Cache por 1 ano
      },
    });
  } catch (error) {
    console.error("Erro ao servir imagem:", error);
    return new NextResponse("Erro interno do servidor", { status: 500 });
  }
}
