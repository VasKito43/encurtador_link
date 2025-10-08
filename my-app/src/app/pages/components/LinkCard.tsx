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
        // fallback
        const el = document.createElement('textarea');
        el.value = shortUrl;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      }
      window.alert('Link curto copiado para a área de transferência');
    } catch (err) {
      console.error('Erro ao copiar:', err);
      window.alert('Não foi possível copiar o link automaticamente');
    }
  }

  return (
    <div className="card">
      {editing ? (
        <>
          <div style={{ marginBottom: 8 }}>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Legenda do link"
            />
          </div>
          <div style={{ marginBottom: 8 }}>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://exemplo.com/..."
            />
          </div>
          <div className="controls">
            <button className="btn small" onClick={handleSave} disabled={saving}>
              {saving ? 'Salvando...' : 'Salvar'}
            </button>
            <button className="small" onClick={() => setEditing(false)}>
              Cancelar
            </button>
          </div>
        </>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 700 }}>{link.title ?? 'Sem título'}</div>
              <a className="link-url" href={shortUrl} target="_blank" rel="noreferrer">
                {shortUrl}
              </a>
              <div className="muted" style={{ marginTop: 6, fontSize: 13 }}>
                {link.url}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="muted">visitas</div>
              <div style={{ fontWeight: 700 }}>{link.visits ?? 0}</div>
            </div>
          </div>

          <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="muted">Criado em {new Date(link.created_at).toLocaleString()}</div>
            <div className="controls">
              <button className="small" onClick={handleCopy}>
                Copiar
              </button>
              <button className="small" onClick={() => setEditing(true)}>
                Editar
              </button>
              <button className="small" onClick={handleDelete}>
                Excluir
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
