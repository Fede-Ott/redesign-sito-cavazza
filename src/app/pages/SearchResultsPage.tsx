import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface ResultItem {
  id: string;
  type: string;
  title: string;
  excerpt?: string;
  link?: string;
  score?: number;
}

interface Props {
  query: string;
  results: ResultItem[];
  onBack: () => void;
}

export function SearchResultsPage({ query, results, onBack }: Props) {
  const handleNavigate = (href?: string) => {
    if (!href) return;
    const ev = new CustomEvent('site-navigate', { detail: { href } });
    window.dispatchEvent(ev);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <div className="flex justify-start mb-4">
          <button onClick={onBack} className="flex items-center gap-2 text-primary">
            <ArrowLeft className="w-4 h-4" />
            Torna alla Home
          </button>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold">Risultati ricerca per "{query}"</h1>
        </div>
      </div>

      <div className="bg-card p-6 rounded-lg">
        {results.length === 0 ? (
          <p className="text-muted-foreground">Nessun risultato trovato. Prova con un termine diverso.</p>
        ) : (
          <ul className="space-y-4">
            {results.map((r) => (
              <li key={r.id} className="border-b last:border-b-0 pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {r.link ? (
                        <button onClick={() => handleNavigate(r.link)} className="text-primary hover:underline">
                          {r.title}
                        </button>
                      ) : (
                        r.title
                      )}
                    </h3>
                    {r.excerpt && <p className="text-sm text-muted-foreground mt-2">{r.excerpt}</p>}
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">{r.type}</div>
                    {typeof r.score === 'number' && (
                      <div className="text-xs text-muted-foreground mt-1">Rilevanza: {(r.score * 100).toFixed(0)}%</div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
