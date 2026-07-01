import { Calendar, Users, FileText, Building2, Handshake, TrendingUp, Home, Heart, Target, Book, ExternalLink, Image as ImageIcon, ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { type Lang } from '../i18n';
import { instituteImages } from '../data/siteImages';

interface IstitutoPageProps {
  language: Lang;
  onHomeClick: () => void;
}

export function IstitutoPage({ language, onHomeClick }: IstitutoPageProps) {
  const t = (key: string) => {
    const translations: Record<string, { it: string; en: string }> = {
      'breadcrumb.istituto': { it: "Istituto", en: "Institute" },
      'page.title': { it: "L'Istituto dei Ciechi Francesco Cavazza", en: "Francesco Cavazza Institute for the Blind" },
      'intro.title': { it: "Chi Siamo", en: "Who We Are" },
      'intro.text': { it: "L'Istituto dei Ciechi Francesco Cavazza nasce a Bologna nel 1881 da un gruppo di giovani appartenenti alla nobiltà cittadina, tra i quali si segnala il Conte Francesco Cavazza. Da oltre 140 anni ci occupiamo di integrazione, formazione, riabilitazione e autonomia delle persone non vedenti e ipovedenti.", en: "The Francesco Cavazza Institute for the Blind was founded in Bologna in 1881 by a group of young members of the city's nobility, among whom Count Francesco Cavazza stands out. For over 140 years we have been involved in integration, training, rehabilitation and autonomy of blind and visually impaired people." },
      'mission.title': { it: "Missione e Valori", en: "Mission and Values" },
      'mission.vision': { it: "Vision", en: "Vision" },
      'mission.vision.text': { it: "Un mondo senza barriere: inclusione, autonomia e valorizzazione delle persone con disabilità visiva.", en: "A world without barriers: inclusion, autonomy and valorization of people with visual disabilities." },
      'mission.mission': { it: "Mission", en: "Mission" },
      'mission.intro': { it: "Inclusione, autonomia e pari opportunità attraverso cultura, sensibilizzazione e supporto concreto. L'Istituto Cavazza è un ente senza scopo di lucro che opera per finalità di solidarietà sociale, supportando persone cieche e ipovedenti attraverso: diffusione della cultura dell'integrazione, promozione del ruolo attivo delle persone cieche nella società, assistenza, consulenza e riabilitazione, offerta di servizi di consulenza tiflo-pedagogica.", en: "Inclusion, autonomy and equal opportunities through culture, awareness and concrete support. The Cavazza Institute is a non-profit organization that works for social solidarity purposes, supporting blind and visually impaired people through: dissemination of the culture of integration, promotion of the active role of blind people in society, assistance, consulting and rehabilitation, provision of tiflo-pedagogical consulting services." },
      'value.inclusion': { it: "Inclusione e Valorizzazione", en: "Inclusion and Valorization" },
      'value.inclusion.desc': { it: "Promuovere un mondo dove ogni individuo sia rispettato e valorizzato per le sue capacità, indipendentemente dalla condizione.", en: "Promote a world where every individual is respected and valued for their abilities, regardless of their condition." },
      'value.awareness': { it: "Sensibilizzazione Sociale", en: "Social Awareness" },
      'value.awareness.desc': { it: "Aiutare la comunità a comprendere l'importanza della percezione attraverso sensi alternativi alla vista.", en: "Help the community understand the importance of perception through senses other than sight." },
      'value.quality': { it: "Qualità della Vita", en: "Quality of Life" },
      'value.quality.desc': { it: "Fornire strumenti, supporto e opportunità concrete per permettere la massima autonomia.", en: "Provide tools, support and concrete opportunities to enable maximum autonomy." },
      'value.integration': { it: "Integrazione come Diritto", en: "Integration as a Right" },
      'value.integration.desc': { it: "Creare un ambiente dove la diversità sia riconosciuta come valore.", en: "Create an environment where diversity is recognized as value." },
      'history.title': { it: "La Nostra Storia", en: "Our History" },
      'history.1881': { it: "Fondazione dell'Istituto come 'Istituto di istruzione e di educazione' da parte del Conte Francesco Cavazza e un gruppo di giovani nobili bolognesi. Fino agli anni '30, accoglie principalmente giovani ciechi della provincia di Bologna, offrendo formazione di base e avviamento ai mestieri (impagliatura sedie, confezione scope e spazzole).", en: "Foundation of the Institute as 'Institute of instruction and education' by Count Francesco Cavazza and a group of young Bolognese nobles. Until the 1930s, it mainly welcomed young blind people from the province of Bologna, offering basic training and introduction to trades (chair caning, making brooms and brushes)." },
      'history.early': { it: "Il periodo d'oro dell'Istituto. Espansione nazionale: accoglie centinaia di giovani da tutte le regioni d'Italia. Gli studenti frequentano le scuole bolognesi con risultati brillanti negli studi umanistici e musicali, richiamando l'ammirazione e l'affetto delle istituzioni e dell'intera cittadinanza bolognese.", en: "The golden period of the Institute. National expansion: welcomes hundreds of young people from all regions of Italy. Students attend Bolognese schools with brilliant results in humanistic and musical studies, attracting the admiration and affection of institutions and the entire Bolognese citizenry." },
      'history.modern': { it: "1977: Convenzione con la Regione Emilia Romagna per il Centro Regionale di produzione e distribuzione materiali didattici. 1979: Collaborazione con IBM per formazione programmatori elettronici non vedenti. 1982: Inizio corsi per centralinisti telefonici. 1992: Seminario internazionale e riconoscimento dal Comune di Bologna. Costituzione del Polo Informatico Nazionale con UICI.", en: "1977: Agreement with Emilia Romagna Region for Regional Center for production and distribution of educational materials. 1979: Collaboration with IBM for training blind electronic programmers. 1982: Start of courses for telephone operators. 1992: International seminar and recognition from Bologna Municipality. Establishment of National IT Center with UICI." },
      'history.today': { it: "Oggi l'Istituto Cavazza è un centro di eccellenza che offre servizi gratuiti a oltre 63.000 utenti ogni anno, gestisce il Museo Tattile Anteros e il Museo Tolomeo, una biblioteca specializzata con oltre 7.000 contenuti accessibili e Radio Oltre, la prima radio italiana dedicata all'inclusione.", en: "Today the Cavazza Institute is a center of excellence that offers free services to over 63,000 users every year, manages the Tactile Museum Anteros and Tolomeo Museum, a specialized library with over 7,000 accessible contents and Radio Oltre, the first Italian radio dedicated to inclusion." },
      'organization.title': { it: "Organizzazione e Team", en: "Organization and Team" },
      'organization.desc': { it: "L'Istituto è un ente senza scopo di lucro gestito da un Consiglio di Amministrazione composto da: Gualtiero Cavazza Isolani (Famiglia Fondatrice), Elio De Leo (Presidente), Pier Michele Borra (Vice-Presidente), Marco Trombini (nominato UICI), Sabrina Tangredi (nominata dal Prefetto di Bologna). Il Direttore Generale è Mario Barbuto. L'organizzazione si basa su un modello di collaborazione multidisciplinare con 12 dipendenti e oltre 50 consulenti specializzati, articolati in aree trasversali (amministrazione, comunicazione, informatica, progetti) e aree istituzionali (formazione, ausilioteca, consulenza educativa, musei, redazione editoriale, Radio Oltre, accoglienza e residenzialità).", en: "The Institute is a non-profit organization managed by a Board of Directors composed of: Gualtiero Cavazza Isolani (Founding Family), Elio De Leo (President), Pier Michele Borra (Vice-President), Marco Trombini (appointed by UICI), Sabrina Tangredi (appointed by the Prefect of Bologna). The General Director is Mario Barbuto. The organization is based on a multidisciplinary collaboration model with 12 employees and over 50 specialized consultants, divided into transversal areas (administration, communication, IT, projects) and institutional areas (training, ausilioteca, educational consulting, museums, editorial office, Radio Oltre, hospitality and residence)." },
      'committee.title': { it: "Comitato d'Onore", en: "Honorary Committee" },
      'committee.desc': { it: "Il Comitato d'Onore dell'Istituto Cavazza è composto da personalità del mondo istituzionale, culturale e imprenditoriale che sostengono la nostra missione e contribuiscono a dare visibilità e autorevolezza alle nostre attività:", en: "The Honorary Committee of the Cavazza Institute is composed of personalities from the institutional, cultural and business world who support our mission and contribute to giving visibility and authority to our activities:" },
      'committee.member1': { it: "Rita Ghedini - Presidente Legacoop Bologna", en: "Rita Ghedini - President Legacoop Bologna" },
      'committee.member2': { it: "Virginio Merola - Sindaco di Bologna", en: "Virginio Merola - Mayor of Bologna" },
      'committee.member3': { it: "Simonetta Saliera - Presidente Assemblea legislativa - Regione Emilia-Romagna", en: "Simonetta Saliera - President Legislative Assembly - Emilia-Romagna Region" },
      'committee.member4': { it: "Francesco Ubertini - Magnifico Rettore Alma Mater Studiorum - Università di Bologna", en: "Francesco Ubertini - Rector Alma Mater Studiorum - University of Bologna" },
      'partners.title': { it: "Partner e Collaborazioni", en: "Partners and Collaborations" },
      'partners.desc': { it: "Collaboriamo con oltre 80 istituzioni culturali, museali, universitarie e aziende per rendere la cultura accessibile a tutti:", en: "We collaborate with over 80 cultural, museum, university institutions and companies to make culture accessible to everyone:" },
      'partners.list': { it: "Accademia di Belle Arti di Bologna, Accademia Filarmonica di Bologna, Accademia Galli di Como, Università di Bologna, Università di Modena e Reggio Emilia, Università di Firenze, Università di Roma Tor Vergata, Fondazione del Monte di Bologna e Ravenna, Fondazione MAST, Musei Vaticani, Pinacoteca di Brera, Guggenheim Venezia, Cineteca di Bologna, Biblioteca Salaborsa di Bologna, UICI, Regione Emilia-Romagna, e molti altri.", en: "Academy of Fine Arts of Bologna, Philharmonic Academy of Bologna, Galli Academy of Como, University of Bologna, University of Modena and Reggio Emilia, University of Florence, University of Rome Tor Vergata, Foundation of Monte di Bologna e Ravenna, MAST Foundation, Vatican Museums, Brera Pinacoteca, Guggenheim Venice, Bologna Cineteca, Salaborsa Library of Bologna, UICI, Emilia-Romagna Region, and many others." },
      'transparency.title': { it: "Trasparenza e Bilanci Sociali", en: "Transparency and Social Reports" },
      'transparency.desc': { it: "Crediamo nella massima trasparenza verso i nostri utenti, donatori e la comunità. Pubblichiamo annualmente il bilancio sociale e rendiamo accessibili tutti i documenti amministrativi secondo le normative vigenti.", en: "We believe in maximum transparency towards our users, donors and the community. We publish the social report annually and make all administrative documents accessible according to current regulations." },
      'statute.title': { it: "Statuto", en: "Statute" },
      'statute.desc': { it: "Lo Statuto dell'Istituto definisce finalità, organizzazione e modalità operative.", en: "The Institute's Statute defines purposes, organization and operational methods." },
      'transparency.admin': { it: "Amministrazione Trasparente", en: "Transparent Administration" },
      'transparency.admin.desc': { it: "Documenti pubblici e trasparenza amministrativa", en: "Public documents and administrative transparency" },
      'transparency.reports': { it: "Bilanci Sociali Passati", en: "Past Social Reports" },
      'transparency.reports.desc': { it: "Bilanci sociali degli anni precedenti", en: "Social reports from previous years" },
      'spaces.title': { it: "Le Aule dell'Istituto", en: "Institute Classrooms" },
      'spaces.desc': { it: "L'Istituto dispone di aule didattiche moderne attrezzate con tecnologie assistive all'avanguardia: display braille, sintesi vocali di ultima generazione, videoingranditori HD, software screen reader professionali e sistemi di orientamento indoor. I laboratori tattili permettono l'apprendimento attraverso modelli tridimensionali, mentre le aree di riabilitazione visiva sono dotate di strumentazione ortottica specializzata. L'Aula Magna Bentivoglio può essere affittata per eventi e conferenze.", en: "The Institute has modern classrooms equipped with cutting-edge assistive technologies: braille displays, latest generation voice synthesis, HD video magnifiers, professional screen reader software and indoor orientation systems. Tactile laboratories allow learning through three-dimensional models, while visual rehabilitation areas are equipped with specialized orthoptic instrumentation. The Bentivoglio Auditorium can be rented for events and conferences." },
      'residence.title': { it: "Residence Cavazza", en: "Cavazza Residence" },
      'residence.desc': { it: "Il Residence Cavazza offre alloggi temporanei completamente accessibili a studenti e professionisti non vedenti e ipovedenti che partecipano ai nostri corsi di formazione o che si trovano a Bologna per motivi di studio o lavoro. Gli appartamenti sono dotati di cucine attrezzate con elettrodomestici parlanti, sistemi di etichettatura tattile, dispositivi domotici controllabili vocalmente e segnalazioni acustiche e vibratili per garantire autonomia e sicurezza.", en: "The Cavazza Residence offers fully accessible temporary accommodation to blind and visually impaired students and professionals who participate in our training courses or who are in Bologna for study or work reasons. The apartments are equipped with kitchens fitted with talking appliances, tactile labeling systems, voice-controlled home automation devices and acoustic and vibrating signals to ensure autonomy and safety." },
      'residence.link': { it: "Visita il sito del Residence", en: "Visit Residence website" },
      'support.title': { it: "Sostienici", en: "Support Us" },
      'support.desc': { it: "Tutti i nostri servizi sono gratuiti grazie al supporto di donatori, istituzioni e aziende che credono nella nostra missione. Il tuo contributo può fare la differenza nella vita di migliaia di persone ogni anno.", en: "All our services are free thanks to the support of donors, institutions and companies who believe in our mission. Your contribution can make a difference in the lives of thousands of people every year." },
      'support.donate': { it: "Donazione libera", en: "Free donation" },
      'support.donate.desc': { it: "Con bonifico bancario o carta di credito", en: "By bank transfer or credit card" },
      'support.5x1000': { it: "5x1000", en: "5x1000" },
      'support.5x1000.desc': { it: "Nella dichiarazione dei redditi - Codice Fiscale: 00345340376", en: "In tax return - Tax Code: 00345340376" },
      'support.legacy': { it: "Lascito Testamentario", en: "Testamentary Legacy" },
      'support.legacy.desc': { it: "Garantisci un futuro alle attività a favore delle persone non vedenti", en: "Ensure a future for activities in favor of blind people" },
      'support.volunteer': { it: "Volontariato", en: "Volunteering" },
      'support.volunteer.desc': { it: "Metti a disposizione il tuo tempo e le tue competenze", en: "Offer your time and skills" }
    };

    return translations[key]?.[language] || key;
  };

  const partnerList = [
    language === 'it' ? 'Accademia di Belle Arti di Bologna' : 'Academy of Fine Arts of Bologna',
    language === 'it' ? 'Accademia Filarmonica di Bologna' : 'Philharmonic Academy of Bologna',
    language === 'it' ? 'Accademia Galli di Como,' : 'Galli Academy of Como,',
    language === 'it' ? 'Università di Bologna' : 'University of Bologna',
    language === 'it' ? 'Università di Modena e Reggio Emilia,' : 'University of Modena and Reggio Emilia,',
    language === 'it' ? 'Università di Firenze' : 'University of Florence',
    language === 'it' ? 'Università di Roma Tor Vergata' : 'University of Rome Tor Vergata',
    language === 'it' ? 'Fondazione del Monte di Bologna e Ravenna' : 'Foundation of Monte di Bologna e Ravenna',
    language === 'it' ? 'Fondazione MAST' : 'MAST Foundation',
    language === 'it' ? 'Musei Vaticani' : 'Vatican Museums',
    language === 'it' ? 'Pinacoteca di Brera' : 'Brera Pinacoteca',
    language === 'it' ? 'Guggenheim Venezia' : 'Guggenheim Venice',
    language === 'it' ? 'Cineteca di Bologna' : 'Bologna Cineteca',
    language === 'it' ? 'Biblioteca Salaborsa di Bologna' : 'Salaborsa Library of Bologna',
    'UICI',
    language === 'it' ? 'Regione Emilia-Romagna e molti altri.' : 'Emilia-Romagna Region and many others.'
  ];

  const reportCards = [
    { key: 'report', icon: FileText, title: 'Bilancio Sociale 2024', description: language === 'it' ? 'Report annuale' : 'Annual report', cta: 'Leggi', href: '#bilancio-sociale' },
    { key: 'statute', icon: Book, title: language === 'it' ? 'Statuto' : 'Statute', description: language === 'it' ? 'Lo Statuto dell\'Istituto definisce finalità, organizzazione e modalità operative.' : 'The Institute\'s Statute defines purposes, organization and operational methods.', cta: 'Leggi', href: '#statuto' },
    { key: 'documents', icon: FileText, title: language === 'it' ? 'Amministrazione Trasparente' : 'Transparent Administration', description: language === 'it' ? 'Documenti pubblici e trasparenza amministrativa' : 'Public documents and administrative transparency', cta: 'Leggi', href: '#amministrazione' },
    { key: 'archives', icon: TrendingUp, title: language === 'it' ? 'Bilanci Sociali Passati' : 'Past Social Reports', description: language === 'it' ? 'Bilanci sociali degli anni precedenti' : 'Social reports from previous years', cta: 'Leggi', href: '#bilanci-passati' },
  ];

  const renderWithBreak = (text: string) => {
    const idx = text.lastIndexOf(' - ');
    if (idx !== -1) {
      return <>{text.slice(0, idx)}<br />{text.slice(idx + 3)}</>;
    }
    return text;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[{ label: t('breadcrumb.istituto') }]}
        onHomeClick={onHomeClick}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{t('page.title')}</h1>
          <p className="opacity-95 text-[18px]">
            {language === 'it'
              ? 'Dal 1881 al servizio delle persone non vedenti e ipovedenti'
              : 'Since 1881 serving blind and visually impaired people'}
          </p>
        </div>
      </section>

      {/* Contenuto principale */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Structural 8-column grid (invisibile) */}
        <div className="grid gap-[36px] md:grid-cols-8">

          {/* Introduzione - occupa 5 colonne a partire dal bordo interno */}
          <div className="md:col-span-5 mx-[0px] mt-[0px] mb-[72px]">
            <h2 className="text-2xl font-bold mb-6">{t('intro.title')}</h2>
            <p className="text-base leading-relaxed m-[0px]">
              {t('intro.text')}
            </p>
          </div>

          {/* Missione e Valori - full width (occupano tutte le 8 colonne) */}
          <div className="md:col-span-8 mx-[0px] mt-[0px] mb-[108px]">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-primary" aria-hidden="true" />
            {t('mission.title')}
          </h2>

          {/* Mission + Vision layout: left column span 3, right column span 5 for values */}
          <div className="grid md:grid-cols-8 gap-6 items-start">
            <div className="md:col-span-3 space-y-12">
              {/* Vision - plain box, text black */}
              <div className="rounded p-0 text-black">
                <h3 className="text-lg font-bold mb-2 text-black">{t('mission.vision')}</h3>
                <p className="text-base leading-relaxed text-black">{t('mission.vision.text')}</p>
              </div>

              {/* Mission */}
              <div>
                <h3 className="text-lg font-bold mb-2">{t('mission.mission')}</h3>
                <p className="text-base leading-relaxed">{t('mission.intro')}</p>
              </div>
            </div>

            {/* Values column: occupy 4 columns at right side, vertical stack, orange outline, rounded like other cards */}
            <div className="md:col-span-4 md:col-start-5 flex flex-col gap-4 items-end">
              <div className="border-2 border-[#D75220] rounded-xl p-4 w-full">
                <h3 className="text-lg font-bold mb-1 text-[#D75220]">{t('value.inclusion')}</h3>
                <p className="text-sm leading-relaxed text-black">{t('value.inclusion.desc')}</p>
              </div>

              <div className="border-2 border-[#D75220] rounded-xl p-4 w-full">
                <h3 className="text-lg font-bold mb-1 text-[#D75220]">{t('value.awareness')}</h3>
                <p className="text-sm leading-relaxed text-black">{t('value.awareness.desc')}</p>
              </div>

              <div className="border-2 border-[#D75220] rounded-xl p-4 w-full">
                <h3 className="text-lg font-bold mb-1 text-[#D75220]">{t('value.quality')}</h3>
                <p className="text-sm leading-relaxed text-black">{t('value.quality.desc')}</p>
              </div>

              <div className="border-2 border-[#D75220] rounded-xl p-4 w-full">
                <h3 className="text-lg font-bold mb-1 text-[#D75220]">{t('value.integration')}</h3>
                <p className="text-sm leading-relaxed text-black">{t('value.integration.desc')}</p>
              </div>
            </div>
          </div>
          </div>

        {/* Storia - 6 colonne allineate a destra (colonne 3-8) */}
        <div className="md:col-start-3 md:col-span-6 mb-[108px]">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-primary" aria-hidden="true" />
            {t('history.title')}
          </h2>

          {/* Immagine storica */}
          <div className="mb-6">
            <img
              src={instituteImages.history}
              alt="Immagine storica dell'Istituto Cavazza"
              className="w-full rounded-xl object-cover h-[420px]"
            />
          </div>

          <div className="relative border-l-4 border-primary pl-6 space-y-6">
            <div className="relative">
              <div className="timeline-dot absolute top-0 left-[calc(-1.5rem-2px)] -translate-x-1/2 w-5 h-5 bg-primary rounded-full"></div>
              <div>
                <h3 className="text-base font-bold mb-2">1881 - La Fondazione</h3>
                <p className="leading-relaxed text-sm">{t('history.1881')}</p>
              </div>
            </div>

            <div className="relative">
              <div className="timeline-dot absolute top-0 left-[calc(-1.5rem-2px)] -translate-x-1/2 w-5 h-5 bg-primary rounded-full"></div>
              <div>
                <h3 className="text-base font-bold mb-2">1930-1977 - Il Periodo d'Oro</h3>
                <p className="leading-relaxed text-sm">{t('history.early')}</p>
              </div>
            </div>

            <div className="relative">
              <div className="timeline-dot absolute top-0 left-[calc(-1.5rem-2px)] -translate-x-1/2 w-6 h-6 bg-primary rounded-full"></div>
              <div>
                <h3 className="text-xl font-bold mb-3">1977-2000 - L'Evoluzione Tecnologica</h3>
                <p className="leading-relaxed">{t('history.modern')}</p>
              </div>
            </div>

            <div className="relative">
              <div className="timeline-dot absolute top-0 left-[calc(-1.5rem-2px)] -translate-x-1/2 w-6 h-6 bg-accent rounded-full"></div>
              <div className="rounded-xl p-6" style={{ backgroundColor: '#FFDED2', color: '#000' }}>
                <h3 className="text-xl font-bold mb-3">Oggi - Centro di Eccellenza</h3>
                <p className="leading-relaxed">{t('history.today')}</p>
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Grid 2x2: Comitato d'Onore, Organizzazione, Partner, Trasparenza */}
        <div className="md:col-span-8 grid md:grid-cols-2 gap-16 mb-28">
          {/* Comitato d'Onore */}
          <div>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Building2 className="w-8 h-8 text-primary" aria-hidden="true" />
            {t('committee.title')}
          </h2>
          <div>
            <p className="leading-relaxed mb-6">{t('committee.desc')}</p>
            <ul className="space-y-3 list-none">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold text-xl" aria-hidden="true">•</span>
                <span className="font-bold">{t('committee.member1')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold text-xl" aria-hidden="true">•</span>
                <span className="font-bold">{t('committee.member2')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold text-xl" aria-hidden="true">•</span>
                <span className="font-bold">{renderWithBreak(t('committee.member3'))}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold text-xl" aria-hidden="true">•</span>
                <span className="font-bold">{renderWithBreak(t('committee.member4'))}</span>
              </li>
            </ul>
          </div>
          </div>

          {/* Organizzazione e Team */}
          <div>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Users className="w-8 h-8 text-primary" aria-hidden="true" />
            {t('organization.title')}
          </h2>
          <p className="leading-relaxed">{t('organization.desc')}</p>
          </div>

          {/* Partner e Collaborazioni */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
              <Handshake className="partner-transparency-icon w-8 h-8 text-[#135DCD]" aria-hidden="true" />
              {t('partners.title')}
            </h2>
            <p className="text-[18px] font-semibold leading-relaxed max-w-2xl text-foreground">
              {t('partners.desc')}
            </p>
            <ul className="space-y-3 text-[17px] leading-relaxed text-neutral-600 pl-6 list-disc">
              {partnerList.map((partner) => (
                <li key={partner}>{partner}</li>
              ))}
            </ul>
          </section>

          {/* Trasparenza e Bilanci Sociali */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
              <TrendingUp className="partner-transparency-icon w-8 h-8 text-[#135DCD]" aria-hidden="true" />
              {t('transparency.title')}
            </h2>
            <p className="leading-relaxed max-w-2xl text-foreground">
              {t('transparency.desc')}
            </p>

            <div className="space-y-8">
              {reportCards.map((card) => {
                const Icon = card.icon;

                return (
                  <div
                    key={card.key}
                    className="rounded-2xl border border-[#D6E4FF] p-5 shadow-sm min-[1034px]:p-6"
                    style={{ backgroundColor: '#EEF4FF' }}
                  >
                    <div className="flex flex-col gap-6 min-[1034px]:flex-row min-[1034px]:items-center min-[1034px]:justify-between">
                      <div className="flex items-start gap-4">
                        <Icon className="partner-transparency-icon h-8 w-8 shrink-0 mt-1" aria-hidden="true" />
                        <div>
                          <h3 className="text-[18px] font-bold text-neutral-900">{card.title}</h3>
                          <p className="mt-2 text-[15px] leading-relaxed text-neutral-700">{card.description}</p>
                        </div>
                      </div>

                      <Button
                        variant="primary"
                        className="w-full min-[1034px]:w-auto min-[1034px]:min-w-[170px] justify-between bg-[#135DCD] text-white hover:bg-[#0F4FB0] shadow-sm border-2 border-[#135DCD]"
                        onClick={() => {
                          window.location.hash = card.href
                        }}
                      >
                        <span>Leggi</span>
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

        </div>

        {/* Spazi e Residence */}
        <div className="md:col-span-8 grid grid-cols-1 min-[1034px]:grid-cols-2 gap-16 min-[1034px]:gap-20 mb-32">
          <div>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Building2 className="w-8 h-8 text-primary" aria-hidden="true" />
              {t('spaces.title')}
            </h2>

            {/* Placeholder immagine aule */}
            <div className="rounded-xl mb-6 overflow-hidden min-h-[280px] min-[1034px]:min-h-[340px]">
              <img
                src={instituteImages.classrooms}
                alt="Aule dell'Istituto Cavazza"
                className="w-full h-full object-cover"
              />
            </div>

            <p className="leading-relaxed">{t('spaces.desc')}</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Home className="w-8 h-8 text-primary" aria-hidden="true" />
              {t('residence.title')}
            </h2>

            {/* Placeholder immagine residence */}
            <div className="rounded-xl mb-6 overflow-hidden min-h-[280px] min-[1034px]:min-h-[340px]">
              <img
                src={instituteImages.residence}
                alt="Residence Cavazza"
                className="w-full h-full object-cover"
              />
            </div>

            <p className="leading-relaxed mb-6">{t('residence.desc')}</p>
            <a
              href="https://residencecavazza.hotelsbologna24.com/it/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline font-bold"
            >
              {t('residence.link')}
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>

      </div>

      {/* Sostienici — sezione full-width come nella home */}
      <section id="sostieni" className="py-32 text-center" style={{ backgroundColor: '#D75220', color: '#ffffff' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <Heart className="w-16 h-16 mx-auto mb-6 text-white" aria-hidden="true" />
            <h2 className="text-3xl font-bold mb-4 text-center text-white">{t('support.title')}</h2>
            <p className="text-lg leading-relaxed mb-8 text-center text-white">{t('support.desc')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-center">
            <div className="rounded-xl p-6 border-2 border-white" style={{ backgroundColor: '#D75220' }}>
              <h3 className="font-bold mb-2 text-lg text-white text-center">{t('support.donate')}</h3>
              <p className="text-sm text-white opacity-90 text-center">{t('support.donate.desc')}</p>
            </div>
            <div className="rounded-xl p-6 border-2 border-white" style={{ backgroundColor: '#D75220' }}>
              <h3 className="font-bold mb-2 text-lg text-white text-center">{t('support.5x1000')}</h3>
              <p className="text-sm text-white opacity-90 text-center">{t('support.5x1000.desc')}</p>
            </div>
            <div className="rounded-xl p-6 border-2 border-white" style={{ backgroundColor: '#D75220' }}>
              <h3 className="font-bold mb-2 text-lg text-white text-center">{t('support.legacy')}</h3>
              <p className="text-sm text-white opacity-90 text-center">{t('support.legacy.desc')}</p>
            </div>
            <div className="rounded-xl p-6 border-2 border-white" style={{ backgroundColor: '#D75220' }}>
              <h3 className="font-bold mb-2 text-lg text-white text-center">{t('support.volunteer')}</h3>
              <p className="text-sm text-white opacity-90 text-center">{t('support.volunteer.desc')}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => window.open('https://paypal.com/donate/', '_blank')}
              className="bg-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-white/90 transition-colors shadow-lg"
              style={{ color: '#D75220' }}
            >
              <Heart className="w-5 h-5 inline mr-2" aria-hidden="true" />
              {language === 'it' ? 'Dona Ora' : 'Donate Now'}
            </button>
            
          </div>
        </div>
      </section>
    </div>
  );
}
