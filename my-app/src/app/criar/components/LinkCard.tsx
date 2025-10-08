'use client'

import React, { useState } from 'react';

export interface Link {
  id: number;
  code: string;
  title?: string | null;
  url: string;
  visits?: number;
  created_at: string;
}

interface LinkCardProps {
  link: Link;
  apiUrl: string;
  onDeleted?: () => void;
  onUpdated?: () => void;
}

export default function LinkCard({ link, apiUrl, onDeleted, onUpdated }: LinkCardProps) {
  const [editing, setEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(link.title ?? '');
  const [url, setUrl] = useState<string>(link.url ?? '');
  const [saving, setSaving] = useState<boolean>(false);

  const shortUrl = `${apiUrl.replace(/\/$/, '')}/r/${link.code}`;

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch(`${apiUrl}/api/links/${link.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, url }),
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => null);
        console.error('Erro ao salvar:', res.status, txt);
        window.alert('Erro ao salvar');
        return;
      }

      setEditing(false);
      onUpdated && onUpdated();
    } catch (err) {
      console.error('Erro na requisição de salvar:', err);
      window.alert('Erro ao salvar');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm('Deseja excluir este link?')) return;
    try {
      const res = await fetch(`${apiUrl}/api/links/${link.id}`, { method: 'DELETE' });
      if (res.ok) {
        onDeleted && onDeleted();
      } else {
        const txt = await res.text().catch(() => null);
        console.error('Erro ao deletar:', res.status, txt);
        window.alert('Erro ao deletar');
      }
    } catch (err) {
      console.error('Erro na requisição de deletar:', err);
      window.alert('Erro ao deletar');
    }
  }

  async function handleCopy() {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shortUrl);
      } else {
        const el = document.createElement('textarea');
        el.value = shortUrl;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      }
      // tooltip substitute
      const original = document.title;
      document.title = 'Copiado!';
      setTimeout(() => (document.title = original), 900);
    } catch (err) {
      console.error('Erro ao copiar:', err);
      window.alert('Não foi possível copiar o link automaticamente');
    }
  }

  return (
    <article className="bg-white rounded-lg shadow-sm p-4">
      {editing ? (
        <div className="space-y-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Legenda do link"
            className="w-full border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://exemplo.com/..."
            className="w-full border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              {saving ? 'Salvando...' : 'Salvar'}
            </button>
            <button
              onClick={() => setEditing(false)}
              className="px-3 py-2 bg-slate-100 rounded-md hover:bg-slate-200 transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-start gap-4">
            <div className="min-w-0">
              <h3 className="font-semibold text-slate-800 truncate">{link.title ?? 'Sem título'}</h3>
              <a
                className="text-blue-600 font-medium text-sm break-words"
                href={shortUrl}
                target="_blank"
                rel="noreferrer"
              >
                {shortUrl}
              </a>
              <div className="text-xs text-slate-500 mt-1 break-words">{link.url}</div>
            </div>

            <div className="text-right">
              <div className="text-xs text-slate-500">visitas</div>
              <div className="font-semibold">{link.visits ?? 0}</div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="text-xs text-slate-500">Criado em {new Date(link.created_at).toLocaleString()}</div>
            <div className="flex items-center gap-2">
              <button onClick={handleCopy} className="px-2 py-1 text-sm bg-slate-100 rounded-md hover:bg-slate-200">Copiar</button>
              <button onClick={() => setEditing(true)} className="px-2 py-1 text-sm bg-slate-100 rounded-md hover:bg-slate-200">Editar</button>
              <button onClick={handleDelete} className="px-2 py-1 text-sm bg-red-50 text-red-600 rounded-md hover:bg-red-100">Excluir</button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
