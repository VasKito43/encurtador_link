'use client'

import React, { useEffect, useState } from 'react';
import LinkCard, { Link as LinkType } from './components/LinkCard';

const Home: React.FC = () => {
  const apiUrl: string = process.env.NEXT_PUBLIC_API_URL || 'https://crud-mail.onrender.com/';
  const [title, setTitle] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [links, setLinks] = useState<LinkType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function fetchLinks() {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/links`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: LinkType[] = await res.json();
      setLinks(data);
    } catch (err) {
      console.error('Erro ao buscar links:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleShorten(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!url) {
      alert('Informe uma URL válida');
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/api/links`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, url }),
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => null);
        console.error('Erro criando link:', res.status, errText);
        alert('Erro criando link');
        return;
      }

      setTitle('');
      setUrl('');
      await fetchLinks();
    } catch (err) {
      console.error('Erro na requisição:', err);
      alert('Erro criando link');
    }
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <header className="text-center mb-8">
        <div className="inline-flex items-center gap-3">
          <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 14L14 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 7h10v10H7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <h1 className="text-2xl font-bold">Encurtador de Links</h1>
        </div>
        <p className="text-sm text-slate-500 mt-2">Transforme links longos em URLs curtas e fáceis de compartilhar</p>
      </header>

      <section className="bg-white shadow-sm rounded-lg p-6 mb-6">
        <form onSubmit={handleShorten} className="space-y-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Legenda do link (ex: Meu portfólio)"
            className="w-full border border-slate-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />

          <div className="flex gap-3">
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://exemplo.com/sua-url..."
              className="flex-1 border border-slate-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
            >
              Encurtar
            </button>
          </div>
        </form>
      </section>

      <h2 className="text-lg font-semibold mb-4">Meus Links</h2>

      {loading ? (
        <div className="p-6 bg-white rounded-lg shadow-sm">Carregando...</div>
      ) : (
        <>
          {links.length === 0 ? (
            <div className="p-6 bg-white rounded-lg shadow-sm text-slate-500">Nenhum link criado.</div>
          ) : (
            <div className="space-y-4">
              {links.map((l) => (
                <LinkCard key={l.id} link={l} apiUrl={apiUrl} onDeleted={fetchLinks} onUpdated={fetchLinks} />
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default Home;
