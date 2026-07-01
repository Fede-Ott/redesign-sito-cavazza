import { useState } from 'react';
import { HelpCircle, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from './Button';
import { useTranslation, type Lang } from '../i18n';

interface ServiceLink {
  label: string;
  page: 'servizi' | 'formazione' | 'eventi' | 'home';
  section?: string;
}

interface QuizOption {
  id: string;
  label: string;
  description: string;
  recommendation: {
    title: string;
    services: ServiceLink[];
    nextSteps: string;
  };
}

const quizOptions: QuizOption[] = [
  {
    id: 'new-diagnosis',
    label: 'Ho ricevuto da poco una diagnosi',
    description: 'Sono all\'inizio del mio percorso e cerco orientamento',
    recommendation: {
      title: 'Ti consigliamo di iniziare con:',
      services: [
        { label: 'Consulenza Educativa personalizzata', page: 'servizi' },
        { label: 'Centro Ipovisione per ausili visivi', page: 'servizi' },
        { label: 'Eventi: Introduzione alla Vita con Ipovisione', page: 'eventi' },
        { label: 'Supporto psicologico e gruppo di mutuo aiuto', page: 'servizi' }
      ],
      nextSteps: 'Contattaci per una prima consulenza gratuita. Ti aiuteremo a capire quali ausili e servizi possono migliorare la tua autonomia.'
    }
  },
  {
    id: 'student',
    label: 'Sono uno studente (o genitore di uno studente)',
    description: 'Cerco supporto per l\'istruzione e l\'apprendimento',
    recommendation: {
      title: 'Servizi educativi per studenti:',
      services: [
        { label: 'Consulenza per insegnanti e scuole', page: 'servizi' },
        { label: 'Tecnologie assistive ICT', page: 'servizi' },
        { label: 'Biblioteca: materiali didattici accessibili', page: 'home', section: '#biblioteca-dettaglio' },
        { label: 'Orientamento scolastico', page: 'servizi' }
      ],
      nextSteps: 'Offriamo supporto personalizzato per studenti di ogni età. Contattaci per un piano educativo su misura.'
    }
  },
  {
    id: 'professional',
    label: 'Cerco formazione professionale',
    description: 'Voglio acquisire competenze lavorative',
    recommendation: {
      title: 'Percorsi di formazione professionale:',
      services: [
        { label: 'Corso Centralinisti-Operatori dell\'Informazione', page: 'formazione' },
        { label: 'Formazione su Ausili Tecnologici', page: 'formazione' },
        { label: 'Ausilioteca: valutazione ausili', page: 'servizi' },
        { label: 'Supporto al Lavoro', page: 'servizi' }
      ],
      nextSteps: 'I nostri corsi professionali sono riconosciuti e gratuiti. Scopri le prossime date di iscrizione.'
    }
  },
  {
    id: 'autonomy',
    label: 'Voglio migliorare la mia autonomia quotidiana',
    description: 'Cerco strumenti per la vita di tutti i giorni',
    recommendation: {
      title: 'Servizi per l\'autonomia personale:',
      services: [
        { label: 'Orientamento e Mobilità', page: 'servizi' },
        { label: 'Eventi: Cucinare Senza Guardare', page: 'eventi' },
        { label: 'Vita Indipendente', page: 'servizi' },
        { label: 'Tecnologie per la Casa', page: 'servizi' }
      ],
      nextSteps: 'Organizziamo workshop pratici per migliorare l\'autonomia nelle attività quotidiane. Iscriviti ai prossimi corsi gratuiti.'
    }
  },
  {
    id: 'caregiver',
    label: 'Sono un familiare o caregiver',
    description: 'Assisto una persona non vedente o con ipovisione',
    recommendation: {
      title: 'Risorse per caregiver e familiari:',
      services: [
        { label: 'Eventi: Gruppo di supporto per familiari', page: 'eventi' },
        { label: 'Servizi per Famiglie', page: 'servizi' },
        { label: 'Consulenza educativa', page: 'servizi' },
        { label: 'Informazioni su ausili e tecnologie', page: 'servizi' }
      ],
      nextSteps: 'Comprendiamo le sfide dei caregiver. Partecipa ai nostri incontri di supporto e formazione.'
    }
  },
  {
    id: 'professional-healthcare',
    label: 'Sono un professionista (educatore, medico, assistente sociale)',
    description: 'Cerco formazione o collaborazione professionale',
    recommendation: {
      title: 'Servizi per professionisti:',
      services: [
        { label: 'Formazione con crediti ECM', page: 'formazione' },
        { label: 'Consulenze per Scuole', page: 'servizi' },
        { label: 'Materiali e risorse professionali', page: 'home', section: '#biblioteca-dettaglio' },
        { label: 'Contatti per Partnership', page: 'home', section: '#contatti' }
      ],
      nextSteps: 'Offriamo formazione certificata per professionisti. Contattaci per i prossimi corsi ECM.'
    }
  }
];

interface PersonalizedQuizProps {
  language: Lang;
  onNavigate: (page: 'home' | 'istituto' | 'servizi' | 'formazione' | 'eventi', sectionId?: string) => void;
}

export function PersonalizedQuiz({ language, onNavigate }: PersonalizedQuizProps) {
  const t = useTranslation(language);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = () => {
    if (selectedOption) {
      setShowResult(true);
      announceToScreenReader('Risultati del quiz caricati');

      // Scroll al titolo del quiz con offset per header fisso
      setTimeout(() => {
        const quizElement = document.getElementById('personalized-quiz');
        if (quizElement) {
          const elementPosition = quizElement.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - 200; // Offset per header + controlli rapidi
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  };

  const handleReset = () => {
    setSelectedOption(null);
    setShowResult(false);
    announceToScreenReader('Quiz reimpostato');

    // Scroll al titolo del quiz con offset per header fisso
    setTimeout(() => {
      const quizElement = document.getElementById('personalized-quiz');
      if (quizElement) {
        const elementPosition = quizElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - 200; // Offset per header + controlli rapidi
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
  };

  const selectedQuiz = quizOptions.find(opt => opt.id === selectedOption);

  if (showResult && selectedQuiz) {
    return (
      <div
        className="rounded-xl p-8"
        style={{ backgroundColor: '#FFDED2', color: '#000000' }}
        role="region"
        aria-labelledby="quiz-result-title"
      >
        <div className="flex items-start gap-4 mb-6">
          <CheckCircle className="w-8 h-8 flex-shrink-0" style={{ color: '#D75220' }} aria-hidden="true" />
          <div>
            <h3 id="quiz-result-title" className="text-2xl font-bold mb-2" style={{ color: '#000000' }}>
              {selectedQuiz.recommendation.title}
            </h3>
          </div>
        </div>

        <ul className="space-y-3 mb-6 list-none">
          {selectedQuiz.recommendation.services.map((service, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="font-bold text-xl" style={{ color: '#D75220' }} aria-hidden="true">✓</span>
              <button
                onClick={() => onNavigate(service.page, service.section)}
                className="text-lg text-left underline transition-colors"
                style={{ color: '#000000' }}
              >
                {service.label}
              </button>
            </li>
          ))}
        </ul>

        <p className="text-lg leading-relaxed mb-6 p-4 rounded-xl" style={{ border: '2px solid #D75220', color: '#000000', backgroundColor: 'transparent' }}>
          <strong>Prossimi passi:</strong> {selectedQuiz.recommendation.nextSteps}
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => document.getElementById('contatti')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3 rounded-xl font-bold min-h-[44px] transition-opacity hover:opacity-90 text-white"
            style={{ backgroundColor: '#D75220' }}
          >
            Contattaci Ora
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-3 rounded-xl font-bold min-h-[44px] transition-opacity hover:opacity-90 bg-transparent"
            style={{ border: '2px solid #D75220', color: '#D75220' }}
          >
            Riprova il Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="p-0"
      role="region"
      aria-labelledby="quiz-title"
    >
      <div className="mb-6">
        <h2 id="quiz-title" className="text-2xl font-bold mb-2">
          {t('quiz.title')}
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          {t('quiz.subtitle')}
        </p>
      </div>

      <fieldset className="border-0 p-0 m-0">
        <legend className="sr-only">Seleziona la tua situazione</legend>
        <div className="space-y-3">
          {quizOptions.map((option) => (
            <label
              key={option.id}
              className={`block p-5 border-2 cursor-pointer transition-all ${selectedOption === option.id ? 'border-primary bg-primary/10 shadow-md' : 'border-border hover:border-primary/50 hover:bg-secondary' } rounded-[9px]`}
            >
              <input
                type="radio"
                name="quiz-option"
                value={option.id}
                checked={selectedOption === option.id}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="sr-only"
              />
              <div className="flex items-start gap-3">
                <div
                  className={`
                    quiz-option-dot w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1
                    ${selectedOption === option.id
                      ? 'border-[#D75220] bg-[#D75220]'
                      : 'border-[#D75220] bg-white'
                    }
                  `}
                  aria-hidden="true"
                >
                  {selectedOption === option.id && (
                    <div className="quiz-option-dot-inner w-2.5 h-2.5 rounded-full bg-white" />
                  )}
                </div>
                <div>
                  <div className="font-bold text-lg mb-1">{option.label}</div>
                  
                </div>
              </div>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 pt-6 border-t-2 border-border">
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={!selectedOption}
          className="w-full sm:w-auto font-bold"
        >
          Vedi Consigli Personalizzati
          <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
