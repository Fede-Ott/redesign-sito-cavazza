import { useState } from 'react';
import { Palette, ArrowLeft, BookOpen, Brain, Eye, GraduationCap, Layers, X, Clock, Calendar, AlertCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { MuseumBookingModal } from '../components/MuseumBookingModal';
import { type Lang } from '../i18n';
import { anterosGalleryImages } from '../data/siteImages';

interface MuseoAnterosPageProps {
  language: Lang;
  onBack: () => void;
  onHomeClick: () => void;
  onExplore?: () => void;
}

export function MuseoAnterosPage({ language, onBack, onHomeClick, onExplore }: MuseoAnterosPageProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const t = (key: string) => {
    const translations: Record<string, { it: string; en: string }> = {
      'back': { it: "Torna a Cultura", en: "Back to Culture" },
      'breadcrumb.cultura': { it: "Cultura", en: "Culture" },
      'breadcrumb.anteros': { it: "Museo Anteros", en: "Anteros Museum" },
      'page.title': { it: "Museo Tattile Anteros", en: "Anteros Tactile Museum" },
      'page.subtitle': { it: "L'arte della pittura attraverso il tatto", en: "The art of painting through touch" },

      'intro.title': { it: "Il Museo", en: "The Museum" },
      'intro.text': { it: "Fondato a Bologna nel 1999, il Museo Tattile Anteros rende accessibile la pittura alle persone non vedenti e ipovedenti attraverso traduzioni tridimensionali di capolavori pittorici in bassorilievo prospettico. La collezione comprende 40 opere dalla classicità alla contemporaneità, corredate da descrizioni in Braille e caratteri ingranditi.", en: "Founded in Bologna in 1999, the Anteros Tactile Museum makes painting accessible to blind and visually impaired people through three-dimensional translations of pictorial masterpieces in perspective bas-relief. The collection includes 40 works from classical to contemporary, accompanied by descriptions in Braille and enlarged characters." },

      'hours.title': { it: "Orari e Prenotazioni", en: "Hours and Reservations" },
      'hours.thu': { it: "Giovedì: 9:00-13:30", en: "Thursday: 9:00 AM-1:30 PM" },
      'hours.fri': { it: "Venerdì: 9:00-17:30", en: "Friday: 9:00 AM-5:30 PM" },
      'hours.sat': { it: "Sabato: 9:00-13:30", en: "Saturday: 9:00 AM-1:30 PM" },
      'hours.booking': { it: "Prenotazione Consigliata", en: "Booking Recommended" },

      'gallery.title': { it: "Galleria Opere", en: "Works Gallery" },

      'opere.title': { it: "Elenco Opere in Collezione", en: "Collection Works List" },
      'opere.desc': { it: "Catalogo completo delle 40 opere in bassorilievo presenti al museo, con informazioni su autore originale, periodo, dimensioni e tecnica di realizzazione del bassorilievo.", en: "Complete catalog of the 40 bas-relief works in the museum, with information on original author, period, dimensions and bas-relief creation technique." },

      'schede.title': { it: "Schede Storico Artistiche", en: "Historical-Artistic Sheets" },
      'schede.desc': { it: "Approfondimenti storico-artistici per ogni opera: contesto storico, analisi iconografica, significato simbolico, confronti con altre opere dello stesso periodo o autore.", en: "Historical-artistic insights for each work: historical context, iconographic analysis, symbolic meaning, comparisons with other works from the same period or author." },

      'cognitivi.title': { it: "Note sui Processi Cognitivi", en: "Notes on Cognitive Processes" },
      'cognitivi.desc': { it: "Analisi dei processi cognitivi nella percezione tattile dell'arte: dal riconoscimento delle forme alla comprensione dello spazio tridimensionale, dal movimento esplorativo alla costruzione mentale dell'immagine.", en: "Analysis of cognitive processes in tactile perception of art: from shape recognition to understanding three-dimensional space, from exploratory movement to mental image construction." },

      'prospettiva.title': { it: "Tavole Propedeutiche sulla Prospettiva", en: "Perspective Preparatory Tables" },
      'prospettiva.desc': { it: "Supporti didattici per comprendere i principi della prospettiva attraverso il tatto: punto di fuga, linee convergenti, piani di profondità, tecniche di rappresentazione dello spazio bidimensionale.", en: "Educational supports for understanding the principles of perspective through touch: vanishing point, converging lines, depth planes, two-dimensional space representation techniques." },

      'didattica.title': { it: "Didattica Speciale", en: "Special Education" },
      'didattica.desc': { it: "Programmi educativi per scuole di ogni grado, laboratori di modellazione in creta, lezioni integrate per vedenti e non vedenti. Esercizi cinestesici e propriocettivi per facilitare la comprensione delle forme artistiche.", en: "Educational programs for schools of all levels, clay modeling workshops, integrated lessons for sighted and blind people. Kinesthetic and proprioceptive exercises to facilitate understanding of artistic forms." },

      'metodologia.title': { it: "Metodologia Didattica", en: "Teaching Methodology" },
      'metodologia.desc': { it: "Metodo tripartito panofskiano applicato alla percezione tattile: percezione delle forme (analisi preiconografica), cognizione e riconoscimento (analisi iconografica), significazione dell'opera (interpretazione iconologica). Tecniche di esplorazione: movimenti a pinza e a pennello, uso bimanuale, sfioramento per le texture.", en: "Panofsky's tripartite method applied to tactile perception: perception of forms (pre-iconographic analysis), cognition and recognition (iconographic analysis), significance of the work (iconological interpretation). Exploration techniques: pincer and brush movements, bimanual use, skimming for textures." },

      'stili.title': { it: "Tavola Propedeutica sugli Stili", en: "Preparatory Table on Styles" },
      'stili.desc': { it: "Guida tattile agli stili artistici attraverso i secoli: caratteristiche distintive del Romanico, Gotico, Rinascimento, Barocco, Neoclassicismo, Impressionismo, fino all'arte contemporanea. Confronto tra diverse correnti artistiche.", en: "Tactile guide to artistic styles through the centuries: distinctive features of Romanesque, Gothic, Renaissance, Baroque, Neoclassicism, Impressionism, up to contemporary art. Comparison between different artistic currents." },

      'stilizzazione.title': { it: "Stilizzazione", en: "Stylization" },
      'stilizzazione.desc': { it: "Studio dei processi di astrazione e semplificazione delle forme artistiche. Come gli artisti riducono la complessità del reale per comunicare concetti essenziali. Dalla figurazione naturalistica all'arte astratta.", en: "Study of abstraction and simplification processes of artistic forms. How artists reduce the complexity of reality to communicate essential concepts. From naturalistic figuration to abstract art." },

      'visit.cta': { it: "Prenota Visita", en: "Book Visit" },
      'explore.cta': { it: "Esplora", en: "Explore" }
    };
    return translations[key]?.[language] || key;
  };

  const ACCENT = '#135DCD';
  const BG = '#EEF4FF';

  const sections = [
    {
      id: 'opere',
      icon: Layers,
      title: t('opere.title'),
      description: t('opere.desc'),
    },
    {
      id: 'schede',
      icon: BookOpen,
      title: t('schede.title'),
      description: t('schede.desc'),
    },
    {
      id: 'cognitivi',
      icon: Brain,
      title: t('cognitivi.title'),
      description: t('cognitivi.desc'),
    },
    {
      id: 'prospettiva',
      icon: Eye,
      title: t('prospettiva.title'),
      description: t('prospettiva.desc'),
    },
    {
      id: 'didattica',
      icon: GraduationCap,
      title: t('didattica.title'),
      description: t('didattica.desc'),
    },
    {
      id: 'metodologia',
      icon: BookOpen,
      title: t('metodologia.title'),
      description: t('metodologia.desc'),
    },
    {
      id: 'stili',
      icon: Palette,
      title: t('stili.title'),
      description: t('stili.desc'),
    },
    {
      id: 'stilizzazione',
      icon: Layers,
      title: t('stilizzazione.title'),
      description: t('stilizzazione.desc'),
    }
  ];

  // Placeholder images
  const galleryImages = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: language === 'it' ? `Opera ${i + 1}` : `Work ${i + 1}`,
    description: language === 'it' ? 'Bassorilievo prospettico' : 'Perspective bas-relief',
    src: anterosGalleryImages[i]
  }));

  // Images provided by user for the enlarged popup only.
  const modalGalleryImages = Array.from(
    { length: 12 },
    (_, i) => new URL(`../../assets/immagini-galleria/galleryAnteros (${i + 1}).webp`, import.meta.url).href,
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: t('breadcrumb.cultura'), onClick: onBack },
          { label: t('breadcrumb.anteros') }
        ]}
        onHomeClick={onHomeClick}
      />

      {/* Hero */}
      <section className="cultura-hero bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-24 h-24 bg-white/20 rounded-xl flex items-center justify-center px-[5px] py-[0px]">
              <Palette className="w-16 h-16" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-bold mb-2">{t('page.title')}</h1>
              <p className="text-base opacity-90">{t('page.subtitle')}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Intro */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-8 gap-8 items-start bg-white">
            <div className="md:col-span-3">
              <h2 className="text-2xl font-bold mb-6">{t('intro.title')}</h2>
              <p className="text-base leading-relaxed">{t('intro.text')}</p>
            </div>

            <div className="hidden md:block md:col-span-2" aria-hidden="true" />

            <div className="md:col-span-3">
              <h3 className="text-lg font-bold mb-4 text-foreground flex items-center gap-2">
                <Clock className="w-6 h-6 text-primary" aria-hidden="true" />
                {t('hours.title')}
              </h3>
              <div className="space-y-2 text-foreground">
                <p className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" aria-hidden="true" />
                  {t('hours.thu')}
                </p>
                <p className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" aria-hidden="true" />
                  {t('hours.fri')}
                </p>
                <p className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" aria-hidden="true" />
                  {t('hours.sat')}
                </p>
                <p className="font-bold flex items-center gap-2 mt-3 text-foreground">
                  <AlertCircle className="w-5 h-5 text-primary" aria-hidden="true" />
                  {t('hours.booking')}
                </p>
              </div>
              <div className="mt-6">
                <Button
                  variant="primary"
                  className="bg-blue-600 hover:bg-blue-700 border-2 border-blue-600 font-bold rounded-lg text-white"
                  onClick={() => setShowBookingModal(true)}
                >
                  {t('visit.cta')}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">{t('gallery.title')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {galleryImages.map((image) => (
              <button
                key={image.id}
                onClick={() => setSelectedImage(image.id)}
                className="gallery-preview-button group relative aspect-square overflow-hidden rounded-xl shadow-sm hover:scale-105 transition-transform focus:outline-none focus:ring-4 focus:ring-primary/50"
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/15 transition-colors group-hover:bg-black/5" aria-hidden="true" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-3 text-left text-white">
                  <p className="text-sm font-medium">{image.title}</p>
                  <p className="text-xs text-white/85">{image.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section, index) => (
            <div
              key={section.id}
              className="culture-resource-box relative rounded-xl p-6 hover:shadow-xl transition-all flex flex-col overflow-hidden"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 100}ms backwards`,
                backgroundColor: BG,
                border: `2px solid ${ACCENT}33`,
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-xl" style={{ backgroundColor: ACCENT }} />
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 mt-2" style={{ backgroundColor: ACCENT }}>
                <section.icon className="w-10 h-10 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-black">{section.title}</h3>
              <p className="text-base leading-relaxed mb-4 flex-1 text-black">{section.description}</p>
              <Button
                variant="primary"
                className="culture-resource-button w-full rounded-lg font-bold bg-[#135DCD] text-white hover:bg-[#D75220] border-2 border-[#135DCD]"
                onClick={onExplore}
              >
                {t('explore.cta')}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-background/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-card border-4 border-primary rounded-xl max-w-4xl w-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-3xl font-bold">
                {galleryImages[selectedImage - 1]?.title}
              </h3>
              <button
                onClick={() => setSelectedImage(null)}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-secondary rounded-lg transition-colors"
                aria-label={language === 'it' ? 'Chiudi' : 'Close'}
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>
            <div className="overflow-hidden rounded-xl mb-6 shadow-sm">
              <img
                src={modalGalleryImages[selectedImage - 1] ?? galleryImages[selectedImage - 1]?.src}
                alt={galleryImages[selectedImage - 1]?.title ?? ''}
                className="max-h-[70vh] w-full object-contain"
              />
            </div>
            <p className="text-lg leading-relaxed">
              {language === 'it'
                ? 'Descrizione dettagliata dell\'opera con informazioni su tecnica, dimensioni, autore originale e periodo storico. Include testo in Braille e caratteri ingranditi.'
                : 'Detailed description of the work with information on technique, dimensions, original author and historical period. Includes Braille text and enlarged characters.'}
            </p>
          </div>
        </div>
      )}

      <MuseumBookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        museumName={t('page.title')}
        language={language}
      />

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
