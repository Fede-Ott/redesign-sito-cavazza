import { useState } from 'react';
import {
  ArrowLeft, Hand, Phone, Mail, MapPin, Clock, Calendar,
  BookOpen, Users, GraduationCap, Layers,
  ChevronDown, ChevronUp
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Button } from '../components/Button';
import { MuseumBookingModal } from '../components/MuseumBookingModal';
import { type Lang } from '../i18n';
import { anterosGalleryImages } from '../data/siteImages';

interface AnterosDetailPageProps {
  language: Lang;
  onBack: () => void;
  onHomeClick: () => void;
}

export function AnterosDetailPage({ language, onBack, onHomeClick }: AnterosDetailPageProps) {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>('collection');

  const it = language === 'it';

  const toggle = (id: string) => setOpenSection(openSection === id ? null : id);

  const Accordion = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
    <div className="border-2 border-[#135DCD] rounded-xl overflow-hidden mb-4">
      <button
        className="w-full flex items-center justify-between px-6 py-4 transition-colors text-left min-h-[56px]"
        onClick={() => toggle(id)}
        aria-expanded={openSection === id}
      >
        <span className="font-bold text-lg">{title}</span>
        {openSection === id
          ? <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" aria-hidden="true" />
          : <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" aria-hidden="true" />
        }
      </button>
      {openSection === id && (
        <div className="px-6 py-5">{children}</div>
      )}
    </div>
  );

  const works = [
    { author: 'Leonardo da Vinci', title: 'La Gioconda (Monna Lisa)', period: '1503–1519', origin: 'Louvre, Paris' },
    { author: 'Sandro Botticelli', title: 'La nascita di Venere', period: '1484–1486', origin: 'Uffizi, Florence' },
    { author: 'Michelangelo', title: 'La Pietà', period: '1498–1499', origin: 'Vatican' },
    { author: 'Raffaello', title: 'La Scuola di Atene', period: '1509–1511', origin: 'Vatican Museums' },
    { author: 'Caravaggio', title: 'Giuditta che decapita Oloferne', period: '1598–1599', origin: 'Galleria Nazionale d\'Arte Antica, Rome' },
    { author: 'Vermeer', title: 'La ragazza con l\'orecchino di perla', period: '1665', origin: 'Mauritshuis, The Hague' },
    { author: 'Rembrandt', title: 'La ronda di notte', period: '1642', origin: 'Rijksmuseum, Amsterdam' },
    { author: 'Claude Monet', title: 'Le ninfee', period: '1896–1926', origin: 'Musée d\'Orsay, Paris' },
  ];

  const team = [
    { name: 'Loretta Secchi', role: it ? 'Curatrice e Coordinatrice' : 'Curator and Coordinator' },
    { name: 'Paolo Gualandi', role: it ? 'Collaboratore' : 'Collaborator' },
    { name: 'Marco Marchesini', role: it ? 'Collaboratore' : 'Collaborator' },
    { name: 'Daniela Angeli', role: it ? 'Collaboratrice' : 'Collaborator' },
    { name: 'Maria Rapagnetta', role: it ? 'Collaboratrice' : 'Collaborator' },
    { name: 'Giampaolo Rocca', role: it ? 'Collaboratore' : 'Collaborator' },
    { name: 'Alessandro Mancinone', role: it ? 'Collaboratore' : 'Collaborator' },
  ];

  const phases = [
    {
      n: '01',
      title: it ? 'Studio Preliminare' : 'Preliminary Study',
      desc: it
        ? 'Ridimensionamento del dipinto e traduzione dei valori estetici pittorici in valori tattili.'
        : 'Scaling the painting and translating pictorial aesthetic values into tactile values.'
    },
    {
      n: '02',
      title: it ? 'Preparazione del Tracciato' : 'Trace Preparation',
      desc: it
        ? 'Trasferimento delle linee di contorno sulla superficie d\'argilla.'
        : 'Transferring contour lines onto the clay surface.'
    },
    {
      n: '03',
      title: it ? 'Modellazione dei Volumi' : 'Volume Modelling',
      desc: it
        ? 'Costruzione delle relazioni di profondità tra i piani compositivi.'
        : 'Building depth relationships between compositional planes.'
    },
    {
      n: '04',
      title: it ? 'Definizione delle Forme' : 'Form Definition',
      desc: it
        ? 'Rifinitura dei dettagli, texturizzazione delle superfici e verifica della leggibilità tattile.'
        : 'Detailing, surface texturing and tactile readability testing.'
    },
    {
      n: '05',
      title: it ? 'Formatura e Calchi' : 'Moulding & Casting',
      desc: it
        ? 'Creazione dello stampo in silicone e produzione delle copie finali in resina bianca o gesso alabastrino.'
        : 'Silicone mould creation and final copies in white resin or alabaster plaster.'
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Breadcrumbs
        items={[
          { label: it ? 'Cultura' : 'Culture', onClick: onHomeClick },
          { label: it ? 'Museo Tattile Anteros' : 'Anteros Tactile Museum', onClick: onBack },
          { label: it ? 'Esplora il Museo' : 'Explore the Museum' }
        ]}
        onHomeClick={onHomeClick}
      />

      {/* Hero */}
      <section
        className="cultura-hero bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 text-white py-16"
        aria-labelledby="anteros-title"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors min-h-[44px]"
            aria-label={it ? 'Torna al Museo Anteros' : 'Back to Anteros Museum'}
          >
            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
            {it ? 'Torna al Museo Anteros' : 'Back to Anteros Museum'}
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 id="anteros-title" className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                {it ? 'Toccare la Pittura' : 'Touching Painting'}
              </h1>
              <p className="text-xl opacity-90 mb-6 leading-relaxed">
                {it
                  ? 'Museo Tattile di Pittura Antica e Moderna — 40 capolavori della storia dell\'arte accessibili attraverso il tatto'
                  : 'Tactile Museum of Ancient and Modern Painting — 40 masterpieces of art history accessible through touch'}
              </p>
            </div>

            {/* Info card */}
            <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-bold mb-4 text-white">
                <Clock className="w-5 h-5 inline mr-2" aria-hidden="true" />
                {it ? 'Orari di Apertura' : 'Opening Hours'}
              </h2>
              <div className="space-y-2 text-white/90 mb-6">
                {[
                  [it ? 'Giovedì' : 'Thursday', '09:00 – 13:30'],
                  [it ? 'Venerdì' : 'Friday', '09:00 – 17:30'],
                  [it ? 'Sabato' : 'Saturday', '09:00 – 13:30'],
                ].map(([day, hours]) => (
                  <div key={day} className="flex justify-between items-center py-1 border-b border-white/10">
                    <span className="font-medium">{day}</span>
                    <span className="font-bold">{hours}</span>
                  </div>
                ))}
                <p className="text-sm pt-2 opacity-80">
                  {it
                    ? 'Lun–Mar: 09:00–14:00 (uso interno/segreteria)'
                    : 'Mon–Tue: 09:00–14:00 (internal/secretariat)'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Intro */}
        <section className="mb-16" aria-labelledby="intro-title">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 id="intro-title" className="text-3xl font-bold mb-6">
                {it ? 'Il Museo' : 'The Museum'}
              </h2>
              <p className="text-base leading-relaxed mb-4">
                {it
                  ? 'Fondato a Bologna nel 1999 dall\'Istituto dei Ciechi Francesco Cavazza, il Museo Tattile Anteros è il risultato di un progetto di ricerca avviato nel 1995 in collaborazione con l\'Associazione Scuola di Scultura Applicata, la Cattedra di Ottica fisiopatologica dell\'Ospedale Sant\'Orsola e l\'Unione Italiana Ciechi.'
                  : 'Founded in Bologna in 1999 by the Istituto dei Ciechi Francesco Cavazza, the Anteros Tactile Museum is the result of a research project begun in 1995 in collaboration with the School of Applied Sculpture, the Chair of Pathophysiological Optics at the Sant\'Orsola Hospital, and the Italian Union of the Blind.'}
              </p>
              <p className="text-base leading-relaxed mb-4">
                {it
                  ? 'Il museo converte celebri dipinti in bassorilievi tattili tridimensionali, rendendoli accessibili a chi non vede. Un team interdisciplinare — esperti di storia dell\'arte, psicologia tattile-percettiva, ottica, tiflologia e scultura applicata — crea ogni riproduzione con tre livelli progressivi di profondità dell\'immagine.'
                  : 'The museum converts celebrated paintings into three-dimensional tactile bas-reliefs, making them accessible to those who cannot see. An interdisciplinary team — experts in art history, tactile-perceptual psychology, optics, typhology and applied sculpture — creates each reproduction with three progressive levels of image depth.'}
              </p>
              <p className="text-base leading-relaxed">
                {it
                  ? 'Ogni opera è accompagnata da schede descrittive in alfabeto Braille e caratteri ingranditi, e segue il metodo tripartito di Panofsky applicato alla percezione tattile.'
                  : 'Each work is accompanied by description sheets in Braille alphabet and enlarged characters, and follows Panofsky\'s tripartite method applied to tactile perception.'}
              </p>
            </div>
            <div className="space-y-4">
              {[
                { value: '40', label: it ? 'Opere in collezione' : 'Works in collection' },
                { value: '1999', label: it ? 'Anno di fondazione' : 'Year of foundation' },
                { value: '3', label: it ? 'Livelli di profondità' : 'Depth levels' },
                { value: '2', label: it ? 'Formati descrizione (Braille + stampa)' : 'Description formats' },
              ].map(stat => (
                <div key={stat.label} className="rounded-xl p-5 text-center" style={{ backgroundColor: '#EDF4FF' }}>
                  <div className="text-4xl font-bold mb-1" style={{ color: '#135DCD' }}>{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Collection */}
        <section className="mb-16" aria-labelledby="collection-title">
          <h2 id="collection-title" className="text-3xl font-bold mb-6">
            {it ? 'La Collezione' : 'The Collection'}
          </h2>
          <p className="text-base leading-relaxed mb-8 max-w-3xl">
            {it
              ? 'Le 40 opere spaziano dall\'antichità classica all\'arte contemporanea, disposte cronologicamente. Accanto ai capolavori pittorici, il museo conserva rilievi tecnici, copie di rilievi rinascimentali e tavole propedeutiche sulle categorie rappresentative e la prospettiva.'
              : 'The 40 works span from classical antiquity to contemporary art, arranged chronologically. Alongside pictorial masterpieces, the museum preserves technical reliefs, copies of Renaissance reliefs and preparatory panels on representational categories and perspective.'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {works.map((w, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl border-2 border-[#135DCD] transition-colors">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-sm text-white"
                  style={{ backgroundColor: '#135DCD' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  <div className="font-bold">{w.title}</div>
                  <div className="text-sm text-muted-foreground">{w.author} · {w.period}</div>
                  <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3" aria-hidden="true" />
                    {w.origin}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {anterosGalleryImages.slice(0, 4).map((src, imageIndex) => (
              <img
                key={imageIndex}
                src={src}
                alt={it ? `Riferimento visivo ${imageIndex + 1}` : `Visual reference ${imageIndex + 1}`}
                className="h-32 w-full rounded-xl object-cover shadow-sm"
              />
            ))}
          </div>
        </section>

        {/* Methodology */}
        <section className="mb-16" aria-labelledby="method-title">
          <h2 id="method-title" className="text-3xl font-bold mb-6">
            {it ? 'Metodologia e Didattica' : 'Methodology & Education'}
          </h2>

          <Accordion id="panofsky" title={it ? 'Metodo Tripartito di Panofsky' : 'Panofsky\'s Tripartite Method'}>
            <p className="text-base leading-relaxed mb-4">
              {it
                ? 'Il museo applica il metodo tripartito di Panofsky alla percezione tattile, strutturando la visita in tre livelli interconnessi di lettura:'
                : 'The museum applies Panofsky\'s tripartite method to tactile perception, structuring the visit in three interconnected reading levels:'}
            </p>
            <div className="space-y-4">
              {[
                {
                  n: '1', color: '#135DCD',
                  title: it ? 'Pre-iconografico' : 'Pre-iconographic',
                  desc: it ? 'Percezione tattile/ottica delle forme e delle strutture compositives.' : 'Tactile/optical perception of forms and compositional structures.'
                },
                {
                  n: '2', color: '#D75220',
                  title: it ? 'Iconografico' : 'Iconographic',
                  desc: it ? 'Riconoscimento e identificazione del contenuto convenzionale dell\'opera.' : 'Recognition and identification of the conventional content of the work.'
                },
                {
                  n: '3', color: '#135DCD',
                  title: it ? 'Iconologico' : 'Iconological',
                  desc: it ? 'Interpretazione del significato e della sua estensione simbolica.' : 'Interpretation of meaning and its symbolic extension.'
                },
              ].map(s => (
                <div key={s.n} className="flex gap-4 p-4 rounded-lg" style={{ backgroundColor: '#EDF4FF' }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: s.color }}>{s.n}</div>
                  <div>
                    <div className="font-bold mb-1">{s.title}</div>
                    <div className="text-sm text-muted-foreground">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Accordion>

          <Accordion id="tactile" title={it ? 'Tecniche di Lettura Tattile' : 'Tactile Reading Techniques'}>
            <p className="text-base leading-relaxed mb-4">
              {it
                ? 'L\'esplorazione avviene prima in modo guidato, poi in autonomia. Le tecniche principali insegnate al museo sono:'
                : 'Exploration happens first guided, then independently. The main techniques taught at the museum are:'}
            </p>
            <ul className="space-y-3">
              {[
                {
                  title: it ? 'Movimenti a Pinza e a Pennello' : 'Pincer & Brush Movements',
                  desc: it ? 'Uso dell\'indice e del pollice per seguire i contorni e le superfici in rilievo.' : 'Using index finger and thumb to follow outlines and relief surfaces.'
                },
                {
                  title: it ? 'Coordinazione Bimanuale' : 'Bimanual Coordination',
                  desc: it ? 'Utilizzo simmetrico o speculare di entrambe le mani per comprendere la struttura compositiva.' : 'Symmetrical or mirrored use of both hands to understand compositional structure.'
                },
                {
                  title: it ? 'Sfioramento per le Texture' : 'Skimming for Textures',
                  desc: it ? 'Movimento leggero per rilevare variazioni di texture e modulazioni plastiche delle superfici.' : 'Light movement to detect texture variations and plastic surface modulations.'
                },
              ].map(t => (
                <li key={t.title} className="flex gap-3 p-4 rounded-lg" style={{ backgroundColor: '#EDF4FF' }}>
                  <Hand className="w-5 h-5 text-primary flex-shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <div className="font-bold mb-1">{t.title}</div>
                    <div className="text-sm text-muted-foreground">{t.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </Accordion>

          <Accordion id="collection" title={it ? 'Programmi Educativi' : 'Educational Programmes'}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: GraduationCap, title: it ? 'Scuole di ogni grado' : 'Schools of all levels', desc: it ? 'Unità didattiche integrate con la classe e l\'insegnante di sostegno.' : 'Teaching units integrated with class and support teacher.' },
                { icon: Users, title: it ? 'Gruppi e Singoli' : 'Groups & Individuals', desc: it ? 'Visite guidate personalizzate per gruppi e visitatori individuali.' : 'Personalised guided tours for groups and individual visitors.' },
                { icon: BookOpen, title: it ? 'Laboratorio di Creta' : 'Clay Modelling Lab', desc: it ? 'Workshop pratici dove i partecipanti riproducono opere in creta.' : 'Practical workshops where participants reproduce works in clay.' },
                { icon: Layers, title: it ? 'Formazione Operatori' : 'Operator Training', desc: it ? 'Formazione per operatori museali, educatori e insegnanti.' : 'Training for museum operators, educators and teachers.' },
              ].map(s => (
                <div key={s.title} className="p-5 rounded-xl" style={{ backgroundColor: '#EDF4FF' }}>
                  <s.icon className="w-8 h-8 mb-3" style={{ color: '#135DCD' }} aria-hidden="true" />
                  <div className="font-bold mb-2">{s.title}</div>
                  <div className="text-sm text-muted-foreground leading-relaxed">{s.desc}</div>
                </div>
              ))}
            </div>
          </Accordion>
        </section>

        {/* Production Process */}
        <section className="mb-16" aria-labelledby="process-title">
          <h2 id="process-title" className="text-3xl font-bold mb-4">
            {it ? 'Come Nascono i Bassorilievi' : 'How Bas-Reliefs are Created'}
          </h2>
          <p className="text-base leading-relaxed mb-8 max-w-3xl text-muted-foreground">
            {it
              ? 'Ogni riproduzione è realizzata artigianalmente in 5 fasi. Il prototipo è volutamente fatto a mano per maggiore sensibilità interpretativa. I tester non vedenti verificano la leggibilità prima della formatura finale.'
              : 'Each reproduction is handcrafted in 5 phases. The prototype is deliberately handmade for greater interpretive sensitivity. Blind testers verify readability before the final casting.'}
          </p>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border hidden md:block" aria-hidden="true" />
            <div className="space-y-6">
              {phases.map(p => (
                <div key={p.n} className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0 relative z-10"
                    style={{ backgroundColor: '#D75220' }}>
                    {p.n}
                  </div>
                  <div className="flex-1 p-5 rounded-xl border-2 border-[#135DCD]">
                    <div className="font-bold text-lg mb-2">{p.title}</div>
                    <div className="text-muted-foreground leading-relaxed">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="mb-16" aria-labelledby="team-title">
          <h2 id="team-title" className="text-3xl font-bold mb-6">
            {it ? 'Il Team del Museo' : 'Museum Team'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {team.map(m => (
              <div key={m.name} className="p-5 rounded-xl border-2 border-[#135DCD] text-center">
                <div className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center font-bold text-white text-lg"
                  style={{ backgroundColor: m.name === 'Loretta Secchi' ? '#D75220' : '#135DCD' }}>
                  {m.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="font-bold mb-1">{m.name}</div>
                <div className="text-sm text-muted-foreground">{m.role}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA booking */}
        <section
          className="rounded-2xl p-10 text-center border-2 border-[#D75220]"
          aria-labelledby="cta-title"
        >
          <h2 id="cta-title" className="text-3xl font-bold mb-4">
            {it ? 'Prenota la tua Visita' : 'Book your Visit'}
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-muted-foreground">
            {it
              ? 'Le visite sono su prenotazione. Contattaci per organizzare una visita guidata individuale o di gruppo, un laboratorio o una consulenza.'
              : 'Visits are by appointment. Contact us to arrange an individual or group guided tour, workshop or consultation.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              className="!bg-[#135DCD] !text-white font-bold text-lg px-8 py-4"
              onClick={() => setShowBookingModal(true)}
            >
              <Calendar className="w-5 h-5 mr-2" aria-hidden="true" />
              {it ? 'Prenota Ora' : 'Book Now'}
            </Button>
            <a
              href="mailto:museoanteros@cavazza.it"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#D75220] text-[#D75220] font-bold text-lg px-8 py-4 rounded-xl hover:bg-[#FFF3EE] transition-colors no-underline min-h-[56px]"
            >
              <Mail className="w-5 h-5" aria-hidden="true" />
              museoanteros@cavazza.it
            </a>
          </div>
          <div className="mt-8 pt-6 border-t border-[#D75220]/30">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D75220]" aria-hidden="true" />
                +39 051 33.20.90
              </span>
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D75220]" aria-hidden="true" />
                loretta.secchi@cavazza.it
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D75220]" aria-hidden="true" />
                Via Castiglione 71, Bologna
              </span>
            </div>
          </div>
        </section>
      </div>

      <MuseumBookingModal
        isOpen={showBookingModal}
        language={language}
        museumName={it ? 'Museo Tattile Anteros' : 'Anteros Tactile Museum'}
        onClose={() => setShowBookingModal(false)}
      />
    </div>
  );
}
