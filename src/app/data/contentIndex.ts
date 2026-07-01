import { Lang } from '../i18n';

export type EventItem = {
  id: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  category?: string;
  status?: string;
  description?: string;
  spots?: number;
  featured?: boolean;
};

export type ProjectItem = {
  id: string;
  title: string;
  objective?: string;
  status?: string;
  area?: string;
  description?: string;
  featured?: boolean;
};

export type NewsItem = {
  id: string;
  title: string;
  date?: string;
  category?: string;
  excerpt?: string;
  featured?: boolean;
};

export const getEvents = (language: Lang): EventItem[] => {
  return [
    {
      id: '1',
      title: language === 'it' ? 'Introduzione alla Vita con Ipovisione' : 'Introduction to Life with Low Vision',
      date: language === 'it' ? '10 Giugno 2026' : 'June 10, 2026',
      time: '14:30 - 16:30',
      location: language === 'it' ? 'Sede Cavazza + Online' : 'Cavazza Headquarters + Online',
      category: language === 'it' ? 'Orientamento' : 'Orientation',
      status: 'upcoming',
      description: language === 'it'
        ? 'Corso introduttivo per persone con diagnosi recente di ipovisione. Scopri gli ausili, le strategie e il supporto disponibile per vivere in autonomia.'
        : 'Introductory course for people recently diagnosed with low vision. Discover aids, strategies and available support for independent living.',
      spots: 15,
      featured: true
    },
    {
      id: '2',
      title: language === 'it' ? 'Cucinare Senza Guardare - Livello Base' : 'Cooking Without Looking - Beginner Level',
      date: language === 'it' ? '12 Giugno 2026' : 'June 12, 2026',
      time: '10:00 - 12:00',
      location: language === 'it' ? 'Laboratorio Cucina, Sede Cavazza' : 'Cooking Lab, Cavazza Headquarters',
      category: language === 'it' ? 'Autonomia' : 'Autonomy',
      status: 'upcoming',
      description: language === 'it'
        ? 'Workshop pratico sulle tecniche di cucina per non vedenti e ipovedenti. Impara a cucinare in sicurezza e autonomia.'
        : 'Practical workshop on cooking techniques for blind and visually impaired. Learn to cook safely and independently.',
      spots: 8
    },
    {
      id: '3',
      title: language === 'it' ? 'Tecnologie Assistive: Smartphone e Tablet' : 'Assistive Technologies: Smartphones & Tablets',
      date: language === 'it' ? '16 Giugno 2026' : 'June 16, 2026',
      time: '15:00 - 17:00',
      location: 'Online',
      category: language === 'it' ? 'Tecnologia' : 'Technology',
      status: 'upcoming',
      description: language === 'it'
        ? 'Impara a utilizzare le funzioni di accessibilità di iOS e Android. VoiceOver, TalkBack, ingrandimento e molto altro.'
        : 'Learn to use iOS and Android accessibility features. VoiceOver, TalkBack, magnification, and much more.',
      spots: 20
    },
    {
      id: '4',
      title: language === 'it' ? 'Concerto Accessibile - Orchestra Sinfonica' : 'Accessible Concert - Symphony Orchestra',
      date: language === 'it' ? '20 Giugno 2026' : 'June 20, 2026',
      time: '20:00',
      location: language === 'it' ? 'Teatro Comunale, Bologna' : 'Teatro Comunale, Bologna',
      category: language === 'it' ? 'Cultura' : 'Culture',
      status: 'upcoming',
      description: language === 'it'
        ? 'Concerto con audiodescrizione e supporto per persone non vedenti e ipovedenti. Programma: Mozart, Beethoven, Brahms.'
        : 'Concert with audio description and support for blind and visually impaired people. Program: Mozart, Beethoven, Brahms.'
    }
  ];
};

export const getProjects = (language: Lang): ProjectItem[] => {
  return [
    {
      id: '1',
      title: language === 'it' ? 'Accessibilità Digitale nelle Scuole' : 'Digital Accessibility in Schools',
      objective: language === 'it'
        ? "Portare la formazione su tecnologie assistive e inclusione digitale in 50 scuole dell'Emilia-Romagna"
        : 'Bring training on assistive technologies and digital inclusion to 50 schools in Emilia-Romagna',
      status: 'active',
      area: language === 'it' ? 'Formazione' : 'Education',
      description: language === 'it'
        ? "Progetto triennale finanziato dalla Regione per formare docenti e studenti sull'uso di tecnologie assistive e pratiche inclusive in ambito scolastico."
        : 'Three-year project funded by the Region to train teachers and students on the use of assistive technologies and inclusive practices in schools.',
      featured: true
    },
    {
      id: '2',
      title: language === 'it' ? 'Museo Tattile Itinerante' : 'Traveling Tactile Museum',
      objective: language === 'it'
        ? "Portare l'arte accessibile in 15 città italiane con mostre tattili temporanee"
        : "Bring accessible art to 15 Italian cities with temporary tactile exhibitions",
      status: 'active',
      area: language === 'it' ? 'Cultura' : 'Culture',
      description: language === 'it'
        ? "Tour nazionale di opere tattili del Museo Anteros per rendere l'arte accessibile a persone non vedenti e ipovedenti in tutta Italia."
        : "National tour of tactile works from the Anteros Museum to make art accessible to blind and visually impaired people throughout Italy."
    },
    {
      id: '3',
      title: language === 'it' ? 'Sportello Lavoro e Inclusione' : 'Work and Inclusion Desk',
      objective: language === 'it'
        ? "Supportare 100 persone con disabilità visiva nell'inserimento lavorativo"
        : 'Support 100 people with visual disabilities in job placement',
      status: 'active',
      area: language === 'it' ? 'Lavoro' : 'Work',
      description: language === 'it'
        ? "Servizio di orientamento professionale, formazione su competenze trasversali e matching con aziende inclusive."
        : 'Professional orientation service, transversal skills training and matching with inclusive companies.'
    },
    {
      id: '4',
      title: language === 'it' ? 'Biblioteca Digitale 2.0' : 'Digital Library 2.0',
      objective: language === 'it'
        ? "Digitalizzare 5000 nuovi volumi e rendere accessibile l'intero catalogo online"
        : 'Digitize 5000 new volumes and make the entire catalog accessible online',
      status: 'concluded',
      area: language === 'it' ? 'Biblioteca' : 'Library',
      description: language === 'it'
        ? "Progetto concluso nel 2025 che ha portato alla digitalizzazione completa del catalogo biblioteca con formati accessibili."
        : 'Project concluded in 2025 that led to the complete digitization of the library catalog with accessible formats.'
    }
  ];
};

export const getNews = (language: Lang): NewsItem[] => {
  return [
    {
      id: '1',
      title: language === 'it' ? 'Nuova Convenzione con la Regione Emilia-Romagna' : 'New Agreement with Emilia-Romagna Region',
      date: language === 'it' ? '15 Maggio 2026' : 'May 15, 2026',
      category: language === 'it' ? 'Istituzionale' : 'Institutional',
      excerpt: language === 'it'
        ? "L'Istituto Cavazza firma una nuova convenzione con la Regione per ampliare i servizi di orientamento e mobilità su tutto il territorio regionale. Il finanziamento triennale permetterà di assumere 5 nuovi operatori specializzati."
        : 'Istituto Cavazza signs a new agreement with the Region to expand orientation and mobility services throughout the regional territory. The three-year funding will allow hiring 5 new specialized operators.',
      featured: true
    },
    {
      id: '2',
      title: language === 'it' ? 'Inaugurazione Nuovo Laboratorio di Tecnologie Assistive' : 'Inauguration of New Assistive Technologies Lab',
      date: language === 'it' ? '8 Maggio 2026' : 'May 8, 2026',
      category: language === 'it' ? 'Tecnologia' : 'Technology',
      excerpt: language === 'it'
        ? 'Apre il nuovo laboratorio dedicato alla formazione su ausili tecnologici di ultima generazione, con postazioni accessibili e software specializzati. Disponibile per corsi individuali e di gruppo.'
        : 'The new laboratory dedicated to training on latest generation assistive technologies opens, with accessible workstations and specialized software. Available for individual and group courses.'
    },
    {
      id: '3',
      title: language === 'it' ? 'Successo per la Mostra "Arte da Toccare"' : 'Success for the "Art to Touch" Exhibition',
      date: language === 'it' ? '1 Maggio 2026' : 'May 1, 2026',
      category: language === 'it' ? 'Cultura' : 'Culture',
      excerpt: language === 'it'
        ? "Oltre 500 visitatori hanno partecipato alla mostra tattile presso il Museo Anteros, confermando il successo dell'iniziativa culturale inclusiva. La mostra è stata prorogata fino a fine giugno."
        : 'Over 500 visitors participated in the tactile exhibition at the Anteros Museum, confirming the success of the inclusive cultural initiative. The exhibition has been extended until the end of June.'
    },
    {
      id: '4',
      title: language === 'it' ? 'Radio Oltre vince il Premio Inclusione Digitale 2026' : 'Radio Oltre wins the 2026 Digital Inclusion Award',
      date: language === 'it' ? '22 Aprile 2026' : 'April 22, 2026',
      category: language === 'it' ? 'Riconoscimenti' : 'Awards',
      excerpt: language === 'it'
        ? "La prima radio italiana dedicata all'inclusione riceve il prestigioso riconoscimento nazionale per l'impegno nella comunicazione accessibile e la qualità dei contenuti prodotti."
        : 'The first Italian radio dedicated to inclusion receives the prestigious national award for commitment to accessible communication and quality of content produced.'
    }
  ];
};

export const getPageContents = (language: Lang) => {
  // Minimal page content index: include hero texts and key section headings used across the site
  return [
    {
      id: 'hero-title',
      title: language === 'it' ? 'Oltre il visibile.' : 'Beyond the visible.',
      excerpt: language === 'it'
        ? "Dal 1881 l'Istituto Cavazza supporta persone non vedenti e ipovedenti a Bologna con servizi gratuiti, formazione professionale e opportunità culturali accessibili."
        : 'Since 1881 Istituto Cavazza supports blind and visually impaired people in Bologna with free services, professional training and accessible cultural opportunities.'
    },
    {
      id: 'services-title',
      title: language === 'it' ? 'I Nostri Servizi Principali' : 'Our Main Services',
      excerpt: language === 'it'
        ? 'Consulenza educativa per famiglie e scuole, visite ortottiche specializzate, supporto all\'autonomia personale e orientamento.'
        : 'Educational counselling for families and schools, specialized orthoptic visits, personal autonomy support and orientation.'
    }
  ];
};
