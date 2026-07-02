import {
  GraduationCap,
  Users,
  BookOpen,
  Radio,
  Palette,
  Heart,
  MapPin,
  UserCircle,
  Baby,
  Briefcase,
  HeartHandshake,
  Presentation,
  ArrowRight,
  Image as ImageIcon,
  Youtube,
  Facebook,
  Twitter,
  Calendar
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { SkipLink } from './components/SkipLink';
import { AccessibilityToolbar } from './components/AccessibilityToolbar';
import { AccessibilityWidget } from './components/AccessibilityWidget';
import { Navigation } from './components/Navigation';
import { useTranslation, type Lang } from './i18n';
import { RadioPlayer } from './components/RadioPlayer';
import { Button } from './components/Button';
import { TestimonialSection } from './components/Testimonial';
import heroHome from '@/assets/hero-home.webp';
import { PersonalizedQuiz } from './components/PersonalizedQuiz';
import { WhoWeServeCard } from './components/WhoWeServeCard';
import { CounterAnimation } from './components/CounterAnimation';
import { IstitutoPage } from './pages/IstitutoPage';
import { ServiziPage } from './pages/ServiziPage';
import { FormazionePage } from './pages/FormazionePage';
import { EventiPage } from './pages/EventiPage';
import { CulturaHubPage } from './pages/CulturaHubPage';
import { BibliotecaPage } from './pages/BibliotecaPage';
import { MuseoAnterosPage } from './pages/MuseoAnterosPage';
import { MuseoTolomeoPage } from './pages/MuseoTolomeoPage';
import { RadioOltrePage } from './pages/RadioOltrePage';
import { AccessibilitaPage } from './pages/AccessibilitaPage';
import { SegnalaProblemiPage } from './pages/SegnalaProblemiPage';
import { AnterosDetailPage } from './pages/AnterosDetailPage';
import { TolomeoDetailPage } from './pages/TolomeoDetailPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { getEvents, getProjects, getNews, getPageContents } from './data/contentIndex';





const TEXT_NAV_SELECTOR = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'span',
  'p', 'li', 'dt', 'dd',
  'blockquote', 'figcaption',
  'td', 'th',
  '[data-keyboard-text]'
].join(', ');

const INTERACTIVE_ANCESTOR_SELECTOR = [
  'a', 'button', 'input', 'select', 'textarea', 'summary',
  '[role="button"]', '[role="link"]', '[role="menuitem"]'
].join(', ');

function isVisibleForKeyboardNav(element: HTMLElement): boolean {
  const styles = window.getComputedStyle(element);
  if (styles.display === 'none' || styles.visibility === 'hidden') {
    return false;
  }

  const rect = element.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
}

function applyKeyboardTextNavigation(root: HTMLElement): void {
  root.querySelectorAll<HTMLElement>('[data-text-nav="true"]').forEach((element) => {
    element.removeAttribute('data-text-nav');
    element.removeAttribute('tabindex');
    element.classList.remove('keyboard-text-focusable');
  });

  const candidates = Array.from(root.querySelectorAll<HTMLElement>(TEXT_NAV_SELECTOR));

  candidates.forEach((element) => {
    if (element.closest('[aria-hidden="true"]')) return;
    if (element.closest(INTERACTIVE_ANCESTOR_SELECTOR)) return;
    if (element.querySelector(INTERACTIVE_ANCESTOR_SELECTOR)) return;
    if (!isVisibleForKeyboardNav(element)) return;
    if (!element.textContent || !element.textContent.trim()) return;

    // Preserve explicit tabindex values already set by component authors.
    if (element.hasAttribute('tabindex')) return;

    element.setAttribute('tabindex', '0');
    element.setAttribute('data-text-nav', 'true');
    element.classList.add('keyboard-text-focusable');
  });
}

export default function App() {
  const [language, setLanguage] = useState<Lang>('it');
  const [currentPage, setCurrentPage] = useState<'home' | 'istituto' | 'servizi' | 'formazione' | 'eventi' | 'cultura' | 'accessibilita' | 'segnala-problemi' | 'search'>('home');
  const [culturaSubPage, setCulturaSubPage] = useState<'hub' | 'biblioteca' | 'anteros' | 'anteros-detail' | 'tolomeo' | 'tolomeo-detail' | 'radio'>('hub');
  const [eventiTab, setEventiTab] = useState<string>('eventi');
  const t = useTranslation(language);

  // Ascolta cambi di lingua dal widget
  useEffect(() => {
    const handleLanguageChange = () => {
      const savedLang = localStorage.getItem('site-language') as Lang;
      if (savedLang && savedLang !== language) {
        setLanguage(savedLang);
      }
    };

    // Carica lingua iniziale
    const savedLang = localStorage.getItem('site-language') as Lang;
    if (savedLang) {
      setLanguage(savedLang);
    }

    // Listener per storage changes (cross-tab)
    window.addEventListener('storage', handleLanguageChange);

    // Custom event per updates nello stesso tab
    window.addEventListener('languagechange', handleLanguageChange);

    return () => {
      window.removeEventListener('storage', handleLanguageChange);
      window.removeEventListener('languagechange', handleLanguageChange);
    };
  }, [language]);

  // Rende raggiungibili da tastiera anche i contenuti testuali non interattivi.
  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    let rafId = 0;
    const scheduleApply = () => {
      window.cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(() => applyKeyboardTextNavigation(mainContent));
    };

    scheduleApply();

    const observer = new MutationObserver(() => scheduleApply());
    observer.observe(mainContent, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  // Handler per la navigazione
  const handleNavigation = (page: 'home' | 'istituto' | 'servizi' | 'formazione' | 'eventi' | 'cultura' | 'accessibilita' | 'segnala-problemi', tabOrSection?: string) => {
    setCurrentPage(page);
    if (page === 'cultura') {
      setCulturaSubPage('hub');
    }
    if (page === 'eventi') {
      setEventiTab(tabOrSection || 'eventi');
    }
    if (tabOrSection) {
      // Scroll alla sezione dopo un breve delay per permettere il render
      setTimeout(() => {
        document.querySelector(tabOrSection)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      // Scroll to top quando si cambia pagina
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handler per la navigazione cultura
  const handleCulturaNavigation = (section: 'biblioteca' | 'anteros' | 'anteros-detail' | 'tolomeo' | 'tolomeo-detail' | 'radio') => {
    setCulturaSubPage(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCultura = () => {
    setCulturaSubPage('hub');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigation items with translations
  const navigationItems = [
    {
      label: t('nav.about'),
      href: '#istituto',
      description: language === 'it' ? 'La nostra storia' : 'Our story',
      onClick: () => handleNavigation('istituto')
    },
    {
      label: t('nav.services'),
      href: '#servizi',
      description: language === 'it' ? 'Servizi alla persona' : 'Personal services',
      onClick: () => handleNavigation('servizi')
    },
    {
      label: t('nav.training'),
      href: '#formazione',
      description: language === 'it' ? 'Scuola e corsi professionali' : 'School and professional courses',
      onClick: () => handleNavigation('formazione')
    },
    {
      label: t('nav.culture'),
      href: '#cultura',
      description: language === 'it' ? 'Musei, biblioteca e radio' : 'Museums, library and radio',
      onClick: () => handleNavigation('cultura')
    },
    {
      label: t('nav.events'),
      href: '#eventi',
      description: language === 'it' ? 'Progetti, iniziative e notizie' : 'Projects, initiatives and news',
      onClick: () => handleNavigation('eventi')
    }
  ];

  // Services with translations
  const services = [
    {
      icon: Users,
      title: t('service.personal.title'),
      description: t('service.personal.desc'),
      actionLabel: t('service.personal.action'),
      actionHref: '#servizi-dettaglio'
    },
    {
      icon: GraduationCap,
      title: t('service.training.title'),
      description: t('service.training.desc'),
      actionLabel: t('service.training.action'),
      actionHref: '#formazione-dettaglio'
    },
    {
      icon: Palette,
      title: t('service.museums.title'),
      description: t('service.museums.desc'),
      actionLabel: t('service.museums.action'),
      actionHref: '#musei-dettaglio'
    },
    {
      icon: BookOpen,
      title: t('service.library.title'),
      description: t('service.library.desc'),
      actionLabel: t('service.library.action'),
      actionHref: '#biblioteca-dettaglio'
    }
  ];

  // Events - keeping them in Italian/English but could be extended
  const upcomingEvents = [
    {
      id: '1',
      title: language === 'it' ? 'Introduzione alla Vita con Ipovisione' : 'Introduction to Life with Low Vision',
      date: language === 'it' ? 'Martedì 10 Giugno 2026' : 'Tuesday, June 10, 2026',
      time: '14:30 - 16:30',
      format: 'hybrid' as const,
      category: language === 'it' ? 'Orientamento' : 'Orientation',
      spots: 15,
      description: language === 'it'
        ? 'Corso introduttivo per persone con diagnosi recente di ipovisione. Scopri gli ausili, le strategie e il supporto disponibile.'
        : 'Introductory course for people recently diagnosed with low vision. Discover aids, strategies, and available support.'
    },
    {
      id: '2',
      title: language === 'it' ? 'Cucinare Senza Guardare - Livello Base' : 'Cooking Without Looking - Beginner Level',
      date: language === 'it' ? 'Giovedì 12 Giugno 2026' : 'Thursday, June 12, 2026',
      time: '10:00 - 12:00',
      format: 'in-person' as const,
      category: language === 'it' ? 'Autonomia' : 'Autonomy',
      spots: 8,
      description: language === 'it'
        ? 'Workshop pratico sulle tecniche di cucina per non vedenti e ipovedenti. Impara a cucinare in sicurezza e autonomia.'
        : 'Practical workshop on cooking techniques for blind and visually impaired. Learn to cook safely and independently.'
    },
    {
      id: '3',
      title: language === 'it' ? 'Tecnologie Assistive: Smartphone e Tablet' : 'Assistive Technologies: Smartphones & Tablets',
      date: language === 'it' ? 'Lunedì 16 Giugno 2026' : 'Monday, June 16, 2026',
      time: '15:00 - 17:00',
      format: 'online' as const,
      category: language === 'it' ? 'Tecnologia' : 'Technology',
      spots: 20,
      description: language === 'it'
        ? 'Impara a utilizzare le funzioni di accessibilità di iOS e Android. VoiceOver, TalkBack, ingrandimento e molto altro.'
        : 'Learn to use iOS and Android accessibility features. VoiceOver, TalkBack, magnification, and much more.'
    },
    {
      id: '4',
      title: language === 'it' ? 'Gruppo di Supporto per Familiari' : 'Support Group for Families',
      date: language === 'it' ? 'Mercoledì 18 Giugno 2026' : 'Wednesday, June 18, 2026',
      time: '18:00 - 19:30',
      format: 'hybrid' as const,
      category: language === 'it' ? 'Supporto' : 'Support',
      description: language === 'it'
        ? 'Incontro mensile per familiari e caregiver. Condividi esperienze, ricevi consigli e costruisci una rete di supporto.'
        : 'Monthly meeting for families and caregivers. Share experiences, receive advice, and build a support network.'
    }
  ];

  // Testimonials - keeping them Italian only as they're real quotes
  const testimonials = [
    {
      quote: 'Non c\'è niente che non possa fare. Con gli ausili giusti e il supporto dell\'Istituto, ho imparato a vivere in piena autonomia.',
      author: 'Marco R.',
      role: language === 'it' ? 'Partecipante al corso Orientamento e Mobilità' : 'Participant in Orientation and Mobility course'
    },
    {
      quote: 'Grazie al corso di formazione per centralinisti ho trovato un lavoro stabile. L\'Istituto Cavazza mi ha dato le competenze e la fiducia necessarie.',
      author: 'Giulia S.',
      role: language === 'it' ? 'Ex-studentessa, ora Centralinista' : 'Former student, now Switchboard Operator'
    },
    {
      quote: 'Come insegnante, la consulenza dell\'Istituto è stata fondamentale per rendere la mia classe davvero inclusiva per uno studente ipovedente.',
      author: 'Prof.ssa Elena M.',
      role: language === 'it' ? 'Insegnante Scuola Secondaria' : 'Secondary School Teacher'
    },
    {
      quote: 'Il Museo Tattile Anteros mi ha fatto riscoprire l\'arte in modo completamente nuovo. È un\'esperienza che consiglio a tutti, vedenti e non.',
      author: 'Andrea P.',
      role: language === 'it' ? 'Visitatore abituale dei musei' : 'Regular museum visitor'
    }
    ,
    {
      quote: 'Ho partecipato ai laboratori di tecnologie assistive e ho scoperto strumenti che hanno migliorato la mia vita quotidiana. Consiglio vivamente i corsi dell\'Istituto.',
      author: 'Lucia B.',
      role: language === 'it' ? 'Partecipante ai laboratori' : 'Workshop participant'
    }
  ];


  // News
  const newsItems = [
    {
      id: '1',
      title: language === 'it'
        ? 'Nuova Convenzione con la Regione Emilia-Romagna'
        : 'New Agreement with Emilia-Romagna Region',
      date: language === 'it' ? '15 Maggio 2026' : 'May 15, 2026',
      excerpt: language === 'it'
        ? 'L\'Istituto Cavazza firma una nuova convenzione con la Regione per ampliare i servizi di orientamento e mobilità su tutto il territorio regionale.'
        : 'Istituto Cavazza signs a new agreement with the Region to expand orientation and mobility services throughout the regional territory.',
      link: '#news-1'
    },
    {
      id: '2',
      title: language === 'it'
        ? 'Inaugurazione Nuovo Laboratorio di Tecnologie Assistive'
        : 'Inauguration of New Assistive Technologies Lab',
      date: language === 'it' ? '8 Maggio 2026' : 'May 8, 2026',
      excerpt: language === 'it'
        ? 'Apre il nuovo laboratorio dedicato alla formazione su ausili tecnologici di ultima generazione, con postazioni accessibili e software specializzati.'
        : 'The new laboratory dedicated to training on latest generation assistive technologies opens, with accessible workstations and specialized software.',
      link: '#news-2'
    },
    {
      id: '3',
      title: language === 'it'
        ? 'Successo per la Mostra "Arte da Toccare"'
        : 'Success for the "Art to Touch" Exhibition',
      date: language === 'it' ? '1 Maggio 2026' : 'May 1, 2026',
      excerpt: language === 'it'
        ? 'Oltre 500 visitatori hanno partecipato alla mostra tattile presso il Museo Anteros, confermando il successo dell\'iniziativa culturale inclusiva.'
        : 'Over 500 visitors participated in the tactile exhibition at the Anteros Museum, confirming the success of the inclusive cultural initiative.',
      link: '#news-3'
    }
  ];

  // Search state and results
  const [searchQueryState, setSearchQueryState] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{ id: string; type: string; title: string; excerpt?: string; link?: string }>>([]);

  // Listen for global search events dispatched by components (Breadcrumbs)
  useEffect(() => {
    const handler = (e: any) => {
      const q = String(e?.detail?.query || '').trim();
      console.debug('[App] site-search received:', q);
      setSearchQueryState(q);
      if (!q) {
        setSearchResults([]);
        setCurrentPage('home');
        return;
      }

      const lower = q.toLowerCase();
      const results: Array<{ id: string; type: string; title: string; excerpt?: string; link?: string; score?: number }> = [];

      // Simple Levenshtein distance for fuzzy matching
      const levenshtein = (a: string, b: string) => {
        const m = a.length, n = b.length;
        const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
        for (let i = 0; i <= m; i++) dp[i][0] = i;
        for (let j = 0; j <= n; j++) dp[0][j] = j;
        for (let i = 1; i <= m; i++) {
          for (let j = 1; j <= n; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
          }
        }
        return dp[m][n];
      };

      const scoreText = (hay: string, needle: string) => {
        hay = hay.toLowerCase();
        needle = needle.toLowerCase();
        if (!needle) return 0;
        if (hay.includes(needle)) return 1.0;
        // approximate: normalize and compute levenshtein ratio
        const distance = levenshtein(hay, needle);
        const maxLen = Math.max(hay.length, needle.length);
        if (maxLen === 0) return 0;
        const ratio = 1 - distance / maxLen; // closer to 1 is better
        return Math.max(0, ratio);
      };

      // Search navigation items
      navigationItems.forEach((nav, idx) => {
        const label = String(nav.label || '');
        const desc = String(nav.description || '');
        const s = Math.max(scoreText(label, q), scoreText(desc, q));
        if (s > 0.25) results.push({ id: `page-${idx}`, type: 'page', title: label, excerpt: desc, link: nav.href, score: s });
      });

      // Search news
      const contentNews = getNews(language as any);
      contentNews.forEach((n) => {
        const title = String(n.title || '');
        const excerpt = String(n.excerpt || '');
        const s = Math.max(scoreText(title, q), scoreText(excerpt, q));
        if (s > 0.2) results.push({ id: `news-${n.id}`, type: 'news', title, excerpt, link: `#news-${n.id}`, score: s });
      });

      // Search testimonials
      testimonials.forEach((titem, i) => {
        const quote = String(titem.quote || '');
        const author = String(titem.author || '');
        const s = Math.max(scoreText(quote, q), scoreText(author, q));
        if (s > 0.2) results.push({ id: `test-${i}`, type: 'testimonial', title: author, excerpt: quote, score: s });
      });

      // Search events and projects
      const events = getEvents(language as any);
      events.forEach((ev) => {
        const title = String(ev.title || '');
        const desc = String(ev.description || '');
        const cat = String(ev.category || '');
        const s = Math.max(scoreText(title, q), scoreText(desc, q), scoreText(cat, q));
        if (s > 0.2) results.push({ id: `event-${ev.id}`, type: 'event', title, excerpt: desc, link: `#event-${ev.id}`, score: s });
      });

      const projects = getProjects(language as any);
      projects.forEach((p) => {
        const title = String(p.title || '');
        const desc = String(p.description || '') + ' ' + String(p.objective || '');
        const area = String(p.area || '');
        const s = Math.max(scoreText(title, q), scoreText(desc, q), scoreText(area, q));
        if (s > 0.2) results.push({ id: `project-${p.id}`, type: 'project', title, excerpt: p.description, score: s });
      });

      // Search page contents (hero, headings, etc.)
      const pages = getPageContents(language as any);
      pages.forEach((pg: any) => {
        const title = String(pg.title || '');
        const excerpt = String(pg.excerpt || '');
        const s = Math.max(scoreText(title, q), scoreText(excerpt, q));
        if (s > 0.2) results.push({ id: `pagecontent-${pg.id}`, type: 'content', title, excerpt, score: s });
      });

      // Deduplicate by id and keep highest score
      const dedup: Record<string, any> = {};
      results.forEach((r) => {
        if (!dedup[r.id] || (r.score || 0) > (dedup[r.id].score || 0)) dedup[r.id] = r;
      });

      const finalResults = Object.values(dedup).filter((r: any) => {
        if (q.length < 3) return (r.score || 0) > 0.6;
        return (r.score || 0) > 0.18;
      }).sort((a: any, b: any) => (b.score || 0) - (a.score || 0));

      setSearchResults(finalResults);
      setCurrentPage('search');
    };

    window.addEventListener('site-search', handler as EventListener);
    return () => window.removeEventListener('site-search', handler as EventListener);
  }, [navigationItems, newsItems, testimonials]);

  // Listener for navigation requests from search results or other components
  useEffect(() => {
    const navHandler = (e: any) => {
      const href = String(e?.detail?.href || '');
      if (!href) return;
      if (href.startsWith('#news-')) {
        setCurrentPage('home');
        setTimeout(() => {
          document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        }, 120);
        return;
      }
      if (href === '#istituto') return handleNavigation('istituto');
      if (href === '#servizi') return handleNavigation('servizi');
      if (href === '#formazione') return handleNavigation('formazione');
      if (href === '#eventi') return handleNavigation('eventi');
      if (href === '#cultura') return handleNavigation('cultura');
      if (href === '#accessibilita') return handleNavigation('accessibilita');
      // fallback: set hash
      window.location.hash = href;
    };

    window.addEventListener('site-navigate', navHandler as EventListener);
    return () => window.removeEventListener('site-navigate', navHandler as EventListener);
  }, []);

  const currentPageForSkipLink = (() => {
    if (currentPage === 'home') return language === 'it' ? 'Pagina Home' : 'Home page';
    if (currentPage === 'istituto') return language === 'it' ? 'Pagina Istituto' : 'Institute page';
    if (currentPage === 'servizi') return language === 'it' ? 'Pagina Servizi' : 'Services page';
    if (currentPage === 'formazione') return language === 'it' ? 'Pagina Formazione' : 'Training page';
    if (currentPage === 'eventi') return language === 'it' ? 'Pagina Eventi' : 'Events page';
    if (currentPage === 'accessibilita') return language === 'it' ? 'Pagina Accessibilita' : 'Accessibility page';
    if (currentPage === 'segnala-problemi') return language === 'it' ? 'Pagina Segnala Problemi' : 'Report issues page';
    if (currentPage === 'search') return language === 'it' ? 'Pagina Risultati Ricerca' : 'Search results page';

    if (currentPage === 'cultura') {
      if (culturaSubPage === 'hub') return language === 'it' ? 'Pagina Cultura Hub' : 'Culture hub page';
      if (culturaSubPage === 'biblioteca') return language === 'it' ? 'Pagina Biblioteca' : 'Library page';
      if (culturaSubPage === 'anteros') return language === 'it' ? 'Pagina Museo Anteros' : 'Anteros museum page';
      if (culturaSubPage === 'anteros-detail') return language === 'it' ? 'Pagina Dettaglio Museo Anteros' : 'Anteros detail page';
      if (culturaSubPage === 'tolomeo') return language === 'it' ? 'Pagina Museo Tolomeo' : 'Tolomeo museum page';
      if (culturaSubPage === 'tolomeo-detail') return language === 'it' ? 'Pagina Dettaglio Museo Tolomeo' : 'Tolomeo detail page';
      if (culturaSubPage === 'radio') return language === 'it' ? 'Pagina Radio Oltre' : 'Radio Oltre page';
    }

    return language === 'it' ? 'Contenuto principale' : 'Main content';
  })();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* MARKER-DESIGN-KIT-INVOKED */}
      <SkipLink targetId="main-content" pageLabel={currentPageForSkipLink} />
      <div className="sticky top-0 z-50">
        <div className="hidden md:block">
          <AccessibilityToolbar />
        </div>
        <Navigation
          items={navigationItems}
          onLogoClick={() => handleNavigation('home')}
          onSearch={(query) => {
            const searchEvent = new CustomEvent('site-search', { detail: { query } });
            window.dispatchEvent(searchEvent);
          }}
          showSearchSubBar={currentPage === 'home'}
          navigationStateKey={`${currentPage}:${culturaSubPage}:${eventiTab}`}
        />
      </div>
      <AccessibilityWidget />

      <main id="main-content" tabIndex={-1}>
        {currentPage === 'istituto' ? (
          <IstitutoPage language={language} onHomeClick={() => handleNavigation('home')} />
        ) : currentPage === 'servizi' ? (
          <ServiziPage language={language} onHomeClick={() => handleNavigation('home')} />
        ) : currentPage === 'formazione' ? (
          <FormazionePage language={language} onHomeClick={() => handleNavigation('home')} />
        ) : currentPage === 'eventi' ? (
          <EventiPage language={language} onHomeClick={() => handleNavigation('home')} defaultTab={eventiTab} />
        ) : currentPage === 'cultura' ? (
          <>
            {culturaSubPage === 'hub' && (
              <CulturaHubPage language={language} onNavigate={handleCulturaNavigation} />
            )}
            {culturaSubPage === 'biblioteca' && (
              <BibliotecaPage language={language} onBack={handleBackToCultura} onHomeClick={() => handleNavigation('home')} />
            )}
            {culturaSubPage === 'anteros' && (
              <MuseoAnterosPage language={language} onBack={handleBackToCultura} onHomeClick={() => handleNavigation('home')} onExplore={() => handleCulturaNavigation('anteros-detail')} />
            )}
            {culturaSubPage === 'anteros-detail' && (
              <AnterosDetailPage language={language} onBack={() => handleCulturaNavigation('anteros')} onHomeClick={() => handleNavigation('home')} />
            )}
            {culturaSubPage === 'tolomeo' && (
              <MuseoTolomeoPage language={language} onBack={handleBackToCultura} onHomeClick={() => handleNavigation('home')} onExplore={() => handleCulturaNavigation('tolomeo-detail')} />
            )}
            {culturaSubPage === 'tolomeo-detail' && (
              <TolomeoDetailPage language={language} onBack={() => handleCulturaNavigation('tolomeo')} onHomeClick={() => handleNavigation('home')} />
            )}
            {culturaSubPage === 'radio' && (
              <RadioOltrePage language={language} onBack={handleBackToCultura} onHomeClick={() => handleNavigation('home')} />
            )}
          </>
        ) : currentPage === 'accessibilita' ? (
          <AccessibilitaPage language={language} onHomeClick={() => handleNavigation('home')} onNavigate={(page) => handleNavigation(page as any)} />
        ) : currentPage === 'segnala-problemi' ? (
          <SegnalaProblemiPage language={language} onHomeClick={() => handleNavigation('home')} />
        ) : currentPage === 'search' ? (
          <SearchResultsPage
            query={searchQueryState}
            results={searchResults}
            onBack={() => handleNavigation('home')}
          />
        ) : (
          <>
        {/* Hero Section - ispirato a Braille Institute */}
        <section
          className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground"
          aria-labelledby="hero-title"
        >
          <div className="max-w-7xl mx-auto px-[36px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              <div className="py-[120px]">


                <h1 id="hero-title" className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                  {t('hero.title')}
                </h1>

                <p className="leading-relaxed mb-6 opacity-95 text-[18px]">
                  {t('hero.subtitle2')}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="primary"
                    onClick={() => handleNavigation('istituto')}
                    className="hero-outline-button !bg-transparent !text-white hover:!bg-accent active:!bg-accent px-6 py-3 gap-2 hover:gap-3 active:gap-3 text-left border-2 !border-white hover:!border-accent active:!border-accent active:!text-white font-bold"
                  >
                    {t('hero.cta.primary')}
                    <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleNavigation('formazione')}
                    className="hero-outline-button !bg-transparent !text-white hover:!bg-accent active:!bg-accent px-6 py-3 gap-2 hover:gap-3 active:gap-3 text-left border-2 !border-white hover:!border-accent active:!border-accent active:!text-white font-bold"
                  >
                    {t('hero.cta.secondary')}
                    <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  </Button>
                </div>
              </div>

              {/* Hero image */}
              <div className="hidden lg:flex">
                <div className="w-full rounded-sm overflow-hidden">
                  <img
                    src={heroHome}
                    alt="Immagine hero dell'Istituto Cavazza"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats Banner */}
        <section className="bg-secondary px-[0px] py-[35px]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center justify-center">
                <CounterAnimation
                  end={140}
                  suffix="+"
                  className="text-3xl font-bold text-primary mb-1 text-center"
                />
                <div className="text-base text-muted-foreground text-center">{t('stats.years')}</div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <CounterAnimation
                  end={63000}
                  suffix="+"
                  className="text-3xl font-bold text-primary mb-1 text-center"
                />
                <div className="text-base text-muted-foreground text-center">{t('stats.users')}</div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <CounterAnimation
                  end={7000}
                  suffix="+"
                  className="text-3xl font-bold text-primary mb-1 text-center"
                />
                <div className="text-base text-muted-foreground text-center">{t('stats.content')}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Servizi + Quiz affiancati */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Servizi Principali */}
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold mb-6">
                {t('services.title')}
              </h2>
              <div className="space-y-4 flex-1">
                <div className="bg-card rounded-xl p-5">
                  <div className="flex items-start gap-4 mb-4">
                    <Users className="w-8 h-8 text-primary flex-shrink-0" aria-hidden="true" />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-2">{t('service.personal.title')}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{t('service.personal.desc')}</p>
                      <Button
                        variant="primary"
                        onClick={() => handleNavigation('servizi')}
                        className="text-sm bg-primary text-white hover:!bg-accent font-bold"
                      >
                        {t('service.personal.action')}
                        <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-xl p-5">
                  <div className="flex items-start gap-4 mb-4">
                    <GraduationCap className="w-8 h-8 text-primary flex-shrink-0" aria-hidden="true" />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-2">{t('service.training.title')}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{t('service.training.desc')}</p>
                      <Button
                        variant="primary"
                        onClick={() => handleNavigation('formazione')}
                        className="text-sm bg-primary text-white hover:!bg-accent font-bold"
                      >
                        {t('service.training.action')}
                        <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-xl p-5">
                  <div className="flex items-start gap-4 mb-4">
                    <Palette className="w-8 h-8 text-primary flex-shrink-0" aria-hidden="true" />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-2">{t('service.museums.title')}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{t('service.museums.desc')}</p>
                      <Button
                        variant="primary"
                        onClick={() => handleNavigation('cultura')}
                        className="text-sm bg-primary text-white hover:!bg-accent font-bold"
                      >
                        {t('service.museums.action')}
                        <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-xl p-5">
                  <div className="flex items-start gap-4 mb-4">
                    <BookOpen className="w-8 h-8 text-primary flex-shrink-0" aria-hidden="true" />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-2">{t('service.library.title')}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                        Biblioteca specializzata con audiolibri, telebook, rivista "Vedere Oltre" e materiali accessibili in vari formati.
                      </p>
                      <Button
                        variant="primary"
                        onClick={() => handleNavigation('cultura')}
                        className="bg-primary text-white hover:!bg-accent text-[16px] font-bold"
                      >
                        {t('service.library.action')}
                        <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quiz */}
            <div id="personalized-quiz" className="flex flex-col h-full">
              <PersonalizedQuiz language={language} onNavigate={handleNavigation} />
            </div>
          </div>
        </section>

        {/* Chi Serviamo - navigazione per persona */}
        <section
          id="chi-serviamo"
          className="py-16 bg-[#ffffff]"
          aria-labelledby="chi-serviamo-title"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="chi-serviamo-title" className="text-2xl font-bold mb-3">
              {t('who-we-serve.title')}
            </h2>
            <p className="text-base leading-relaxed mb-6 max-w-3xl">
              {t('who-we-serve.subtitle')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <WhoWeServeCard
                icon={UserCircle}
                title={t('who-serve.new-users.title')}
                description={t('who-serve.new-users.desc')}
                
              />
              <WhoWeServeCard
                icon={Baby}
                title={t('who-serve.children.title')}
                description={t('who-serve.children.desc')}
            
              />
              <WhoWeServeCard
                icon={GraduationCap}
                title={t('who-serve.students.title')}
                description={t('who-serve.students.desc')}
                
              />
              <WhoWeServeCard
                icon={Briefcase}
                title={t('who-serve.professionals.title')}
                description={t('who-serve.professionals.desc')}
                
              />
              <WhoWeServeCard
                icon={HeartHandshake}
                title={t('who-serve.families.title')}
                description={t('who-serve.families.desc')}
                
              />
              <WhoWeServeCard
                icon={Presentation}
                title={t('who-serve.educators.title')}
                description={t('who-serve.educators.desc')}
              />
            </div>
          </div>
        </section>

        {/* Testimonianze */}
        <TestimonialSection testimonials={testimonials} language={language} />

        {/* Radio Oltre + News affiancati */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Radio Oltre */}
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Radio className="w-6 h-6" aria-hidden="true" />
                {t('radio.title')}
              </h2>
              <div className="flex-1">
                <RadioPlayer
                  streamUrl="https://onair7.xdevel.com/proxy/xautocloud_ryn6_1385?mp=/;1/"
                  stationName="Radio Oltre"
                  websiteUrl="https://www.radiooltre.it/"
                  scheduleUrl="https://www.radiooltre.it/schedule/"
                />
              </div>
            </div>

            {/* Ultime Notizie */}
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold mb-4">
                {language === 'it' ? 'Ultime Notizie' : 'Latest News'}
              </h2>
              <div className="space-y-4 flex-1">
                {newsItems.map((item) => (
                  <article
                    key={item.id}
                    className="bg-white border-2 border-primary p-4 hover:border-accent transition-all rounded-xl"
                  >
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <Calendar className="w-3 h-3" aria-hidden="true" />
                      <time dateTime={item.date}>{item.date}</time>
                    </div>
                    <h3 className="text-lg font-bold mb-2 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {item.excerpt}
                    </p>
                    <button
                      onClick={() => handleNavigation('eventi', 'notizie')}
                      className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:gap-2 transition-all no-underline bg-transparent border-0 cursor-pointer p-0"
                    >
                      <span className="font-bold">{language === 'it' ? 'Leggi di più' : 'Read more'}</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* Sostieni - stile Braille Institute */}
        <section
          id="sostieni"
          className="py-16 text-center" style={{ backgroundColor: '#D75220', color: '#ffffff' }}
          aria-labelledby="sostieni-title"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto">
              <Heart className="w-12 h-12 mb-4 text-white mx-auto" aria-hidden="true" />
              <h2 id="sostieni-title" className="text-2xl font-bold mb-4 text-center text-white">
                {t('support.title')}
              </h2>
              <p className="text-base mb-3 max-w-3xl mx-auto text-center text-white">
                {t('support.subtitle1')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:justify-center items-stretch sm:items-center">
              <button
                onClick={() => window.open('https://paypal.com/donate/', '_blank')}
                className="bg-white px-6 py-3 rounded-xl font-bold hover:bg-white/90 transition-colors shadow-lg w-full sm:w-auto" style={{ color: '#D75220' }}
                aria-label={t('support.donate')}
              >
                <Heart className="w-4 h-4 inline mr-2" aria-hidden="true" />
                {t('support.donate')}
              </button>
              <button
                onClick={() => handleNavigation('istituto', '#sostieni')}
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-xl font-bold hover:bg-white/20 transition-colors w-full sm:w-auto"
                aria-label={t('support.other-ways')}
              >
                {t('support.other-ways')}
              </button>
            </div>

            {/* Trasparenza */}
            <div className="mt-8 pt-6 border-t-2 border-white/20 text-center">
              <p className="text-sm opacity-75 text-center text-white">
                {t('support.transparency')}
              </p>
            </div>
          </div>
        </section>

        </>
        )}
      </main>

      {/* Footer */}
      <footer id="contatti" className="text-primary-foreground pt-10 pb-6" style={{ backgroundColor: '#135DCD' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 3 Colonne - Contatti ancora più grande */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8 relative">
            {/* Colonna 1: Contatti - occupa ancora più spazio */}
            <div className="md:col-span-6">
              <h3 className="font-bold text-xl mb-4">Contatti</h3>
              <div className="space-y-3 leading-relaxed">
                <p className="font-bold text-lg">Istituto Cavazza</p>
                <p className="pt-2">Via Castiglione, 71<br />40124 Bologna (BO)</p>
                <a
                  href="https://maps.google.com/?q=Via+Castiglione+71+Bologna"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors inline-flex items-center gap-1"
                >
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                  Come raggiungerci
                </a>
                <p className="pt-2">
                  <span className="font-bold">Tel:</span>{' '}
                  <a href="tel:+39051332090" className="hover:text-accent transition-colors">
                    +39 051 332090
                  </a>
                </p>
                <p>
                  <span className="font-bold">Fax:</span> +39 051 332609
                </p>
                <p>
                  <span className="font-bold">Email:</span>{' '}
                  <a href="mailto:istituto@cavazza.it" className="hover:text-accent transition-colors">
                    istituto@cavazza.it
                  </a>
                </p>
              </div>
            </div>

            {/* Colonna 2: Servizi e Attività */}
            <div className="md:col-span-3">
              <h3 className="font-bold text-base mb-3">Servizi e Attività</h3>
              <ul className="space-y-2 list-none text-sm">
                <li>
                  <button onClick={() => handleNavigation('istituto')} className="transition-colors cursor-pointer bg-transparent border-0 p-0 text-left text-primary-foreground underline font-normal text-sm footer-link">
                    Istituto
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigation('servizi')} className="transition-colors cursor-pointer bg-transparent border-0 p-0 text-left text-primary-foreground underline font-normal text-sm footer-link">
                    Servizi alla Persona
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigation('formazione')} className="transition-colors cursor-pointer bg-transparent border-0 p-0 text-left text-primary-foreground underline font-normal text-sm footer-link">
                    Scuola e Formazione
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigation('cultura')} className="transition-colors cursor-pointer bg-transparent border-0 p-0 text-left text-primary-foreground underline font-normal text-sm footer-link">
                    Biblioteca
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigation('cultura')} className="transition-colors cursor-pointer bg-transparent border-0 p-0 text-left text-primary-foreground underline font-normal text-sm footer-link">
                    Musei Tattili
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigation('cultura')} className="transition-colors cursor-pointer bg-transparent border-0 p-0 text-left text-primary-foreground underline font-normal text-sm footer-link">
                    Radio Oltre
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigation('eventi')} className="transition-colors cursor-pointer bg-transparent border-0 p-0 text-left text-primary-foreground underline font-normal text-sm footer-link">
                    Iniziative e Progetti
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigation('istituto', '#sostieni')} className="transition-colors cursor-pointer bg-transparent border-0 p-0 text-left text-primary-foreground underline font-normal text-sm footer-link">
                    Sostienici
                  </button>
                </li>
              </ul>
            </div>

            {/* Colonna 3: Informazioni Legali */}
            <div className="md:col-span-3">
              <h3 className="font-bold text-base mb-3">Informazioni Legali</h3>
              <ul className="space-y-2 list-none text-sm">
                <li>
                  <button onClick={() => handleNavigation('accessibilita')} className="transition-colors cursor-pointer bg-transparent border-0 p-0 text-left text-primary-foreground underline font-normal text-sm footer-link">
                    Dichiarazione di Accessibilità
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigation('segnala-problemi')} className="transition-colors cursor-pointer bg-transparent border-0 p-0 text-left text-primary-foreground underline font-normal text-sm footer-link">
                    Segnala un Problema
                  </button>
                </li>
                <li>
                  <a href="#privacy" className="hover:text-accent transition-colors text-primary-foreground underline font-normal text-sm">
                    Privacy e Trattamento Dati
                  </a>
                </li>
                <li>
                  <a href="#cookie" className="hover:text-accent transition-colors text-primary-foreground underline font-normal text-sm">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#legali" className="hover:text-accent transition-colors text-primary-foreground underline font-normal text-sm">
                    Note Legali
                  </a>
                </li>
                <li>
                  <a href="#mappa" className="hover:text-accent transition-colors text-primary-foreground underline font-normal text-sm">
                    Mappa del Sito
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Media - posizionati in alto a destra */}
            <div className="flex items-center justify-center md:justify-end gap-3 md:absolute md:right-0 md:top-[310px]">
              <a
                href="https://www.youtube.com/channel/UCV0p8o7G_1UO_T1giK7F83Q"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-sm transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="https://x.com/istitutocavazza"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-sm transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="https://www.facebook.com/istitutocavazza/timeline/"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-sm transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Copyright e Riconoscimenti */}
          <div className="border-t border-primary-foreground/20 pt-6">
            {/* Back to top button */}
            <div className="flex justify-center mb-6">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-14 h-14 rounded-full flex items-center justify-center border-4 border-white transition-all hover:scale-110 focus:outline-none focus:ring-4 focus:ring-white/50"
                style={{ backgroundColor: '#D75220' }}
                aria-label="Torna in cima alla pagina"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
                </svg>
              </button>
            </div>
            <p className="text-xs opacity-70 text-center mb-4">
              Istituto Cavazza © {new Date().getFullYear()} - ONLUS - Tutti i diritti riservati
            </p>
            <p className="text-xs opacity-75 text-center mb-3">Riconosciuto da:</p>
            <div className="flex flex-wrap justify-center gap-4 items-center">
              <div className="bg-primary-foreground text-primary px-3 py-1.5 rounded-sm font-bold text-xs">
                ONLUS Certificata
              </div>
              <div className="bg-primary-foreground text-primary px-3 py-1.5 rounded-sm font-bold text-xs">
                Consulta Istituzioni Bolognesi
              </div>
              <div className="bg-primary-foreground text-primary px-3 py-1.5 rounded-sm font-bold text-xs">
                WCAG 2.1 AAA Compliant
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Screen reader only class */}
      <style>{`
        /* Nascondi scrollbar solo su mobile */
        @media (max-width: 767px) {
          * {
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* IE and Edge */
          }

          *::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera */
          }
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }

        .keyboard-text-focusable:focus-visible {
          outline: 3px solid #d75220;
          outline-offset: 4px;
          border-radius: 4px;
        }

        /* Modalità scura: sfondo blu notte (no nero puro - evita fotofobia) */
        .accessibility-dark {
          background-color: #0d1117 !important;
        }

        .accessibility-dark .bg-gradient-to-br {
          background: #1a2332 !important;
          background-image: none !important;
        }

        /* Modalità scura: bottoni radio quiz con outline */
        .accessibility-dark label:has(input[type="radio"]:checked) {
          background-color: transparent !important;
          border-color: #5c9cff !important;
          color: #f0f4ff !important;
          outline: 3px solid #5c9cff;
        }

        .accessibility-dark label:has(input[type="radio"]:checked) .text-muted-foreground {
          color: #a8b8d0 !important;
          opacity: 0.9;
        }

        /* Modalità scura: body background */
        .accessibility-dark ~ * {
          background-color: #0d1117;
        }

        /* Footer links: bianchi in modalità normale/alto contrasto/scuro, neri in invertito */
        footer a {
          color: #ffffff !important;
        }

        footer a:hover {
          color: #ffffff !important;
        }

        .contrast-high footer a,
        .accessibility-dark footer a {
          color: #ffffff !important;
        }

        .contrast-high footer a:hover,
        .accessibility-dark footer a:hover {
          color: #ffffff !important;
        }

        .contrast-inverted footer a {
          color: #000000 !important;
        }

        .contrast-inverted footer a:hover {
          color: #000000 !important;
        }

        /* Modalità scura: mantieni componenti ad alta intensità */
        .accessibility-dark .bg-accent {
          background-color: #D75220 !important;
        }

        .accessibility-dark .bg-primary {
          background-color: #D75220 !important;
        }

        .accessibility-dark .text-primary {
          color: #D75220 !important;
        }

        .accessibility-dark .border-primary {
          border-color: #D75220 !important;
        }

        .accessibility-dark .border-accent {
          border-color: #D75220 !important;
        }
      `}</style>
    </div>
  );
}
