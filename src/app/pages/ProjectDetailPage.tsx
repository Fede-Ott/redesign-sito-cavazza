import { ArrowLeft, Briefcase, Calendar, Users, Target, TrendingUp, Share2, Mail } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../components/Button';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { EventRegistrationModal } from '../components/EventRegistrationModal';
import { type Lang } from '../i18n';

interface ProjectDetailPageProps {
  language: Lang;
  onHomeClick: () => void;
  onBack: () => void;
}

export function ProjectDetailPage({ language, onHomeClick, onBack }: ProjectDetailPageProps) {
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);

  const t = (key: string) => {
    const translations: Record<string, { it: string; en: string }> = {
      'breadcrumb.progetti': { it: "Progetti", en: "Projects" },
      'breadcrumb.detail': { it: "Dettaglio Progetto", en: "Project Detail" },
      'back': { it: "Torna ai Progetti", en: "Back to Projects" },
      'waitlist': { it: "Iscriviti alla Lista d'Attesa", en: "Join Waiting List" },
      'share': { it: "Condividi", en: "Share" },
      'status.active': { it: "In Corso", en: "Active" },
      'duration': { it: "Durata", en: "Duration" },
      'participants': { it: "Partecipanti", en: "Participants" },
      'area': { it: "Area", en: "Area" },
      'objective.title': { it: "Obiettivo", en: "Objective" },
      'description.title': { it: "Descrizione Dettagliata", en: "Detailed Description" },
      'activities.title': { it: "Attività Principali", en: "Main Activities" },
      'results.title': { it: "Risultati Attesi", en: "Expected Results" },
      'partners.title': { it: "Partner", en: "Partners" },
      'contact.title': { it: "Informazioni e Contatti", en: "Information and Contacts" },
      'waitlist.cta': { it: "Interessato al progetto?", en: "Interested in the project?" },
      'waitlist.desc': { it: "Iscriviti alla lista d'attesa per essere informato su sviluppi futuri e opportunità di partecipazione.", en: "Join the waiting list to be informed about future developments and participation opportunities." }
    };
    return translations[key]?.[language] || key;
  };

  // Project data di esempio
  const projectData = {
    title: language === 'it' ? 'Accessibilità Museale Universale' : 'Universal Museum Accessibility',
    area: language === 'it' ? 'Cultura Accessibile' : 'Accessible Culture',
    duration: language === 'it' ? 'Gennaio 2026 - Dicembre 2027' : 'January 2026 - December 2027',
    participants: '12 musei partner',
    objective: language === 'it'
      ? 'Rendere i musei italiani completamente accessibili a persone con disabilità visiva attraverso percorsi tattili, audioguide e tecnologie innovative.'
      : 'Make Italian museums fully accessible to people with visual disabilities through tactile paths, audio guides and innovative technologies.',
    description: language === 'it'
      ? 'Il progetto "Accessibilità Museale Universale" nasce dalla collaborazione tra l\'Istituto Cavazza e 12 musei italiani con l\'obiettivo di rendere il patrimonio culturale accessibile a tutti.\n\nAttraverso l\'implementazione di percorsi tattili, la creazione di audioguide specializzate e l\'utilizzo di tecnologie innovative come la realtà aumentata audio e le applicazioni mobili accessibili, il progetto mira a creare un\'esperienza museale inclusiva e coinvolgente.\n\nIl progetto include anche la formazione del personale museale sulle tematiche dell\'accessibilità e della disabilità visiva, garantendo un\'accoglienza professionale e consapevole.'
      : 'The "Universal Museum Accessibility" project was born from the collaboration between the Cavazza Institute and 12 Italian museums with the aim of making cultural heritage accessible to all.\n\nThrough the implementation of tactile paths, the creation of specialized audio guides and the use of innovative technologies such as audio augmented reality and accessible mobile applications, the project aims to create an inclusive and engaging museum experience.\n\nThe project also includes training of museum staff on accessibility and visual disability issues, ensuring professional and aware reception.',
    activities: [
      language === 'it' ? 'Progettazione e realizzazione di percorsi tattili in 12 musei' : 'Design and creation of tactile paths in 12 museums',
      language === 'it' ? 'Sviluppo di audioguide multilivello con contenuti approfonditi' : 'Development of multi-level audio guides with in-depth content',
      language === 'it' ? 'Creazione di app mobile accessibile per la visita autonoma' : 'Creation of accessible mobile app for autonomous visit',
      language === 'it' ? 'Formazione del personale museale (80 ore totali)' : 'Training of museum staff (80 hours total)',
      language === 'it' ? 'Organizzazione di eventi culturali accessibili mensili' : 'Organization of monthly accessible cultural events',
      language === 'it' ? 'Valutazione e monitoraggio continuo dell\'accessibilità' : 'Continuous evaluation and monitoring of accessibility'
    ],
    results: [
      language === 'it' ? '12 musei completamente accessibili entro fine 2027' : '12 fully accessible museums by end 2027',
      language === 'it' ? '5000+ visite guidate accessibili all\'anno' : '5000+ accessible guided tours per year',
      language === 'it' ? '200 operatori formati sulle tematiche di accessibilità' : '200 operators trained on accessibility issues',
      language === 'it' ? 'App mobile scaricata da 10.000+ utenti' : 'Mobile app downloaded by 10,000+ users',
      language === 'it' ? 'Modello replicabile per altri musei italiani' : 'Replicable model for other Italian museums'
    ],
    partners: [
      'Fondazione Musei Civici di Venezia',
      'Pinacoteca di Brera - Milano',
      'Museo Egizio - Torino',
      'Galleria degli Uffizi - Firenze',
      'MAXXI - Roma',
      'Museo Archeologico Nazionale - Napoli'
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Breadcrumbs
        items={[
          { label: t('breadcrumb.progetti'), onClick: onBack },
          { label: t('breadcrumb.detail') }
        ]}
        onHomeClick={onHomeClick}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 -ml-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
          {t('back')}
        </Button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-block px-3 py-1 bg-primary text-primary-foreground rounded-lg text-sm font-bold">
              {t('status.active')}
            </span>
            <span className="text-sm text-muted-foreground uppercase font-bold">
              {projectData.area}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6">{projectData.title}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-primary" aria-hidden="true" />
              <div>
                <div className="text-xs text-muted-foreground font-bold uppercase">{t('duration')}</div>
                <div className="text-base">{projectData.duration}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-primary" aria-hidden="true" />
              <div>
                <div className="text-xs text-muted-foreground font-bold uppercase">{t('participants')}</div>
                <div className="text-base">{projectData.participants}</div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="outline">
              <Share2 className="w-4 h-4 mr-2" aria-hidden="true" />
              {t('share')}
            </Button>
          </div>
        </div>

        {/* Objective */}
        <section className="mb-8 border-2 border-[#D75220] rounded-xl p-6">
          <div className="flex items-start gap-3 mb-3">
            <Target className="w-6 h-6 flex-shrink-0 text-[#D75220]" aria-hidden="true" />
            <h2 className="text-2xl font-bold">{t('objective.title')}</h2>
          </div>
          <p className="text-base leading-relaxed">{projectData.objective}</p>
        </section>

        {/* Description */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{t('description.title')}</h2>
          <div className="prose max-w-none">
            {projectData.description.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-base leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Activities */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{t('activities.title')}</h2>
          <ul className="space-y-3 list-none">
            {projectData.activities.map((activity, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-accent font-bold text-xl" aria-hidden="true">✓</span>
                <span className="text-base">{activity}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Results */}
        <section className="mb-8">
          <div className="flex items-start gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-primary flex-shrink-0" aria-hidden="true" />
            <h2 className="text-2xl font-bold">{t('results.title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projectData.results.map((result, index) => (
              <div key={index} className="p-4 rounded-xl border-2 border-[#135DCD]">
                <p className="text-base font-medium">{result}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Partners */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{t('partners.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {projectData.partners.map((partner, index) => (
              <div key={index} className="flex items-center gap-2 text-base">
                <Briefcase className="w-4 h-4 text-primary" aria-hidden="true" />
                <span>{partner}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Waitlist CTA */}
        <section className="rounded-xl p-6 mb-8" style={{ backgroundColor: '#EDF4FF' }}>
          <h2 className="text-2xl font-bold mb-3">{t('waitlist.cta')}</h2>
          <p className="text-base leading-relaxed mb-6">{t('waitlist.desc')}</p>
          <Button
            variant="primary"
            onClick={() => setShowWaitlistModal(true)}
            className="!bg-[#135DCD] !text-white hover:!bg-[#0F4FB0]"
          >
            {t('waitlist')}
          </Button>
        </section>

        {/* Contact */}
        <section className="border-2 border-[#D75220] rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4">{t('contact.title')}</h2>
          <div className="space-y-3">
            <p className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#D75220]" aria-hidden="true" />
              <a href="mailto:progetti@cavazza.it" className="hover:underline text-[#D75220]">progetti@cavazza.it</a>
            </p>
            <p className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#D75220]" aria-hidden="true" />
              <span>+39 051 332090</span>
            </p>
          </div>
        </section>
      </div>

      <EventRegistrationModal
        isOpen={showWaitlistModal}
        onClose={() => setShowWaitlistModal(false)}
        eventTitle={projectData.title}
        eventType="project"
        language={language}
      />
    </div>
  );
}
