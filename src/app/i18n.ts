/**
 * Sistema di traduzione IT/EN per Istituto Cavazza
 * Semplice e leggero, solo due lingue
 */

export type Lang = 'it' | 'en';

export const translations = {
  it: {
    // Hero
    'hero.badge': 'Dalla scuola al lavoro: accompagniamo ogni percorso di vita.',
    'hero.title': 'Oltre il visibile.',
    'hero.subtitle1': 'Autonomia. Formazione. Cultura. Inclusione.',
    'hero.subtitle2': 'Dal 1881 l\'Istituto Cavazza supporta persone non vedenti e ipovedenti a Bologna con servizi gratuiti, formazione professionale e opportunità culturali accessibili.',
    'hero.cta.primary': 'Scopri la Nostra Storia',
    'hero.cta.secondary': 'Esplora i Corsi Formativi',

    // Navigation
    'nav.about': 'Istituto',
    'nav.services': 'Servizi',
    'nav.training': 'Formazione',
    'nav.culture': 'Cultura',
    'nav.events': 'Iniziative',
    'nav.who-we-serve': 'Chi Serviamo',
    'nav.courses': 'Corsi Gratuiti',
    'nav.radio': 'Radio Oltre',
    'nav.contacts': 'Contatti',
    'nav.support': 'Sostienici',

    // Stats
    'stats.years': 'Anni di Esperienza',
    'stats.users': 'Utenti Raggiunti Ogni Anno',
    'stats.content': 'Contenuti Accessibili',

    // Quiz
    'quiz.title': 'Scopri come possiamo aiutarti',
    'quiz.subtitle': 'Non sai ancora da dove partire? Rispondi a una semplice domanda per ricevere consigli personalizzati',

    // Who We Serve
    'who-we-serve.title': 'Per Chi è il Cavazza',
    'who-we-serve.subtitle': 'I nostri servizi sono progettati per persone di tutte le età e in ogni fase del loro percorso con l\'ipovisione.',

    // Events
    'events.title': 'Prossimi Eventi',
    'events.subtitle': 'Scopri i nostri progetti e gli eventi in arrivo',
    'events.free': 'gratuiti',
    'events.all-free': 'Tutti i nostri corsi sono',

    // Testimonials
    'testimonials.title': 'Le Voci della Nostra Comunità',
    'testimonials.subtitle': 'Storie di autonomia, crescita e successo dai membri della nostra comunità.',

    // Services
    'services.title': 'I Nostri Servizi Principali',

    // Radio
    'radio.title': 'Radio Oltre',
    'radio.subtitle': 'La radio dell\'Istituto Cavazza: programmi dedicati all\'inclusione, cultura, informazione e intrattenimento per la comunità dei non vedenti e ipovedenti.',
    'radio.playing': 'In riproduzione',
    'radio.paused': 'In pausa',
    'radio.now-playing': '• In Onda Ora',
    'radio.next': 'Prossimo Programma',

    // Support
    'support.title': 'Il Tuo Supporto Cambia Vite',
    'support.subtitle1': 'Il tuo contributo permette di offrire servizi gratuiti a centinaia di persone ogni anno.',
    'support.subtitle2': 'Grazie a donatori come te, possiamo continuare a garantire formazione professionale, tecnologie assistive, supporto educativo e cultura accessibile a tutti.',
    'support.donate': 'Dona Ora',

    // Accessibility
    'a11y.title': 'Dichiarazione di Accessibilità',

    // Contacts
    'contacts.title': 'Contatti',

    // Footer
    'footer.rights': 'Tutti i diritti riservati',
    'footer.who-we-serve': 'Chi Serviamo',
    'footer.services': 'Servizi',
    'footer.info': 'Informazioni',
    'footer.quick-contacts': 'Contatti Rapidi',
    'footer.new-users': 'Nuovi Utenti',
    'footer.children': 'Bambini e Giovani',
    'footer.professionals': 'Professionisti',
    'footer.families': 'Familiari',
    'footer.educational-consulting': 'Consulenza Educativa',
    'footer.professional-training': 'Formazione Professionale',
    'footer.tactile-museums': 'Musei Tattili',
    'footer.library': 'Biblioteca',
    'footer.accessibility': 'Accessibilità',
    'footer.donate': 'Dona',
    'footer.address-line1': 'Via Castiglione, 71',
    'footer.address-line2': '40124 Bologna (BO)',
    'footer.hours': 'Lun-Ven: 9:00-18:00',
    'footer.recognized-by': 'Riconosciuto da:',
    'footer.onlus': 'ONLUS Certificata',
    'footer.consulta': 'Consulta Istituzioni Bolognesi',
    'footer.wcag': 'WCAG 2.1 AAA Compliant',
    'footer.institute-name': 'Istituto dei Ciechi Francesco Cavazza',
    'footer.onlus-suffix': 'ONLUS',
    'footer.designed-with': 'Sito progettato con',
    'footer.atkinson-font': 'font Atkinson Hyperlegible',
    'footer.wcag-standards': 'secondo gli standard WCAG 2.1 AA/AAA per massima accessibilità',

    // Who We Serve Cards
    'who-serve.new-users.title': 'Nuovi Utenti',
    'who-serve.new-users.desc': 'Orientamento e supporto per chi ha ricevuto da poco una diagnosi.',
    'who-serve.children.title': 'Bambini e Giovani',
    'who-serve.children.desc': 'Supporto educativo e attività ricreative per studenti 0-18 anni.',
    'who-serve.students.title': 'Studenti Adulti',
    'who-serve.students.desc': 'Corsi professionali riconosciuti e gratuiti.',
    'who-serve.professionals.title': 'Professionisti',
    'who-serve.professionals.desc': 'Formazione ECM e aggiornamento professionale.',
    'who-serve.families.title': 'Familiari e Caregiver',
    'who-serve.families.desc': 'Gruppi di supporto e consulenze per familiari.',
    'who-serve.educators.title': 'Educatori e Insegnanti',
    'who-serve.educators.desc': 'Consulenza per rendere scuole e ambienti inclusivi.',

    // Services Cards
    'service.personal.title': 'Servizi alla Persona',
    'service.personal.desc': 'Consulenza educativa per famiglie e scuole, visite ortottiche specializzate, supporto all\'autonomia personale e orientamento.',
    'service.personal.action': 'Scopri i servizi',
    'service.training.title': 'Scuola e Formazione',
    'service.training.desc': 'Corsi professionali per centralinisti e operatori dell\'informazione, formazione su ausili tecnologici e percorsi di ausilioteca.',
    'service.training.action': 'Vedi i corsi',
    'service.museums.title': 'Musei Tattili',
    'service.museums.desc': 'Museo Tolomeo e Museo Tattile Anteros: esplorare arte e cultura attraverso il tatto. Percorsi inclusivi aperti a tutti.',
    'service.museums.action': 'Visita i musei',
    'service.library.title': 'Biblioteca e Audiolibri',
    'service.library.desc': 'Biblioteca specializzata con audiolibri, telebook, rivista "Vedere Oltre" e materiali accessibili in vari formati.',
    'service.library.action': 'Esplora la biblioteca',

    // Service Details
    'service-detail.personal.title': 'Servizi alla Persona',
    'service-detail.consulting.title': 'Consulenza Educativa',
    'service-detail.consulting.desc': 'Supporto specializzato per famiglie e insegnanti di bambini e ragazzi non vedenti e ipovedenti. Percorsi personalizzati di orientamento e mobilità.',
    'service-detail.orthoptic.title': 'Visite Ortottiche',
    'service-detail.orthoptic.desc': 'Valutazioni specialistiche della funzionalità visiva residua, consulenze per l\'utilizzo di ausili ottici e tecnologie assistive.',

    // Training Details
    'training.title': 'Scuola e Formazione Professionale',
    'training.switchboard.title': 'Corso per Centralinisti - Operatori dell\'Informazione',
    'training.switchboard.desc': 'Percorso formativo professionalizzante riconosciuto che prepara non vedenti e ipovedenti al lavoro di centralinista e operatore dell\'informazione.',
    'training.switchboard.action': 'Informazioni sul corso',
    'training.tech.title': 'Formazione su Ausili Tecnologici',
    'training.tech.desc': 'Corsi per operatori di ausilioteca: apprendimento dell\'uso di tecnologie assistive, screen reader, display braille e software di ingrandimento.',
    'training.tech.action': 'Scopri i corsi',

    // Museums
    'museums.title': 'Musei Tattili e Cultura Accessibile',
    'museums.tolomeo.title': 'Museo Tolomeo',
    'museums.tolomeo.desc': '"Tra storie, arti e tecnologie" - Un viaggio multisensoriale che racconta l\'evoluzione degli ausili per non vedenti e la storia dell\'Istituto Cavazza.',
    'museums.tolomeo.details': 'Percorsi tattili, audio descrizioni e installazioni interattive accessibili a tutti.',
    'museums.tolomeo.action': 'Prenota una visita',
    'museums.anteros.title': 'Museo Tattile Anteros',
    'museums.anteros.desc': 'Collezione di riproduzioni tattili di opere d\'arte antica e moderna. L\'arte accessibile attraverso il tatto.',
    'museums.anteros.details': 'Visite guidate multisensoriali per scuole, gruppi e singoli visitatori.',
    'museums.anteros.action': 'Scopri le collezioni',

    // Library
    'library.title': 'Biblioteca Specializzata',
    'library.audiobooks.title': 'Audiolibri e Telebook',
    'library.audiobooks.desc': 'Vasta collezione di audiolibri, telebook e materiali in formato accessibile. Servizio di prestito e consultazione.',
    'library.magazine.title': 'Rivista "Vedere Oltre"',
    'library.magazine.desc': 'Pubblicazione periodica dell\'Istituto con articoli su cultura, tecnologia, normative e iniziative per non vedenti e ipovedenti.',
    'library.action': 'Accedi al catalogo',

    // Support Section
    'support.transparency': 'ONLUS certificata • Trasparenza garantita • 5x1000: C.F. 80013770378',
    'support.other-ways': 'Altri Modi per Aiutare',

    // Accessibility Statement
    'a11y.compliance': 'Conformità agli Standard WCAG 2.1 AA/AAA',
    'a11y.intro': 'Questo sito web è stato progettato per garantire la massima accessibilità alle persone con disabilità visive, seguendo le linee guida WCAG 2.1 livello AA e molti criteri AAA.',
    'a11y.features-title': 'Caratteristiche di Accessibilità',
    'a11y.feature.contrast': 'Alto contrasto nativo (rapporto 7:1 o superiore)',
    'a11y.feature.font': 'Font Atkinson Hyperlegible progettato per bassa visione',
    'a11y.feature.modes': 'Modalità tema scuro e testo ingrandito integrate',
    'a11y.feature.focus': 'Focus states altamente visibili (4px, colore arancione)',
    'a11y.feature.targets': 'Target minimi 44x44px per tutti gli elementi interattivi',
    'a11y.feature.keyboard': 'Navigazione completamente accessibile da tastiera',
    'a11y.feature.skip': 'Skip links per saltare alla navigazione principale',
    'a11y.feature.semantic': 'Struttura semantica HTML5 e gerarchia heading rigorosa',
    'a11y.feature.alt': 'Testi alternativi completi per tutte le immagini',
    'a11y.feature.motion': 'Rispetto delle preferenze utente per animazioni ridotte',
    'a11y.feature.color': 'Doppia codifica visiva (mai solo il colore)',
    'a11y.last-review': 'Data ultima verifica:',
    'a11y.review-date': 'Maggio 2026',
    'a11y.standard': 'Standard di riferimento:',
    'a11y.standard-level': 'WCAG 2.1 Level AA/AAA',
    'a11y.feedback.title': 'Segnala Problemi di Accessibilità',
    'a11y.feedback.intro': 'Se riscontri difficoltà nell\'utilizzo di questo sito o vuoi segnalare barriere all\'accessibilità, contattaci. Risponderemo entro 5 giorni lavorativi.',
    'a11y.feedback.name': 'Nome (opzionale)',
    'a11y.feedback.email': 'Email *',
    'a11y.feedback.issue': 'Descrivi il problema di accessibilità *',
    'a11y.feedback.issue-placeholder': 'Esempio: Non riesco a leggere il testo nella sezione X perché il contrasto è insufficiente...',
    'a11y.feedback.tech': 'Tecnologia assistiva utilizzata (opzionale)',
    'a11y.feedback.tech-placeholder': 'Esempio: JAWS 2024, NVDA, ZoomText...',
    'a11y.feedback.submit': 'Invia Segnalazione',
    'a11y.feedback.success': 'Grazie per la tua segnalazione. Ti contatteremo entro 5 giorni lavorativi.',

    // Contact
    'contact.address': 'Indirizzo',
    'contact.phone': 'Telefono',
    'contact.email': 'Email'
  },

  en: {
    // Hero
    'hero.badge': 'From school to work: we support every life path.',
    'hero.title': 'Beyond the visible.',
    'hero.subtitle1': 'Autonomy. Training. Culture. Inclusion.',
    'hero.subtitle2': 'Since 1881, Istituto Cavazza has been supporting blind and visually impaired people in Bologna with free services, professional training, and accessible cultural opportunities.',
    'hero.cta.primary': 'Discover Our Story',
    'hero.cta.secondary': 'Explore Training Courses',

    // Navigation
    'nav.about': 'Institute',
    'nav.services': 'Services',
    'nav.training': 'Training',
    'nav.culture': 'Culture',
    'nav.events': 'Initiatives',
    'nav.radio': 'Radio Oltre',
    'nav.contacts': 'Contacts',
    'nav.support': 'Support Us',

    // Stats
    'stats.years': 'Years of Experience',
    'stats.users': 'Users Reached Every Year',
    'stats.content': 'Accessible Content',

    // Quiz
    'quiz.title': 'Discover how we can help you',
    'quiz.subtitle': "Don't know where to start? Answer a simple question to receive personalized recommendations",

    // Who We Serve
    'who-we-serve.title': 'Who is Cavazza For',
    'who-we-serve.subtitle': 'Our services are designed for people of all ages and at every stage of their journey with visual impairment.',

    // Events
    'events.title': 'Upcoming Events',
    'events.subtitle': 'Discover our projects and upcoming events',
    'events.free': 'free',
    'events.all-free': 'All our courses are',

    // Testimonials
    'testimonials.title': 'Voices from Our Community',
    'testimonials.subtitle': 'Stories of autonomy, growth, and success from members of our community.',

    // Services
    'services.title': 'Our Main Services',

    // Radio
    'radio.title': 'Radio Oltre',
    'radio.subtitle': 'Radio from Istituto Cavazza: programs dedicated to inclusion, culture, information, and entertainment for the blind and visually impaired community.',
    'radio.playing': 'Playing',
    'radio.paused': 'Paused',
    'radio.now-playing': '• Now Playing',
    'radio.next': 'Next Program',

    // Support
    'support.title': 'Your Support Changes Lives',
    'support.subtitle1': 'Your contribution enables us to offer free services to hundreds of people every year.',
    'support.subtitle2': 'Thanks to donors like you, we can continue to guarantee professional training, assistive technologies, educational support, and accessible culture for all.',
    'support.donate': 'Donate Now',

    // Accessibility
    'a11y.title': 'Accessibility Statement',

    // Contacts
    'contacts.title': 'Contacts',

    // Footer
    'footer.rights': 'All rights reserved',
    'footer.who-we-serve': 'Who We Serve',
    'footer.services': 'Services',
    'footer.info': 'Information',
    'footer.quick-contacts': 'Quick Contacts',
    'footer.new-users': 'New Users',
    'footer.children': 'Children & Youth',
    'footer.professionals': 'Professionals',
    'footer.families': 'Families',
    'footer.educational-consulting': 'Educational Consulting',
    'footer.professional-training': 'Professional Training',
    'footer.tactile-museums': 'Tactile Museums',
    'footer.library': 'Library',
    'footer.accessibility': 'Accessibility',
    'footer.donate': 'Donate',
    'footer.address-line1': 'Via Castiglione, 71',
    'footer.address-line2': '40124 Bologna (BO)',
    'footer.hours': 'Mon-Fri: 9:00 AM-6:00 PM',
    'footer.recognized-by': 'Recognized by:',
    'footer.onlus': 'Certified ONLUS',
    'footer.consulta': 'Bologna Institutions Committee',
    'footer.wcag': 'WCAG 2.1 AAA Compliant',
    'footer.institute-name': 'Istituto dei Ciechi Francesco Cavazza',
    'footer.onlus-suffix': 'ONLUS',
    'footer.designed-with': 'Website designed with',
    'footer.atkinson-font': 'Atkinson Hyperlegible font',
    'footer.wcag-standards': 'following WCAG 2.1 AA/AAA standards for maximum accessibility',

    // Who We Serve Cards
    'who-serve.new-users.title': 'New Users',
    'who-serve.new-users.desc': 'Guidance and support for those recently diagnosed.',
    'who-serve.children.title': 'Children & Youth',
    'who-serve.children.desc': 'Educational support and recreational activities for ages 0-18.',
    'who-serve.students.title': 'Adult Students',
    'who-serve.students.desc': 'Accredited professional courses, free of charge.',
    'who-serve.professionals.title': 'Professionals',
    'who-serve.professionals.desc': 'ECM training and professional development.',
    'who-serve.families.title': 'Families & Caregivers',
    'who-serve.families.desc': 'Support groups and consultations for families.',
    'who-serve.educators.title': 'Educators & Teachers',
    'who-serve.educators.desc': 'Consulting to make schools and environments inclusive.',

    // Services Cards
    'service.personal.title': 'Personal Services',
    'service.personal.desc': 'Educational consultation for families and schools, specialized orthoptic visits, personal autonomy support, and orientation.',
    'service.personal.action': 'Discover services',
    'service.training.title': 'School & Training',
    'service.training.desc': 'Professional courses for switchboard operators and information specialists, assistive technology training, and assistive device programs.',
    'service.training.action': 'View courses',
    'service.museums.title': 'Tactile Museums',
    'service.museums.desc': 'Museo Tolomeo and Museo Tattile Anteros: exploring art and culture through touch. Inclusive paths open to all.',
    'service.museums.action': 'Visit museums',
    'service.library.title': 'Library & Audiobooks',
    'service.library.desc': 'Specialized library with audiobooks, telebooks, "Vedere Oltre" magazine, and accessible materials in various formats.',
    'service.library.action': 'Explore library',

    // Service Details
    'service-detail.personal.title': 'Personal Services',
    'service-detail.consulting.title': 'Educational Consulting',
    'service-detail.consulting.desc': 'Specialized support for families and teachers of blind and visually impaired children and youth. Personalized orientation and mobility paths.',
    'service-detail.orthoptic.title': 'Orthoptic Visits',
    'service-detail.orthoptic.desc': 'Specialized evaluations of residual visual functionality, consultations for the use of optical aids and assistive technologies.',

    // Training Details
    'training.title': 'School & Professional Training',
    'training.switchboard.title': 'Switchboard Operators - Information Specialists Course',
    'training.switchboard.desc': 'Recognized professional training pathway that prepares blind and visually impaired individuals for work as switchboard operators and information specialists.',
    'training.switchboard.action': 'Course information',
    'training.tech.title': 'Assistive Technology Training',
    'training.tech.desc': 'Courses for assistive device operators: learning to use assistive technologies, screen readers, braille displays, and magnification software.',
    'training.tech.action': 'Discover courses',

    // Museums
    'museums.title': 'Tactile Museums & Accessible Culture',
    'museums.tolomeo.title': 'Museo Tolomeo',
    'museums.tolomeo.desc': '"Among stories, arts, and technologies" - A multisensory journey telling the evolution of aids for the blind and the history of Istituto Cavazza.',
    'museums.tolomeo.details': 'Tactile paths, audio descriptions, and interactive installations accessible to all.',
    'museums.tolomeo.action': 'Book a visit',
    'museums.anteros.title': 'Museo Tattile Anteros',
    'museums.anteros.desc': 'Collection of tactile reproductions of ancient and modern artworks. Art made accessible through touch.',
    'museums.anteros.details': 'Multisensory guided tours for schools, groups, and individual visitors.',
    'museums.anteros.action': 'Discover collections',

    // Library
    'library.title': 'Specialized Library',
    'library.audiobooks.title': 'Audiobooks & Telebooks',
    'library.audiobooks.desc': 'Vast collection of audiobooks, telebooks, and materials in accessible formats. Loan and consultation service.',
    'library.magazine.title': '"Vedere Oltre" Magazine',
    'library.magazine.desc': 'Institute\'s periodical publication with articles on culture, technology, regulations, and initiatives for blind and visually impaired people.',
    'library.action': 'Access catalog',

    // Support Section
    'support.transparency': 'Certified ONLUS • Guaranteed transparency • 5x1000: Tax ID 80013770378',
    'support.other-ways': 'Other Ways to Help',

    // Accessibility Statement
    'a11y.compliance': 'WCAG 2.1 AA/AAA Standards Compliance',
    'a11y.intro': 'This website has been designed to ensure maximum accessibility for people with visual disabilities, following WCAG 2.1 Level AA guidelines and many AAA criteria.',
    'a11y.features-title': 'Accessibility Features',
    'a11y.feature.contrast': 'Native high contrast (7:1 ratio or higher)',
    'a11y.feature.font': 'Atkinson Hyperlegible font designed for low vision',
    'a11y.feature.modes': 'Integrated dark theme and enlarged text modes',
    'a11y.feature.focus': 'Highly visible focus states (4px, orange color)',
    'a11y.feature.targets': 'Minimum 44x44px targets for all interactive elements',
    'a11y.feature.keyboard': 'Fully keyboard-accessible navigation',
    'a11y.feature.skip': 'Skip links to jump to main navigation',
    'a11y.feature.semantic': 'HTML5 semantic structure and strict heading hierarchy',
    'a11y.feature.alt': 'Complete alternative texts for all images',
    'a11y.feature.motion': 'Respects user preferences for reduced motion',
    'a11y.feature.color': 'Dual visual encoding (never color alone)',
    'a11y.last-review': 'Last review date:',
    'a11y.review-date': 'May 2026',
    'a11y.standard': 'Reference standard:',
    'a11y.standard-level': 'WCAG 2.1 Level AA/AAA',
    'a11y.feedback.title': 'Report Accessibility Issues',
    'a11y.feedback.intro': 'If you encounter difficulties using this site or wish to report accessibility barriers, please contact us. We will respond within 5 business days.',
    'a11y.feedback.name': 'Name (optional)',
    'a11y.feedback.email': 'Email *',
    'a11y.feedback.issue': 'Describe the accessibility issue *',
    'a11y.feedback.issue-placeholder': 'Example: I cannot read the text in section X because the contrast is insufficient...',
    'a11y.feedback.tech': 'Assistive technology used (optional)',
    'a11y.feedback.tech-placeholder': 'Example: JAWS 2024, NVDA, ZoomText...',
    'a11y.feedback.submit': 'Submit Report',
    'a11y.feedback.success': 'Thank you for your report. We will contact you within 5 business days.',

    // Contact
    'contact.address': 'Address',
    'contact.phone': 'Phone',
    'contact.email': 'Email'
  }
};

export function useTranslation(lang: Lang) {
  return (key: string): string => {
    return translations[lang][key as keyof typeof translations['it']] || key;
  };
}
