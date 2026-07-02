import { useState } from 'react';
import { Landmark, ArrowLeft, Book, Users, Lightbulb, GraduationCap, Palette, Film, Archive, X, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '../components/Button';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { MuseumBookingModal } from '../components/MuseumBookingModal';
import { type Lang } from '../i18n';
import { tolomeoGalleryImages } from '../data/siteImages';

interface MuseoTolomeoPageProps {
  language: Lang;
  onBack: () => void;
  onHomeClick: () => void;
  onExplore?: () => void;
}

export function MuseoTolomeoPage({ language, onBack, onHomeClick, onExplore }: MuseoTolomeoPageProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const t = (key: string) => {
    const translations: Record<string, { it: string; en: string }> = {
      'back': { it: "Torna a Cultura", en: "Back to Culture" },
      'breadcrumb.cultura': { it: "Cultura", en: "Culture" },
      'breadcrumb.tolomeo': { it: "Museo Tolomeo", en: "Tolomeo Museum" },
      'page.title': { it: "Museo Tolomeo", en: "Tolomeo Museum" },
      'page.subtitle': { it: "Un modo diverso di guardare il mondo", en: "A different way of looking at the world" },

      'intro.title': { it: "Il Museo", en: "The Museum" },
      'intro.text': { it: "Il Museo Tolomeo è un'installazione intermediale permanente che racconta la storia dell'Istituto Cavazza attraverso gli oggetti che hanno reso libere e indipendenti le persone non vedenti e ipovedenti. Un viaggio nella storia dell'autonomia, dell'istruzione e dell'innovazione tecnologica.", en: "The Tolomeo Museum is a permanent intermedia installation that tells the history of the Cavazza Institute through objects that have made blind and visually impaired people free and independent. A journey through the history of autonomy, education and technological innovation." },

      'hours.title': { it: "Orari di Apertura", en: "Opening Hours" },
      'hours.detail': { it: "Aperto su prenotazione per visite guidate individuali e di gruppo", en: "Open by appointment for individual and group guided tours" },
      'hours.booking': { it: "Prenotazione obbligatoria", en: "Booking required" },

      'gallery.title': { it: "Galleria Oggetti Storici", en: "Historical Objects Gallery" },

      'percorso.title': { it: "Il Percorso Espositivo", en: "The Exhibition Path" },
      'percorso.desc': { it: "Un viaggio cronologico e tematico attraverso 140 anni di storia dell'Istituto. Dalla fondazione alla contemporaneità, ogni oggetto racconta una conquista di libertà e autonomia.", en: "A chronological and thematic journey through 140 years of the Institute's history. From foundation to contemporary times, each object tells a story of freedom and autonomy." },

      'oggetti.title': { it: "Gli Oggetti della Collezione", en: "Collection Objects" },
      'oggetti.desc': { it: "Oltre 200 oggetti tra ausili tiflodidattici, strumenti per la scrittura Braille, ausili per l'autonomia personale, tecnologie assistive storiche e contemporanee. Ogni oggetto è accompagnato da descrizioni in Braille e audio.", en: "Over 200 objects including typhlodidactic aids, Braille writing tools, personal autonomy aids, historical and contemporary assistive technologies. Each object is accompanied by Braille and audio descriptions." },

      'storie.title': { it: "Storie di Indipendenza", en: "Stories of Independence" },
      'storie.desc': { it: "Testimonianze audio e video di persone che hanno vissuto all'Istituto Cavazza. Racconti di vita, studio, lavoro e autonomia conquistata grazie agli strumenti e alle competenze acquisite.", en: "Audio and video testimonies from people who lived at the Cavazza Institute. Stories of life, study, work and autonomy achieved through acquired tools and skills." },

      'innovazione.title': { it: "Innovazione e Tecnologia", en: "Innovation and Technology" },
      'innovazione.desc': { it: "Dalla tavoletta Braille al computer con sintesi vocale: l'evoluzione tecnologica degli ausili per persone non vedenti e ipovedenti. Scopri come la tecnologia ha cambiato la vita quotidiana, lo studio e il lavoro.", en: "From Braille slate to computer with speech synthesis: the technological evolution of aids for blind and visually impaired people. Discover how technology has changed daily life, study and work." },

      'didattica.title': { it: "Didattica e Formazione", en: "Education and Training" },
      'didattica.desc': { it: "Materiali didattici storici: libri in Braille, mappe tattili, strumenti scientifici adattati, sussidi per l'insegnamento. Un patrimonio che documenta l'evoluzione della didattica inclusiva.", en: "Historical educational materials: Braille books, tactile maps, adapted scientific instruments, teaching aids. A heritage that documents the evolution of inclusive education." },

      'arte.title': { it: "Arte e Cultura", en: "Art and Culture" },
      'arte.desc': { it: "Opere d'arte accessibili, strumenti musicali, materiali per l'esplorazione tattile dell'arte. Il museo documenta come cultura e bellezza siano sempre state centrali nella vita dell'Istituto.", en: "Accessible artworks, musical instruments, materials for tactile art exploration. The museum documents how culture and beauty have always been central to the Institute's life." },

      'multimedia.title': { it: "Installazioni Multimediali", en: "Multimedia Installations" },
      'multimedia.desc': { it: "Postazioni interattive con audio, video, contenuti tattili e olfattivi. Un'esperienza immersiva che coinvolge tutti i sensi per raccontare la storia dell'Istituto in modo inclusivo.", en: "Interactive stations with audio, video, tactile and olfactory content. An immersive experience that engages all senses to tell the Institute's story inclusively." },

      'archivio.title': { it: "Archivio Storico", en: "Historical Archive" },
      'archivio.desc': { it: "Accesso digitale all'archivio storico dell'Istituto: documenti, fotografie, registrazioni audio, filmati storici. Un patrimonio documentale di inestimabile valore consultabile da tutti.", en: "Digital access to the Institute's historical archive: documents, photographs, audio recordings, historical films. An invaluable documentary heritage accessible to all." },

      'visit.cta': { it: "Prenota Visita", en: "Book Visit" },
      'explore.cta': { it: "Esplora", en: "Explore" },
      'download.cta': { it: "Scarica Guida", en: "Download Guide" }
    };
    return translations[key]?.[language] || key;
  };

  const ACCENT = '#135DCD';
  const BG = '#EEF4FF';

  const sections = [
    { id: 'percorso', icon: Book, title: t('percorso.title'), description: t('percorso.desc') },
    { id: 'oggetti', icon: Archive, title: t('oggetti.title'), description: t('oggetti.desc') },
    { id: 'storie', icon: Users, title: t('storie.title'), description: t('storie.desc') },
    { id: 'innovazione', icon: Lightbulb, title: t('innovazione.title'), description: t('innovazione.desc') },
    { id: 'didattica', icon: GraduationCap, title: t('didattica.title'), description: t('didattica.desc') },
    { id: 'arte', icon: Palette, title: t('arte.title'), description: t('arte.desc') },
    { id: 'multimedia', icon: Film, title: t('multimedia.title'), description: t('multimedia.desc') },
    { id: 'archivio', icon: Archive, title: t('archivio.title'), description: t('archivio.desc') },
  ];

  // Placeholder images for gallery
  const galleryImages = Array.from({ length: tolomeoGalleryImages.length }, (_, i) => ({
    id: i + 1,
    title: language === 'it' ? `Oggetto Storico ${i + 1}` : `Historical Object ${i + 1}`,
    description: language === 'it' ? 'Strumento storico della collezione' : 'Historical instrument from the collection',
    period: language === 'it' ? `${1880 + i * 10}` : `${1880 + i * 10}`,
    src: tolomeoGalleryImages[i]
  }));

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: t('breadcrumb.cultura'), onClick: onBack },
          { label: t('breadcrumb.tolomeo') }
        ]}
        onHomeClick={onHomeClick}
      />

      {/* Hero */}
      <section className="cultura-hero bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-24 h-24 bg-white/20 rounded-xl flex items-center justify-center">
              <Landmark className="w-16 h-16" aria-hidden="true" />
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
                <p className="text-lg mb-2">{t('hours.detail')}</p>
                <p className="font-bold flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-primary" aria-hidden="true" />
                  {t('hours.booking')}
                </p>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button variant="primary" className="!bg-[#D75220] !text-white hover:!bg-[#bf461a] border-2 border-[#D75220] font-bold rounded-lg" onClick={() => setShowBookingModal(true)}>
                  {t('visit.cta')}
                </Button>
                <Button variant="outline" className="bg-transparent border-2 border-[#135DCD] text-[#135DCD] hover:bg-[#EDF4FF] rounded-lg font-bold">
                  {t('download.cta')}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">{t('gallery.title')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
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
                  <p className="text-xs text-white/85">{image.period}</p>
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
              className="relative rounded-xl p-6 hover:shadow-xl transition-all flex flex-col overflow-hidden"
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
                className="w-full rounded-lg font-bold !bg-[#135DCD] !text-white hover:!bg-[#D75220] border-2 border-[#135DCD]"
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
                src={galleryImages[selectedImage - 1]?.src}
                alt={galleryImages[selectedImage - 1]?.title ?? ''}
                className="aspect-video h-full w-full object-cover"
              />
            </div>
            <p className="text-lg leading-relaxed">
              {language === 'it'
                ? 'Descrizione dettagliata dell\'oggetto storico con informazioni su utilizzo, periodo, significato storico e sociale. Include testo in Braille e audiodescrizione.'
                : 'Detailed description of the historical object with information on use, period, historical and social significance. Includes Braille text and audio description.'}
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
