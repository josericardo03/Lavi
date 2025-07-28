import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Logout realizado com sucesso",
  });

  // Limpar cookie do token
  response.cookies.delete("adminToken");

  return response;
}
