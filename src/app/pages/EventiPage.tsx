import { useState } from 'react';
import { Calendar, Briefcase, Newspaper, ArrowLeft, MapPin, Clock, Users, Tag, Mail, Facebook, Twitter, Youtube, ExternalLink } from 'lucide-react';
import { Button } from '../components/Button';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { NewsletterNotification } from '../components/NewsletterNotification';
import { EventRegistrationModal } from '../components/EventRegistrationModal';
import { EventDetailPage } from './EventDetailPage';
import { ProjectDetailPage } from './ProjectDetailPage';
import { NewsDetailPage } from './NewsDetailPage';
import { type Lang } from '../i18n';
import { getEvents, getProjects, getNews } from '../data/contentIndex';

interface EventiPageProps {
  language: Lang;
  onHomeClick: () => void;
  defaultTab?: string;
}

type TabType = 'eventi' | 'progetti' | 'notizie';
type EventStatus = 'upcoming' | 'ongoing' | 'past';
type ProjectStatus = 'active' | 'concluded';

export function EventiPage({ language, onHomeClick, defaultTab = 'eventi' }: EventiPageProps) {
  const [activeTab, setActiveTab] = useState<TabType>(defaultTab as TabType);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'recent' | 'relevant'>('recent');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [showNewsletterNotification, setShowNewsletterNotification] = useState(false);
  const [currentView, setCurrentView] = useState<'list' | 'event-detail' | 'project-detail' | 'news-detail'>('list');
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [registrationEventTitle, setRegistrationEventTitle] = useState('');
  const [registrationEventType, setRegistrationEventType] = useState<'event' | 'project'>('event');

  const t = (key: string) => {
    const translations: Record<string, { it: string; en: string }> = {
      'breadcrumb.eventi': { it: "Iniziative", en: "Initiatives" },
      'page.title': { it: "Progetti, Iniziative e Notizie", en: "Projects, Initiatives and News" },
      'page.subtitle': { it: "Resta aggiornato su tutte le iniziative, attività e novità dell'Istituto Cavazza", en: "Stay updated on all initiatives, activities and news from Istituto Cavazza" },

      'tab.eventi': { it: "Eventi", en: "Events" },
      'tab.progetti': { it: "Progetti", en: "Projects" },
      'tab.notizie': { it: "Notizie", en: "News" },

      'featured.title': { it: "In Evidenza", en: "Featured" },

      'search.placeholder': { it: "Cerca...", en: "Search..." },
      'filters.toggle': { it: "Filtri", en: "Filters" },
      'filters.category': { it: "Categoria", en: "Category" },
      'filters.all': { it: "Tutte", en: "All" },
      'sort.recent': { it: "Più Recenti", en: "Most Recent" },
      'sort.relevant': { it: "Più Rilevanti", en: "Most Relevant" },

      'eventi.section.title': { it: "Eventi in Programma", en: "Upcoming Events" },
      'progetti.section.title': { it: "Progetti Attivi", en: "Active Projects" },
      'notizie.section.title': { it: "Ultime Notizie", en: "Latest News" },

      'archive.eventi': { it: "Archivio Eventi", en: "Events Archive" },
      'archive.progetti': { it: "Archivio Progetti", en: "Projects Archive" },
      'archive.notizie': { it: "Archivio Notizie", en: "News Archive" },

      'status.upcoming': { it: "In Programma", en: "Upcoming" },
      'status.ongoing': { it: "In Corso", en: "Ongoing" },
      'status.past': { it: "Concluso", en: "Past" },
      'status.active': { it: "Attivo", en: "Active" },
      'status.concluded': { it: "Concluso", en: "Concluded" },

      'event.details': { it: "Dettagli Evento", en: "Event Details" },
      'event.register': { it: "Iscriviti all'Evento", en: "Register for Event" },
      'event.download': { it: "Scarica Programma", en: "Download Program" },
      'project.discover': { it: "Scopri il Progetto", en: "Discover Project" },
      'news.read': { it: "Leggi la Notizia", en: "Read News" },
      'loadmore': { it: "Carica Altri", en: "Load More" },

      'newsletter.title': { it: "Resta Aggiornato", en: "Stay Updated" },
      'newsletter.desc': { it: "Iscriviti alla newsletter per ricevere aggiornamenti su eventi, progetti e notizie dell'Istituto Cavazza.", en: "Subscribe to the newsletter to receive updates on events, projects and news from Istituto Cavazza." },
      'newsletter.email': { it: "La tua email", en: "Your email" },
      'newsletter.subscribe': { it: "Iscriviti", en: "Subscribe" },

      'contact.title': { it: "Contatti Redazionali", en: "Editorial Contacts" },
      'contact.desc': { it: "Per informazioni su eventi, progetti o per segnalare iniziative:", en: "For information on events, projects or to report initiatives:" },

      'social.title': { it: "Seguici sui Social", en: "Follow Us on Social" },
      'social.desc': { it: "Resta connesso con la nostra community", en: "Stay connected with our community" }
    };
    return translations[key]?.[language] || key;
  };

  // Handler functions
  const handleEventRegister = (eventTitle: string) => {
    setRegistrationEventTitle(eventTitle);
    setRegistrationEventType('event');
    setShowRegistrationModal(true);
  };

  const handleProjectRegister = (projectTitle: string) => {
    setRegistrationEventTitle(projectTitle);
    setRegistrationEventType('project');
    setShowRegistrationModal(true);
  };

  const handleShowEventDetail = () => {
    setCurrentView('event-detail');
  };

  const handleShowProjectDetail = () => {
    setCurrentView('project-detail');
  };

  const handleShowNewsDetail = () => {
    setCurrentView('news-detail');
  };

  const handleBackToList = () => {
    setCurrentView('list');
  };

  // Render detail pages
  if (currentView === 'event-detail') {
    return <EventDetailPage language={language} onHomeClick={onHomeClick} onBack={handleBackToList} />;
  }

  if (currentView === 'project-detail') {
    return <ProjectDetailPage language={language} onHomeClick={onHomeClick} onBack={handleBackToList} />;
  }

  if (currentView === 'news-detail') {
    return <NewsDetailPage language={language} onHomeClick={onHomeClick} onBack={handleBackToList} />;
  }

  const eventiData = getEvents(language as any);

  const progettiData = getProjects(language as any);

  const notizieData = getNews(language as any);

  const getFeaturedContent = () => {
    const featuredEvent = eventiData.find(e => e.featured);
    const featuredProject = progettiData.find(p => p.featured);
    const featuredNews = notizieData.find(n => n.featured);

    return { featuredEvent, featuredProject, featuredNews };
  };

  const { featuredEvent, featuredProject, featuredNews } = getFeaturedContent();

  const getStatusBadge = (status?: string) => {
    if (!status) {
      return null;
    }

    const colors: Record<string, string> = {
      upcoming: 'bg-blue-600',
      ongoing: 'bg-green-600',
      past: 'bg-gray-600',
      active: 'bg-green-600',
      concluded: 'bg-gray-600'
    };

    const labelKey = `status.${status}`;
    const label = t(labelKey);
    const colorClass = colors[status] || 'bg-gray-600';

    return (
      <span className={`${colorClass} inline-flex items-center px-2 py-1 rounded-md text-xs font-bold text-white`}>
        {label === labelKey ? status : label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[{ label: t('breadcrumb.eventi') }]}
        onHomeClick={onHomeClick}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{t('page.title')}</h1>
          <p className="text-base opacity-90 mb-6 max-w-3xl">
            {t('page.subtitle')}
          </p>

          {/* Tabs */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('eventi')}
              data-active={activeTab === 'eventi'}
              className={`event-tab-button flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all min-h-[48px] border-2 ${
                activeTab === 'eventi'
                  ? 'bg-[#D75220] border-[#D75220] text-white'
                  : 'bg-transparent border-white text-white hover:bg-white/10'
              }`}
            >
              <Calendar className="w-5 h-5" aria-hidden="true" />
              {t('tab.eventi')}
            </button>
            <button
              onClick={() => setActiveTab('progetti')}
              data-active={activeTab === 'progetti'}
              className={`event-tab-button flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all min-h-[48px] border-2 ${
                activeTab === 'progetti'
                  ? 'bg-[#D75220] border-[#D75220] text-white'
                  : 'bg-transparent border-white text-white hover:bg-white/10'
              }`}
            >
              <Briefcase className="w-5 h-5" aria-hidden="true" />
              {t('tab.progetti')}
            </button>
            <button
              onClick={() => setActiveTab('notizie')}
              data-active={activeTab === 'notizie'}
              className={`event-tab-button flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all min-h-[48px] border-2 ${
                activeTab === 'notizie'
                  ? 'bg-[#D75220] border-[#D75220] text-white'
                  : 'bg-transparent border-white text-white hover:bg-white/10'
              }`}
            >
              <Newspaper className="w-5 h-5" aria-hidden="true" />
              {t('tab.notizie')}
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Content Sections based on active tab */}
        {activeTab === 'eventi' && (
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Calendar className="w-6 h-6 text-primary" aria-hidden="true" />
              {t('eventi.section.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Featured event — larger card with orange outline */}
              {featuredEvent && (
                <div
                  key={featuredEvent.id}
                  className="md:col-span-2 bg-transparent border-2 border-[#D75220] p-8 hover:shadow-lg transition-shadow rounded-[9px] relative"
                >
                  <div className="absolute top-4 right-4 flex flex-col items-end gap-1">
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-bold text-white" style={{ backgroundColor: '#D75220' }}>
                      {language === 'it' ? 'In evidenza' : 'Featured'}
                    </span>
                    {getStatusBadge(featuredEvent.status)}
                  </div>
                  <div className="flex items-start justify-between mb-3 pr-28">
                    <div className="flex items-center gap-2">
                      <Tag className="w-5 h-5 text-primary" aria-hidden="true" />
                      <span className="font-bold text-sm text-muted-foreground uppercase">{featuredEvent.category}</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 pr-28">{featuredEvent.title}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-muted-foreground">
                    <div className="space-y-2">
                      <p className="flex items-center gap-2">
                        <Clock className="w-4 h-4" aria-hidden="true" />
                        {featuredEvent.date} • {featuredEvent.time}
                      </p>
                      <p className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" aria-hidden="true" />
                        {featuredEvent.location}
                      </p>
                      {featuredEvent.spots && (
                        <p className="flex items-center gap-2">
                          <Users className="w-4 h-4" aria-hidden="true" />
                          {featuredEvent.spots} {language === 'it' ? 'posti disponibili' : 'spots available'}
                        </p>
                      )}
                    </div>
                    <p className="leading-relaxed text-foreground">{featuredEvent.description}</p>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="primary" onClick={() => handleEventRegister(featuredEvent.title)}>{t('event.register')}</Button>
                    <Button variant="outline" onClick={handleShowEventDetail}>{t('event.details')}</Button>
                  </div>
                </div>
              )}
              {eventiData.filter(e => !e.featured).map((evento) => (
                <div key={evento.id} className="bg-transparent border-2 border-border p-6 hover:shadow-lg transition-shadow rounded-[9px] relative">
                  <div className="absolute top-4 right-4">
                    {getStatusBadge(evento.status)}
                  </div>
                  <div className="flex items-start justify-between mb-3 pr-28">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-primary" aria-hidden="true" />
                      <span className="font-bold text-sm text-muted-foreground uppercase">{evento.category}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{evento.title}</h3>
                  <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <Clock className="w-4 h-4" aria-hidden="true" />
                      {evento.date} • {evento.time}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" aria-hidden="true" />
                      {evento.location}
                    </p>
                    {evento.spots && (
                      <p className="flex items-center gap-2">
                        <Users className="w-4 h-4" aria-hidden="true" />
                        {evento.spots} {language === 'it' ? 'posti disponibili' : 'spots available'}
                      </p>
                    )}
                  </div>
                  <p className="leading-relaxed mb-4 text-sm">{evento.description}</p>
                  <div className="flex gap-3">
                    <Button variant="primary" className="flex-1" onClick={() => handleEventRegister(evento.title)}>{t('event.register')}</Button>
                    <Button variant="outline" onClick={handleShowEventDetail}>{t('event.details')}</Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Archive Eventi */}
            <div className="bg-[#EEF4FF] border border-[#D6E4FF] text-foreground p-8 text-center rounded-[9px]">
              <h3 className="text-2xl font-bold mb-4">{t('archive.eventi')}</h3>
              <p className="mb-6 max-w-2xl mx-auto">
                {language === 'it'
                  ? 'Consulta l\'archivio completo degli eventi passati e scopri le attività che abbiamo organizzato negli anni.'
                  : 'Browse the complete archive of past events and discover the activities we have organized over the years.'}
              </p>
              <Button variant="primary" className="bg-[#135DCD] hover:bg-[#0F4FB0] text-white border-0">
                {language === 'it' ? 'Vai all\'Archivio' : 'Go to Archive'}
              </Button>
            </div>
          </section>
        )}

        {activeTab === 'progetti' && (
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Briefcase className="w-6 h-6 text-primary" aria-hidden="true" />
              {t('progetti.section.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Featured project — larger card with orange outline */}
              {featuredProject && (
                <div
                  key={featuredProject.id}
                  className="md:col-span-2 bg-transparent border-2 border-[#D75220] p-8 hover:shadow-lg transition-shadow rounded-[9px] relative"
                >
                  <div className="absolute top-4 right-4 flex flex-col items-end gap-1">
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-bold text-white" style={{ backgroundColor: '#D75220' }}>
                      {language === 'it' ? 'In evidenza' : 'Featured'}
                    </span>
                    {getStatusBadge(featuredProject.status)}
                  </div>
                  <div className="flex items-center gap-2 mb-3 pr-28">
                    <Tag className="w-5 h-5 text-primary" aria-hidden="true" />
                    <span className="font-bold text-sm text-muted-foreground uppercase">{featuredProject.area}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 pr-28">{featuredProject.title}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm font-bold text-muted-foreground mb-1">{language === 'it' ? 'Obiettivo:' : 'Objective:'}</p>
                      <p className="leading-relaxed">{featuredProject.objective}</p>
                    </div>
                    <p className="leading-relaxed text-muted-foreground">{featuredProject.description}</p>
                  </div>
                  <Button variant="primary" onClick={handleShowProjectDetail}>{t('project.discover')}</Button>
                </div>
              )}
              {progettiData.filter(p => !p.featured).map((progetto) => (
                <div key={progetto.id} className="bg-transparent border-2 border-border p-6 hover:shadow-lg transition-shadow rounded-[9px] relative">
                  <div className="absolute top-4 right-4">
                    {getStatusBadge(progetto.status)}
                  </div>
                  <div className="flex items-start justify-between mb-3 pr-28">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-primary" aria-hidden="true" />
                      <span className="font-bold text-sm text-muted-foreground uppercase">{progetto.area}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{progetto.title}</h3>
                  <div className="mb-4">
                    <p className="text-sm font-bold text-muted-foreground mb-1">
                      {language === 'it' ? 'Obiettivo:' : 'Objective:'}
                    </p>
                    <p className="text-sm leading-relaxed">{progetto.objective}</p>
                  </div>
                  <p className="leading-relaxed mb-4 text-sm">{progetto.description}</p>
                  <Button variant="primary" className="w-full" onClick={handleShowProjectDetail}>{t('project.discover')}</Button>
                </div>
              ))}
            </div>

            {/* Archive Progetti */}
            <div className="bg-[#EEF4FF] border border-[#D6E4FF] text-foreground p-8 text-center rounded-[9px]">
              <h3 className="text-2xl font-bold mb-4">{t('archive.progetti')}</h3>
              <p className="mb-6 max-w-2xl mx-auto">
                {language === 'it'
                  ? 'Scopri tutti i progetti conclusi e i risultati raggiunti dall\'Istituto Cavazza nel corso degli anni.'
                  : 'Discover all completed projects and results achieved by Istituto Cavazza over the years.'}
              </p>
              <Button variant="primary" className="bg-[#135DCD] hover:bg-[#0F4FB0] text-white border-0">
                {language === 'it' ? 'Vai all\'Archivio' : 'Go to Archive'}
              </Button>
            </div>
          </section>
        )}

        {activeTab === 'notizie' && (
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Newspaper className="w-6 h-6 text-primary" aria-hidden="true" />
              {t('notizie.section.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {/* Featured news — full-width with orange outline */}
              {featuredNews && (
                <div
                  key={featuredNews.id}
                  className="md:col-span-2 lg:col-span-3 bg-transparent border-2 border-[#D75220] p-8 hover:shadow-lg transition-shadow rounded-[9px] relative"
                >
                  <span
                    className="absolute top-4 right-4 inline-flex items-center px-2 py-1 rounded-md text-xs font-bold"
                    style={{ backgroundColor: '#D75220', color: '#ffffff' }}
                  >
                    {language === 'it' ? 'In evidenza' : 'Featured'}
                  </span>
                  <div className="flex items-center gap-2 mb-2 pr-20">
                    <Tag className="w-5 h-5 text-primary" aria-hidden="true" />
                    <span className="font-bold text-sm text-muted-foreground uppercase">{featuredNews.category}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{featuredNews.date}</p>
                  <h3 className="text-2xl font-bold mb-4 pr-20">{featuredNews.title}</h3>
                  <p className="leading-relaxed mb-6 max-w-4xl">{featuredNews.excerpt}</p>
                  <div className="flex gap-3">
                    <Button variant="primary" onClick={handleShowNewsDetail}>{t('news.read')}</Button>
                    <Button variant="outline">{language === 'it' ? 'Condividi' : 'Share'}</Button>
                  </div>
                </div>
              )}
              {notizieData.filter(n => !n.featured).map((notizia) => (
                <div key={notizia.id} className="bg-transparent border-2 border-border p-6 hover:shadow-lg transition-shadow rounded-[9px] relative">
                  <span className="absolute top-4 right-4 px-3 py-1 rounded-lg text-sm font-bold bg-blue-600 text-white">
                    {notizia.category}
                  </span>
                  <div className="flex items-center gap-2 mb-3 pr-28">
                    <Tag className="w-4 h-4 text-primary" aria-hidden="true" />
                    <span className="font-bold text-sm text-muted-foreground uppercase">{notizia.category}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{notizia.date}</p>
                  <h3 className="text-xl font-bold mb-3">{notizia.title}</h3>
                  <p className="leading-relaxed mb-4 text-sm">{notizia.excerpt}</p>
                  <Button variant="outline" className="w-full" onClick={handleShowNewsDetail}>{t('news.read')}</Button>
                </div>
              ))}
            </div>

            {/* Archive Notizie */}
            <div className="bg-[#EEF4FF] border border-[#D6E4FF] text-foreground p-8 text-center rounded-[9px]">
              <h3 className="text-2xl font-bold mb-4">{t('archive.notizie')}</h3>
              <p className="mb-6 max-w-2xl mx-auto">
                {language === 'it'
                  ? 'Leggi tutte le notizie e gli aggiornamenti dall\'Istituto Cavazza negli anni passati.'
                  : 'Read all news and updates from Istituto Cavazza in past years.'}
              </p>
              <Button variant="primary" className="bg-[#135DCD] hover:bg-[#0F4FB0] text-white border-0">
                {language === 'it' ? 'Vai all\'Archivio' : 'Go to Archive'}
              </Button>
            </div>
          </section>
        )}

        {/* Newsletter Section */}
        <section className="mb-6 mt-16">
          <div className="max-w-3xl mx-auto text-center">
            <Mail className="w-12 h-12 mx-auto mb-4 text-[#D75220]" aria-hidden="true" />
            <h2 className="text-2xl font-bold mb-6">{t('newsletter.title')}</h2>
            <p className="text-base leading-relaxed mb-6 text-muted-foreground">
              {t('newsletter.desc')}
            </p>
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => {
              e.preventDefault();
              setShowNewsletterNotification(true);
              setNewsletterEmail('');
            }}>
              <input
                type="email"
                placeholder={t('newsletter.email')}
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 bg-transparent border-2 border-[#D75220] rounded-lg min-h-[48px]"
              />
              <Button type="submit" variant="primary" className="min-w-[150px] !bg-[#D75220] hover:!bg-[#BF461A] border-0 !text-white">
                {t('newsletter.subscribe')}
              </Button>
            </form>
          </div>
        </section>

        {/* Contact and Social */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact */}
          <div className="bg-transparent border-2 border-[#D75220] p-6 rounded-[9px]">
            <h3 className="text-xl font-bold mb-3">{t('contact.title')}</h3>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              {t('contact.desc')}
            </p>
            <a href="mailto:eventi@cavazza.it" className="text-[#D75220] hover:text-[#BF461A] font-bold flex items-center gap-2">
              <Mail className="w-5 h-5" aria-hidden="true" />
              eventi@cavazza.it
            </a>
          </div>

          {/* Social */}
          <div className="bg-transparent border-2 border-[#D75220] p-6 rounded-[9px]">
            <h3 className="text-xl font-bold mb-3">{t('social.title')}</h3>
            <p className="leading-relaxed mb-4 text-muted-foreground">
              {t('social.desc')}
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.youtube.com/channel/UCV0p8o7G_1UO_T1giK7F83Q"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center bg-[#D75220] text-white hover:bg-[#BF461A] rounded-lg transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="https://x.com/istitutocavazza"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center bg-[#D75220] text-white hover:bg-[#BF461A] rounded-lg transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="https://www.facebook.com/istitutocavazza/timeline/"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center bg-[#D75220] text-white hover:bg-[#BF461A] rounded-lg transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <NewsletterNotification
        isVisible={showNewsletterNotification}
        onClose={() => setShowNewsletterNotification(false)}
        language={language}
      />

      <EventRegistrationModal
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
        eventTitle={registrationEventTitle}
        eventType={registrationEventType}
        language={language}
      />
    </div>
  );
}
