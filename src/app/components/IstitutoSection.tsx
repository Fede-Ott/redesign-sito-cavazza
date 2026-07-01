import { Calendar, Users, FileText, Building2, Handshake, TrendingUp, Home, Heart, Target, Book } from 'lucide-react';
import { Button } from './Button';
import { type Lang } from '../i18n';

interface IstitutoSectionProps {
  language: Lang;
}

export function IstitutoSection({ language }: IstitutoSectionProps) {
  const t = (key: string) => {
    const translations: Record<string, { it: string; en: string }> = {
      'section.title': { it: "L'Istituto dei Ciechi Francesco Cavazza", en: "Francesco Cavazza Institute for the Blind" },
      'intro.title': { it: "Chi Siamo", en: "Who We Are" },
      'intro.text': { it: "L'Istituto dei Ciechi Francesco Cavazza nasce a Bologna nel 1881 da un gruppo di giovani appartenenti alla nobiltà cittadina, tra i quali si segnala il Conte Francesco Cavazza. Da oltre 140 anni ci occupiamo di integrazione, formazione, riabilitazione e autonomia delle persone non vedenti e ipovedenti.", en: "The Francesco Cavazza Institute for the Blind was founded in Bologna in 1881 by a group of young members of the city's nobility, among whom Count Francesco Cavazza stands out. For over 140 years we have been involved in integration, training, rehabilitation and autonomy of blind and visually impaired people." },
      'mission.title': { it: "Missione e Valori", en: "Mission and Values" },
      'mission.intro': { it: "La nostra missione è promuovere l'autonomia, l'integrazione sociale e professionale delle persone non vedenti e ipovedenti attraverso servizi gratuiti, formazione qualificata e cultura accessibile.", en: "Our mission is to promote the autonomy, social and professional integration of blind and visually impaired people through free services, qualified training and accessible culture." },
      'value.autonomy': { it: "Autonomia", en: "Autonomy" },
      'value.autonomy.desc': { it: "Crediamo che ogni persona abbia il diritto di vivere in modo indipendente, con gli strumenti e il supporto necessari.", en: "We believe that everyone has the right to live independently, with the necessary tools and support." },
      'value.inclusion': { it: "Inclusione", en: "Inclusion" },
      'value.inclusion.desc': { it: "Lavoriamo per abbattere le barriere e costruire una società realmente inclusiva e accessibile.", en: "We work to break down barriers and build a truly inclusive and accessible society." },
      'value.innovation': { it: "Innovazione", en: "Innovation" },
      'value.innovation.desc': { it: "Sempre attenti al progresso tecnologico e scientifico, evolviamo i nostri servizi per offrire le migliori opportunità.", en: "Always attentive to technological and scientific progress, we evolve our services to offer the best opportunities." },
      'value.gratuity': { it: "Gratuità", en: "Free Access" },
      'value.gratuity.desc': { it: "Tutti i nostri servizi sono completamente gratuiti, perché crediamo che l'accessibilità sia un diritto, non un privilegio.", en: "All our services are completely free, because we believe that accessibility is a right, not a privilege." },
      'history.title': { it: "La Nostra Storia", en: "Our History" },
      'history.1881': { it: "Fondazione dell'Istituto da parte del Conte Francesco Cavazza e un gruppo di nobili bolognesi, con l'obiettivo di offrire istruzione e formazione ai non vedenti.", en: "Foundation of the Institute by Count Francesco Cavazza and a group of Bolognese nobles, with the aim of offering education and training to the blind." },
      'history.early': { it: "Nei primi decenni, l'Istituto si afferma come punto di riferimento per l'educazione e la formazione professionale dei non vedenti in Italia.", en: "In the early decades, the Institute established itself as a reference point for the education and professional training of the blind in Italy." },
      'history.modern': { it: "L'Istituto si evolve, adattandosi ai cambiamenti sociali e tecnologici. Nascono nuovi servizi: consulenza educativa, riabilitazione visiva, formazione su tecnologie assistive.", en: "The Institute evolves, adapting to social and technological changes. New services are born: educational consulting, visual rehabilitation, training on assistive technologies." },
      'history.today': { it: "Oggi l'Istituto Cavazza è un centro di eccellenza che offre servizi gratuiti a centinaia di persone ogni anno, gestisce due musei tattili unici, una biblioteca specializzata e Radio Oltre, la prima radio italiana dedicata all'inclusione.", en: "Today the Cavazza Institute is a center of excellence that offers free services to hundreds of people every year, manages two unique tactile museums, a specialized library and Radio Oltre, the first Italian radio dedicated to inclusion." },
      'organization.title': { it: "Organizzazione", en: "Organization" },
      'organization.desc': { it: "L'Istituto è una ONLUS (Organizzazione Non Lucrativa di Utilità Sociale) gestita da un team di professionisti specializzati in tiflologia, riabilitazione visiva, formazione e cultura accessibile.", en: "The Institute is a non-profit organization managed by a team of professionals specialized in typhlology, visual rehabilitation, training and accessible culture." },
      'committee.title': { it: "Comitato d'Onore", en: "Honorary Committee" },
      'committee.desc': { it: "Il Comitato d'Onore dell'Istituto Cavazza è composto da personalità del mondo istituzionale, culturale e imprenditoriale che sostengono la nostra missione e contribuiscono a dare visibilità e autorevolezza alle nostre attività.", en: "The Honorary Committee of the Cavazza Institute is composed of personalities from the institutional, cultural and business world who support our mission and contribute to giving visibility and authority to our activities." },
      'partners.title': { it: "Partner e Collaborazioni", en: "Partners and Collaborations" },
      'partners.desc': { it: "Collaboriamo con istituzioni pubbliche e private, università, enti di ricerca e associazioni per offrire servizi sempre più qualificati e innovativi.", en: "We collaborate with public and private institutions, universities, research bodies and associations to offer increasingly qualified and innovative services." },
      'partners.list': { it: "Università di Bologna, Regione Emilia-Romagna, Comune di Bologna, UICI (Unione Italiana Ciechi e Ipovedenti), Consulta tra le Antiche Istituzioni Bolognesi, Fondazioni private e aziende del territorio", en: "University of Bologna, Emilia-Romagna Region, Municipality of Bologna, UICI (Italian Union of the Blind and Visually Impaired), Consultation among Ancient Bolognese Institutions, Private foundations and local companies" },
      'transparency.title': { it: "Trasparenza e Bilanci", en: "Transparency and Reports" },
      'transparency.desc': { it: "Crediamo nella massima trasparenza verso i nostri utenti, donatori e la comunità. Pubblichiamo annualmente il bilancio sociale e rendiamo accessibili tutti i documenti amministrativi.", en: "We believe in maximum transparency towards our users, donors and the community. We publish the social report annually and make all administrative documents accessible." },
      'transparency.docs': { it: "Bilancio Sociale, Statuto dell'Istituto, Amministrazione Trasparente, Rendiconti annuali", en: "Social Report, Institute Statute, Transparent Administration, Annual Reports" },
      'spaces.title': { it: "Le Aule e gli Spazi", en: "Classrooms and Spaces" },
      'spaces.desc': { it: "L'Istituto dispone di aule didattiche attrezzate con tecnologie assistive all'avanguardia, laboratori tattili, spazi per la riabilitazione visiva e aree dedicate alla formazione professionale.", en: "The Institute has classrooms equipped with cutting-edge assistive technologies, tactile laboratories, spaces for visual rehabilitation and areas dedicated to professional training." },
      'residence.title': { it: "Residence Cavazza", en: "Cavazza Residence" },
      'residence.desc': { it: "Il Residence Cavazza offre alloggi temporanei a studenti e professionisti non vedenti e ipovedenti che partecipano ai nostri corsi di formazione o che si trovano a Bologna per motivi di studio o lavoro. Gli appartamenti sono completamente accessibili e dotati di tutti i comfort.", en: "The Cavazza Residence offers temporary accommodation to blind and visually impaired students and professionals who participate in our training courses or who are in Bologna for study or work reasons. The apartments are fully accessible and equipped with all comforts." },
      'support.title': { it: "Sostienici", en: "Support Us" },
      'support.desc': { it: "Tutti i nostri servizi sono gratuiti grazie al supporto di donatori, istituzioni e aziende che credono nella nostra missione. Il tuo contributo può fare la differenza nella vita di centinaia di persone.", en: "All our services are free thanks to the support of donors, institutions and companies who believe in our mission. Your contribution can make a difference in the lives of hundreds of people." },
      'support.how': { it: "Come puoi aiutarci", en: "How you can help us" },
      'support.donate': { it: "Donazione libera", en: "Free donation" },
      'support.5x1000': { it: "5x1000 nella dichiarazione dei redditi", en: "5x1000 in tax return" },
      'support.company': { it: "Partnership aziendale", en: "Corporate partnership" },
      'support.volunteer': { it: "Volontariato e collaborazione", en: "Volunteering and collaboration" }
    };

    return translations[key]?.[language] || key;
  };

  return (
    <section id="chi-siamo" className="bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Introduzione */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-6">{t('intro.title')}</h2>
          <div className="bg-card border-2 border-border rounded-sm p-8">
            <p className="text-xl leading-relaxed">
              {t('intro.text')}
            </p>
          </div>
        </div>

        {/* Missione e Valori */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Target className="w-8 h-8 text-primary" aria-hidden="true" />
            {t('mission.title')}
          </h2>
          <p className="text-lg leading-relaxed mb-8 max-w-4xl">
            {t('mission.intro')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card border-2 border-border rounded-sm p-6">
              <h3 className="text-xl font-bold mb-3 text-primary">{t('value.autonomy')}</h3>
              <p className="leading-relaxed">{t('value.autonomy.desc')}</p>
            </div>
            <div className="bg-card border-2 border-border rounded-sm p-6">
              <h3 className="text-xl font-bold mb-3 text-primary">{t('value.inclusion')}</h3>
              <p className="leading-relaxed">{t('value.inclusion.desc')}</p>
            </div>
            <div className="bg-card border-2 border-border rounded-sm p-6">
              <h3 className="text-xl font-bold mb-3 text-primary">{t('value.innovation')}</h3>
              <p className="leading-relaxed">{t('value.innovation.desc')}</p>
            </div>
            <div className="bg-card border-2 border-border rounded-sm p-6">
              <h3 className="text-xl font-bold mb-3 text-primary">{t('value.gratuity')}</h3>
              <p className="leading-relaxed">{t('value.gratuity.desc')}</p>
            </div>
          </div>
        </div>

        {/* Storia */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Calendar className="w-8 h-8 text-primary" aria-hidden="true" />
            {t('history.title')}
          </h2>

          <div className="relative border-l-4 border-primary pl-8 space-y-8">
            <div>
              <div className="absolute -left-3 w-6 h-6 bg-primary rounded-full"></div>
              <div className="bg-card border-2 border-border rounded-sm p-6">
                <h3 className="text-xl font-bold mb-3">1881 - La Fondazione</h3>
                <p className="leading-relaxed">{t('history.1881')}</p>
              </div>
            </div>

            <div>
              <div className="absolute -left-3 w-6 h-6 bg-primary rounded-full"></div>
              <div className="bg-card border-2 border-border rounded-sm p-6">
                <h3 className="text-xl font-bold mb-3">1881-1950 - L'Affermazione</h3>
                <p className="leading-relaxed">{t('history.early')}</p>
              </div>
            </div>

            <div>
              <div className="absolute -left-3 w-6 h-6 bg-primary rounded-full"></div>
              <div className="bg-card border-2 border-border rounded-sm p-6">
                <h3 className="text-xl font-bold mb-3">1950-2000 - L'Evoluzione</h3>
                <p className="leading-relaxed">{t('history.modern')}</p>
              </div>
            </div>

            <div>
              <div className="absolute -left-3 w-6 h-6 bg-accent rounded-full"></div>
              <div className="bg-accent text-accent-foreground border-2 border-accent rounded-sm p-6">
                <h3 className="text-xl font-bold mb-3">Oggi - Centro di Eccellenza</h3>
                <p className="leading-relaxed">{t('history.today')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Organizzazione e Comitato */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Users className="w-8 h-8 text-primary" aria-hidden="true" />
              {t('organization.title')}
            </h2>
            <div className="bg-card border-2 border-border rounded-sm p-6">
              <p className="leading-relaxed mb-4">{t('organization.desc')}</p>
              <Button variant="outline" onClick={() => window.location.href = '#team'}>
                Scopri il Team
              </Button>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Building2 className="w-8 h-8 text-primary" aria-hidden="true" />
              {t('committee.title')}
            </h2>
            <div className="bg-card border-2 border-border rounded-sm p-6">
              <p className="leading-relaxed">{t('committee.desc')}</p>
            </div>
          </div>
        </div>

        {/* Partner e Collaborazioni */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Handshake className="w-8 h-8 text-primary" aria-hidden="true" />
            {t('partners.title')}
          </h2>
          <div className="bg-card border-2 border-border rounded-sm p-6">
            <p className="leading-relaxed mb-4">{t('partners.desc')}</p>
            <div className="bg-secondary rounded-sm p-4">
              <p className="text-sm leading-relaxed font-medium">
                {t('partners.list')}
              </p>
            </div>
          </div>
        </div>

        {/* Trasparenza */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-primary" aria-hidden="true" />
            {t('transparency.title')}
          </h2>
          <div className="bg-card border-2 border-border rounded-sm p-6">
            <p className="leading-relaxed mb-6">{t('transparency.desc')}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="#bilancio-sociale" className="bg-secondary hover:bg-muted rounded-sm p-4 transition-colors no-underline block">
                <FileText className="w-6 h-6 text-primary mb-2" aria-hidden="true" />
                <h3 className="font-bold mb-1">Bilancio Sociale</h3>
                <p className="text-sm text-muted-foreground">Report annuale delle attività</p>
              </a>
              <a href="#statuto" className="bg-secondary hover:bg-muted rounded-sm p-4 transition-colors no-underline block">
                <Book className="w-6 h-6 text-primary mb-2" aria-hidden="true" />
                <h3 className="font-bold mb-1">Statuto</h3>
                <p className="text-sm text-muted-foreground">Documento costitutivo</p>
              </a>
              <a href="#amministrazione" className="bg-secondary hover:bg-muted rounded-sm p-4 transition-colors no-underline block">
                <FileText className="w-6 h-6 text-primary mb-2" aria-hidden="true" />
                <h3 className="font-bold mb-1">Amministrazione Trasparente</h3>
                <p className="text-sm text-muted-foreground">Documenti pubblici</p>
              </a>
              <a href="#rendiconti" className="bg-secondary hover:bg-muted rounded-sm p-4 transition-colors no-underline block">
                <TrendingUp className="w-6 h-6 text-primary mb-2" aria-hidden="true" />
                <h3 className="font-bold mb-1">Rendiconti Annuali</h3>
                <p className="text-sm text-muted-foreground">Bilanci economici</p>
              </a>
            </div>
          </div>
        </div>

        {/* Spazi e Residence */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Building2 className="w-8 h-8 text-primary" aria-hidden="true" />
              {t('spaces.title')}
            </h2>
            <div className="bg-card border-2 border-border rounded-sm p-6">
              <p className="leading-relaxed">{t('spaces.desc')}</p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Home className="w-8 h-8 text-primary" aria-hidden="true" />
              {t('residence.title')}
            </h2>
            <div className="bg-card border-2 border-border rounded-sm p-6">
              <p className="leading-relaxed">{t('residence.desc')}</p>
            </div>
          </div>
        </div>

        {/* Sostienici */}
        <div className="bg-accent text-accent-foreground rounded-sm p-8 border-4 border-primary">
          <div className="max-w-4xl mx-auto text-center">
            <div className="max-w-3xl mx-auto">
              <Heart className="w-16 h-16 mx-auto mb-6 text-primary" aria-hidden="true" />
              <h2 className="text-3xl font-bold mb-4">{t('support.title')}</h2>
              <p className="text-lg leading-relaxed mb-8">{t('support.desc')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-center">
              <div className="bg-primary text-primary-foreground rounded-sm p-4">
                <h3 className="font-bold mb-2">{t('support.donate')}</h3>
              </div>
              <div className="bg-primary text-primary-foreground rounded-sm p-4">
                <h3 className="font-bold mb-2">{t('support.5x1000')}</h3>
              </div>
              <div className="bg-primary text-primary-foreground rounded-sm p-4">
                <h3 className="font-bold mb-2">{t('support.company')}</h3>
              </div>
              <div className="bg-primary text-primary-foreground rounded-sm p-4">
                <h3 className="font-bold mb-2">{t('support.volunteer')}</h3>
              </div>
            </div>

            <Button
              variant="primary"
              onClick={() => window.location.href = '#sostieni'}
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-4"
            >
              Sostienici Ora
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
