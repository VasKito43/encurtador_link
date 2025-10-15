"use client";

import React, { useEffect, useState } from "react";
import { getLinks, createLink, updateLink, deleteLink } from "../lib/api";
import type { LinkItem } from "../types/link";
import LinkCard from "../components/LinkCards";

export default function PainelGerenciamentoPage() {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState<string>("");   
  const [url, setUrl] = useState<string>("");
  const [editingId, setEditingId] = useState<string | number | null>(null);

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function refresh() {
    setLoading(true);
    setError(null);
    try {
      const data = await getLinks();
      setLinks(data);
    } catch (e: any) {
      console.error(e);
      setError(e?.response?.data?.message || e?.message || "Erro ao buscar links");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(e?: React.FormEvent) {
    e?.preventDefault();
    if (!title.trim() || !url.trim()) return setError("Título e URL são obrigatórios");

    setSaving(true);
    setError(null);
    try {
      if (editingId) {
        const updated = await updateLink(editingId, { title, originalUrl: url });
        setLinks((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
        setEditingId(null);
      } else {
        const created = await createLink({ title, originalUrl: url });
        setLinks((prev) => [created, ...prev]);
      }
      setTitle("");
      setUrl("");
    } catch (e: any) {
      console.error(e);
      setError(e?.response?.data?.message || e?.message || "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  }

  function handleEdit(link: LinkItem) {
    setEditingId(link.id);
    setTitle(link.title);
    setUrl(link.originalUrl);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id: string | number) {
    if (!confirm("Tem certeza que deseja excluir este link?")) return;
    try {
      await deleteLink(id);
      setLinks((prev) => prev.filter((l) => l.id !== id));
    } catch (e: any) {
      console.error(e);
      alert(e?.response?.data?.message || e?.message || "Erro ao excluir");
    }
  }

  async function handleCopy(link: LinkItem) {
    try {
      await navigator.clipboard.writeText(link.shortUrl);
      const el = document.createElement("div");
      el.textContent = "Copiado!";
      Object.assign(el.style, {
        position: "fixed",
        right: "16px",
        top: "16px",
        padding: "8px 12px",
        background: "#111827",
        color: "white",
        borderRadius: "6px",
        zIndex: "9999",
      });
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1200);
    } catch {
      alert("Erro ao copiar");
    }
  }

  return (
    <main className="w-screen h-screen bg-white mx-auto p-6">
      <header className="text-center mb-8">
        <div className="inline-flex items-center gap-3">
          <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 14L14 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7 7h10v10H7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <h1 className="text-2xl font-bold text-black">Painel de Gerenciamento</h1>
        </div>
        <p className="text-sm text-neutral-500 mt-2">Visualize e gerencie seus links encurtados</p>
      </header>

      <section className="mb-6">
        <form onSubmit={handleSave} className="flex gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título (legenda)"
            className="flex-1 px-3 py-2 border rounded text-black"
          />
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="URL original (https://...)"
            className="flex-2 px-3 py-2 border rounded text-black"
          />
          <button type="submit" className="px-4 py-2 bg-indigo-600 hover:brightness-90 cursor-pointer text-white rounded">
            {saving ? "Salvando..." : editingId ? "Atualizar" : "Criar"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setTitle("");
                setUrl("");
              }}
              className="px-3 py-2 bg-neutral-300 text-neutral-800 hover:brightness-90 cursor-pointer rounded"
            >
              Cancelar
            </button>
          )}
        </form>
        {error && <div className="text-sm text-red-600 mt-2">{error}</div>}
      </section>

      <section className="space-y-4">
        {loading && <div className="text-neutral-600">Carregando...</div>}
        {!loading && links.length === 0 && <div className="text-center text-slate-500">Nenhum link encontrado.</div>}

        {links.map((link) => (
          <LinkCard key={link.id} link={link} onCopy={handleCopy} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </section>
    </main>
  );
}
