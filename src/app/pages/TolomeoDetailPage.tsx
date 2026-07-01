import { useState } from 'react';
import {
  ArrowLeft, Landmark, Phone, Mail, MapPin, Calendar,
  Users, Lightbulb, BookOpen, Film, Music, Archive,
  ChevronDown, ChevronUp, Volume2
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Button } from '../components/Button';
import { MuseumBookingModal } from '../components/MuseumBookingModal';
import { type Lang } from '../i18n';

interface TolomeoDetailPageProps {
  language: Lang;
  onBack: () => void;
  onHomeClick: () => void;
}

export function TolomeoDetailPage({ language, onBack, onHomeClick }: TolomeoDetailPageProps) {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>('concept');

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

  const pillars = [
    {
      key: 'TOLOMEO',
      icon: Landmark,
      color: '#135DCD',
      bg: '#EDF4FF',
      quote: it ? '"mette al mondo un modo diverso di guardare il mondo"' : '"brings into the world a different way of looking at the world"',
    },
    {
      key: 'STORIE',
      icon: Users,
      color: '#D75220',
      bg: '#FFDED2',
      quote: it ? '"le persone fanno i luoghi e i luoghi fanno le persone"' : '"people make places and places make people"',
    },
    {
      key: 'ARTI',
      icon: BookOpen,
      color: '#135DCD',
      bg: '#EDF4FF',
      quote: it ? '"la conoscenza è veicolo di libertà"' : '"knowledge is the vehicle of freedom"',
    },
    {
      key: 'TECNOLOGIE',
      icon: Lightbulb,
      color: '#D75220',
      bg: '#FFDED2',
      quote: it ? '"la tecnica è innovazione e al contempo potenzialità espressiva"' : '"technique is innovation and at the same time expressive potential"',
    },
    {
      key: 'MUSEO',
      icon: Archive,
      color: '#135DCD',
      bg: '#EDF4FF',
      quote: it ? '"uno spazio relazionale che mette in gioco le collezioni con le persone"' : '"a relational space that plays collections against people"',
    },
  ];

  const objects = [
    {
      name: it ? 'Tavoletta Braille antica' : 'Ancient Braille Tablet',
      desc: it ? 'Strumento manuale per la scrittura in Braille, usato prima dell\'era elettronica.' : 'Manual tool for Braille writing, used before the electronic era.',
      icon: BookOpen,
    },
    {
      name: it ? 'Dattilobraille antico' : 'Ancient Braille Typewriter',
      desc: it ? 'Macchina da scrivere meccanica per il Braille, precursore delle versioni elettroniche.' : 'Mechanical typewriter for Braille, precursor to electronic versions.',
      icon: Archive,
    },
    {
      name: 'Optacon',
      desc: it ? 'Dispositivo per leggere il testo a stampa con il polpastrello, traducendo le lettere in vibrazioni tattili.' : 'Device for reading print text with the fingertip, translating letters into tactile vibrations.',
      icon: Lightbulb,
    },
    {
      name: it ? 'Registratore a nastro antico' : 'Ancient Tape Recorder',
      desc: it ? 'Strumento usato per la fruizione di contenuti audio e audiolibri prima dell\'era digitale.' : 'Tool used for listening to audio content and audiobooks before the digital age.',
      icon: Volume2,
    },
    {
      name: it ? 'Macchine da scrivere adattate' : 'Adapted Typewriters',
      desc: it ? 'Macchine da scrivere modificate per l\'uso da parte di persone non vedenti.' : 'Typewriters modified for use by blind people.',
      icon: Archive,
    },
    {
      name: it ? 'Installazioni multimediali' : 'Multimedia Installations',
      desc: it ? 'Postazioni interattive con audio, video, contenuti tattili e olfattivi.' : 'Interactive stations with audio, video, tactile and olfactory content.',
      icon: Film,
    },
  ];

  const credits = [
    { role: it ? 'Direzione Artistica e Idea' : 'Artistic Direction & Concept', name: 'Fabio Fornasari' },
    { role: it ? 'Curatori' : 'Curators', name: 'Lucilla Boschi, Fabio Fornasari' },
    { role: it ? 'Promotore' : 'Promoter', name: 'Istituto dei Ciechi "Francesco Cavazza"' },
    { role: it ? 'Collaboratori' : 'Collaborators', name: 'ZeroGK (associazione social art), UICI Bologna' },
    { role: it ? 'Supporto Finanziario' : 'Financial Support', name: 'Fondazione Cassa di Risparmio in Bologna' },
    { role: it ? 'Supporto Tecnico' : 'Technical Support', name: 'RES.Co srl, Publierre S.r.l., Latifolia group' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Breadcrumbs
        items={[
          { label: it ? 'Cultura' : 'Culture', onClick: onHomeClick },
          { label: it ? 'Museo Tolomeo' : 'Tolomeo Museum', onClick: onBack },
          { label: it ? 'Esplora il Museo' : 'Explore the Museum' }
        ]}
        onHomeClick={onHomeClick}
      />

      {/* Hero */}
      <section
        className="cultura-hero bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-600 text-white py-16"
        aria-labelledby="tolomeo-title"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors min-h-[44px]"
            aria-label={it ? 'Torna al Museo Tolomeo' : 'Back to Tolomeo Museum'}
          >
            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
            {it ? 'Torna al Museo Tolomeo' : 'Back to Tolomeo Museum'}
          </button>

          <div>
            <div>
              <h1 id="tolomeo-title" className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                {it ? 'Il Museo Tolomeo' : 'The Tolomeo Museum'}
              </h1>
              <p className="text-2xl font-bold mb-4 opacity-80">
                {it ? 'tra STORIE, ARTI e TECNOLOGIE' : 'between STORIES, ARTS and TECHNOLOGIES'}
              </p>
              <p className="text-lg opacity-90 mb-6 leading-relaxed">
                {it
                  ? 'Un viaggio emozionante nella storia dell\'Istituto Cavazza attraverso gli oggetti che hanno reso libere e indipendenti le persone non vedenti e ipovedenti.'
                  : 'An emotional journey through the history of the Cavazza Institute through objects that have made blind and visually impaired people free and independent.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Pillars */}
        <section className="mb-16" aria-labelledby="pillars-title">
          <h2 id="pillars-title" className="text-3xl font-bold mb-4">
            {it ? 'I Cinque Pilastri del Museo' : 'The Five Museum Pillars'}
          </h2>
          <p className="text-base leading-relaxed mb-8 max-w-3xl text-muted-foreground">
            {it
              ? 'Il Museo Tolomeo è costruito attorno a cinque concetti fondamentali che guidano l\'intera esperienza espositiva:'
              : 'The Tolomeo Museum is built around five fundamental concepts that guide the entire exhibition experience:'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {pillars.slice(0, 3).map(p => (
              <div
                key={p.key}
                className="p-6 rounded-xl text-center"
                style={{ backgroundColor: p.bg }}
              >
                <p.icon className="w-12 h-12 mx-auto mb-4" style={{ color: p.color }} aria-hidden="true" />
                <div className="font-bold text-2xl mb-3" style={{ color: p.color }}>{p.key}</div>
                <blockquote className="text-sm italic text-muted-foreground leading-relaxed">{p.quote}</blockquote>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-3xl mx-auto">
            {pillars.slice(3).map(p => (
              <div
                key={p.key}
                className="p-6 rounded-xl text-center flex-1"
                style={{ backgroundColor: p.bg }}
              >
                <p.icon className="w-12 h-12 mx-auto mb-4" style={{ color: p.color }} aria-hidden="true" />
                <div className="font-bold text-2xl mb-3" style={{ color: p.color }}>{p.key}</div>
                <blockquote className="text-sm italic text-muted-foreground leading-relaxed">{p.quote}</blockquote>
              </div>
            ))}
          </div>
        </section>

        {/* About */}
        <section className="mb-16" aria-labelledby="about-title">
          <h2 id="about-title" className="text-3xl font-bold mb-6">
            {it ? 'Il Museo' : 'The Museum'}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <p className="text-base leading-relaxed mb-4">
                {it
                  ? 'Fondato dal Conte Francesco Cavazza, il museo narra la storia dell\'Istituto come caso studio sulla trasmissione del sapere, l\'innovazione tecnologica e l\'intersezione di linguaggi. Serve anche come punto di partenza per esplorare Bologna da una prospettiva alternativa — il visivo e il non-visivo come modi complementari di comprendere la realtà.'
                  : 'Founded by Count Francesco Cavazza, the museum narrates the Institute\'s history as a case study on knowledge transmission, technological innovation and the intersection of languages. It also serves as a departure point for exploring Bologna from an alternative perspective — visual and non-visual as complementary ways of understanding reality.'}
              </p>
              <p className="text-base leading-relaxed mb-4">
                {it
                  ? 'Il principio guida dell\'Istituto attraverso i decenni: non fornire assistenza passiva, ma coltivare la libertà e l\'indipendenza attraverso cultura, conoscenza, musica, lettura/scrittura e tecnologia.'
                  : 'The Institute\'s guiding principle through the decades: not providing passive assistance, but fostering freedom and independence through culture, knowledge, music, reading/writing, and technology.'}
              </p>
              <p className="text-base leading-relaxed">
                {it
                  ? 'L\'installazione è un\'opera d\'arte ambientale intermediale che fonde elementi audio, video, tattili e olfattivi per narrare 140 anni di storia dell\'Istituto in modo inclusivo.'
                  : 'The installation is an intermedial environmental artwork blending audio, video, tactile and olfactory elements to narrate 140 years of Institute history inclusively.'}
              </p>
            </div>
            <div className="space-y-4">
              {[
                { n: '140+', label: it ? 'Anni di storia narrati' : 'Years of history narrated' },
                { n: '200+', label: it ? 'Oggetti in collezione' : 'Objects in collection' },
                { n: '5', label: it ? 'Pilastri concettuali' : 'Conceptual pillars' },
                { n: '∞', label: it ? 'Storie di libertà e autonomia' : 'Stories of freedom and autonomy' },
              ].map(s => (
                <div key={s.label} className="rounded-xl p-5 flex items-center gap-4" style={{ backgroundColor: '#EDF4FF' }}>
                  <div className="text-3xl font-bold w-16 text-center flex-shrink-0" style={{ color: '#135DCD' }}>{s.n}</div>
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Objects */}
        <section className="mb-16" aria-labelledby="objects-title">
          <h2 id="objects-title" className="text-3xl font-bold mb-4">
            {it ? 'Gli Oggetti della Collezione' : 'Collection Objects'}
          </h2>
          <p className="text-base leading-relaxed mb-8 max-w-3xl text-muted-foreground">
            {it
              ? 'Oltre 200 oggetti tra ausili tiflodidattici, strumenti per la scrittura Braille, ausili per l\'autonomia personale, tecnologie assistive storiche e contemporanee. Ogni oggetto è accompagnato da descrizioni in Braille e audio.'
              : 'Over 200 objects including typhlodidactic aids, Braille writing tools, personal autonomy aids, historical and contemporary assistive technologies. Each object is accompanied by Braille and audio descriptions.'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {objects.map(o => (
              <div key={o.name} className="p-6 rounded-xl border-2 border-[#135DCD] transition-colors">
                <o.icon className="w-10 h-10 mb-4" style={{ color: '#135DCD' }} aria-hidden="true" />
                <div className="font-bold text-lg mb-2">{o.name}</div>
                <div className="text-sm text-muted-foreground leading-relaxed">{o.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mb-16" aria-labelledby="exp-title">
          <h2 id="exp-title" className="text-3xl font-bold mb-6">
            {it ? 'L\'Esperienza di Visita' : 'The Visit Experience'}
          </h2>

          <Accordion id="concept" title={it ? 'Installazione Intermediale' : 'Intermedial Installation'}>
            <p className="text-base leading-relaxed mb-4">
              {it
                ? 'Il Museo Tolomeo è una delle rare installazioni museali che coinvolge simultaneamente tutti i sensi. L\'esperienza è progettata per essere pienamente accessibile a persone vedenti, ipovedenti e non vedenti.'
                : 'The Tolomeo Museum is one of the rare museum installations that simultaneously engages all senses. The experience is designed to be fully accessible to sighted, visually impaired and blind people.'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: Volume2, title: it ? 'Audio' : 'Audio', desc: it ? 'Testimonianze orali, documenti sonori storici e narrazioni.' : 'Oral testimonies, historical sound documents and narrations.' },
                { icon: Film, title: it ? 'Video' : 'Video', desc: it ? 'Filmati storici e documentari sull\'Istituto e le sue attività.' : 'Historical footage and documentaries on the Institute and its activities.' },
                { icon: Landmark, title: it ? 'Tattile' : 'Tactile', desc: it ? 'Oggetti esplorabili con il tatto e superfici interattive.' : 'Objects explorable by touch and interactive surfaces.' },
                { icon: Lightbulb, title: it ? 'Olfattivo' : 'Olfactory', desc: it ? 'Stimoli olfattivi legati agli oggetti e ai momenti storici narrati.' : 'Olfactory stimuli linked to objects and historical moments narrated.' },
              ].map(s => (
                <div key={s.title} className="flex gap-4 p-4 rounded-xl" style={{ backgroundColor: '#EDF4FF' }}>
                  <s.icon className="w-8 h-8 flex-shrink-0 mt-1" style={{ color: '#135DCD' }} aria-hidden="true" />
                  <div>
                    <div className="font-bold mb-1">{s.title}</div>
                    <div className="text-sm text-muted-foreground">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Accordion>

          <Accordion id="soundbox" title="Tolomeo's SOUNDBOX">
            <p className="text-base leading-relaxed mb-4">
              {it
                ? 'Un progetto speciale realizzato per ArtCity 2015: sound box create appositamente per espandere l\'esperienza sensoriale del museo oltre i suoi spazi fisici. Un\'innovazione che ha dimostrato come la creatività inclusiva possa raggiungere nuovi pubblici.'
                : 'A special project created for ArtCity 2015: sound boxes specifically created to expand the museum\'s sensory experience beyond its physical spaces. An innovation that showed how inclusive creativity can reach new audiences.'}
            </p>
            <div className="p-5 rounded-xl" style={{ backgroundColor: '#FFDED2' }}>
              <Music className="w-8 h-8 mb-3" style={{ color: '#D75220' }} aria-hidden="true" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                {it
                  ? 'Le sound box portano le storie del Museo Tolomeo nelle piazze di Bologna, rendendo l\'arte accessibile a chiunque si trovi nello spazio pubblico.'
                  : 'The sound boxes bring the Tolomeo Museum\'s stories to the squares of Bologna, making art accessible to anyone in public space.'}
              </p>
            </div>
          </Accordion>

          <Accordion id="testimonies" title={it ? 'Storie di Indipendenza' : 'Stories of Independence'}>
            <p className="text-base leading-relaxed mb-4">
              {it
                ? 'Al cuore del museo ci sono le testimonianze audio e video di persone che hanno vissuto all\'Istituto Cavazza. Racconti di vita, studio, lavoro e autonomia conquistata grazie agli strumenti e alle competenze acquisite in più di 140 anni di storia.'
                : 'At the heart of the museum are audio and video testimonies from people who lived at the Cavazza Institute. Stories of life, study, work and autonomy achieved through tools and skills acquired in more than 140 years of history.'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: it ? 'Formazione' : 'Education', desc: it ? 'Storie di studenti che hanno conquistato l\'autonomia.' : 'Stories of students who achieved autonomy.' },
                { label: it ? 'Lavoro' : 'Work', desc: it ? 'Percorsi professionali nati all\'Istituto.' : 'Professional careers born at the Institute.' },
                { label: it ? 'Vita' : 'Life', desc: it ? 'Quotidianità trasformata dalla tecnologia.' : 'Daily life transformed by technology.' },
              ].map(c => (
                <div key={c.label} className="p-4 rounded-xl text-center" style={{ backgroundColor: '#EDF4FF' }}>
                  <Users className="w-8 h-8 mx-auto mb-2 text-primary" aria-hidden="true" />
                  <div className="font-bold mb-1">{c.label}</div>
                  <div className="text-sm text-muted-foreground">{c.desc}</div>
                </div>
              ))}
            </div>
          </Accordion>
        </section>

        {/* Credits */}
        <section className="mb-16" aria-labelledby="credits-title">
          <h2 id="credits-title" className="text-3xl font-bold mb-6">
            {it ? 'Crediti' : 'Credits'}
          </h2>
          <div className="rounded-xl border-2 border-[#135DCD] overflow-hidden">
            {credits.map((c, i) => (
              <div
                key={c.role}
                className="flex flex-col sm:flex-row gap-2 px-6 py-4 border-b border-border last:border-0"
                style={{ backgroundColor: i % 2 === 0 ? '#EDF4FF' : '#ffffff' }}
              >
                <div className="font-bold text-sm min-w-[200px]" style={{ color: '#135DCD' }}>{c.role}</div>
                <div className="text-sm text-muted-foreground">{c.name}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section
          className="rounded-2xl p-10 text-center border-2 border-[#D75220]"
          aria-labelledby="tolomeo-cta"
        >
          <h2 id="tolomeo-cta" className="text-3xl font-bold mb-4">
            {it ? 'Visita il Museo Tolomeo' : 'Visit the Tolomeo Museum'}
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-muted-foreground">
            {it
              ? 'Le visite sono su prenotazione. Il museo è accessibile a tutti: vedenti, ipovedenti e non vedenti. Contattaci per organizzare la tua visita.'
              : 'Visits are by appointment. The museum is accessible to everyone: sighted, visually impaired and blind. Contact us to arrange your visit.'}
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
              href="mailto:istituto@cavazza.it"
              className="inline-flex items-center justify-center gap-2 border-2 border-[#D75220] text-[#D75220] font-bold text-lg px-8 py-4 rounded-xl hover:bg-[#FFF3EE] transition-colors no-underline min-h-[56px]"
            >
              <Mail className="w-5 h-5" aria-hidden="true" />
              istituto@cavazza.it
            </a>
          </div>
          <div className="mt-8 pt-6 border-t border-[#D75220]/30">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D75220]" aria-hidden="true" />
                +39 051 332090
              </span>
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D75220]" aria-hidden="true" />
                istituto@cavazza.it
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
        museumName={it ? 'Museo Tolomeo' : 'Tolomeo Museum'}
        onClose={() => setShowBookingModal(false)}
      />
    </div>
  );
}
