import React, { useState, useEffect } from 'react';
import { Eye, Moon, Sun, Type, Settings, Info, Contrast } from 'lucide-react';
import { Button } from './Button';

type VisualMode = 'standard' | 'dark' | 'large-text';

/**
 * Barra strumenti accessibilità ispirata al Braille Institute
 * - Design più prominente e informativo
 * - Badge informativo sul font Atkinson Hyperlegible
 * - Controlli sempre visibili
 * - Feedback visivo chiaro
 *
 * Sempre visibile e posizionata in alto per facile accesso
 */
export function AccessibilityToolbar() {
  const [visualMode, setVisualMode] = useState<VisualMode>('standard');
  const [currentContrastMode, setCurrentContrastMode] = useState<string>('normal'); // traccia il vero contrastMode
  const [isOpen, setIsOpen] = useState(false);
  const [showFontInfo, setShowFontInfo] = useState(false);

  useEffect(() => {
    // Carica preferenza salvata dal widget
    const savedSettings = localStorage.getItem('accessibility-settings');
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        setCurrentContrastMode(settings.contrastMode || 'normal');

        // Sincronizza con le impostazioni del widget
        if (settings.contrastMode === 'high') {
          setVisualMode('standard');
        } else if (settings.contrastMode === 'dark') {
          setVisualMode('dark');
        } else {
          // normal o inverted: verifica se c'è large-text
          const html = document.documentElement;
          if (html.classList.contains('large-text')) {
            setVisualMode('large-text');
          } else {
            setVisualMode('standard');
          }
        }
      } catch (e) {
        console.error('Errore nel caricamento delle preferenze:', e);
      }
    }

    // Ascolta cambiamenti dal widget
    const handleAccessibilityChange = () => {
      const savedSettings = localStorage.getItem('accessibility-settings');
      if (savedSettings) {
        try {
          const settings = JSON.parse(savedSettings);
          setCurrentContrastMode(settings.contrastMode || 'normal');

          if (settings.contrastMode === 'high') {
            setVisualMode('standard');
          } else if (settings.contrastMode === 'dark') {
            setVisualMode('dark');
          } else {
            // normal o inverted: controlla se c'è large-text
            const html = document.documentElement;
            if (html.classList.contains('large-text')) {
              setVisualMode('large-text');
            } else {
              // large-text è stato disattivato, reset visualMode
              setVisualMode('standard');
            }
          }
        } catch (e) {
          console.error('Errore:', e);
        }
      }
    };

    window.addEventListener('storage', handleAccessibilityChange);
    window.addEventListener('accessibilitychange', handleAccessibilityChange);

    return () => {
      window.removeEventListener('storage', handleAccessibilityChange);
      window.removeEventListener('accessibilitychange', handleAccessibilityChange);
    };
  }, []);

  const applyMode = (mode: VisualMode, isToggleOff: boolean = false) => {
    const html = document.documentElement;

    // Sincronizza con il widget invece di applicare direttamente le classi
    const savedSettings = localStorage.getItem('accessibility-settings');
    let settings = savedSettings ? JSON.parse(savedSettings) : {
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

    // Rimuovi classi old system
    html.classList.remove('dark', 'large-text', 'contrast-high', 'accessibility-dark');

    // Se è toggle off, torna a normale
    if (isToggleOff) {
      settings.contrastMode = 'normal';
      // Rimuovi tutte le classi - stato normale
      localStorage.setItem('accessibility-settings', JSON.stringify(settings));
      window.dispatchEvent(new Event('accessibilitychange'));
      return;
    }

    // Applica la nuova modalità sincronizzando con il widget
    if (mode === 'standard') {
      // Standard = Alto contrasto
      settings.contrastMode = 'high';
      html.classList.add('contrast-high');
    } else if (mode === 'dark') {
      // Scura = Dark mode del widget
      settings.contrastMode = 'dark';
      html.classList.add('accessibility-dark');
    } else if (mode === 'large-text') {
      // Large text mantiene il contrasto corrente
      html.classList.add('large-text');
      if (settings.contrastMode === 'high') {
        html.classList.add('contrast-high');
      } else if (settings.contrastMode === 'dark') {
        html.classList.add('accessibility-dark');
      }
    }

    // Salva nel formato del widget
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));

    // Dispatch event per notificare il widget
    window.dispatchEvent(new Event('accessibilitychange'));
  };

  const handleModeChange = (mode: VisualMode) => {
    // Toggle: se il bottone è già attivo, disattiva (torna a normale)
    if (mode === 'standard' && currentContrastMode === 'high') {
      // Toggle off Alto Contrasto
      setVisualMode('standard');
      setCurrentContrastMode('normal');
      applyMode('standard', true);
      announceToScreenReader('Modalità normale attivata');
    } else if (mode === 'dark' && currentContrastMode === 'dark') {
      // Toggle off Contrasto Scuro
      setVisualMode('standard');
      setCurrentContrastMode('normal');
      applyMode('dark', true);
      announceToScreenReader('Modalità normale attivata');
    } else if (mode === 'large-text' && visualMode === 'large-text') {
      // Toggle off Testo Grande
      const html = document.documentElement;
      html.classList.remove('large-text');
      setVisualMode('standard');
      announceToScreenReader('Dimensione testo normale');

      // Aggiorna settings senza large-text
      const savedSettings = localStorage.getItem('accessibility-settings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        localStorage.setItem('accessibility-settings', JSON.stringify(settings));
        window.dispatchEvent(new Event('accessibilitychange'));
      }
    } else {
      // Attiva la modalità
      setVisualMode(mode);
      applyMode(mode, false);

      // Annuncio per screen reader
      const announcement = mode === 'standard'
        ? 'Modalità alto contrasto attivata'
        : mode === 'dark'
        ? 'Modalità contrasto scuro attivata'
        : 'Modalità testo ingrandito attivata';

      announceToScreenReader(announcement);
    }
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

  return (
    <>
      <div
        className="bg-primary text-primary-foreground"
        role="region"
        aria-label="Strumenti di accessibilità"
      >
        <div className="max-w-7xl mx-auto px-[36px] py-[12px]">
          <div className="flex flex-col gap-4">
            {/* Header con badge font */}
            <div className="flex items-center justify-between gap-4 p-[0px]">
              <div className="flex items-center gap-3">
                <Eye className="w-7 h-7" aria-hidden="true" />
                <div>
                  <h2 className="text-lg font-bold m-0 leading-tight">
                    Controlli Rapidi Accessibilità
                  </h2>
                  <button
                    onClick={() => setShowFontInfo(!showFontInfo)}
                    className="font-info-button hidden md:flex text-sm opacity-90 hover:opacity-100 underline items-center gap-1 mt-1"
                    aria-expanded={showFontInfo}
                  >
                    <Info className="w-3 h-3" aria-hidden="true" />
                    Font Atkinson Hyperlegible
                  </button>
                </div>
              </div>

            {/* Desktop: mostra sempre i pulsanti */}
            <div className="hidden md:flex items-center gap-2">
              <ModeButton
                icon={<Contrast className="w-5 h-5 bg-[#00000000]" />}
                label="Alto Contrasto"
                active={currentContrastMode === 'high'}
                onClick={() => handleModeChange('standard')}
              />
              <ModeButton
                icon={<Moon className="w-5 h-5" />}
                label="Contrasto Scuro"
                active={currentContrastMode === 'dark'}
                onClick={() => handleModeChange('dark')}
              />
              <ModeButton
                icon={<Type className="w-5 h-5" />}
                label="Testo Grande"
                active={visualMode === 'large-text'}
                onClick={() => handleModeChange('large-text')}
              />
            </div>

              {/* Mobile: menu collassabile */}
              <button
                className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center bg-primary-foreground text-primary rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? 'Chiudi menu accessibilità' : 'Apri menu accessibilità'}
                aria-expanded={isOpen}
              >
                <Settings className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            {/* Info box Font Atkinson Hyperlegible */}
            {showFontInfo && (
              <div className="bg-primary-foreground text-primary rounded-sm p-4 border border-white/40">
                <p className="text-sm leading-relaxed m-0">
                  Questo sito utilizza il <strong>font Atkinson Hyperlegible</strong>,
                  progettato dal Braille Institute per massimizzare la leggibilità per
                  persone con ipovisione. Il font enfatizza la distinzione tra
                  caratteri simili e migliora il riconoscimento delle lettere.
                </p>
              </div>
            )}
          </div>

          {/* Menu mobile espanso */}
          {isOpen && (
            <div className="md:hidden mt-4 pb-0 flex flex-col gap-2">
              <ModeButton
                icon={<Contrast className="w-5 h-5" />}
                label="Alto Contrasto"
                active={currentContrastMode === 'high'}
                onClick={() => {
                  handleModeChange('standard');
                  setIsOpen(false);
                }}
                fullWidth
              />
              <ModeButton
                icon={<Moon className="w-5 h-5" />}
                label="Contrasto Scuro"
                active={currentContrastMode === 'dark'}
                onClick={() => {
                  handleModeChange('dark');
                  setIsOpen(false);
                }}
                fullWidth
              />
              <ModeButton
                icon={<Type className="w-5 h-5" />}
                label="Testo Grande"
                active={visualMode === 'large-text'}
                onClick={() => {
                  handleModeChange('large-text');
                  setIsOpen(false);
                }}
                fullWidth
              />
            </div>
          )}
        </div>
      </div>

      {/* Screen reader only - stato corrente */}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        Modalità visiva corrente: {visualMode === 'standard' ? 'Standard' : visualMode === 'dark' ? 'Scura' : 'Testo Ingrandito'}
      </div>
    </>
  );
}

function ModeButton({
  icon,
  label,
  description,
  active,
  onClick,
  fullWidth = false
}: {
  icon: React.ReactNode;
  label: string;
  description?: string;
  active: boolean;
  onClick: () => void;
  fullWidth?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      data-active={active}
      className={`
        accessibility-mode-button
        min-h-[48px] px-5 py-2 rounded-lg
        flex items-center gap-2
        font-medium transition-all
        ${fullWidth ? 'w-full justify-start' : ''}
        ${active
          ? 'bg-[#D75220] text-white border-2 border-[#D75220] shadow-md'
          : 'bg-transparent text-white border-2 border-white hover:bg-white/10'
        }
      `}
      aria-pressed={active}
      aria-label={`${label}${description ? ': ' + description : ''}${active ? ' - Attiva' : ''}`}
    >
      <div className="text-white">{icon}</div>
      <div className="flex flex-col items-start">
        <span className="font-bold text-sm text-white">{label}</span>
        {description && (
          <span className="text-xs opacity-90 text-white">{description}</span>
        )}
      </div>
    </button>
  );
}
