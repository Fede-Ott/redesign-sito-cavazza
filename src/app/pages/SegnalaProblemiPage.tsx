import { ArrowLeft, MessageSquare } from 'lucide-react';
import { Button } from '../components/Button';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { type Lang } from '../i18n';

interface SegnalaProblemiPageProps {
  language: Lang;
  onHomeClick: () => void;
}

export function SegnalaProblemiPage({ language, onHomeClick }: SegnalaProblemiPageProps) {
  const t = (key: string) => {
    const translations: Record<string, { it: string; en: string }> = {
      'breadcrumb.segnala': { it: "Segnala un Problema", en: "Report an Issue" },
      'page.title': { it: "Segnala Problemi di Accessibilità", en: "Report Accessibility Issues" },
      'page.subtitle': { it: "Il tuo feedback ci aiuta a migliorare l'accessibilità del sito", en: "Your feedback helps us improve the site's accessibility" },
      'feedback.title': { it: "Modulo di Segnalazione", en: "Report Form" },
      'feedback.intro': { it: "Hai riscontrato difficoltà nell'utilizzo di questo sito? La tua segnalazione è preziosa per aiutarci a migliorare l'accessibilità. Compila il modulo qui sotto e ti risponderemo al più presto.", en: "Did you experience difficulties using this site? Your report is valuable in helping us improve accessibility. Fill out the form below and we will respond as soon as possible." },
      'feedback.name': { it: "Nome (opzionale)", en: "Name (optional)" },
      'feedback.email': { it: "Email *", en: "Email *" },
      'feedback.issue': { it: "Descrivi il problema riscontrato *", en: "Describe the issue you encountered *" },
      'feedback.issue-placeholder': { it: "Esempio: Non riesco a navigare il menu principale con la tastiera...", en: "Example: I cannot navigate the main menu with the keyboard..." },
      'feedback.tech': { it: "Tecnologie assistive utilizzate (opzionale)", en: "Assistive technologies used (optional)" },
      'feedback.tech-placeholder': { it: "Esempio: Screen reader NVDA, tastiera, ingrandimento schermo...", en: "Example: NVDA screen reader, keyboard, screen magnification..." },
      'feedback.page': { it: "Pagina o sezione del sito (opzionale)", en: "Page or site section (optional)" },
      'feedback.page-placeholder': { it: "Esempio: Home, Servizi, Formazione...", en: "Example: Home, Services, Training..." },
      'feedback.submit': { it: "Invia Segnalazione", en: "Submit Report" },
      'feedback.success': { it: "Grazie per la tua segnalazione! Ti risponderemo al più presto.", en: "Thank you for your report! We will respond as soon as possible." },
      'privacy.title': { it: "Informativa Privacy", en: "Privacy Notice" },
      'privacy.text': { it: "I dati raccolti tramite questo modulo saranno utilizzati esclusivamente per migliorare l'accessibilità del sito e per rispondere alle tue segnalazioni. Non saranno condivisi con terze parti.", en: "Data collected through this form will be used exclusively to improve site accessibility and to respond to your reports. It will not be shared with third parties." },
      'contact.title': { it: "Altri Metodi di Contatto", en: "Other Contact Methods" },
      'contact.text': { it: "Preferisci contattarci in altro modo? Puoi inviarci un'email a:", en: "Prefer to contact us another way? You can send us an email at:" },
      'contact.phone': { it: "Oppure chiamarci al:", en: "Or call us at:" },
      'back-home': { it: "Torna alla Home", en: "Back to Home" }
    };
    return translations[key]?.[language] || key;
  };

  return (
    <div className="min-h-screen bg-background">
      <Breadcrumbs
        items={[{ label: t('breadcrumb.segnala') }]}
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

        {/* Feedback Form */}
        <section className="border-2 border-[#135DCD] p-6 rounded-xl mb-8">
          <h2 className="text-2xl font-bold mb-6">
            {t('feedback.title')}
          </h2>
          <p className="leading-relaxed mb-6 text-base">
            {t('feedback.intro')}
          </p>

          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              alert(t('feedback.success'));
            }}
          >
            <div>
              <label htmlFor="feedback-name" className="block mb-2 font-medium">
                {t('feedback.name')}
              </label>
              <input
                type="text"
                id="feedback-name"
                name="name"
                className="w-full min-h-[48px] px-4 py-3 bg-background text-foreground border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label htmlFor="feedback-email" className="block mb-2 font-medium">
                {t('feedback.email')}
              </label>
              <input
                type="email"
                id="feedback-email"
                name="email"
                required
                className="w-full min-h-[48px] px-4 py-3 bg-background text-foreground border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                aria-required="true"
              />
            </div>

            <div>
              <label htmlFor="feedback-issue" className="block mb-2 font-medium">
                {t('feedback.issue')}
              </label>
              <textarea
                id="feedback-issue"
                name="issue"
                rows={6}
                required
                className="w-full px-4 py-3 bg-background text-foreground border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-y"
                aria-required="true"
                placeholder={t('feedback.issue-placeholder')}
              />
            </div>

            <div>
              <label htmlFor="feedback-assistive-tech" className="block mb-2 font-medium">
                {t('feedback.tech')}
              </label>
              <input
                type="text"
                id="feedback-assistive-tech"
                name="assistiveTech"
                className="w-full min-h-[48px] px-4 py-3 bg-background text-foreground border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder={t('feedback.tech-placeholder')}
              />
            </div>

            <div>
              <label htmlFor="feedback-page" className="block mb-2 font-medium">
                {t('feedback.page')}
              </label>
              <input
                type="text"
                id="feedback-page"
                name="page"
                className="w-full min-h-[48px] px-4 py-3 bg-background text-foreground border-2 border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder={t('feedback.page-placeholder')}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full md:w-auto !bg-[#135DCD] !text-white hover:!bg-[#0F4FB0] min-h-[48px] px-8"
            >
              {t('feedback.submit')}
            </Button>
          </form>
        </section>

        {/* Privacy Notice */}
        <section className="border-2 border-[#135DCD] p-6 rounded-xl mb-8">
          <h2 className="text-lg font-bold mb-3">
            {t('privacy.title')}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t('privacy.text')}
          </p>
        </section>

        {/* Alternative Contact Methods */}
        <section className="border-2 border-[#D75220] p-6 rounded-xl">
          <h2 className="text-lg font-bold mb-3">
            {t('contact.title')}
          </h2>
          <p className="leading-relaxed mb-4">
            {t('contact.text')}
          </p>
          <p className="mb-3">
            <strong>Email:</strong>{' '}
            <a href="mailto:accessibilita@cavazza.it" className="text-[#D75220] hover:underline">
              accessibilita@cavazza.it
            </a>
          </p>
          <p>
            <strong>{t('contact.phone')}</strong>{' '}
            <a href="tel:+390512826311" className="text-[#D75220] hover:underline">
              +39 051 28 26 311
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
