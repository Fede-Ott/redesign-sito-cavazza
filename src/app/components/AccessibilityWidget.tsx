import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  Accessibility,
  Type,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sun,
  Moon,
  Contrast,
  MousePointer,
  BookOpen,
  Bold,
  Link2,
  AlignLeft,
  PauseCircle,
  Keyboard,
  Volume2,
  X,
  ImageOff,
  Ear
} from 'lucide-react';

type AccessibilitySetting = {
  textSize: number;
  lineHeight: number;
  letterSpacing: number;
  contrastMode: 'normal' | 'high' | 'inverted' | 'dark';
  saturation: number;
  bigCursor: boolean;
  readingGuide: boolean;
  boldText: boolean;
  highlightLinks: boolean;
  dyslexiaFont: boolean;
  hideImages: boolean;
  stopAnimations: boolean;
  screenReader: boolean;
};

const DEFAULT_SETTINGS: AccessibilitySetting = {
  textSize: 100,
  lineHeight: 100,
  letterSpacing: 100,
  contrastMode: 'normal',
  saturation: 100,
  bigCursor: false,
  readingGuide: false,
  boldText: false,
  highlightLinks: false,
  dyslexiaFont: false,
  hideImages: false,
  stopAnimations: false,
  screenReader: false
};

/**
 * Widget Accessibilità completo ispirato a UserWay
 * - Floating button sempre accessibile
 * - Menu completo con 15+ controlli
 * - Salvataggio preferenze in localStorage
 * - Applicazione dinamica degli stili
 */
export function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySetting>(DEFAULT_SETTINGS);
  const [language, setLanguage] = useState<'it' | 'en'>('it');
  const screenReaderActiveRef = useRef(false);
  const keyboardNavigationActiveRef = useRef(false);

  useEffect(() => {
    // Carica preferenze salvate
    const saved = localStorage.getItem('accessibility-settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSettings(parsed);
        applySettings(parsed);
      } catch (e) {
        console.error('Errore nel caricamento delle preferenze:', e);
      }
    }

    // Carica lingua salvata
    const savedLang = localStorage.getItem('site-language') as 'it' | 'en';
    if (savedLang) {
      setLanguage(savedLang);
      document.documentElement.setAttribute('lang', savedLang);
    }

    // Ascolta cambiamenti dalla toolbar
    const handleAccessibilityChange = () => {
      const saved = localStorage.getItem('accessibility-settings');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setSettings(parsed);
        } catch (e) {
          console.error('Errore:', e);
        }
      }
    };

    window.addEventListener('accessibilitychange', handleAccessibilityChange);

    // Cleanup quando il componente viene smontato
    return () => {
      disableScreenReader();
      disableReadingGuide();
      window.removeEventListener('accessibilitychange', handleAccessibilityChange);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        keyboardNavigationActiveRef.current = true;
      }
    };

    const handlePointerInput = () => {
      keyboardNavigationActiveRef.current = false;
    };

    window.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('mousedown', handlePointerInput, true);
    window.addEventListener('pointerdown', handlePointerInput, true);
    window.addEventListener('touchstart', handlePointerInput, true);

    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener('mousedown', handlePointerInput, true);
      window.removeEventListener('pointerdown', handlePointerInput, true);
      window.removeEventListener('touchstart', handlePointerInput, true);
    };
  }, []);

  const applySettings = (newSettings: AccessibilitySetting) => {
    const root = document.documentElement;

    // Text size - applica solo se diverso da 100%
    if (newSettings.textSize !== 100) {
      root.style.setProperty('--accessibility-text-scale', `${newSettings.textSize / 100}`);
      root.classList.add('accessibility-text-scaled');
    } else {
      root.style.removeProperty('--accessibility-text-scale');
      root.classList.remove('accessibility-text-scaled');
    }

    // Line height - applica solo se diverso da 100%
    if (newSettings.lineHeight !== 100) {
      root.style.setProperty('--accessibility-line-height', `${newSettings.lineHeight / 100}`);
      root.classList.add('accessibility-line-height');
    } else {
      root.style.removeProperty('--accessibility-line-height');
      root.classList.remove('accessibility-line-height');
    }

    // Letter spacing - applica solo se diverso da 100%
    if (newSettings.letterSpacing !== 100) {
      root.style.setProperty('--accessibility-letter-spacing', `${(newSettings.letterSpacing - 100) / 100}em`);
      root.classList.add('accessibility-letter-spacing');
    } else {
      root.style.removeProperty('--accessibility-letter-spacing');
      root.classList.remove('accessibility-letter-spacing');
    }

    // Contrast modes - applica solo se diverso da normal
    root.classList.remove('contrast-high', 'contrast-inverted', 'accessibility-dark');
    if (newSettings.contrastMode === 'high') {
      root.classList.add('contrast-high');
    } else if (newSettings.contrastMode === 'inverted') {
      root.classList.add('contrast-inverted');
    } else if (newSettings.contrastMode === 'dark') {
      root.classList.add('accessibility-dark');
    }

    // Saturation - applica solo se diverso da 100%
    if (newSettings.saturation !== 100) {
      root.style.setProperty('--accessibility-saturation', `${newSettings.saturation}%`);
      root.classList.add('accessibility-saturation');
    } else {
      root.style.removeProperty('--accessibility-saturation');
      root.classList.remove('accessibility-saturation');
    }

    // Big cursor
    if (newSettings.bigCursor) {
      root.classList.add('accessibility-big-cursor');
    } else {
      root.classList.remove('accessibility-big-cursor');
    }

    // Reading guide
    if (newSettings.readingGuide) {
      enableReadingGuide();
    } else {
      disableReadingGuide();
    }

    // Bold text
    if (newSettings.boldText) {
      root.classList.add('accessibility-bold-text');
    } else {
      root.classList.remove('accessibility-bold-text');
    }

    // Highlight links
    if (newSettings.highlightLinks) {
      root.classList.add('accessibility-highlight-links');
    } else {
      root.classList.remove('accessibility-highlight-links');
    }

    // Dyslexia font
    if (newSettings.dyslexiaFont) {
      root.classList.add('accessibility-dyslexia-font');
    } else {
      root.classList.remove('accessibility-dyslexia-font');
    }

    // Hide images
    if (newSettings.hideImages) {
      root.classList.add('accessibility-hide-images');
    } else {
      root.classList.remove('accessibility-hide-images');
    }

    // Text align
    if (newSettings.textAlign !== 'left') {
      root.style.setProperty('--accessibility-text-align', newSettings.textAlign);
      root.classList.add('accessibility-text-align');
    } else {
      root.style.removeProperty('--accessibility-text-align');
      root.classList.remove('accessibility-text-align');
    }

    // Stop animations
    if (newSettings.stopAnimations) {
      root.classList.add('accessibility-stop-animations');
    } else {
      root.classList.remove('accessibility-stop-animations');
    }

    // Screen reader
    if (newSettings.screenReader) {
      enableScreenReader();
    } else {
      disableScreenReader();
    }

    // Salva in localStorage
    localStorage.setItem('accessibility-settings', JSON.stringify(newSettings));
  };

  const getInteractiveElementHint = (element: HTMLElement): string => {
    const isItalian = language === 'it';

    if (element instanceof HTMLAnchorElement || element.getAttribute('role') === 'link') {
      return isItalian
        ? 'Link. Clicca o premi Invio per aprire'
        : 'Link. Click or press Enter to open';
    }

    if (element instanceof HTMLButtonElement || element.getAttribute('role') === 'button') {
      return isItalian
        ? 'Pulsante. Clicca o premi Invio'
        : 'Button. Click or press Enter';
    }

    if (element instanceof HTMLSelectElement) {
      return isItalian
        ? "Menu a tendina. Scegli un'opzione"
        : 'Dropdown. Choose an option';
    }

    if (element instanceof HTMLTextAreaElement) {
      return isItalian
        ? 'Area di testo. Scrivi qui'
        : 'Text area. Type here';
    }

    if (element instanceof HTMLInputElement) {
      if (element.type === 'search') {
        return isItalian
          ? 'Campo di ricerca. Scrivi cosa vuoi cercare'
          : 'Search field. Type what you want to search';
      }

      if (element.type === 'checkbox') {
        const state = element.checked
          ? (isItalian ? 'attiva' : 'on')
          : (isItalian ? 'non attiva' : 'off');
        return isItalian
          ? `Casella di spunta ${state}. Premi Spazio per cambiare`
          : `Checkbox ${state}. Press Space to change`;
      }

      if (element.type === 'radio') {
        const state = element.checked
          ? (isItalian ? 'selezionato' : 'selected')
          : (isItalian ? 'non selezionato' : 'not selected');
        return isItalian
          ? `Scelta ${state}. Usa frecce e premi Spazio`
          : `Option ${state}. Use arrows and press Space`;
      }

      if (element.type === 'range') {
        return isItalian
          ? 'Slider. Usa freccia destra o sinistra'
          : 'Slider. Use left or right arrow';
      }

      return isItalian
        ? 'Campo di testo. Scrivi qui'
        : 'Text field. Type here';
    }

    if (element.getAttribute('role') === 'menuitem') {
      return isItalian
        ? 'Voce di menu. Clicca o premi Invio'
        : 'Menu item. Click or press Enter';
    }

    if (element.getAttribute('role') === 'tab') {
      return isItalian
        ? 'Scheda. Premi Invio per aprire'
        : 'Tab. Press Enter to open';
    }

    return '';
  };

  const handleScreenReaderEvent = (e: FocusEvent) => {
    // CRITICO: verifica che lo screen reader sia effettivamente attivo
    if (!screenReaderActiveRef.current) {
      return;
    }

    // Annuncia solo quando il focus arriva da navigazione tastiera.
    if (!keyboardNavigationActiveRef.current) {
      return;
    }

    const target = e.target as HTMLElement;

    // Non leggere se l'evento è sul widget stesso o floating button
    if (target.closest('.accessibility-widget-container')) return;
    if (target.closest('.accessibility-floating-button')) return;

    let textToRead = '';

    const interactiveTarget = target.closest('a, button, input, select, textarea, summary, [role="button"], [role="link"], [role="menuitem"], [role="tab"]') as HTMLElement | null;
    const interactiveHint = interactiveTarget ? getInteractiveElementHint(interactiveTarget) : '';

    // Priorità: aria-label > alt > innerText > placeholder
    if (target.hasAttribute('aria-label')) {
      textToRead = target.getAttribute('aria-label') || '';
    } else if (target instanceof HTMLImageElement && target.alt) {
      textToRead = target.alt;
    } else if (target instanceof HTMLInputElement && target.placeholder) {
      textToRead = target.placeholder;
    } else if (target.innerText) {
      textToRead = target.innerText;
    } else if (target.textContent) {
      textToRead = target.textContent;
    }

    const normalizedText = textToRead.trim();
    const finalText = interactiveHint
      ? `${interactiveHint}. ${normalizedText || (language === 'it' ? 'Senza etichetta' : 'Unlabeled')}`
      : normalizedText;

    if (finalText && finalText.length < 500) {
      const utterance = new SpeechSynthesisUtterance(finalText);
      utterance.lang = language;
      utterance.rate = 0.9;
      window.speechSynthesis.cancel(); // Ferma lettura precedente
      window.speechSynthesis.speak(utterance);
    }
  };

  const enableScreenReader = () => {
    // Implementazione base screen reader con Web Speech API
    if ('speechSynthesis' in window) {
      screenReaderActiveRef.current = true;
      document.documentElement.classList.add('accessibility-screen-reader');
      keyboardNavigationActiveRef.current = false;

      // Rimuovi prima eventuali listener precedenti (prevenzione duplicati)
      document.removeEventListener('focusin', handleScreenReaderEvent);

      // Aggiungi listener solo su focus da tastiera (Tab/Shift+Tab)
      document.addEventListener('focusin', handleScreenReaderEvent);
    } else {
      alert('Il tuo browser non supporta la sintesi vocale.');
    }
  };

  const disableScreenReader = () => {
    screenReaderActiveRef.current = false;
    document.documentElement.classList.remove('accessibility-screen-reader');

    // Rimuovi event listeners
    document.removeEventListener('focusin', handleScreenReaderEvent);

    // Ferma qualsiasi lettura in corso
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const toggleLanguage = () => {
    const newLang = language === 'it' ? 'en' : 'it';
    setLanguage(newLang);
    document.documentElement.setAttribute('lang', newLang);
    localStorage.setItem('site-language', newLang);

    // Trigger event per aggiornare App.tsx
    window.dispatchEvent(new Event('languagechange'));

    // Annuncio cambio lingua
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = newLang === 'it' ? 'Lingua: Italiano' : 'Language: English';
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
  };

  const updateSetting = <K extends keyof AccessibilitySetting>(
    key: K,
    value: AccessibilitySetting[K]
  ) => {
    // Se si modifica textSize mentre large-text è attivo, disattiva large-text prima
    if (key === 'textSize') {
      const html = document.documentElement;
      if (html.classList.contains('large-text')) {
        // Rimuovi large-text
        html.classList.remove('large-text');

        // Notifica toolbar del cambiamento
        window.dispatchEvent(new Event('accessibilitychange'));

        // Annuncio per screen reader
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = 'Testo Grande disattivato';
        document.body.appendChild(announcement);
        setTimeout(() => announcement.remove(), 1000);
      }
    }

    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    applySettings(newSettings);
    announceChange(key, value);

    // Notifica la toolbar di cambiamenti nel contrasto
    if (key === 'contrastMode') {
      window.dispatchEvent(new Event('accessibilitychange'));
    }
  };

  const resetAll = () => {
    setSettings(DEFAULT_SETTINGS);
    applySettings(DEFAULT_SETTINGS);
    localStorage.removeItem('accessibility-settings');
    announceChange('reset', 'tutte le impostazioni');
  };

  const announceChange = (setting: string, value: any) => {
    const messages: Record<string, string> = {
      textSize: `Dimensione testo: ${value}%`,
      lineHeight: `Altezza linea: ${value}%`,
      letterSpacing: `Spaziatura lettere: ${value}%`,
      contrastMode: `Modalità contrasto: ${value}`,
      saturation: `Saturazione colori: ${value}%`,
      bigCursor: `Cursore grande: ${value ? 'attivo' : 'disattivo'}`,
      readingGuide: `Guida alla lettura: ${value ? 'attiva' : 'disattiva'}`,
      boldText: `Testo in grassetto: ${value ? 'attivo' : 'disattivo'}`,
      highlightLinks: `Link evidenziati: ${value ? 'attivo' : 'disattivo'}`,
      dyslexiaFont: `Font per dislessia: ${value ? 'attivo' : 'disattivo'}`,
      hideImages: `Nascondi immagini: ${value ? 'attivo' : 'disattivo'}`,
      screenReader: `Screen reader: ${value ? 'attivo' : 'disattivo'}`,
      stopAnimations: `Ferma animazioni: ${value ? 'attivo' : 'disattivo'}`,
      reset: 'Tutte le impostazioni sono state ripristinate'
    };

    const message = messages[setting] || `Impostazione ${setting} aggiornata`;
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
  };

  const enableReadingGuide = () => {
    let guide = document.getElementById('reading-guide');
    if (!guide) {
      guide = document.createElement('div');
      guide.id = 'reading-guide';
      guide.className = 'reading-guide';
      document.body.appendChild(guide);

      document.addEventListener('mousemove', (e) => {
        if (guide) {
          guide.style.top = `${e.clientY - 2}px`;
        }
      });
    }
  };

  const disableReadingGuide = () => {
    const guide = document.getElementById('reading-guide');
    if (guide) {
      guide.remove();
    }
  };

  const widgetContent = (
    <>
      {/* Floating button - arancione in dark mode */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="accessibility-floating-button"
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 9999,
          width: '3.5rem',
          height: '3.5rem',
          borderRadius: '9999px',
          border: '4px solid #ffffff',
          outline: 'none'
        }}
        aria-label={isOpen ? 'Chiudi menu accessibilità' : 'Apri menu accessibilità'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="w-7 h-7" aria-hidden="true" />
        ) : (
          <Accessibility className="w-7 h-7" aria-hidden="true" />
        )}
      </button>

      {/* Menu panel */}
      {isOpen && (
        <div
          className="accessibility-widget-container fixed bottom-24 right-6 left-6 md:left-auto z-50 w-auto md:w-80 max-w-sm mx-auto md:mx-0 max-h-[600px] bg-card border-2 border-border rounded-lg shadow-2xl overflow-hidden"
          role="dialog"
          aria-label="Menu accessibilità"
        >
          <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold m-0">Accessibilità</h2>
              <button
                onClick={toggleLanguage}
                className="widget-lang-button px-3 py-1 rounded-sm text-sm font-bold transition-colors"
                aria-label={language === 'it' ? 'Switch to English' : 'Passa a Italiano'}
              >
                {language === 'it' ? '🇬🇧 EN' : '🇮🇹 IT'}
              </button>
            </div>
            <button
              onClick={resetAll}
              className="widget-reset-button flex items-center gap-2 px-3 py-1 rounded-sm text-sm font-medium transition-colors"
              aria-label="Ripristina tutte le impostazioni"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              Reset
            </button>
          </div>

          <div className="overflow-y-auto max-h-[520px] p-4">
            {/* Dimensione Testo */}
            <ControlSection title="Dimensione Testo" icon={<Type className="w-5 h-5" />}>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateSetting('textSize', Math.max(80, settings.textSize - 10))}
                  className="min-w-[40px] min-h-[40px] bg-secondary hover:bg-muted rounded-sm flex items-center justify-center"
                  aria-label="Diminuisci testo"
                >
                  <ZoomOut className="w-5 h-5" />
                </button>
                <div className="flex-1 text-center font-bold">{settings.textSize}%</div>
                <button
                  onClick={() => updateSetting('textSize', Math.min(200, settings.textSize + 10))}
                  className="min-w-[40px] min-h-[40px] bg-secondary hover:bg-muted rounded-sm flex items-center justify-center"
                  aria-label="Aumenta testo"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
              </div>
            </ControlSection>

            {/* Spaziatura Linee */}
            <ControlSection title="Spaziatura Linee" icon={<AlignLeft className="w-5 h-5" />}>
              <input
                type="range"
                min="100"
                max="200"
                step="10"
                value={settings.lineHeight}
                onChange={(e) => updateSetting('lineHeight', Number(e.target.value))}
                className="w-full accent-primary"
                aria-label="Spaziatura linee"
                aria-valuemin={100}
                aria-valuemax={200}
                aria-valuenow={settings.lineHeight}
              />
              <div className="text-center text-sm mt-1">{settings.lineHeight}%</div>
            </ControlSection>

            {/* Spaziatura Lettere */}
            <ControlSection title="Spaziatura Lettere" icon={<Type className="w-5 h-5" />}>
              <input
                type="range"
                min="100"
                max="150"
                step="5"
                value={settings.letterSpacing}
                onChange={(e) => updateSetting('letterSpacing', Number(e.target.value))}
                className="w-full accent-primary"
                aria-label="Spaziatura lettere"
              />
              <div className="text-center text-sm mt-1">{settings.letterSpacing}%</div>
            </ControlSection>

            {/* Contrasto */}
            <ControlSection title="Modalità Contrasto" icon={<Contrast className="w-5 h-5" />}>
              <div className="grid grid-cols-2 gap-2">
                <ModeButton
                  label="Normale"
                  active={settings.contrastMode === 'normal'}
                  onClick={() => updateSetting('contrastMode', 'normal')}
                />
                <ModeButton
                  label="Alto"
                  active={settings.contrastMode === 'high'}
                  onClick={() => updateSetting('contrastMode', 'high')}
                />
                <ModeButton
                  label="Invertito"
                  active={settings.contrastMode === 'inverted'}
                  onClick={() => updateSetting('contrastMode', 'inverted')}
                />
                <ModeButton
                  label="Scuro"
                  active={settings.contrastMode === 'dark'}
                  onClick={() => updateSetting('contrastMode', 'dark')}
                />
              </div>
            </ControlSection>

            {/* Saturazione Colori */}
            <ControlSection title="Saturazione Colori" icon={<Sun className="w-5 h-5" />}>
              <input
                type="range"
                min="0"
                max="200"
                step="10"
                value={settings.saturation}
                onChange={(e) => updateSetting('saturation', Number(e.target.value))}
                className="w-full accent-primary"
                aria-label="Saturazione colori"
              />
              <div className="text-center text-sm mt-1">{settings.saturation}%</div>
            </ControlSection>

            {/* Toggle controls */}
            <ToggleControl
              icon={<MousePointer className="w-5 h-5" />}
              label="Cursore Grande"
              checked={settings.bigCursor}
              onChange={(checked) => updateSetting('bigCursor', checked)}
            />

            <ToggleControl
              icon={<BookOpen className="w-5 h-5" />}
              label="Guida alla Lettura"
              description="Linea orizzontale che segue il mouse"
              checked={settings.readingGuide}
              onChange={(checked) => updateSetting('readingGuide', checked)}
            />

            <ToggleControl
              icon={<Bold className="w-5 h-5" />}
              label="Testo in Grassetto"
              checked={settings.boldText}
              onChange={(checked) => updateSetting('boldText', checked)}
            />

            <ToggleControl
              icon={<Link2 className="w-5 h-5" />}
              label="Evidenzia Link"
              checked={settings.highlightLinks}
              onChange={(checked) => updateSetting('highlightLinks', checked)}
            />

            <ToggleControl
              icon={<Type className="w-5 h-5" />}
              label="Font per Dislessia"
              description="OpenDyslexic - facilita la lettura"
              checked={settings.dyslexiaFont}
              onChange={(checked) => updateSetting('dyslexiaFont', checked)}
            />

            <ToggleControl
              icon={<ImageOff className="w-5 h-5" />}
              label="Nascondi Immagini"
              description="Riduce distrazioni visive"
              checked={settings.hideImages}
              onChange={(checked) => updateSetting('hideImages', checked)}
            />

            <ToggleControl
              icon={<Ear className="w-5 h-5" />}
              label="Screen Reader Integrato"
              description="Leggi il testo durante la navigazione con Tab"
              checked={settings.screenReader}
              onChange={(checked) => updateSetting('screenReader', checked)}
            />

            <ToggleControl
              icon={<PauseCircle className="w-5 h-5" />}
              label="Ferma Animazioni"
              checked={settings.stopAnimations}
              onChange={(checked) => updateSetting('stopAnimations', checked)}
            />

          </div>
        </div>
      )}

      {/* Stili per le funzionalità - NON si applicano al widget stesso */}
      <style>{`
        /* IMPORTANTE: Escludi sempre il widget dagli stili di accessibilità */

        /* Text scaling - scala il font-size base per mantenere tutte le proporzioni relative */
        html.accessibility-text-scaled {
          font-size: calc(18px * var(--accessibility-text-scale, 1)) !important;
        }

        /* Escludi widget dal text scaling */
        .accessibility-widget-container,
        .accessibility-widget-container *,
        .accessibility-floating-button,
        .accessibility-floating-button * {
          font-size: 1rem !important;
        }

        /* Line height */
        .accessibility-line-height body *:not(.accessibility-widget-container):not(.accessibility-widget-container *) {
          line-height: calc(1.6 * var(--accessibility-line-height, 1)) !important;
        }

        /* Letter spacing */
        .accessibility-letter-spacing body *:not(.accessibility-widget-container):not(.accessibility-widget-container *) {
          letter-spacing: var(--accessibility-letter-spacing, 0) !important;
        }

        /* Contrast modes - applica filtri SOLO al div#root (o primo child del body che non è il widget) */
        .contrast-high body > div:not(:has(.accessibility-widget-container)):not(:has(.accessibility-floating-button)) {
          filter: contrast(1.5);
        }

        /* Assicura che widget e button e i loro contenitori NON abbiano MAI filtri */
        .contrast-high .accessibility-widget-container,
        .contrast-high .accessibility-floating-button,
        .contrast-high body > :has(.accessibility-widget-container),
        .contrast-high body > :has(.accessibility-floating-button) {
          filter: none !important;
        }

        .contrast-inverted body > div:not(:has(.accessibility-widget-container)):not(:has(.accessibility-floating-button)) {
          filter: invert(1) hue-rotate(180deg);
        }

        /* Assicura che widget e button e i loro contenitori NON abbiano MAI filtri */
        .contrast-inverted .accessibility-widget-container,
        .contrast-inverted .accessibility-floating-button,
        .contrast-inverted body > :has(.accessibility-widget-container),
        .contrast-inverted body > :has(.accessibility-floating-button) {
          filter: none !important;
        }

        /* Dark mode accessibilità (diverso da dark mode toolbar) */
        .accessibility-dark body {
          background: #000000 !important;
          color: #ffffff !important;
        }

        .accessibility-dark body *:not(.accessibility-widget-container):not(.accessibility-widget-container *):not(.accessibility-floating-button):not(button):not([data-slot="button"]):not(a.inline-flex[class*="rounded"][class*="px-"][class*="py-"]):not(img):not(picture):not(video):not(canvas):not(svg):not(.quiz-option-dot):not(.quiz-option-dot-inner):not(.timeline-dot) {
          background-color: inherit !important;
          color: inherit !important;
        }

        .accessibility-dark .quiz-option-dot {
          border-color: #D75220 !important;
          background-color: #ffffff !important;
        }

        .accessibility-dark label:has(input[type="radio"]:checked) .quiz-option-dot {
          background-color: #D75220 !important;
        }

        .accessibility-dark .quiz-option-dot-inner {
          background-color: #ffffff !important;
        }

        .accessibility-dark .timeline-dot {
          background-color: #D75220 !important;
          border: 2px solid #ffffff !important;
          z-index: 1;
        }

        /* Dark mode accessibilità: immagini sempre visibili (incluse gallerie) */
        .accessibility-dark img:not(.accessibility-widget-container img),
        .accessibility-dark picture:not(.accessibility-widget-container picture) img,
        .accessibility-dark [class*="gallery"] img,
        .accessibility-dark [class*="carousel"] img {
          opacity: 1 !important;
          visibility: visible !important;
          filter: none !important;
          mix-blend-mode: normal !important;
        }

        /* Dark mode accessibilità: mantieni tutti i pulsanti pieni arancioni */
        .accessibility-dark button:not(.accessibility-widget-container button):not(.accessibility-floating-button):not(.font-info-button):not(.breadcrumb-link-button):not(.footer-link):not(.event-tab-button):not(.accessibility-mode-button),
        .accessibility-dark [data-slot="button"]:not(.accessibility-widget-container [data-slot="button"]),
        .accessibility-dark a.inline-flex[class*="rounded"][class*="px-"][class*="py-"]:not(.accessibility-widget-container a) {
          background: #D75220 !important;
          color: #ffffff !important;
          border-color: #D75220 !important;
        }

        .accessibility-dark .gallery-preview-button {
          background: transparent !important;
          border-color: transparent !important;
        }

        .accessibility-dark .gallery-preview-button:hover,
        .accessibility-dark .gallery-preview-button:focus,
        .accessibility-dark .gallery-preview-button:focus-visible,
        .accessibility-dark .gallery-preview-button:active {
          background: transparent !important;
          border-color: transparent !important;
        }

        .accessibility-dark .gallery-preview-button img {
          display: block !important;
          opacity: 1 !important;
          visibility: visible !important;
          filter: none !important;
          position: relative;
          z-index: 1;
        }

        .accessibility-dark button:not(.accessibility-widget-container button):not(.accessibility-floating-button):not(.font-info-button):not(.breadcrumb-link-button):not(.footer-link):not(.event-tab-button):not(.accessibility-mode-button):hover,
        .accessibility-dark [data-slot="button"]:not(.accessibility-widget-container [data-slot="button"]):hover,
        .accessibility-dark a.inline-flex[class*="rounded"][class*="px-"][class*="py-"]:not(.accessibility-widget-container a):hover {
          background: #BF461A !important;
          color: #ffffff !important;
        }

        .accessibility-dark .event-tab-button[data-active="true"] {
          background: #D75220 !important;
          border-color: #D75220 !important;
          color: #ffffff !important;
        }

        .accessibility-dark .event-tab-button[data-active="false"] {
          background: transparent !important;
          border-color: #ffffff !important;
          color: #ffffff !important;
        }

        .accessibility-dark .font-info-button,
        .accessibility-dark .breadcrumb-link-button,
        .accessibility-dark .footer-link,
        .accessibility-dark .font-info-button:hover,
        .accessibility-dark .breadcrumb-link-button:hover,
        .accessibility-dark .footer-link:hover,
        .accessibility-dark .font-info-button:focus,
        .accessibility-dark .breadcrumb-link-button:focus,
        .accessibility-dark .footer-link:focus,
        .accessibility-dark .font-info-button:focus-visible,
        .accessibility-dark .breadcrumb-link-button:focus-visible,
        .accessibility-dark .footer-link:focus-visible,
        .accessibility-dark .font-info-button:active,
        .accessibility-dark .breadcrumb-link-button:active,
        .accessibility-dark .footer-link:active {
          background: transparent !important;
          border-color: transparent !important;
          color: inherit !important;
        }

        /* Widget deve rimanere con sfondo bianco e testo nero SEMPRE */
        .accessibility-dark .accessibility-widget-container {
          background: #ffffff !important;
          color: #000000 !important;
          filter: none !important;
        }

        .accessibility-dark .accessibility-widget-container * {
          color: #000000 !important;
        }

        /* Header del widget: blu con testo bianco SEMPRE */
        .accessibility-dark .accessibility-widget-container > div:first-child,
        .accessibility-widget-container > div:first-child {
          background: #135DCD !important;
        }

        .accessibility-dark .accessibility-widget-container > div:first-child *,
        .accessibility-widget-container > div:first-child * {
          color: #ffffff !important;
        }

        /* Bottoni lingua e reset nell'header - stato normale: blu con border bianco */
        .widget-lang-button,
        .widget-reset-button,
        .accessibility-dark .widget-lang-button,
        .accessibility-dark .widget-reset-button,
        .contrast-high .widget-lang-button,
        .contrast-high .widget-reset-button,
        .contrast-inverted .widget-lang-button,
        .contrast-inverted .widget-reset-button {
          background: #135DCD !important;
          color: #ffffff !important;
          border: 1px solid #ffffff !important;
          outline: 1px solid #ffffff !important;
        }

        /* Hover: arancione senza border */
        .widget-lang-button:hover,
        .widget-reset-button:hover,
        .accessibility-dark .widget-lang-button:hover,
        .accessibility-dark .widget-reset-button:hover,
        .contrast-high .widget-lang-button:hover,
        .contrast-high .widget-reset-button:hover,
        .contrast-inverted .widget-lang-button:hover,
        .contrast-inverted .widget-reset-button:hover {
          background: #D75220 !important;
          color: #ffffff !important;
          border: none !important;
          outline: none !important;
        }

        /* Background elementi del widget */
        .accessibility-dark .accessibility-widget-container .bg-secondary,
        .accessibility-widget-container .bg-secondary {
          background: #f0f0f0 !important;
        }

        .accessibility-dark .accessibility-widget-container .bg-muted,
        .accessibility-widget-container .bg-muted {
          background: #e8e8e8 !important;
        }

        .accessibility-dark .accessibility-widget-container .bg-accent,
        .accessibility-widget-container .bg-accent {
          background: #D75220 !important;
        }

        /* Switch toggle - SEMPRE visibili */
        .accessibility-dark .accessibility-widget-container button[role="switch"],
        .accessibility-widget-container button[role="switch"] {
          background: #666666 !important;
        }

        .accessibility-dark .accessibility-widget-container button[role="switch"][aria-checked="true"],
        .accessibility-widget-container button[role="switch"][aria-checked="true"] {
          background: #D75220 !important;
        }

        .accessibility-dark .accessibility-widget-container button[role="switch"] span,
        .accessibility-widget-container button[role="switch"] span {
          background: #ffffff !important;
        }

        /* Pulsanti modalità contrasto */
        .accessibility-dark .accessibility-widget-container .bg-primary,
        .accessibility-widget-container .bg-primary {
          background: #135DCD !important;
          color: #ffffff !important;
        }

        /* Bordi */
        .accessibility-dark .accessibility-widget-container .border-border,
        .accessibility-widget-container .border-border {
          border-color: #333333 !important;
        }

        /* Saturation */
        .accessibility-saturation body:not(.accessibility-widget-container) {
          filter: saturate(var(--accessibility-saturation, 100%));
        }

        /* Big cursor */
        .accessibility-big-cursor,
        .accessibility-big-cursor * {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><circle cx="20" cy="20" r="14" fill="black" stroke="white" stroke-width="3"/></svg>') 20 20, auto !important;
        }

        /* Reading guide */
        .reading-guide {
          position: fixed;
          left: 0;
          right: 0;
          height: 5px;
          background: rgba(255, 111, 0, 0.8);
          pointer-events: none;
          z-index: 9998;
          box-shadow: 0 0 15px rgba(255, 111, 0, 0.6);
        }

        /* Bold text */
        .accessibility-bold-text body *:not(.accessibility-widget-container):not(.accessibility-widget-container *) {
          font-weight: 700 !important;
        }

        /* Highlight links - contrasto 7:1 in modalità chiara */
        .accessibility-highlight-links a:not(.accessibility-widget-container a) {
          background: #ffff00 !important;
          color: #000000 !important;
          text-decoration: underline !important;
          text-decoration-thickness: 3px !important;
          padding: 2px 4px !important;
          border-radius: 2px !important;
        }

        /* Highlight links - contrasto 7:1+ in dark mode (sfondo nero con testo giallo chiaro) */
        .accessibility-dark.accessibility-highlight-links a:not(.accessibility-widget-container a) {
          background: #000000 !important;
          color: #ffff00 !important;
          border: 2px solid #ffff00 !important;
          text-decoration: underline !important;
          text-decoration-thickness: 3px !important;
          text-decoration-color: #ffff00 !important;
          padding: 2px 4px !important;
          border-radius: 2px !important;
        }

        /* Dyslexia font - OpenDyslexic */
        @import url('https://fonts.cdnfonts.com/css/opendyslexic');

        .accessibility-dyslexia-font body *:not(.accessibility-widget-container):not(.accessibility-widget-container *) {
          font-family: 'OpenDyslexic', 'Comic Sans MS', sans-serif !important;
        }

        /* Hide images */
        .accessibility-hide-images img:not(.accessibility-widget-container img),
        .accessibility-hide-images [role="img"]:not(.accessibility-widget-container [role="img"]),
        .accessibility-hide-images svg:not(.accessibility-widget-container svg):not([aria-hidden="true"]) {
          opacity: 0.1 !important;
          filter: grayscale(100%) !important;
        }

        /* Stop animations */
        .accessibility-stop-animations *:not(.accessibility-widget-container):not(.accessibility-widget-container *),
        .accessibility-stop-animations *:not(.accessibility-widget-container):not(.accessibility-widget-container *)::before,
        .accessibility-stop-animations *:not(.accessibility-widget-container):not(.accessibility-widget-container *)::after {
          animation-play-state: paused !important;
          animation: none !important;
          transition: none !important;
        }

        /* Text align */
        .accessibility-text-align body *:not(.accessibility-widget-container):not(.accessibility-widget-container *) {
          text-align: var(--accessibility-text-align, left) !important;
        }

        /* Screen reader - feedback visivo */
        .accessibility-screen-reader *:hover:not(.accessibility-widget-container):not(.accessibility-widget-container *) {
          outline: 3px solid #ff6f00 !important;
          outline-offset: 2px !important;
        }

        /* Assicura che il widget NON cambi mai aspetto - TUTTE LE MODALITÀ */
        .accessibility-widget-container,
        .accessibility-widget-container *,
        .contrast-high .accessibility-widget-container,
        .contrast-high .accessibility-widget-container *,
        .contrast-inverted .accessibility-widget-container,
        .contrast-inverted .accessibility-widget-container *,
        .accessibility-dark .accessibility-widget-container,
        .accessibility-dark .accessibility-widget-container * {
          font-size: 1rem !important;
          line-height: 1.5 !important;
          letter-spacing: 0 !important;
          font-weight: 400 !important;
          font-family: 'Atkinson Hyperlegible', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
          filter: none !important;
          animation: inherit !important;
          transition: all 0.2s ease !important;
        }

        /* Widget container SEMPRE bianco con bordo */
        .accessibility-widget-container,
        .contrast-high .accessibility-widget-container,
        .contrast-inverted .accessibility-widget-container,
        .accessibility-dark .accessibility-widget-container {
          background-color: #ffffff !important;
          background: #ffffff !important;
          border-color: #333333 !important;
          color: #000000 !important;
        }

        /* Floating button: sempre fixed, sempre visibile, escluso da filtri */
        .accessibility-floating-button {
          position: fixed !important;
          z-index: 9999 !important;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #D75220 !important;
          background: #D75220 !important;
          color: #ffffff !important;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          transition: all 0.2s ease;
          border: 3px solid #ffffff !important;
          cursor: pointer;
          /* Forza un nuovo layer compositore per evitare problemi con filter parent */
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        .accessibility-floating-button svg {
          color: #ffffff !important;
        }

        .accessibility-floating-button:hover {
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          transform: translateZ(0) scale(1.1);
        }

        /* CRITICO: esclude COMPLETAMENTE il floating button dai filtri parent */
        .contrast-high .accessibility-floating-button,
        .contrast-inverted .accessibility-floating-button {
          filter: none !important;
          position: fixed !important;
          will-change: transform !important;
          transform: translateZ(0) !important;
        }

        /* Floating button arancione in dark mode - MASSIMA PRIORITÀ */
        .accessibility-dark .accessibility-floating-button,
        body.accessibility-dark .accessibility-floating-button {
          background-color: #ff6f00 !important;
          background: #ff6f00 !important;
          color: #000000 !important;
        }

        .accessibility-dark .accessibility-floating-button:hover,
        body.accessibility-dark .accessibility-floating-button:hover {
          background-color: #ff8c00 !important;
          background: #ff8c00 !important;
          transform: translateZ(0) scale(1.1) !important;
        }

        .accessibility-dark .accessibility-floating-button svg,
        body.accessibility-dark .accessibility-floating-button svg {
          color: #000000 !important;
        }

      `}</style>
    </>
  );

  // Renderizza usando Portal per bypassare filtri CSS parent
  return typeof document !== 'undefined'
    ? createPortal(widgetContent, document.body)
    : null;
}

function ControlSection({
  title,
  icon,
  children
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6 pb-6 border-b border-border last:border-0">
      <div className="flex items-center gap-2 mb-3">
        <div className="text-primary">{icon}</div>
        <h3 className="font-bold text-sm m-0">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function ToggleControl({
  icon,
  label,
  description,
  checked,
  onChange
}: {
  icon: React.ReactNode;
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="mb-4 pb-4 border-b border-border">
      <label className="flex items-start gap-3 cursor-pointer">
        <div className="text-primary mt-1">{icon}</div>
        <div className="flex-1">
          <div className="font-medium">{label}</div>
          {description && (
            <div className="text-sm text-muted-foreground mt-1">{description}</div>
          )}
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          onClick={() => onChange(!checked)}
          className={`
            relative w-12 h-6 rounded-full transition-colors flex-shrink-0
            ${checked ? 'bg-accent' : 'bg-muted'}
          `}
        >
          <span
            className={`
              absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform
              ${checked ? 'translate-x-6' : 'translate-x-0'}
            `}
          />
        </button>
      </label>
    </div>
  );
}

function ModeButton({
  label,
  active,
  onClick
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        px-3 py-2 rounded-sm text-sm font-medium transition-all
        ${active
          ? 'bg-primary text-primary-foreground border-2 border-primary'
          : 'bg-secondary text-secondary-foreground border-2 border-border hover:border-primary'
        }
      `}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}
