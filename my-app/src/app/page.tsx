// src/app/page.tsx
import Link from "next/link";
import React from "react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-3xl text-center">
        <div className="inline-flex items-center justify-center gap-3 mb-6">
          <svg
            className="w-12 h-12 scale-200 text-blue-600"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path d="M10 14L14 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7 7h10v10H7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">
          Encurtador Simples e Rápido
        </h1>

        <p className="text-lg text-slate-600 mb-8">
          Gere URLs curtas, acompanhe cliques e organize seus links com uma interface leve e prática.
          Ideal para compartilhar em redes sociais, mensagens e campanhas.
        </p>

        <div className="flex items-center justify-center gap-4 mb-10">
          <Link
            href="/painel-gerenciamento"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            Abrir painel
          </Link>
        </div>

        <section id="como-funciona" className="bg-white rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold text-slate-800 mb-3">Como funciona</h2>

          <ul className="text-slate-600 space-y-3 leading-relaxed">
            <li>
              <strong className="text-slate-800">Encurtar:</strong> cole sua URL longa e gere um código curto instantaneamente.
            </li>
            <li>
              <strong className="text-slate-800">Gerenciar:</strong> no painel você pode editar legendas, ver cliques e excluir links.
            </li>
            <li>
              <strong className="text-slate-800">Compartilhar:</strong> os links curtos podem ser utilizados em qualquer lugar — redes, e-mails e mensagens.
            </li>
          </ul>

          <p className="text-sm text-slate-500 mt-4">
            Este é um projeto focado em usabilidade e simplicidade. Clique no painel para começar a usar.
          </p>
        </section>
      </div>
    </main>
  );
}
