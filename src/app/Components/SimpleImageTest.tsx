"use client";

export default function SimpleImageTest() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Teste Simples de Imagem</h1>

      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">
            Imagem 1: Caminho Relativo (uploads)
          </h2>
          <img
            src="/uploads/geral/2025/08-agosto/1755744121631-y2ehbd1g0y.png"
            alt="Teste 1"
            className="w-64 h-64 object-cover border-2 border-red-500"
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold">
            Imagem 2: Caminho Absoluto (uploads)
          </h2>
          <img
            src="http://localhost:3000/uploads/geral/2025/08-agosto/1755744121631-y2ehbd1g0y.png"
            alt="Teste 2"
            className="w-64 h-64 object-cover border-2 border-blue-500"
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold">
            Imagem 3: Teste Simples (uploads-test)
          </h2>
          <img
            src="/uploads-test/1755744121631-y2ehbd1g0y.png"
            alt="Teste 3"
            className="w-64 h-64 object-cover border-2 border-purple-500"
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold">
            Imagem 4: Teste Images (nova pasta)
          </h2>
          <img
            src="/images/1755744121631-y2ehbd1g0y.png"
            alt="Teste 4"
            className="w-64 h-64 object-cover border-2 border-orange-500"
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold">Imagem 5: Logo existente</h2>
          <img
            src="/LOGO-LAVI-FUNDOTRANSPARENTE.png"
            alt="Logo"
            className="w-64 h-64 object-cover border-2 border-green-500"
          />
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold">Resultado:</h3>
        <ul className="list-disc list-inside mt-2">
          <li>
            Se a Imagem 1 aparecer: O Next.js está servindo arquivos estáticos
            corretamente
          </li>
          <li>
            Se a Imagem 2 aparecer: O servidor está funcionando, mas há problema
            no Next.js
          </li>
          <li>
            Se a Imagem 3 aparecer: O Next.js está funcionando para arquivos da
            pasta public
          </li>
          <li>Se nenhuma aparecer: Há problema na configuração do servidor</li>
        </ul>
      </div>
    </div>
  );
}
