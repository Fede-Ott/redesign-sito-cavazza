import { ArrowLeft, Calendar, Tag, Share2, Mail, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Button } from '../components/Button';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { type Lang } from '../i18n';

interface NewsDetailPageProps {
  language: Lang;
  onHomeClick: () => void;
  onBack: () => void;
}

export function NewsDetailPage({ language, onHomeClick, onBack }: NewsDetailPageProps) {
  const t = (key: string) => {
    const translations: Record<string, { it: string; en: string }> = {
      'breadcrumb.notizie': { it: "Notizie", en: "News" },
      'breadcrumb.detail': { it: "Dettaglio Notizia", en: "News Detail" },
      'back': { it: "Torna alle Notizie", en: "Back to News" },
      'share': { it: "Condividi", en: "Share" },
      'share.facebook': { it: "Condividi su Facebook", en: "Share on Facebook" },
      'share.twitter': { it: "Condividi su Twitter", en: "Share on Twitter" },
      'share.linkedin': { it: "Condividi su LinkedIn", en: "Share on LinkedIn" },
      'share.email': { it: "Condividi via Email", en: "Share via Email" },
      'category': { it: "Categoria", en: "Category" },
      'related.title': { it: "Notizie Correlate", en: "Related News" },
      'contact.title': { it: "Per maggiori informazioni", en: "For more information" }
    };
    return translations[key]?.[language] || key;
  };

  // News data di esempio
  const newsData = {
    title: language === 'it'
      ? 'Nuova Convenzione con la Regione Emilia-Romagna per i Servizi di Orientamento'
      : 'New Agreement with Emilia-Romagna Region for Orientation Services',
    category: language === 'it' ? 'Istituzionale' : 'Institutional',
    date: language === 'it' ? '15 Maggio 2026' : 'May 15, 2026',
    author: language === 'it' ? 'Ufficio Comunicazione Istituto Cavazza' : 'Cavazza Institute Communication Office',
    content: language === 'it' ? `
L'Istituto dei Ciechi Francesco Cavazza è lieto di annunciare la firma di una nuova convenzione triennale con la Regione Emilia-Romagna per l'ampliamento e il potenziamento dei servizi di orientamento e mobilità su tutto il territorio regionale.

## Un traguardo importante

La convenzione, del valore di 2,5 milioni di euro, rappresenta un investimento significativo nella qualità della vita delle persone con disabilità visiva della nostra regione. Grazie a questo accordo, sarà possibile ampliare notevolmente l'offerta di servizi, raggiungendo più persone e offrendo percorsi di autonomia personalizzati e di alta qualità.

## Cosa prevede la convenzione

La nuova convenzione prevede diverse linee di intervento strategiche:

### Ampliamento dei Servizi di Orientamento e Mobilità

Verranno attivati 12 nuovi centri territoriali distribuiti su tutto il territorio regionale, garantendo una copertura capillare e riducendo significativamente i tempi di attesa per l'accesso ai servizi. Ogni centro sarà dotato di personale specializzato e di strumentazione all'avanguardia per la valutazione e l'addestramento all'orientamento e mobilità.

### Formazione e Aggiornamento Professionale

Un programma strutturato di formazione continua coinvolgerà oltre 50 professionisti tra istruttori di orientamento e mobilità, terapisti della riabilitazione visiva e assistenti sociali. La formazione includerà l'utilizzo delle più recenti tecnologie assistive, metodologie innovative di insegnamento e aggiornamenti sulle best practice internazionali.

### Progetti Innovativi

Saranno sviluppati progetti pilota che integrano tecnologie innovative come GPS tattili, applicazioni di navigazione assistita e sistemi di realtà aumentata audio per migliorare l'autonomia negli spostamenti. Particolare attenzione sarà dedicata alla sperimentazione di soluzioni per l'orientamento indoor in luoghi pubblici come ospedali, stazioni e centri commerciali.

### Supporto alle Famiglie

Verranno organizzati percorsi di accompagnamento per familiari e caregiver, con workshop informativi, gruppi di sostegno e sessioni individuali di consulenza. L'obiettivo è creare una rete di supporto solida che accompagni le persone con disabilità visiva nel loro percorso verso l'autonomia.

## Le dichiarazioni

"Questa convenzione rappresenta un riconoscimento importante del lavoro svolto dall'Istituto Cavazza in oltre 140 anni di attività", ha dichiarato il Presidente Elio De Leo. "Grazie alla collaborazione con la Regione Emilia-Romagna, potremo portare i nostri servizi a un numero sempre maggiore di persone, contribuendo concretamente alla loro autonomia e qualità della vita."

L'Assessore regionale alle Politiche Sociali ha sottolineato come "questo accordo si inserisce nella più ampia strategia regionale per l'inclusione e l'autonomia delle persone con disabilità. L'esperienza e la professionalità dell'Istituto Cavazza sono garanzia di servizi di eccellenza per tutti i cittadini della nostra regione."

## Tempistiche e prossimi passi

La convenzione entrerà ufficialmente in vigore dal 1° giugno 2026. Nei prossimi mesi verranno definiti nel dettaglio i protocolli operativi, individuate le sedi dei nuovi centri territoriali e avviate le procedure di selezione del personale.

Entro settembre 2026 è prevista l'apertura dei primi 4 centri pilota, seguita dall'attivazione degli altri 8 centri entro marzo 2027. Parallelamente, partiranno i programmi di formazione professionale e i progetti innovativi.

## Come accedere ai servizi

Le persone interessate ai servizi di orientamento e mobilità potranno rivolgersi direttamente all'Istituto Cavazza o ai centri territoriali una volta attivi. Sarà inoltre disponibile un numero verde regionale dedicato per informazioni e prenotazioni.

Maggiori dettagli sui servizi, le modalità di accesso e le sedi dei centri territoriali saranno pubblicati sul sito dell'Istituto Cavazza e sui canali ufficiali della Regione Emilia-Romagna nelle prossime settimane.

## Un impegno per il futuro

Questa convenzione rappresenta solo l'inizio di un percorso ambizioso che vede l'Istituto Cavazza e la Regione Emilia-Romagna impegnati fianco a fianco per costruire una società più inclusiva e accessibile. L'obiettivo condiviso è quello di garantire a ogni persona con disabilità visiva gli strumenti e il supporto necessari per vivere una vita autonoma, ricca di opportunità e pienamente integrata nella comunità.
    ` : `
The Francesco Cavazza Institute for the Blind is pleased to announce the signing of a new three-year agreement with the Emilia-Romagna Region for the expansion and strengthening of orientation and mobility services throughout the regional territory.

## An important milestone

The agreement, worth 2.5 million euros, represents a significant investment in the quality of life of people with visual disabilities in our region. Thanks to this agreement, it will be possible to significantly expand the service offer, reaching more people and offering personalized and high-quality autonomy paths.

## What the agreement provides

The new agreement provides for several strategic intervention lines:

### Expansion of Orientation and Mobility Services

12 new territorial centers will be activated throughout the regional territory, ensuring widespread coverage and significantly reducing waiting times for access to services. Each center will be equipped with specialized personnel and cutting-edge equipment for evaluation and orientation and mobility training.

### Professional Training and Update

A structured continuous training program will involve over 50 professionals including orientation and mobility instructors, visual rehabilitation therapists and social workers. The training will include the use of the latest assistive technologies, innovative teaching methodologies and updates on international best practices.

### Innovative Projects

Pilot projects will be developed that integrate innovative technologies such as tactile GPS, assisted navigation applications and audio augmented reality systems to improve autonomy in travel. Particular attention will be paid to experimenting with solutions for indoor orientation in public places such as hospitals, stations and shopping centers.

### Family Support

Accompaniment paths will be organized for families and caregivers, with informative workshops, support groups and individual counseling sessions. The goal is to create a solid support network that accompanies people with visual disabilities in their journey towards autonomy.

## Statements

"This agreement represents an important recognition of the work done by the Cavazza Institute in over 140 years of activity," said President Elio De Leo. "Thanks to the collaboration with the Emilia-Romagna Region, we will be able to bring our services to an increasing number of people, contributing concretely to their autonomy and quality of life."

The Regional Councillor for Social Policies stressed that "this agreement is part of the broader regional strategy for the inclusion and autonomy of people with disabilities. The experience and professionalism of the Cavazza Institute are a guarantee of excellent services for all citizens of our region."

## Timelines and next steps

The agreement will officially enter into force from June 1, 2026. In the coming months, operational protocols will be defined in detail, locations for new territorial centers identified and personnel selection procedures initiated.

By September 2026, the first 4 pilot centers are expected to open, followed by the activation of the other 8 centers by March 2027. At the same time, professional training programs and innovative projects will start.

## How to access services

People interested in orientation and mobility services can contact the Cavazza Institute directly or the territorial centers once active. A dedicated regional toll-free number will also be available for information and reservations.

More details on services, access methods and locations of territorial centers will be published on the Cavazza Institute website and on the official channels of the Emilia-Romagna Region in the coming weeks.

## A commitment for the future

This agreement represents only the beginning of an ambitious path that sees the Cavazza Institute and the Emilia-Romagna Region committed side by side to build a more inclusive and accessible society. The shared goal is to guarantee every person with visual disabilities the tools and support necessary to live an autonomous life, rich in opportunities and fully integrated into the community.
    `
  };

  return (
    <div className="min-h-screen bg-background">
      <Breadcrumbs
        items={[
          { label: t('breadcrumb.notizie'), onClick: onBack },
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
        <article className="mb-8">
          <div className="mb-4">
            <span className="inline-flex items-center gap-2 text-sm text-muted-foreground uppercase font-bold">
              <Tag className="w-4 h-4" aria-hidden="true" />
              {newsData.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-4">{newsData.title}</h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" aria-hidden="true" />
              {newsData.date}
            </span>
            <span>•</span>
            <span>{newsData.author}</span>
          </div>

          {/* Share buttons */}
          <div className="flex flex-wrap gap-3 pb-6 border-b-2 border-[#135DCD]">
            <Button variant="outline" className="text-sm border-[#135DCD] text-[#135DCD] hover:bg-[#EDF4FF]">
              <Facebook className="w-4 h-4 mr-2" aria-hidden="true" />
              Facebook
            </Button>
            <Button variant="outline" className="text-sm border-[#135DCD] text-[#135DCD] hover:bg-[#EDF4FF]">
              <Twitter className="w-4 h-4 mr-2" aria-hidden="true" />
              Twitter
            </Button>
            <Button variant="outline" className="text-sm border-[#135DCD] text-[#135DCD] hover:bg-[#EDF4FF]">
              <Linkedin className="w-4 h-4 mr-2" aria-hidden="true" />
              LinkedIn
            </Button>
            <Button variant="outline" className="text-sm border-[#135DCD] text-[#135DCD] hover:bg-[#EDF4FF]">
              <Mail className="w-4 h-4 mr-2" aria-hidden="true" />
              Email
            </Button>
          </div>

          {/* Content */}
          <div className="prose max-w-none mt-8">
            {newsData.content.split('\n\n').map((paragraph, index) => {
              // Check if it's a heading
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              } else if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-xl font-bold mt-6 mb-3">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              } else if (paragraph.trim() === '') {
                return null;
              } else {
                return (
                  <p key={index} className="text-base leading-relaxed mb-4">
                    {paragraph}
                  </p>
                );
              }
            })}
          </div>
        </article>

        {/* Contact Section */}
        <section className="border-2 border-[#D75220] rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4">{t('contact.title')}</h2>
          <div className="space-y-3">
            <p className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#D75220]" aria-hidden="true" />
              <a href="mailto:comunicazione@cavazza.it" className="hover:underline text-[#D75220]">
                comunicazione@cavazza.it
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#D75220]" aria-hidden="true" />
              <span>+39 051 332090</span>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
