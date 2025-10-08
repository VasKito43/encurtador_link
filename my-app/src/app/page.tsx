'use client';

import React, { useState } from 'react';

export default function PainelGerenciamento() {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  // aqui não há lógica, apenas interface visual
  return (
    <main className="max-w-4xl mx-auto p-6">
      {/* Cabeçalho */}
      <header className="text-center mb-8">
        <div className="inline-flex items-center gap-3">
          <svg
            className="w-8 h-8 text-blue-600"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 14L14 10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7 7h10v10H7z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h1 className="text-2xl font-bold">Painel de Gerenciamento</h1>
        </div>
        <p className="text-sm text-slate-500 mt-2">
          Visualize e gerencie seus links encurtados
        </p>
      </header>


      <div className="space-y-4">
        {/* Card exemplo */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between gap-4">
            <div className="min-w-0">
              <h3 className="font-semibold text-slate-800 truncate">Meu Portfólio</h3>
              <a
                href="#"
                className="text-blue-600 text-sm break-words"
              >
                http://encurt.ly/abc123
              </a>
              <div className="text-xs text-slate-500 mt-1 break-words">
                https://meu-portfolio.com
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs text-slate-500">visitas</div>
              <div className="font-semibold">32</div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="text-xs text-slate-500">
              Criado em 08/10/2025 10:00
            </div>
            <div className="flex items-center gap-2">
              <button className="px-2 py-1 bg-gray-100 rounded text-sm">
                Copiar
              </button>
              <button className="px-2 py-1 bg-gray-100 rounded text-sm">
                Editar
              </button>
              <button className="px-2 py-1 bg-red-50 text-red-600 rounded text-sm hover:bg-red-100">
                Excluir
              </button>
            </div>
          </div>
        </div>

        {/* Outro card exemplo */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between gap-4">
            <div className="min-w-0">
              <h3 className="font-semibold text-slate-800 truncate">
                Tutorial React
              </h3>
              <a
                href="#"
                className="text-blue-600 text-sm break-words"
              >
                http://encurt.ly/xyz789
              </a>
              <div className="text-xs text-slate-500 mt-1 break-words">
                https://youtube.com/watch?v=abcxyz
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs text-slate-500">visitas</div>
              <div className="font-semibold">10</div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="text-xs text-slate-500">
              Criado em 07/10/2025 14:42
            </div>
            <div className="flex items-center gap-2">
              <button className="px-2 py-1 bg-gray-100 rounded text-sm">
                Copiar
              </button>
              <button className="px-2 py-1 bg-gray-100 rounded text-sm">
                Editar
              </button>
              <button className="px-2 py-1 bg-red-50 text-red-600 rounded text-sm hover:bg-red-100">
                Excluir
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
