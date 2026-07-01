
import { useState, useEffect } from 'react';
import { Users, GraduationCap, Eye, Laptop, MapPin, Briefcase, Heart, School, Building2, X, ArrowRight, Phone, Mail, Clock, FileText } from 'lucide-react';
import { Button } from '../components/Button';
import { BookingModal } from '../components/BookingModal';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { type Lang } from '../i18n';
import { serviceImages } from '../data/siteImages';

interface ServiziPageProps {
  onHomeClick: () => void;
  language: Lang;
}

export function ServiziPage({ language, onHomeClick }: ServiziPageProps) {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const t = (key: string) => {
    const translations: Record<string, { it: string; en: string }> = {
      'breadcrumb.servizi': { it: "Servizi", en: "Services" },
      'page.title': { it: "I Nostri Servizi", en: "Our Services" },
      'page.subtitle': { it: "Supporto completo per l'autonomia e l'inclusione delle persone con disabilità visiva", en: "Complete support for autonomy and inclusion of people with visual disabilities" },

      'modal.title': { it: "Trova i servizi per te", en: "Find services for you" },
      'modal.subtitle': { it: "Seleziona il tuo profilo per scoprire i servizi più adatti alle tue esigenze", en: "Select your profile to discover the most suitable services for your needs" },
      'modal.skip': { it: "Salta e vedi tutti i servizi", en: "Skip and see all services" },

      'profile.blind': { it: "Persone Non Vedenti", en: "Blind People" },
      'profile.blind.desc': { it: "Consulenza, ausili, formazione Braille e orientamento", en: "Consulting, aids, Braille training and orientation" },
      'profile.lowvision': { it: "Persone Ipovedenti", en: "Low Vision People" },
      'profile.lowvision.desc': { it: "Centro ipovisione, ausili ottici e riabilitazione visiva", en: "Low vision center, optical aids and visual rehabilitation" },
      'profile.families': { it: "Famiglie", en: "Families" },
      'profile.families.desc': { it: "Supporto educativo, consulenza e corsi per genitori", en: "Educational support, consulting and courses for parents" },
      'profile.schools': { it: "Scuole e Insegnanti", en: "Schools and Teachers" },
      'profile.schools.desc': { it: "Consulenza pedagogica, materiali didattici e formazione", en: "Pedagogical consulting, educational materials and training" },
      'profile.companies': { it: "Aziende e Professionisti", en: "Companies and Professionals" },
      'profile.companies.desc': { it: "Consulenze ICT, accessibilità e inserimento lavorativo", en: "ICT consulting, accessibility and job placement" },

      'overview.title': { it: "I Nostri Servizi", en: "Our Services" },
      'overview.text': { it: "L'Istituto Cavazza, con sede a Bologna in Via Castiglione 71, è un punto di riferimento regionale per persone con disabilità visiva di tutte le età. Offriamo servizi gratuiti di consulenza, riabilitazione, formazione e supporto per l'autonomia personale e l'integrazione scolastica e lavorativa.", en: "The Cavazza Institute, based in Bologna at Via Castiglione 71, is a regional reference point for people with visual disabilities of all ages. We offer free consulting, rehabilitation, training and support services for personal autonomy and school and work integration." },

      'sce.title': { it: "Servizio di Consulenza Educativa (SCE)", en: "Educational Consulting Service" },
      'sce.subtitle': { it: "Per studenti 0-18 anni, famiglie e scuole", en: "For students aged 0-18, families and schools" },
      'sce.intro': { it: "Il servizio si propone di affiancare allievi, famiglie ed insegnanti, offrendo un efficace supporto nel complesso percorso dell'integrazione scolastica degli studenti con disabilità visiva. Opera a livello regionale come punto di riferimento per le esigenze educative e formative.", en: "The service aims to support students, families and teachers, offering effective support in the complex path of school integration for students with visual disabilities. It operates at regional level as a reference point for educational and training needs." },
      'sce.consultation': { it: "Consulenze Tiflopedagogiche Gratuite", en: "Free Typhlological Consultations" },
      'sce.consultation.desc': { it: "Offerte presso il Cavazza o presso gli istituti scolastici con partecipazione diretta ai consigli di classe. Le fasi includono: lettura dei bisogni, accertamento delle abilità, strategie pedagogiche e scelta degli strumenti (ausili, adattamento testi, materiali ludici).", en: "Offered at Cavazza or at schools with direct participation in class councils. The phases include: reading needs, assessing skills, pedagogical strategies and choice of tools (aids, text adaptation, play materials)." },
      'sce.braille': { it: "Corsi Braille", en: "Braille Courses" },
      'sce.braille.desc': { it: "Corsi Braille per ragazzi, operatori e genitori", en: "Braille courses for children, operators and parents" },
      'sce.tech': { it: "Addestramento Tifloinformatico", en: "Typhloinformatic Training" },
      'sce.tech.desc': { it: "Addestramento tifloinformatico a domicilio e nelle scuole", en: "Typhloinformatic training at home and in schools" },
      'sce.materials': { it: "Monitoraggio Materiali Didattici", en: "Educational Materials Monitoring" },
      'sce.materials.desc': { it: "Monitoraggio fornitura testi scolastici ingranditi, Braille e informatici", en: "Monitoring of enlarged, Braille and digital school texts" },
      'sce.methodology': { it: "Metodologia di Approccio", en: "Approach Methodology" },
      'sce.methodology.desc': { it: "Il servizio segue un percorso strutturato in 4 fasi: lettura dei bisogni e potenzialità partendo dal quadro clinico-oculistico; accertamento delle abilità in contesti scolastici ed extra-scolastici; individuazione di strategie pedagogiche appropriate; scelta degli strumenti (ausili per studio e autonomia, adattamento testi, materiali ludici).", en: "The service follows a structured path in 4 phases: reading needs and potential starting from clinical-ophthalmological framework; assessment of skills in school and extra-school contexts; identification of appropriate pedagogical strategies; choice of tools (aids for study and autonomy, text adaptation, play materials)." },
      'sce.cta': { it: "Prenota Consulenza", en: "Book Consultation" },

      'ipovisione.title': { it: "Centro Ipovisione", en: "Low Vision Center" },
      'ipovisione.subtitle': { it: "Per persone oltre 18 anni", en: "For people over 18 years old" },
      'ipovisione.desc': { it: "Fornisce percorsi riabilitativi per chi ha difficoltà con attività quotidiane come leggere, scrivere, utilizzare i mezzi pubblici e gestire l'autonomia domestica. Utilizza ausili ottici ed elettronici per recuperare autonomia personale.", en: "Provides rehabilitation pathways for those who have difficulty with daily activities such as reading, writing, using public transport and managing domestic autonomy. Uses optical and electronic aids to recover personal autonomy." },

      'ausilioteca.title': { it: "Ausilioteca Augusto Romagnoli", en: "Augusto Romagnoli Aid Library" },
      'ausilioteca.desc': { it: "Centro specializzato che offre la possibilità di conoscere e testare diversi ausili in un'unica struttura, consultare schede esplicative e valutative, e ricevere consulenza tiflologica e pedagogica completa.", en: "Specialized center that offers the possibility to know and test different aids in a single structure, consult explanatory and evaluation sheets, and receive complete typhlological and pedagogical consulting." },
      'ausilioteca.informatica': { it: "Sezione Informatica", en: "IT Section" },
      'ausilioteca.informatica.desc': { it: "Display Braille (diversi modelli) e software vari per non vedenti", en: "Braille displays (various models) and various software for the blind" },
      'ausilioteca.ipovisione': { it: "Sezione Ipovisione", en: "Low Vision Section" },
      'ausilioteca.ipovisione.desc': { it: "Video ingranditori e strumenti specifici per ipovedenti", en: "Video magnifiers and specific tools for low vision" },
      'ausilioteca.traditional': { it: "Sezione Tiflologica Tradizionale", en: "Traditional Typhlological Section" },
      'ausilioteca.traditional.desc': { it: "Materiali forniti da Federazione Pro Ciechi, Biblioteca di Monza, Istituto di Milano e altri produttori del settore", en: "Materials supplied by Federazione Pro Ciechi, Monza Library, Milan Institute and other industry producers" },
      'ausilioteca.hours': { it: "Orari: Martedì 14:00-18:00, Giovedì 9:00-13:00 e 14:00-18:00", en: "Hours: Tuesday 2:00-6:00 PM, Thursday 9:00 AM-1:00 PM and 2:00-6:00 PM" },
      'ausilioteca.sheets': { it: "Schede di Valutazione Ausili", en: "Aid Evaluation Sheets" },
      'ausilioteca.sheets.desc': { it: "Consulta le schede tecniche dettagliate con descrizioni, caratteristiche, requisiti e valutazioni degli ausili disponibili.", en: "Consult detailed technical sheets with descriptions, characteristics, requirements and evaluations of available aids." },
      'ausilioteca.sheets.hardware': { it: "Schede Ausili Hardware", en: "Hardware Aids Sheets" },
      'ausilioteca.sheets.software': { it: "Schede Ausili Software", en: "Software Aids Sheets" },
      'ausilioteca.sheets.screenreader': { it: "Schede Screen Reader", en: "Screen Reader Sheets" },
      'ausilioteca.cta': { it: "Prenota Visita", en: "Book Visit" },
      'ipovisione.cta': { it: "Prenota Valutazione", en: "Book Evaluation" },

      'autonomy.title': { it: "Vita Indipendente", en: "Independent Living" },
      'autonomy.desc': { it: "Percorsi personalizzati per sviluppare le competenze necessarie alla vita quotidiana: orientamento negli spazi, utilizzo dei mezzi pubblici, gestione delle attività domestiche e cura della persona. Gli interventi sono calibrati sulle esigenze specifiche di ogni utente.", en: "Personalized pathways to develop skills necessary for daily life: orientation in spaces, use of public transport, management of domestic activities and personal care. Interventions are calibrated to the specific needs of each user." },

      'mobility.title': { it: "Orientamento e Mobilità", en: "Orientation and Mobility" },
      'mobility.desc': { it: "Training specializzato per acquisire sicurezza negli spostamenti autonomi: utilizzo del bastone bianco, tecniche di orientamento indoor e outdoor, attraversamento stradale in sicurezza, uso di mappe tattili e dispositivi di orientamento elettronici.", en: "Specialized training to acquire confidence in autonomous movements: use of white cane, indoor and outdoor orientation techniques, safe street crossing, use of tactile maps and electronic orientation devices." },

      'ict.title': { it: "Consulenze ICT e Accessibilità", en: "ICT and Accessibility Consulting" },
      'ict.desc': { it: "Supporto tecnologico per l'uso di computer, smartphone e tablet con tecnologie assistive. Configurazione di screen reader, display Braille, sintesi vocali. Consulenza per l'accessibilità di siti web e applicazioni secondo le normative vigenti (WCAG).", en: "Technological support for the use of computers, smartphones and tablets with assistive technologies. Configuration of screen readers, Braille displays, voice synthesis. Consulting for website and application accessibility according to current regulations (WCAG)." },

      'work.title': { it: "Supporto al Lavoro", en: "Work Support" },
      'work.desc': { it: "Orientamento professionale, formazione mirata e supporto nell'inserimento lavorativo. Collaborazione con aziende per garantire postazioni di lavoro accessibili. Formazione professionale per centralinisti telefonici e altre figure professionali.", en: "Professional orientation, targeted training and support in job placement. Collaboration with companies to ensure accessible workstations. Professional training for telephone operators and other professional figures." },

      'families.title': { it: "Servizi per Famiglie", en: "Services for Families" },
      'families.desc': { it: "Supporto psicologico e pedagogico per le famiglie. Corsi di formazione per genitori su tematiche educative, ausili e tecniche di supporto. Gruppi di confronto e condivisione di esperienze. Orientamento nelle pratiche burocratiche e nell'accesso ai servizi.", en: "Psychological and pedagogical support for families. Training courses for parents on educational issues, aids and support techniques. Discussion groups and sharing of experiences. Guidance in bureaucratic procedures and access to services." },

      'schools.title': { it: "Servizi per Scuole e Professionisti", en: "Services for Schools and Professionals" },
      'schools.desc': { it: "Formazione per insegnanti ed educatori sull'inclusione scolastica. Consulenza per l'adattamento di materiali didattici. Supporto nella predisposizione del PEI (Piano Educativo Individualizzato). Corsi di aggiornamento professionale su tiflologia e tecnologie assistive.", en: "Training for teachers and educators on school inclusion. Consulting for adaptation of educational materials. Support in preparing the IEP (Individualized Educational Plan). Professional updating courses on typhlology and assistive technologies." },

      'contact.title': { it: "Contatti e Prenotazioni", en: "Contacts and Reservations" },
      'contact.desc': { it: "Per prenotare un appuntamento o ricevere maggiori informazioni:", en: "To book an appointment or receive more information:" },
      'contact.phone': { it: "Telefono", en: "Phone" },
      'contact.email': { it: "Email Generale", en: "General Email" },
      'contact.sce.email': { it: "SCE", en: "SCE" },
      'contact.ausilioteca.email': { it: "Ausilioteca", en: "Aid Library" },
      'contact.ipovisione.email': { it: "Centro Ipovisione", en: "Low Vision Center" },
      'contact.hours.title': { it: "Per prenotazioni:", en: "For reservations:" },
      'contact.hours.youth': { it: "Utenza da 0 ai 18 anni:", en: "Ages 0-18:" },
      'contact.hours.youth.desc': { it: "telefonare dal lunedì al venerdì dalle 9:30 alle ore 12:30", en: "call Monday to Friday from 9:30 AM to 12:30 PM" },
      'contact.hours.adult': { it: "Utenza oltre i 18 anni:", en: "Ages 18+:" },
      'contact.hours.adult.desc': { it: "telefonare dal lunedì al sabato", en: "call Monday to Saturday" },
    };

    return translations[key]?.[language] || key;
  };

  const profiles = [
    {
      id: 'blind',
      icon: Eye,
      title: t('profile.blind'),
      description: t('profile.blind.desc'),
      services: ['sce', 'ausilioteca', 'autonomy', 'mobility', 'ict']
    },
    {
      id: 'lowvision',
      icon: Eye,
      title: t('profile.lowvision'),
      description: t('profile.lowvision.desc'),
      services: ['ipovisione', 'ausilioteca', 'autonomy']
    },
    {
      id: 'families',
      icon: Heart,
      title: t('profile.families'),
      description: t('profile.families.desc'),
      services: ['sce', 'families']
    },
    {
      id: 'schools',
      icon: School,
      title: t('profile.schools'),
      description: t('profile.schools.desc'),
      services: ['sce', 'schools']
    },
    {
      id: 'companies',
      icon: Building2,
      title: t('profile.companies'),
      description: t('profile.companies.desc'),
      services: ['ict', 'work']
    }
  ];

  const handleProfileSelect = (profileId: string) => {
    setShowProfileModal(false);
    // Scroll to first service section
    setTimeout(() => {
      document.querySelector('#servizi-overview')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleBookService = (serviceName: string) => {
    setSelectedService(serviceName);
    setShowBookingModal(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Booking Modal */}
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        serviceName={selectedService}
        language={language}
      />
      {/* Profile Selection Modal */}
      {showProfileModal && (
        <div
          className="fixed inset-0 bg-background/95 z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setShowProfileModal(false)}
        >
          <div
            className="bg-card border-4 border-primary rounded-xl max-w-3xl w-full p-4 md:p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-1">{t('modal.title')}</h2>
                <p className="text-sm md:text-base text-muted-foreground">{t('modal.subtitle')}</p>
              </div>
              <button
                onClick={() => setShowProfileModal(false)}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-secondary rounded-xl transition-colors flex-shrink-0"
                aria-label={language === 'it' ? 'Chiudi' : 'Close'}
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              {profiles.map((profile) => (
                <button
                  key={profile.id}
                  onClick={() => handleProfileSelect(profile.id)}
                  className="bg-secondary hover:bg-primary hover:text-primary-foreground border-2 border-border hover:border-primary rounded-xl p-4 text-left transition-all group"
                >
                  <profile.icon className="w-8 h-8 mb-2 text-primary group-hover:text-primary-foreground" aria-hidden="true" />
                  <h3 className="text-lg font-bold mb-1">{profile.title}</h3>
                  <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/90">
                    {profile.description}
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-primary group-hover:text-primary-foreground font-medium text-sm">
                    {language === 'it' ? 'Scopri i servizi' : 'Discover services'}
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowProfileModal(false)}
              className="w-full bg-secondary hover:bg-muted rounded-xl p-4 font-medium transition-colors"
            >
              {t('modal.skip')}
            </button>
          </div>
        </div>
      )}

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[{ label: t('breadcrumb.servizi') }]}
        onHomeClick={onHomeClick}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{t('page.title')}</h1>
          <p className="text-base opacity-95 max-w-3xl">
            {t('page.subtitle')}
          </p>
        </div>
      </section>

      {/* Contenuto principale */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">

        {/* Panoramica */}
        <div id="servizi-overview" className="mb-32">
          <div className="grid md:grid-cols-8">
            <div className="md:col-span-5 mb-6">
              <h2 className="text-2xl font-bold mb-6">{t('overview.title')}</h2>
              <p className="text-base leading-relaxed m-0">
                {t('overview.text')}
              </p>
            </div>
          </div>
        </div>

        {/* Servizio di Consulenza Educativa */}
        <div id="sce" className="mb-32">
          <h2 className="text-2xl font-bold mb-2 flex items-start md:items-center gap-3 text-left">
            <GraduationCap className="w-6 h-6 text-primary" aria-hidden="true" />
            {t('sce.title')}
          </h2>
          <p className="text-base text-muted-foreground mb-6">{t('sce.subtitle')}</p>

          <div className="grid grid-cols-1 md:grid-cols-8 gap-6 items-stretch">
            {/* Placeholder immagini */}
            <div className="flex flex-col gap-6 h-full md:col-span-3">
              <div className="relative overflow-hidden rounded-xl shadow-lg h-[320px] md:h-[360px] bg-muted/40">
                <img
                  src={serviceImages.scePrimary}
                  alt={language === "it" ? "Aula e supporti didattici dell'Istituto" : "Institute classroom and teaching aids"}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="relative overflow-hidden rounded-xl shadow-lg h-[320px] md:h-[360px] bg-muted/40">
                <img
                  src={serviceImages.sceSecondary}
                  alt={language === 'it' ? 'Laboratorio e strumenti accessibili' : 'Accessible laboratory and tools'}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="hidden md:block md:col-span-1" aria-hidden="true" />

            {/* Contenuto testuale */}
            <div className="md:col-span-4">
              <p className="text-base leading-relaxed mb-6">{t('sce.intro')}</p>

              <h3 className="text-lg font-bold mb-3">{t('sce.methodology')}</h3>
              <p className="text-base leading-relaxed mb-6">{t('sce.methodology.desc')}</p>

              <h3 className="text-lg font-bold mb-3">{t('sce.consultation')}</h3>
              <p className="text-base leading-relaxed mb-6">{t('sce.consultation.desc')}</p>

              <div className="flex flex-col gap-4 mb-6">
                <div className="border-2 border-[#135DCD] rounded-xl p-4 bg-transparent">
                  <h4 className="text-base font-bold mb-2">{t('sce.braille')}</h4>
                  <p className="text-sm text-black">{t('sce.braille.desc')}</p>
                </div>
                <div className="border-2 border-[#135DCD] rounded-xl p-4 bg-transparent">
                  <h4 className="text-base font-bold mb-2">{t('sce.tech')}</h4>
                  <p className="text-sm text-black">{t('sce.tech.desc')}</p>
                </div>
                <div className="border-2 border-[#135DCD] rounded-xl p-4 bg-transparent">
                  <h4 className="text-base font-bold mb-2">{t('sce.materials')}</h4>
                  <p className="text-sm text-black">{t('sce.materials.desc')}</p>
                </div>
              </div>

              <Button
                variant="primary"
                onClick={() => handleBookService(t('sce.title'))}
                className="w-full md:w-auto font-bold"
              >
                {t('sce.cta')}
              </Button>
            </div>
          </div>
        </div>

        {/* Centro Ipovisione */}
        <div id="ipovisione" className="mb-32">
          <h2 className="text-2xl font-bold flex items-center gap-3 mx-[0px] mt-[0px] mb-[9px]">
            <Eye className="w-6 h-6 text-primary" aria-hidden="true" />
            {t('ipovisione.title')}
          </h2>
          <p className="text-base text-muted-foreground mb-6">{t('ipovisione.subtitle')}</p>

          <div className="grid grid-cols-1 md:grid-cols-8 gap-6 items-stretch">
            {/* Contenuto testuale */}
            <div className="flex flex-col md:col-span-4">
              <p className="text-base leading-relaxed mb-6">{t('ipovisione.desc')}</p>
              <Button
                variant="primary"
                onClick={() => handleBookService(t('ipovisione.title'))}
                className="w-auto md:w-auto mt-auto font-bold self-start"
              >
                {t('ipovisione.cta')}
              </Button>
            </div>

            <div className="hidden md:block md:col-span-1" aria-hidden="true" />

            {/* Placeholder immagine */}
            <div className="relative overflow-hidden rounded-xl shadow-lg h-[320px] md:h-[380px] md:col-span-3 bg-muted/40">
              <img
                src={serviceImages.lowVision}
                alt={language === "it" ? "Strumenti per l'ipovisione" : "Low-vision tools"}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Ausilioteca */}
        <div id="ausilioteca" className="mb-32">
          <h2 className="text-2xl font-bold mb-6 flex items-start md:items-center gap-3 text-left">
            <Laptop className="w-6 h-6 text-primary" aria-hidden="true" />
            {t('ausilioteca.title')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-8 gap-6 items-stretch mb-16">
            {/* Placeholder immagini */}
            <div className="flex flex-col gap-6 h-full md:col-span-3">
              <div className="relative overflow-hidden rounded-xl shadow-lg h-[320px] md:h-[360px] bg-muted/40">
                <img
                  src={serviceImages.aidLibraryIt}
                  alt={language === 'it' ? 'Ausili informatici della Ausilioteca' : 'IT aids from the Aid Library'}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="relative overflow-hidden rounded-xl shadow-lg h-[320px] md:h-[360px] bg-muted/40">
                <img
                  src={serviceImages.aidLibraryTraditional}
                  alt={language === 'it' ? 'Ausili tradizionali e strumenti per ipovedenti' : 'Traditional aids and low-vision tools'}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="hidden md:block md:col-span-1" aria-hidden="true" />

            {/* Contenuto testuale */}
            <div className="md:col-span-4">
              <p className="text-base leading-relaxed mb-6">{t('ausilioteca.desc')}</p>

              <div className="flex flex-col gap-4 mb-6">
                <div className="border-2 border-[#135DCD] rounded-xl p-4 bg-transparent">
                  <h3 className="text-base font-bold mb-2">{t('ausilioteca.informatica')}</h3>
                  <p className="text-sm leading-relaxed text-black">{t('ausilioteca.informatica.desc')}</p>
                </div>
                <div className="border-2 border-[#135DCD] rounded-xl p-4 bg-transparent">
                  <h3 className="text-base font-bold mb-2">{t('ausilioteca.ipovisione')}</h3>
                  <p className="text-sm leading-relaxed text-black">{t('ausilioteca.ipovisione.desc')}</p>
                </div>
                <div className="border-2 border-[#135DCD] rounded-xl p-4 bg-transparent">
                  <h3 className="text-base font-bold mb-2">{t('ausilioteca.traditional')}</h3>
                  <p className="text-sm leading-relaxed text-black">{t('ausilioteca.traditional.desc')}</p>
                </div>
              </div>

              <div className="mb-6 flex items-center gap-3 text-black">
                <Clock className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                <p className="font-medium m-[0px]">{t('ausilioteca.hours')}</p>
              </div>

              <Button
                variant="primary"
                onClick={() => handleBookService(t('ausilioteca.title'))}
                className="w-full md:w-auto font-bold"
              >
                {t('ausilioteca.cta')}
              </Button>
            </div>
          </div>

          {/* Schede di Valutazione Ausili */}
          <div className="mt-16">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-3">
              <FileText className="w-6 h-6 text-primary" aria-hidden="true" />
              {t('ausilioteca.sheets')}
            </h3>
            <p className="text-base leading-relaxed mb-6">{t('ausilioteca.sheets.desc')}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a
                href="#schede-hardware"
                className="bg-[#EEF4FF] hover:bg-[#E6EFFF] border border-[#D6E4FF] rounded-xl p-6 transition-colors no-underline block shadow-sm"
              >
                <h4 className="text-lg font-bold mb-2">{t('ausilioteca.sheets.hardware')}</h4>
                <p className="text-sm text-muted-foreground">
                  {language === 'it' ? 'Video ingranditori, display Braille, dispositivi hardware' : 'Video magnifiers, Braille displays, hardware devices'}
                </p>
                <div className="mt-4">
                  <span className="inline-flex rounded-md bg-[#135DCD] px-4 py-2 text-sm font-semibold text-white">
                    {language === 'it' ? 'Consulta schede' : 'Consult sheets'}
                  </span>
                </div>
              </a>
              <a
                href="#schede-software"
                className="bg-[#EEF4FF] hover:bg-[#E6EFFF] border border-[#D6E4FF] rounded-xl p-6 transition-colors no-underline block shadow-sm"
              >
                <h4 className="text-lg font-bold mb-2">{t('ausilioteca.sheets.software')}</h4>
                <p className="text-sm text-muted-foreground">
                  {language === 'it' ? 'Software di ingrandimento, applicazioni accessibili' : 'Magnification software, accessible applications'}
                </p>
                <div className="mt-4">
                  <span className="inline-flex rounded-md bg-[#135DCD] px-4 py-2 text-sm font-semibold text-white">
                    {language === 'it' ? 'Consulta schede' : 'Consult sheets'}
                  </span>
                </div>
              </a>
              <a
                href="#schede-screenreader"
                className="bg-[#EEF4FF] hover:bg-[#E6EFFF] border border-[#D6E4FF] rounded-xl p-6 transition-colors no-underline block shadow-sm"
              >
                <h4 className="text-lg font-bold mb-2">{t('ausilioteca.sheets.screenreader')}</h4>
                <p className="text-sm text-muted-foreground">
                  {language === 'it' ? 'NVDA, JAWS, altri screen reader con valutazioni dettagliate' : 'NVDA, JAWS, other screen readers with detailed evaluations'}
                </p>
                <div className="mt-4">
                  <span className="inline-flex rounded-md bg-[#135DCD] px-4 py-2 text-sm font-semibold text-white">
                    {language === 'it' ? 'Consulta schede' : 'Consult sheets'}
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Servizi Secondari */}
        <div className="mb-32">
          <h2 className="text-2xl font-bold mb-6">
            {language === 'it' ? 'Servizi Secondari' : 'Secondary Services'}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Autonomia Personale */}
            <div id="autonomy" className="bg-[#EEF4FF] border border-[#D6E4FF] rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                <Users className="w-6 h-6 text-primary" aria-hidden="true" />
                {t('autonomy.title')}
              </h3>
              <p className="text-base leading-relaxed mb-4">{t('autonomy.desc')}</p>
              <Button className="font-bold"
                variant="primary"
                onClick={() => {
                  setSelectedService(t('autonomy.title'));
                  setShowBookingModal(true);
                }}
              >
                {language === 'it' ? 'Prenota Consulenza' : 'Book Consultation'}
              </Button>
            </div>

            {/* Orientamento e Mobilità */}
            <div id="mobility" className="bg-[#EEF4FF] border border-[#D6E4FF] rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                <MapPin className="w-6 h-6 text-primary" aria-hidden="true" />
                {t('mobility.title')}
              </h3>
              <p className="text-base leading-relaxed mb-4">{t('mobility.desc')}</p>
              <Button className="font-bold"
                variant="primary"
                onClick={() => {
                  setSelectedService(t('mobility.title'));
                  setShowBookingModal(true);
                }}
              >
                {language === 'it' ? 'Prenota Consulenza' : 'Book Consultation'}
              </Button>
            </div>

            {/* Consulenze ICT */}
            <div id="ict" className="bg-[#EEF4FF] border border-[#D6E4FF] rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                <Laptop className="w-6 h-6 text-primary" aria-hidden="true" />
                {t('ict.title')}
              </h3>
              <p className="text-base leading-relaxed mb-4">{t('ict.desc')}</p>
              <Button className="font-bold"
                variant="primary"
                onClick={() => {
                  setSelectedService(t('ict.title'));
                  setShowBookingModal(true);
                }}
              >
                {language === 'it' ? 'Prenota Consulenza' : 'Book Consultation'}
              </Button>
            </div>

            {/* Supporto al Lavoro */}
            <div id="work" className="bg-[#EEF4FF] border border-[#D6E4FF] rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                <Briefcase className="w-6 h-6 text-primary" aria-hidden="true" />
                {t('work.title')}
              </h3>
              <p className="text-base leading-relaxed mb-4">{t('work.desc')}</p>
              <Button className="font-bold"
                variant="primary"
                onClick={() => {
                  setSelectedService(t('work.title'));
                  setShowBookingModal(true);
                }}
              >
                {language === 'it' ? 'Prenota Consulenza' : 'Book Consultation'}
              </Button>
            </div>

            {/* Servizi per Famiglie */}
            <div id="families" className="bg-[#EEF4FF] border border-[#D6E4FF] rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                <Heart className="w-6 h-6 text-primary" aria-hidden="true" />
                {t('families.title')}
              </h3>
              <p className="text-base leading-relaxed mb-4">{t('families.desc')}</p>
              <Button className="font-bold"
                variant="primary"
                onClick={() => {
                  setSelectedService(t('families.title'));
                  setShowBookingModal(true);
                }}
              >
                {language === 'it' ? 'Prenota Consulenza' : 'Book Consultation'}
              </Button>
            </div>

            {/* Servizi per Scuole */}
            <div id="schools" className="bg-[#EEF4FF] border border-[#D6E4FF] rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                <School className="w-6 h-6 text-primary" aria-hidden="true" />
                {t('schools.title')}
              </h3>
              <p className="text-base leading-relaxed mb-4">{t('schools.desc')}</p>
              <Button className="font-bold"
                variant="primary"
                onClick={() => {
                  setSelectedService(t('schools.title'));
                  setShowBookingModal(true);
                }}
              >
                {language === 'it' ? 'Prenota Consulenza' : 'Book Consultation'}
              </Button>
            </div>
          </div>
        </div>

        {/* Contatti */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-3 text-black">{t('contact.title')}</h2>
          <p className="text-sm mb-6 text-black/80">{t('contact.desc')}</p>

          <div className="space-y-6">
            {/* Prima riga: Orari e Telefono/Email */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-transparent border-2 border-[#D75220] rounded-xl p-5 md:p-6 md:col-span-2">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-5 h-5 text-[#D75220] flex-shrink-0" aria-hidden="true" />
                  <h3 className="text-base font-bold m-[0px] text-black">{t('contact.hours.title')}</h3>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <p className="text-sm mb-1 font-bold text-black">{t('contact.hours.youth')}</p>
                    <p className="text-xs text-black">{t('contact.hours.youth.desc')}</p>
                  </div>
                  <div>
                    <p className="text-sm mb-1 font-bold text-black">{t('contact.hours.adult')}</p>
                    <p className="text-xs text-black">{t('contact.hours.adult.desc')}</p>
                  </div>
                </div>
              </div>

              <div className="bg-transparent border-2 border-[#D75220] rounded-xl p-5 md:p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Phone className="w-5 h-5 text-[#D75220] flex-shrink-0" aria-hidden="true" />
                  <h3 className="text-base font-bold m-[0px] text-black">{t('contact.phone')}</h3>
                </div>
                <a href="tel:+39051332090" className="mb-10 block text-[16px] text-[#D75220]">+39 051 33 20 90</a>
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="w-5 h-5 text-[#D75220] flex-shrink-0" aria-hidden="true" />
                  <h3 className="text-base font-bold m-[0px] text-black">{t('contact.email')}</h3>
                </div>
                <a href="mailto:istituto@cavazza.it" className="text-sm text-[#D75220]">istituto@cavazza.it</a>
              </div>
            </div>

            {/* Seconda riga: Email specifiche */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-transparent border-2 border-[#D75220] rounded-xl p-4 md:p-5">
                <p className="mb-1 text-sm font-bold text-black">{t('contact.sce.email')}</p>
                <a href="mailto:sce@cavazza.it" className="text-[15px] text-[#D75220]">sce@cavazza.it</a>
              </div>

              <div className="bg-transparent border-2 border-[#D75220] rounded-xl p-4 md:p-5">
                <p className="mb-1 text-sm font-bold text-black">{t('contact.ausilioteca.email')}</p>
                <a href="mailto:ausilioteca@cavazza.it" className="text-[15px] text-[#D75220]">ausilioteca@cavazza.it</a>
              </div>

              <div className="bg-transparent border-2 border-[#D75220] rounded-xl p-4 md:p-5">
                <p className="mb-1 text-sm font-bold text-black">{t('contact.ipovisione.email')}</p>
                <a href="mailto:ipovisione@cavazza.it" className="text-[15px] text-[#D75220]">ipovisione@cavazza.it</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
