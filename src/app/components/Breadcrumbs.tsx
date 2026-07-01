import { ChevronRight, Home, Search } from 'lucide-react';
import { useState } from 'react';

interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onHomeClick: () => void;
}

export function Breadcrumbs({ items, onHomeClick }: BreadcrumbsProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  // Dispatch a global search event so the top-level App can handle navigation
  const triggerSearch = (query: string) => {
    console.debug('[Breadcrumbs] triggerSearch', query);
    const ev = new CustomEvent('site-search', { detail: { query } });
    window.dispatchEvent(ev);
  };

  return (
    <nav aria-label="Breadcrumb" className="bg-white py-3 border-b" style={{ borderBottomColor: '#D6E4FF', borderTopColor: 'transparent', borderLeftColor: 'transparent', borderRightColor: 'transparent' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Breadcrumb trail */}
          <ol className="flex flex-wrap items-center gap-2 list-none p-0 m-0 flex-1">
            <li className="flex items-center">
              <button
                onClick={onHomeClick}
                className="breadcrumb-link-button flex items-center gap-1 text-primary hover:underline font-medium min-h-[32px]"
                aria-label="Torna alla home"
              >
                <Home className="w-5 h-5" aria-hidden="true" />
                <span className="font-bold">Home</span>
              </button>
            </li>

            {items.map((item, index) => {
              const isLast = index === items.length - 1;

              return (
                <li key={index} className="flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                  {isLast ? (
                    <span className="font-bold" aria-current="page">{item.label}</span>
                  ) : item.onClick ? (
                    <button onClick={item.onClick} className="breadcrumb-link-button text-primary hover:underline min-h-[32px]">
                      {item.label}
                    </button>
                  ) : (
                    <span>{item.label}</span>
                  )}
                </li>
              );
            })}
          </ol>

          {/* Search bar aligned right, vertically centered with breadcrumbs — desktop only */}
          <div className="hidden md:flex items-center flex-shrink-0">
            <form onSubmit={(e) => { handleSearch(e); triggerSearch(searchQuery); }} role="search" aria-label="Cerca nel sito">
              <div className="relative flex items-center">
                <label htmlFor="search-breadcrumb" className="sr-only">Cerca nel sito</label>
                <input
                  id="search-breadcrumb"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cerca nel sito..."
                  className="border-2 px-4 py-2 pr-10 min-h-[40px] bg-background text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors rounded-[8px]"
                  style={{ borderColor: 'var(--search-border-color, #135DCD)', width: '240px' }}
                  aria-label="Campo di ricerca"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 min-h-[28px] min-w-[28px] flex items-center justify-center transition-colors"
                  style={{ color: 'var(--search-border-color, #135DCD)' }}
                  aria-label="Esegui ricerca"
                >
                  <Search className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
}
