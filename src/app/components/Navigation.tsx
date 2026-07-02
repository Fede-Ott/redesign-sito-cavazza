import { useEffect, useState } from 'react';
import { Menu, X, Search } from 'lucide-react';
import logoUrl from '@/assets/logo.svg';
import logoWhiteUrl from '@/assets/logo-white.svg';

interface NavItem {
  label: string;
  href: string;
  description?: string;
  onClick?: () => void;
}

interface NavigationProps {
  items: NavItem[];
  onLogoClick?: () => void;
  onSearch?: (query: string) => void;
  showSearchSubBar?: boolean;
  navigationStateKey?: string;
}

function SearchBar({ compact = false, id = 'search-main', onSubmit }: { compact?: boolean; id?: string; onSubmit?: (query: string) => void }) {
  const [searchQuery, setSearchQuery] = useState('');

  const triggerSearch = (query: string) => {
    const ev = new CustomEvent('site-search', { detail: { query } });
    window.dispatchEvent(ev);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;
    if (onSubmit) {
      onSubmit(query);
    } else {
      triggerSearch(query);
    }
  };

  return (
    <form onSubmit={handleSearch} role="search" aria-label="Cerca nel sito" className={compact ? 'w-full' : ''}>
      <div className="relative flex items-center">
        <label htmlFor={id} className="sr-only">Cerca nel sito</label>
        <input
          id={id}
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cerca nel sito..."
          className="border-2 px-4 py-2 pr-10 min-h-[44px] bg-background text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors rounded-[8px]"
          style={{ borderColor: 'var(--search-border-color, #135DCD)', width: compact ? '100%' : '240px' }}
          aria-label="Campo di ricerca"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 min-h-[32px] min-w-[32px] flex items-center justify-center transition-colors"
            style={{ color: 'var(--search-border-color, #135DCD)' }}
          aria-label="Esegui ricerca"
        >
          <Search className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}

export { SearchBar };

export function Navigation({ items, onLogoClick, onSearch, showSearchSubBar = true, navigationStateKey }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [logoSrc, setLogoSrc] = useState(logoUrl);

  useEffect(() => {
    const root = document.documentElement;

    const syncLogo = () => {
      const useWhiteLogo = root.classList.contains('dark') || root.classList.contains('accessibility-dark');
      setLogoSrc(useWhiteLogo ? logoWhiteUrl : logoUrl);
    };

    syncLogo();
    const observer = new MutationObserver(syncLogo);
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [navigationStateKey]);

  return (
    <nav
      className="bg-white"
      role="navigation"
      aria-label="Navigazione principale"
      style={showSearchSubBar ? { borderBottom: '2px solid #D75220' } : undefined}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main nav row */}
        <div className="flex items-center justify-between min-h-20 py-4 gap-4">
          <div className="flex items-center">
            <a
              href="#home"
              className="flex items-center gap-3 no-underline group"
              onClick={(e) => {
                setIsOpen(false);
                if (onLogoClick) {
                  e.preventDefault();
                  onLogoClick();
                }
              }}
            >
              <img src={logoSrc} alt="Istituto Cavazza" className="w-12 h-12 object-contain flex-shrink-0" />
              <div className="hidden sm:block">
                <div className="text-xl fo leading-tight font-bold text-[#d75220] dark:text-white">Istituto Francesco Cavazza</div>
                <div className="text-sm text-muted-foreground dark:text-white max-[900px]:hidden">Per non vedenti e ipovedenti</div>
              </div>
            </a>
          </div>

          {/* Desktop navigation items */}
          <div className="hidden md:flex items-center gap-1 flex-1 justify-end">
            {items.slice(0, 5).map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-3 min-h-[44px] flex items-center no-underline hover:bg-secondary rounded-sm transition-colors"
                title={item.description}
                onClick={(e) => {
                  if (item.onClick) {
                    e.preventDefault();
                    item.onClick();
                  }
                }}
              >
                <span className="font-bold">{item.label}</span>
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Chiudi menu' : 'Apri menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Desktop search sub-bar — shown only when no breadcrumbs row */}
        {showSearchSubBar && (
          <div className="hidden md:flex items-center justify-end pb-3">
            <SearchBar id="search-nav" onSubmit={onSearch} />
          </div>
        )}

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="mb-3">
              <SearchBar
                compact
                id="search-mobile"
                onSubmit={(query) => {
                  setIsOpen(false);
                  onSearch?.(query);
                }}
              />
            </div>
            <div className="flex flex-col gap-1">
              {items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-4 py-3 min-h-[44px] flex flex-col no-underline hover:bg-secondary rounded-sm"
                  onClick={(e) => {
                    setIsOpen(false);
                    if (item.onClick) {
                      e.preventDefault();
                      item.onClick();
                    }
                  }}
                >
                  <span className="font-bold">{item.label}</span>
                  {item.description && (
                    <span className="text-sm text-muted-foreground mt-1">{item.description}</span>
                  )}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
