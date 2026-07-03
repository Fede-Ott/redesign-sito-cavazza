import { Radio, ArrowLeft, Play, Pause, Podcast, Calendar, Mic, Users, Music, Clock, ExternalLink } from 'lucide-react';
import { useState, useRef } from 'react';
import { Button } from '../components/Button';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { type Lang } from '../i18n';

interface RadioOltrePageProps {
  language: Lang;
  onBack: () => void;
  onHomeClick: () => void;
}

export function RadioOltrePage({ language, onBack, onHomeClick }: RadioOltrePageProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };
  const t = (key: string) => {
    const translations: Record<string, { it: string; en: string }> = {
      'back': { it: "Torna a Cultura", en: "Back to Culture" },
      'breadcrumb.cultura': { it: "Cultura", en: "Culture" },
      'breadcrumb.radio': { it: "Radio Oltre", en: "Radio Oltre" },
      'page.title': { it: "Radio Oltre", en: "Radio Oltre" },
      'page.subtitle': { it: "La prima radio italiana dedicata all'inclusione", en: "The first Italian radio dedicated to inclusion" },

      'intro.title': { it: "La Radio", en: "The Radio" },
      'intro.text': { it: "Radio Oltre è la prima radio italiana interamente dedicata ai temi dell'inclusione e dell'accessibilità. Programmi, interviste, musica e approfondimenti per abbattere le barriere culturali e promuovere una società più equa e accessibile per tutti.", en: "Radio Oltre is the first Italian radio entirely dedicated to inclusion and accessibility themes. Programs, interviews, music and insights to break down cultural barriers and promote a more equitable and accessible society for all." },

      'live.title': { it: "Ascolta la Diretta", en: "Listen Live" },
      'live.desc': { it: "Streaming 24/7", en: "24/7 Streaming" },
      'live.cta': { it: "Ascolta Ora", en: "Listen Now" },

      'palinsesto.title': { it: "Palinsesto", en: "Program Schedule" },
      'palinsesto.desc': { it: "I nostri programmi quotidiani dedicati a cultura, attualità, sport, tecnologia e intrattenimento. Ogni giorno nuove voci e nuove storie di inclusione.", en: "Our daily programs dedicated to culture, current affairs, sports, technology and entertainment. Every day new voices and new stories of inclusion." },

      'podcast.title': { it: "Podcast", en: "Podcasts" },
      'podcast.desc': { it: "Ascolta e riascolta i tuoi programmi preferiti. Tutti i nostri podcast sono completamente accessibili e disponibili gratuitamente.", en: "Listen and re-listen to your favorite programs. All our podcasts are completely accessible and available for free." },

      'conduttori.title': { it: "I Conduttori", en: "The Hosts" },
      'conduttori.desc': { it: "Voci, storie e competenze al servizio dell'informazione accessibile. Il nostro team di conduttori e giornalisti lavora ogni giorno per portare contenuti di qualità.", en: "Voices, stories and expertise at the service of accessible information. Our team of hosts and journalists works every day to bring quality content." },

      'eventi.title': { it: "Eventi e Dirette Speciali", en: "Events and Special Live" },
      'eventi.desc': { it: "Copertura di eventi culturali, sportivi e sociali con focus sull'accessibilità. Dirette da concerti, presentazioni di libri, conferenze e molto altro.", en: "Coverage of cultural, sports and social events with a focus on accessibility. Live broadcasts from concerts, book presentations, conferences and much more." },

      'musica.title': { it: "Playlist Musicali", en: "Music Playlists" },
      'musica.desc': { it: "Selezioni musicali curate per accompagnare le tue giornate. Rock, pop, jazz, classica e musica del mondo. Ogni genere ha la sua storia da raccontare.", en: "Curated music selections to accompany your days. Rock, pop, jazz, classical and world music. Every genre has its story to tell." },

      'partecipa.title': { it: "Partecipa", en: "Participate" },
      'partecipa.desc': { it: "Radio Oltre è la tua radio. Scrivi in redazione, proponi temi, condividi le tue storie. Insieme costruiamo una community più inclusiva.", en: "Radio Oltre is your radio. Write to the editorial team, propose topics, share your stories. Together we build a more inclusive community." },

      'archivio.title': { it: "Archivio Audio", en: "Audio Archive" },
      'archivio.desc': { it: "Anni di programmazione accessibile a tutti. Interviste storiche, programmi speciali, documentari audio e molto altro nel nostro archivio digitale.", en: "Years of programming accessible to all. Historical interviews, special programs, audio documentaries and much more in our digital archive." },

      'listen.cta': { it: "Ascolta", en: "Listen" },
      'discover.cta': { it: "Scopri", en: "Discover" },
      'contact.cta': { it: "Contattaci", en: "Contact Us" }
    };
    return translations[key]?.[language] || key;
  };

  const programs = [
    {
      id: 'mattina',
      time: '07:00 - 10:00',
      title: language === 'it' ? 'Buongiorno Oltre' : 'Good Morning Oltre',
      description: language === 'it' ? 'Rassegna stampa e attualità per iniziare la giornata informati' : 'News review and current affairs to start the day informed'
    },
    {
      id: 'mezzogiorno',
      time: '12:00 - 14:00',
      title: language === 'it' ? 'A Pranzo con Radio Oltre' : 'Lunch with Radio Oltre',
      description: language === 'it' ? 'Musica, interviste e leggerezza' : 'Music, interviews and lightness'
    },
    {
      id: 'pomeriggio',
      time: '15:00 - 18:00',
      title: language === 'it' ? 'Cultura in Movimento' : 'Culture in Motion',
      description: language === 'it' ? 'Libri, arte, cinema e teatro accessibili' : 'Accessible books, art, cinema and theater'
    },
    {
      id: 'sera',
      time: '20:00 - 22:00',
      title: language === 'it' ? 'Voci della Sera' : 'Evening Voices',
      description: language === 'it' ? 'Storie di inclusione, sport e tecnologia' : 'Stories of inclusion, sports and technology'
    }
  ];

  const sections = [
    { id: 'podcast', icon: Podcast, title: t('podcast.title'), description: t('podcast.desc'), cta: t('listen.cta') },
    { id: 'conduttori', icon: Users, title: t('conduttori.title'), description: t('conduttori.desc'), cta: t('discover.cta') },
    { id: 'eventi', icon: Mic, title: t('eventi.title'), description: t('eventi.desc'), cta: t('discover.cta') },
    { id: 'musica', icon: Music, title: t('musica.title'), description: t('musica.desc'), cta: t('listen.cta') },
    { id: 'partecipa', icon: Users, title: t('partecipa.title'), description: t('partecipa.desc'), cta: t('contact.cta') },
    { id: 'archivio', icon: Calendar, title: t('archivio.title'), description: t('archivio.desc'), cta: t('discover.cta') },
  ];

  const ACCENT = '#135DCD';
  const BG = '#EEF4FF';

  const handleSectionCta = (sectionId: string) => {
    if (sectionId === 'partecipa') {
      window.location.href = 'mailto:radiooltre@cavazza.it';
      return;
    }
    window.open('https://www.radiooltre.it/', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: t('breadcrumb.cultura'), onClick: onBack },
          { label: t('breadcrumb.radio') }
        ]}
        onHomeClick={onHomeClick}
      />

      {/* Hero */}
      <section className="cultura-hero text-white py-16" style={{ background: 'linear-gradient(135deg, #00C950 0%, #009e3d 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center animate-pulse">
              <Radio className="w-12 h-12" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-bold">{t('page.title')}</h1>
              <p className="text-base opacity-90 mt-2">{t('page.subtitle')}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Intro */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">{t('intro.title')}</h2>
          <p className="text-base leading-relaxed">{t('intro.text')}</p>
        </div>

        {/* Live Player */}
        <div className="flex items-center justify-between flex-wrap gap-6 mb-16 py-6 border-b-2" style={{ borderBottomColor: '#00C950', borderTopColor: 'transparent', borderLeftColor: 'transparent', borderRightColor: 'transparent' }}>
          <audio
            ref={audioRef}
            src="https://onair7.xdevel.com/proxy/xautocloud_ryn6_1385?mp=/;1/"
            preload="none"
            onEnded={() => setIsPlaying(false)}
          />
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: '#00C950' }}>
              <Radio className="w-8 h-8 text-white" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-1" style={{ color: '#00C950' }}>{t('live.title')}</h2>
              <p className="text-base text-muted-foreground">{t('live.desc')}</p>
            </div>
          </div>
          <button
            onClick={togglePlay}
            className="flex items-center justify-center gap-2 text-white text-xl px-8 py-4 min-h-[56px] font-bold rounded-xl transition-colors"
            style={{ backgroundColor: '#00C950' }}
            aria-label={isPlaying ? 'Metti in pausa' : 'Ascolta Radio Oltre'}
          >
            {isPlaying ? <Pause className="w-6 h-6" aria-hidden="true" /> : <Play className="w-6 h-6" aria-hidden="true" />}
            {isPlaying ? (language === 'it' ? 'In pausa' : 'Pause') : t('live.cta')}
          </button>
        </div>

        {/* Palinsesto */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Clock className="w-6 h-6 text-primary" aria-hidden="true" />
            {t('palinsesto.title')}
          </h2>
          <p className="text-base mb-6 text-muted-foreground">{t('palinsesto.desc')}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programs.map((program, index) => (
              <div
                key={program.id}
                className="bg-card rounded-xl p-6 hover:shadow-xl transition-all"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 100}ms backwards`
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold">{program.title}</h3>
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap ml-2">
                    {program.time}
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed">{program.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {sections.map((section, index) => (
            <div
              key={section.id}
              className="culture-resource-box relative rounded-xl p-6 hover:shadow-xl transition-all flex flex-col overflow-hidden"
              style={{
                animation: `fadeInUp 0.6s ease-out ${(index + 4) * 100}ms backwards`,
                backgroundColor: BG,
                border: `2px solid ${ACCENT}33`,
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-xl" style={{ backgroundColor: ACCENT }} />
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 mt-2" style={{ backgroundColor: ACCENT }}>
                <section.icon className="w-10 h-10 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-black">{section.title}</h3>
              <p className="text-base leading-relaxed flex-1 text-black mb-6">{section.description}</p>
              <Button
                variant="primary"
                className="culture-resource-button w-full rounded-lg font-bold bg-[#135DCD] text-white hover:bg-[#D75220] border-2 border-[#135DCD]"
                onClick={() => handleSectionCta(section.id)}
              >
                {section.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>

        {/* CTA Visita sito */}
        <div className="flex justify-center mt-4 mb-10">
          <a
            href="https://www.radiooltre.it/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white no-underline min-h-[56px] transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#00C950' }}
          >
            <ExternalLink className="w-5 h-5" aria-hidden="true" />
            {language === 'it' ? 'Visita il sito di Radio Oltre' : 'Visit Radio Oltre website'}
          </a>
        </div>

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
