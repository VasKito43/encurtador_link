"use client";

import React from "react";
import type { LinkItem } from "../types/link";

type Props = {
  link: LinkItem;
  onCopy: (link: LinkItem) => Promise<void> | void;
  onEdit: (link: LinkItem) => void;
  onDelete: (id: string | number) => Promise<void> | void;
};

export default function LinkCard({ link, onCopy, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-semibold text-slate-800 truncate">{link.title}</h3>

          <a href={link.shortUrl} target="_blank" rel="noreferrer" className="text-blue-600 text-sm break-words">
            {link.shortUrl}
          </a>

          <div className="text-xs text-slate-500 mt-1 break-words">{link.originalUrl}</div>
        </div>

        <div className="text-right">
          <div className="text-xs text-neutral-800"><strong>Visitas</strong></div>
          <div className="font-semibold text-blue-300">{link.visits ?? 0}</div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="text-xs text-slate-500">Criado em {new Date(link.createdAt).toLocaleString()}</div>
        <div className="flex items-center gap-2">
          <button onClick={() => onCopy(link)} className="px-2 py-1 bg-green-400 text-white hover:brightness-90 cursor-pointer rounded text-sm">
            Copiar
          </button>
          <button onClick={() => onEdit(link)} className="px-2 py-1 bg-blue-600 text-white hover:brightness-90 cursor-pointer rounded text-sm">
            Editar
          </button>
          <button onClick={() => onDelete(link.id)} className="px-2 py-1 bg-red-600 text-white hover:brightness-90 cursor-pointer rounded text-sm">
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
