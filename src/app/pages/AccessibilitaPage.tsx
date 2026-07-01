import { ArrowLeft, Accessibility } from 'lucide-react';
import { Button } from '../components/Button';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { type Lang } from '../i18n';

interface AccessibilitaPageProps {
  language: Lang;
  onHomeClick: () => void;
  onNavigate?: (page: string) => void;
}

export function AccessibilitaPage({ language, onHomeClick, onNavigate }: AccessibilitaPageProps) {
  const t = (key: string) => {
    const translations: Record<string, { it: string; en: string }> = {
      'breadcrumb.accessibilita': { it: "Dichiarazione di Accessibilità", en: "Accessibility Statement" },
      'page.title': { it: "Dichiarazione di Accessibilità", en: "Accessibility Statement" },
      'page.subtitle': { it: "Il nostro impegno per un sito web accessibile a tutti", en: "Our commitment to a website accessible to all" },
      'a11y.compliance': { it: "Conformità agli Standard", en: "Standards Compliance" },
      'a11y.intro': { it: "Questo sito web è stato progettato seguendo le linee guida WCAG 2.1 livello AAA per garantire la massima accessibilità a tutti gli utenti, indipendentemente dalle loro abilità o tecnologie assistive utilizzate.", en: "This website has been designed following WCAG 2.1 Level AAA guidelines to ensure maximum accessibility for all users, regardless of their abilities or assistive technologies used." },
      'a11y.features-title': { it: "Caratteristiche di Accessibilità", en: "Accessibility Features" },
      'a11y.feature.contrast': { it: "Contrasto minimo 7:1 per testi e icone", en: "Minimum 7:1 contrast for text and icons" },
      'a11y.feature.font': { it: "Font leggibili e dimensioni adattabili", en: "Readable fonts and adaptable sizes" },
      'a11y.feature.modes': { it: "Modalità ad alto contrasto e testo ingrandito", en: "High contrast and enlarged text modes" },
      'a11y.feature.focus': { it: "Indicatori di focus visibili per navigazione da tastiera", en: "Visible focus indicators for keyboard navigation" },
      'a11y.feature.targets': { it: "Target minimi di 44x44px per touch e click", en: "Minimum 44x44px targets for touch and click" },
      'a11y.feature.keyboard': { it: "Completa navigabilità da tastiera", en: "Full keyboard navigability" },
      'a11y.feature.skip': { it: "Link di skip per saltare al contenuto principale", en: "Skip links to jump to main content" },
      'a11y.feature.semantic': { it: "HTML semantico e struttura logica", en: "Semantic HTML and logical structure" },
      'a11y.feature.alt': { it: "Testi alternativi per tutte le immagini", en: "Alternative text for all images" },
      'a11y.feature.motion': { it: "Rispetto preferenze movimento ridotto", en: "Respect for reduced motion preferences" },
      'a11y.feature.color': { it: "Informazioni non veicolate solo tramite colore", en: "Information not conveyed through color alone" },
      'a11y.last-review': { it: "Ultima verifica:", en: "Last review:" },
      'a11y.review-date': { it: "Gennaio 2025", en: "January 2025" },
      'a11y.standard': { it: "Standard:", en: "Standard:" },
      'a11y.standard-level': { it: "WCAG 2.1 Livello AAA", en: "WCAG 2.1 Level AAA" },
      'a11y.commitment.title': { it: "Il Nostro Impegno", en: "Our Commitment" },
      'a11y.commitment.text': { it: "L'Istituto dei Ciechi Francesco Cavazza si impegna a mantenere e migliorare costantemente l'accessibilità di questo sito web. Monitoriamo regolarmente il sito per identificare e risolvere eventuali problemi di accessibilità.", en: "The Francesco Cavazza Institute for the Blind is committed to maintaining and continuously improving the accessibility of this website. We regularly monitor the site to identify and resolve any accessibility issues." },
      'a11y.testing.title': { it: "Test e Verifica", en: "Testing and Verification" },
      'a11y.testing.text': { it: "Il sito è stato testato con i principali screen reader (NVDA, JAWS, VoiceOver) e con diverse tecnologie assistive. Effettuiamo verifiche periodiche sia automatizzate che manuali per garantire il rispetto degli standard.", en: "The site has been tested with major screen readers (NVDA, JAWS, VoiceOver) and various assistive technologies. We perform periodic automated and manual checks to ensure compliance with standards." },
      'a11y.limitations.title': { it: "Limitazioni Conosciute", en: "Known Limitations" },
      'a11y.limitations.text': { it: "Nonostante i nostri sforzi, alcune aree del sito potrebbero non essere completamente accessibili. Stiamo lavorando attivamente per risolvere queste limitazioni.", en: "Despite our efforts, some areas of the site may not be fully accessible. We are actively working to resolve these limitations." },
      'a11y.contact.title': { it: "Segnala un Problema", en: "Report an Issue" },
      'a11y.contact.text': { it: "Se incontri difficoltà nell'accedere a qualsiasi contenuto del sito, ti invitiamo a segnalarcelo utilizzando il nostro modulo di feedback accessibilità.", en: "If you experience difficulty accessing any content on the site, please report it using our accessibility feedback form." },
      'a11y.report-button': { it: "Segnala Problema di Accessibilità", en: "Report Accessibility Issue" },
      'back-home': { it: "Torna alla Home", en: "Back to Home" }
    };
    return translations[key]?.[language] || key;
  };

  return (
    <div className="min-h-screen bg-background">
      <Breadcrumbs
        items={[{ label: t('breadcrumb.accessibilita') }]}
        onHomeClick={onHomeClick}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{t('page.title')}</h1>
          <p className="text-base text-muted-foreground">
            {t('page.subtitle')}
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Compliance Section */}
          <section className="border-2 border-[#135DCD] p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-6">
              {t('a11y.compliance')}
            </h2>
            <p className="leading-relaxed mb-6 text-base">
              {t('a11y.intro')}
            </p>

            <h3 className="text-lg font-bold mb-3">
              {t('a11y.features-title')}
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-none">
              <li className="flex items-start gap-3">
                <span className="text-[#D75220] font-bold text-xl" aria-hidden="true">✓</span>
                <span>{t('a11y.feature.contrast')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D75220] font-bold text-xl" aria-hidden="true">✓</span>
                <span>{t('a11y.feature.font')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D75220] font-bold text-xl" aria-hidden="true">✓</span>
                <span>{t('a11y.feature.modes')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D75220] font-bold text-xl" aria-hidden="true">✓</span>
                <span>{t('a11y.feature.focus')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D75220] font-bold text-xl" aria-hidden="true">✓</span>
                <span>{t('a11y.feature.targets')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D75220] font-bold text-xl" aria-hidden="true">✓</span>
                <span>{t('a11y.feature.keyboard')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D75220] font-bold text-xl" aria-hidden="true">✓</span>
                <span>{t('a11y.feature.skip')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D75220] font-bold text-xl" aria-hidden="true">✓</span>
                <span>{t('a11y.feature.semantic')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D75220] font-bold text-xl" aria-hidden="true">✓</span>
                <span>{t('a11y.feature.alt')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D75220] font-bold text-xl" aria-hidden="true">✓</span>
                <span>{t('a11y.feature.motion')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D75220] font-bold text-xl" aria-hidden="true">✓</span>
                <span>{t('a11y.feature.color')}</span>
              </li>
            </ul>

            <div className="mt-6 pt-6 border-t-2 border-border">
              <p className="leading-relaxed text-muted-foreground">
                <strong>{t('a11y.last-review')}</strong> {t('a11y.review-date')}<br />
                <strong>{t('a11y.standard')}</strong> {t('a11y.standard-level')}
              </p>
            </div>
          </section>

          {/* Commitment Section */}
          <section className="border-2 border-[#135DCD] p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-6">
              {t('a11y.commitment.title')}
            </h2>
            <p className="leading-relaxed text-base">
              {t('a11y.commitment.text')}
            </p>
          </section>

          {/* Testing Section */}
          <section className="border-2 border-[#135DCD] p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-6">
              {t('a11y.testing.title')}
            </h2>
            <p className="leading-relaxed text-base">
              {t('a11y.testing.text')}
            </p>
          </section>

          {/* Limitations Section */}
          <section className="border-2 border-[#135DCD] p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-6">
              {t('a11y.limitations.title')}
            </h2>
            <p className="leading-relaxed text-base">
              {t('a11y.limitations.text')}
            </p>
          </section>

          {/* Contact CTA */}
          <section className="border-2 border-[#D75220] p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-6">
              {t('a11y.contact.title')}
            </h2>
            <p className="leading-relaxed mb-6 text-base">
              {t('a11y.contact.text')}
            </p>
            <Button
              variant="primary"
              onClick={() => onNavigate?.('segnala-problemi')}
              className="!bg-[#135DCD] !text-white hover:!bg-[#0F4FB0]"
            >
              {t('a11y.report-button')}
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
}
