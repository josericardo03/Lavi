"use client";
import { useEffect, useRef } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Digite o conteúdo...",
  className = "",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
      onChange(editorRef.current.innerHTML);
    }
  };

  const insertImage = () => {
    const url = prompt("Digite a URL da imagem:");
    if (url) {
      formatText("insertImage", url);
    }
  };

  const insertLink = () => {
    const url = prompt("Digite a URL do link:");
    if (url) {
      formatText("createLink", url);
    }
  };

  const insertTable = () => {
    const rows = prompt("Número de linhas:");
    const cols = prompt("Número de colunas:");

    if (rows && cols) {
      const numRows = parseInt(rows);
      const numCols = parseInt(cols);

      let tableHTML =
        '<table border="1" style="border-collapse: collapse; width: 100%; margin: 16px 0;">';

      // Cabeçalho
      tableHTML += "<thead><tr>";
      for (let j = 0; j < numCols; j++) {
        tableHTML +=
          '<th style="border: 1px solid #ddd; padding: 8px; background-color: #f5f5f5;">Cabeçalho</th>';
      }
      tableHTML += "</tr></thead>";

      // Corpo
      tableHTML += "<tbody>";
      for (let i = 0; i < numRows; i++) {
        tableHTML += "<tr>";
        for (let j = 0; j < numCols; j++) {
          tableHTML +=
            '<td style="border: 1px solid #ddd; padding: 8px;">Conteúdo</td>';
        }
        tableHTML += "</tr>";
      }
      tableHTML += "</tbody></table>";

      if (editorRef.current) {
        document.execCommand("insertHTML", false, tableHTML);
        onChange(editorRef.current.innerHTML);
      }
    }
  };

  const toolbarButtons = [
    { command: "bold", icon: "B", title: "Negrito" },
    { command: "italic", icon: "I", title: "Itálico" },
    { command: "underline", icon: "U", title: "Sublinhado" },
    { command: "strikeThrough", icon: "S", title: "Tachado" },
    { command: "separator" },
    { command: "formatBlock", value: "h1", icon: "H1", title: "Título 1" },
    { command: "formatBlock", value: "h2", icon: "H2", title: "Título 2" },
    { command: "formatBlock", value: "h3", icon: "H3", title: "Título 3" },
    { command: "formatBlock", value: "p", icon: "P", title: "Parágrafo" },
    { command: "separator" },
    { command: "justifyLeft", icon: "⬅", title: "Alinhar à esquerda" },
    { command: "justifyCenter", icon: "↔", title: "Centralizar" },
    { command: "justifyRight", icon: "➡", title: "Alinhar à direita" },
    { command: "separator" },
    {
      command: "insertUnorderedList",
      icon: "•",
      title: "Lista com marcadores",
    },
    { command: "insertOrderedList", icon: "1.", title: "Lista numerada" },
    { command: "separator" },
    {
      command: "custom",
      action: insertLink,
      icon: "🔗",
      title: "Inserir link",
    },
    {
      command: "custom",
      action: insertImage,
      icon: "🖼",
      title: "Inserir imagem",
    },
    {
      command: "custom",
      action: insertTable,
      icon: "⊞",
      title: "Inserir tabela",
    },
    { command: "separator" },
    { command: "removeFormat", icon: "🧹", title: "Limpar formatação" },
  ];

  return (
    <div
      className={`border border-gray-300 rounded-lg overflow-hidden ${className}`}
    >
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-3 flex flex-wrap gap-1">
        {toolbarButtons.map((button, index) => {
          if (button.command === "separator") {
            return (
              <div key={index} className="w-px bg-gray-300 mx-2 my-1"></div>
            );
          }

          return (
            <button
              key={index}
              type="button"
              className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              title={button.title}
              onClick={() => {
                if (button.command === "custom" && button.action) {
                  button.action();
                } else {
                  formatText(button.command, button.value);
                }
              }}
            >
              {button.icon}
            </button>
          );
        })}
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        className="min-h-[300px] p-4 prose prose-sm max-w-none focus:outline-none"
        onInput={handleInput}
        data-placeholder={placeholder}
        style={{
          minHeight: "300px",
          fontSize: "14px",
          lineHeight: "1.5",
        }}
        suppressContentEditableWarning={true}
      />

      {/* Dicas de Uso */}
      <div className="bg-gray-50 border-t border-gray-300 px-4 py-2 text-xs text-gray-600">
        <strong>Dicas:</strong> Use Ctrl+B para negrito, Ctrl+I para itálico.
        Cole imagens diretamente ou use o botão 🖼. Para tabelas, use o botão ⊞.
      </div>
    </div>
  );
}
