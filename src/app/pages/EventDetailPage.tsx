import { ArrowLeft, Calendar, Clock, MapPin, Users, Share2, Mail, Facebook, Twitter } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../components/Button';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { EventRegistrationModal } from '../components/EventRegistrationModal';
import { type Lang } from '../i18n';

interface EventDetailPageProps {
  language: Lang;
  onHomeClick: () => void;
  onBack: () => void;
}

export function EventDetailPage({ language, onHomeClick, onBack }: EventDetailPageProps) {
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  const t = (key: string) => {
    const translations: Record<string, { it: string; en: string }> = {
      'breadcrumb.eventi': { it: "Eventi", en: "Events" },
      'breadcrumb.detail': { it: "Dettaglio Evento", en: "Event Detail" },
      'back': { it: "Torna agli Eventi", en: "Back to Events" },
      'register': { it: "Iscriviti", en: "Register" },
      'share': { it: "Condividi", en: "Share" },
      'category': { it: "Categoria", en: "Category" },
      'spots': { it: "Posti Disponibili", en: "Available Spots" },
      'status.upcoming': { it: "In Arrivo", en: "Upcoming" },
      'details.title': { it: "Dettagli dell'Evento", en: "Event Details" },
      'description.title': { it: "Descrizione", en: "Description" },
      'program.title': { it: "Programma", en: "Program" },
      'requirements.title': { it: "Requisiti", en: "Requirements" },
      'contact.title': { it: "Informazioni e Contatti", en: "Information and Contacts" }
    };
    return translations[key]?.[language] || key;
  };

  // Event data di esempio
  const eventData = {
    title: language === 'it' ? 'Introduzione alla Vita con Ipovisione' : 'Introduction to Life with Low Vision',
    category: language === 'it' ? 'Orientamento' : 'Orientation',
    date: language === 'it' ? 'Martedì 10 Giugno 2026' : 'Tuesday, June 10, 2026',
    time: '14:30 - 16:30',
    location: language === 'it' ? 'Istituto Cavazza - Aula Magna' : 'Cavazza Institute - Main Hall',
    spots: 15,
    description: language === 'it'
      ? 'Corso introduttivo dedicato a persone con diagnosi recente di ipovisione. Un percorso pensato per accompagnarti nella scoperta di ausili, strategie e supporti disponibili per vivere in modo autonomo e sicuro.\n\nDurante l\'incontro, esperti del settore presenteranno le principali tecnologie assistive, tecniche di orientamento e mobilità, e strategie per affrontare le attività quotidiane. Sarà un\'occasione per conoscere altre persone che stanno affrontando lo stesso percorso e per porre domande in un ambiente accogliente e professionale.'
      : 'Introductory course dedicated to people recently diagnosed with low vision. A path designed to guide you in discovering aids, strategies and support available to live independently and safely.\n\nDuring the meeting, experts will present the main assistive technologies, orientation and mobility techniques, and strategies to deal with daily activities. It will be an opportunity to meet other people who are facing the same path and to ask questions in a welcoming and professional environment.',
    program: [
      { time: '14:30', activity: language === 'it' ? 'Accoglienza e presentazioni' : 'Welcome and introductions' },
      { time: '14:45', activity: language === 'it' ? 'Introduzione all\'ipovisione: cosa significa e come affrontarla' : 'Introduction to low vision: what it means and how to deal with it' },
      { time: '15:15', activity: language === 'it' ? 'Ausili ottici ed elettronici: panoramica delle soluzioni disponibili' : 'Optical and electronic aids: overview of available solutions' },
      { time: '15:45', activity: language === 'it' ? 'Sessione domande e risposte' : 'Q&A session' },
      { time: '16:15', activity: language === 'it' ? 'Orientamento ai servizi dell\'Istituto Cavazza' : 'Orientation to Cavazza Institute services' }
    ],
    requirements: language === 'it'
      ? 'Non sono richiesti requisiti particolari. Il corso è aperto a tutte le persone con diagnosi di ipovisione, ai loro familiari e caregiver.'
      : 'No particular requirements. The course is open to all people diagnosed with low vision, their families and caregivers.'
  };

  return (
    <div className="min-h-screen bg-background">
      <Breadcrumbs
        items={[
          { label: t('breadcrumb.eventi'), onClick: onBack },
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
            <span className="inline-block px-3 py-1 bg-accent text-accent-foreground rounded-lg text-sm font-bold">
              {t('status.upcoming')}
            </span>
            <span className="text-sm text-muted-foreground uppercase font-bold">
              {eventData.category}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-6">{eventData.title}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-primary" aria-hidden="true" />
              <span className="text-base">{eventData.date}</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary" aria-hidden="true" />
              <span className="text-base">{eventData.time}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" aria-hidden="true" />
              <span className="text-base">{eventData.location}</span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-primary" aria-hidden="true" />
              <span className="text-base">{eventData.spots} {t('spots')}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="primary" onClick={() => setShowRegistrationModal(true)}>
              {t('register')}
            </Button>
            <Button variant="outline">
              <Share2 className="w-4 h-4 mr-2" aria-hidden="true" />
              {t('share')}
            </Button>
          </div>
        </div>

        {/* Description */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{t('description.title')}</h2>
          <div className="prose max-w-none">
            {eventData.description.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-base leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Program */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{t('program.title')}</h2>
          <div className="space-y-4">
            {eventData.program.map((item, index) => (
              <div key={index} className="flex gap-4 bg-secondary p-4 rounded-xl">
                <div className="font-bold text-primary min-w-[60px]">{item.time}</div>
                <div className="text-base">{item.activity}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Requirements */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{t('requirements.title')}</h2>
          <p className="text-base leading-relaxed">{eventData.requirements}</p>
        </section>

        {/* Contact */}
        <section className="border-2 border-[#D75220] rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4">{t('contact.title')}</h2>
          <div className="space-y-3">
            <p className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#D75220]" aria-hidden="true" />
              <a href="mailto:eventi@cavazza.it" className="hover:underline text-[#D75220]">eventi@cavazza.it</a>
            </p>
            <p className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#D75220]" aria-hidden="true" />
              <span>+39 051 332090</span>
            </p>
          </div>
        </section>
      </div>

      <EventRegistrationModal
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
        eventTitle={eventData.title}
        eventType="event"
        language={language}
      />
    </div>
  );
}
