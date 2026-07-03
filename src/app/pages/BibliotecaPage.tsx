import { BookOpen, Download, ExternalLink, Newspaper, Headphones, Globe, Monitor, ArrowLeft, Clock, Calendar, FileText } from 'lucide-react';
import { Button } from '../components/Button';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { type Lang } from '../i18n';

interface BibliotecaPageProps {
  language: Lang;
  onBack: () => void;
  onHomeClick: () => void;
}

export function BibliotecaPage({ language, onBack, onHomeClick }: BibliotecaPageProps) {
  const vedereOltrePdfUrl = new URL('../../assets/VedereOltre.pdf', import.meta.url).href;
  const altreRisorsePdfUrl = new URL('../../assets/ALTRE RISORSE IN RETE (1).pdf', import.meta.url).href;

  const t = (key: string) => {
    const translations: Record<string, { it: string; en: string }> = {
      'back': { it: "Torna a Cultura", en: "Back to Culture" },
      'page.title': { it: "Biblioteca", en: "Library" },
      'page.subtitle': { it: "Oltre 7.000 contenuti accessibili disponibili gratuitamente", en: "Over 7,000 accessible contents available for free" },

      'breadcrumb.cultura': { it: "Cultura", en: "Culture" },
      'breadcrumb.biblioteca': { it: "Biblioteca", en: "Library" },

      'info.title': { it: "Informazioni Biblioteca", en: "Library Information" },
      'info.hours': { it: "Orari", en: "Hours" },
      'info.hours.weekday': { it: "Lunedì-Venerdì: 09:00 - 19:00", en: "Monday-Friday: 09:00 AM - 7:00 PM" },
      'info.hours.saturday': { it: "Sabato: 08:00 - 13:00", en: "Saturday: 08:00 AM - 1:00 PM" },
      'info.loan': { it: "Prestito", en: "Loan" },
      'info.loan.duration': { it: "Durata: 60 giorni", en: "Duration: 60 days" },
      'info.loan.booking': { it: "Prenotazioni: fino a 16 opere in sequenza", en: "Bookings: up to 16 works in sequence" },
      'info.formats': { it: "Formati disponibili", en: "Available formats" },
      'info.formats.list': { it: "Cassette audio, Files audio, Volumi Braille, Files digitali", en: "Audio cassettes, Audio files, Braille volumes, Digital files" },

      'telebook.title': { it: "Telebook", en: "Telebook" },
      'telebook.desc': { it: "Sistema di consultazione online del catalogo biblioteca. Ricerca per autore, titolo, materia con classificazione decimale. Include integrazione con il catalogo nazionale del Progetto Lettura Agevolata.", en: "Online library catalog consultation system. Search by author, title, subject with decimal classification. Includes integration with the national catalog of the Facilitated Reading Project." },

      'vedere.title': { it: "Vedere Oltre", en: "Vedere Oltre" },
      'vedere.desc': { it: "Rivista periodica dell'Istituto Cavazza dedicata all'inclusione e all'accessibilità. Articoli, interviste, approfondimenti su tecnologie assistive, cultura, sport e vita indipendente.", en: "Periodic magazine of the Cavazza Institute dedicated to inclusion and accessibility. Articles, interviews, insights on assistive technologies, culture, sports and independent living." },

      'audiolibri.title': { it: "Audiolibri / Libro Parlato", en: "Audiobooks / Talking Book" },
      'audiolibri.desc': { it: "Ampia collezione di audiolibri e libri parlati: narrativa, saggistica, classici, novità editoriali. Servizio di prestito gratuito con spedizione postale o ritiro in sede.", en: "Large collection of audiobooks and talking books: fiction, non-fiction, classics, new releases. Free lending service with postal delivery or pick-up at the library." },

      'notiziario.title': { it: "Notiziario Internazionale dell'Accessibilità", en: "International Accessibility Newsletter" },
      'notiziario.desc': { it: "Bollettino informativo con aggiornamenti su normative internazionali, tecnologie emergenti, best practice e iniziative per l'accessibilità a livello globale.", en: "Information bulletin with updates on international regulations, emerging technologies, best practices and global accessibility initiatives." },

      'pcciechi.title': { it: "PC Ciechi", en: "PC for the Blind" },
      'pcciechi.desc': { it: "Rivista online dedicata all'informatica accessibile. Guide pratiche su screen reader, sintesi vocali, display Braille, software specializzati e tecnologie emergenti.", en: "Online magazine dedicated to accessible computing. Practical guides on screen readers, speech synthesis, Braille displays, specialized software and emerging technologies." },

      'stampa.title': { it: "La Stampa", en: "La Stampa Newspaper" },
      'stampa.desc': { it: "Accesso quotidiano al quotidiano La Stampa in formato accessibile. Servizio riservato agli utenti registrati della biblioteca.", en: "Daily access to La Stampa newspaper in accessible format. Service reserved for registered library users." },

      'risorse.title': { it: "Altre Risorse in Rete", en: "Other Online Resources" },
      'risorse.desc': { it: "Collegamenti a biblioteche digitali, archivi sonori, progetti di digitalizzazione, repository internazionali di contenuti accessibili e risorse open access.", en: "Links to digital libraries, sound archives, digitization projects, international repositories of accessible content and open access resources." },

      'catalog.cta': { it: "Consulta Catalogo", en: "Browse Catalog" },
      'download.latest.cta': { it: "Scarica l'ultimo numero", en: "Download Latest Issue" },
      'read.cta': { it: "Leggi", en: "Read" },
      'access.cta': { it: "Accedi", en: "Access" },
      'explore.cta': { it: "Esplora", en: "Explore" }
    };
    return translations[key]?.[language] || key;
  };

  const ACCENT = '#135DCD';
  const BG = '#EEF4FF';

  const resources = [
    { id: 'telebook', icon: Globe, title: t('telebook.title'), description: t('telebook.desc'), cta: t('catalog.cta'), ctaIcon: ExternalLink, url: 'http://www.cavazza.it/drupal/telebook/catalogo.php' },
    { id: 'vedere', icon: Newspaper, title: t('vedere.title'), description: t('vedere.desc'), cta: t('download.latest.cta'), ctaIcon: Download, url: vedereOltrePdfUrl, download: true },
    { id: 'audiolibri', icon: Headphones, title: t('audiolibri.title'), description: t('audiolibri.desc'), cta: t('explore.cta'), ctaIcon: ExternalLink, url: 'https://www.cavazza.it/lp/index.php' },
    { id: 'notiziario', icon: Newspaper, title: t('notiziario.title'), description: t('notiziario.desc'), cta: t('read.cta'), ctaIcon: FileText, url: 'https://www.cavazza.it/drupal/eab/2015/eab052015.php' },
    { id: 'pcciechi', icon: Monitor, title: t('pcciechi.title'), description: t('pcciechi.desc'), cta: t('read.cta'), ctaIcon: FileText, url: 'https://www.cavazza.it/sites/default/files/pcciechi/2016/02/pcch1602/indice.htm' },
    { id: 'risorse', icon: Globe, title: t('risorse.title'), description: t('risorse.desc'), cta: t('explore.cta'), ctaIcon: Download, url: altreRisorsePdfUrl, download: true, downloadName: 'ALTRE RISORSE IN RETE (1).pdf' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: t('breadcrumb.cultura'), onClick: onBack },
          { label: t('breadcrumb.biblioteca') }
        ]}
        onHomeClick={onHomeClick}
      />

      {/* Hero */}
      <section className="cultura-hero text-white py-16" style={{ background: 'linear-gradient(135deg, #D91919 0%, #a01010 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center px-[5px] py-[0px]">
              <BookOpen className="w-12 h-12" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-bold">{t('page.title')}</h1>
              <p className="text-base opacity-90 mt-2">{t('page.subtitle')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">{t('info.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white">
            <div>
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-primary">
                <Clock className="w-6 h-6" aria-hidden="true" />
                {t('info.hours')}
              </h3>
              <p className="mb-1 text-foreground">{t('info.hours.weekday')}</p>
              <p className="text-foreground">{t('info.hours.saturday')}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-primary">
                <BookOpen className="w-6 h-6" aria-hidden="true" />
                {t('info.loan')}
              </h3>
              <p className="mb-1 text-foreground">{t('info.loan.duration')}</p>
              <p className="text-foreground">{t('info.loan.booking')}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-primary">
                <Headphones className="w-6 h-6" aria-hidden="true" />
                {t('info.formats')}
              </h3>
              <p className="text-foreground">{t('info.formats.list')}</p>
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <div
              key={resource.id}
              className="culture-resource-box relative rounded-xl p-6 hover:shadow-xl transition-all flex flex-col overflow-hidden"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 100}ms backwards`,
                backgroundColor: BG,
                border: `2px solid ${ACCENT}33`,
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-xl" style={{ backgroundColor: ACCENT }} />
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 mt-2" style={{ backgroundColor: ACCENT }}>
                <resource.icon className="w-10 h-10 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-black">{resource.title}</h3>
              <p className="leading-relaxed mb-6 flex-1 text-black">{resource.description}</p>
              <a
                href={resource.url}
                target={resource.download ? undefined : '_blank'}
                rel={resource.download ? undefined : 'noopener noreferrer'}
                download={resource.download ? (resource.downloadName || 'download.pdf') : undefined}
                className="culture-resource-button w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold transition-colors min-h-[48px] bg-[#135DCD] hover:bg-[#D75220] border-2 border-[#135DCD] text-white no-underline"
                style={{ backgroundColor: '#135DCD', borderColor: '#135DCD' }}
              >
                {resource.cta}
                {resource.ctaIcon && <resource.ctaIcon className="w-4 h-4" aria-hidden="true" />}
              </a>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
