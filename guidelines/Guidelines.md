# Linee Guida per l'Accessibilità - Istituto Cavazza

Questo progetto è stato progettato con l'obiettivo di garantire la **massima accessibilità** per persone non vedenti e ipovedenti, seguendo e superando gli standard WCAG 2.1 AA/AAA.

## Principi Fondamentali

### 1. Alto Contrasto Nativo
- **Rapporto di contrasto minimo: 7:1** (WCAG AAA)
- Modalità chiara: testo nero (#000000) su sfondo bianco (#ffffff)
- Modalità scura: testo bianco (#ffffff) su sfondo nero (#000000)
- Mai usare colori a basso contrasto per testi o elementi interattivi

### 2. Font Atkinson Hyperlegible
- **Font obbligatorio**: Atkinson Hyperlegible
- Progettato dal Braille Institute specificamente per bassa visione
- Caratteri distintivi con forme chiare e spaziatura ottimizzata
- Peso normal (400) per corpo del testo, medium (600) per enfasi, bold (700) per headings

### 3. Gerarchia Visiva Esasperata
- **Headings**: scala tipografica ampia (h1: 2.5rem, h2: 2rem, h3: 1.5rem)
- **Line-height generoso**: 1.6 per il corpo del testo, 1.2-1.4 per headings
- **Spaziature**: utilizzare le variabili CSS custom per spacing coerente
  - `--spacing-xs`: 0.5rem (0.75rem in modalità large-text)
  - `--spacing-sm`: 1rem (1.25rem)
  - `--spacing-md`: 1.5rem (2rem)
  - `--spacing-lg`: 2rem (2.75rem)
  - `--spacing-xl`: 3rem (4rem)

### 4. Target Minimi per Touch/Click
- **Minimo assoluto**: 44x44 pixel (WCAG 2.5.5)
- **Raccomandato**: 48x48 pixel o superiore
- Pulsanti principali: 56x56 pixel
- Padding generoso (min 16px) attorno agli elementi interattivi

### 5. Focus States Altamente Visibili
- **Outline**: 4px solid con colore arancione (#ff6f00 chiaro, #ffd54f scuro)
- **Offset**: 2px per distacco dal contenuto
- Mai rimuovere outline con `outline: none` senza fornire alternativa
- `:focus-visible` per focus solo da tastiera

## Modalità Visive

Il sito supporta tre modalità visive selezionabili dall'utente:

### Modalità Standard
- Alto contrasto nativo (7:1+)
- Font size base: 18px
- Colori: nero su bianco con accenti blu (#135DCD) e arancione (#D75220)

### Modalità Tema Scuro
- Classe CSS: `.dark`
- Sfondo scuro (#0d1117), testo bianco
- Colori invertiti con contrasto mantenuto
- Accenti: blu chiaro (#5c9cff), arancione (#D75220)

### Modalità Testo Ingrandito
- Classe CSS: `.large-text`
- Font size base: 22px (aumento del 22%)
- Spaziature aumentate proporzionalmente
- Target touch aumentati a 56px

## Stack Tecnologico Usato nel Codice

Questa sezione descrive **cosa viene usato nel codice** del progetto e in che modo.

### Framework Frontend e Linguaggio
- **React 18** con rendering client-side tramite `createRoot(...)` in `src/main.tsx`.
- **TypeScript** in tutti i componenti principali (`.tsx`), con tipi espliciti per props, stato e dati (es. `Lang`, `EventItem`, `ProjectItem`, `NewsItem`).
- Architettura a componenti in `src/app/components` e pagine in `src/app/pages`.
- La navigazione è gestita al momento con **stato React** in `App.tsx` (`currentPage`, `culturaSubPage`, `eventiTab`), non con routing dichiarativo.

### Build, Dev Server e Configurazione
- **Vite 6** come bundler/dev server (`npm run dev`, `npm run build`).
- **@vitejs/plugin-react** per compilazione React e Fast Refresh.
- **@tailwindcss/vite** per integrare Tailwind nel processo di build.
- Plugin custom `assetResolver` in `vite.config.ts` per risolvere import nel formato `:asset/...` verso `src/assets`.
- Alias `@` configurato in Vite verso `src` per import più leggibili (es. `@/assets/...`).

### Styling e Design System
- **Tailwind CSS v4** usato via `src/styles/tailwind.css` (`@import 'tailwindcss'` + `@source`).
- **tw-animate-css** disponibile per utility di animazione.
- Tema accessibile centralizzato in `src/styles/theme.css` con:
  - variabili CSS per colori, tipografia, spaziature e focus,
  - varianti custom `.dark` e `.large-text`,
  - mapping in `@theme inline` per allineare variabili CSS e token Tailwind.
- Import stili ordinato in `src/styles/index.css` (`fonts.css`, `tailwind.css`, `theme.css`).

### Librerie UI e Primitives
- Sistema UI composto da:
  - componenti custom accessibili in `src/app/components` (es. toolbar, player radio, modali, navigazione),
  - libreria di primitives in `src/app/components/ui` basata su **Radix UI** (`@radix-ui/*`) in stile shadcn.
- **class-variance-authority (cva)** per definire varianti dei componenti UI.
- **clsx** + **tailwind-merge** con helper `cn(...)` per comporre classi CSS in modo sicuro.
- Nel flusso applicativo corrente è molto usato il `Button` custom in `src/app/components/Button.tsx`, mentre il `Button` in `components/ui` è disponibile come alternativa più generica.

### Iconografia e Media
- **lucide-react** usato estensivamente per icone semantiche nei componenti e nelle pagine.
- Asset immagini gestiti in `src/assets` con supporto import diretto e indicizzazione in `src/app/data/siteImages.ts`.

### Internazionalizzazione (i18n)
- Sistema i18n custom in `src/app/i18n.ts` con:
  - dizionario `translations` per italiano/inglese,
  - tipo `Lang = 'it' | 'en'`,
  - hook/funzione `useTranslation(lang)` per risoluzione chiavi.
- Persistenza lingua con `localStorage` (`site-language`) e sincronizzazione via eventi browser (`storage` e `languagechange`).

### Dati Applicativi e Ricerca
- Dati contenutistici gestiti lato frontend con funzioni tipizzate in `src/app/data/contentIndex.ts` (`getEvents`, `getProjects`, `getNews`, `getPageContents`).
- Ricerca globale nel client in `App.tsx` con:
  - ascolto evento custom (`site-search`),
  - matching testuale e fuzzy matching (distanza di Levenshtein),
  - ranking per punteggio e rendering risultati nella pagina dedicata.

### Funzionalità Accessibili Implementate a Livello Codice
- Persistenza preferenze accessibilità in `localStorage` (`accessibility-settings`).
- Sincronizzazione UI tramite evento custom `accessibilitychange`.
- `aria-live` e regioni con `role=status/alert` per annunci dinamici.
- Gestione `prefers-reduced-motion` in CSS per ridurre animazioni quando richiesto dall'utente.
- Player audio (`RadioPlayer`) basato su elemento HTMLAudioElement con gestione esplicita di play/pause, mute, volume, errori e annunci screen reader.

### Dipendenze Presenti ma Non Integrate nel Flusso Principale Attuale
- `react-router` è presente in dipendenze ma non risulta usato nei file applicativi correnti (navigazione gestita da stato).
- `@mui/material`, `@mui/icons-material` e `@emotion/*` risultano installati ma non importati nel codice principale.
- Esiste il wrapper `Toaster` in `src/app/components/ui/sonner.tsx` (con `sonner` e `next-themes`), ma non risulta montato in `App.tsx`.

## Componenti Accessibili

### Button
- Dimensione minima: 44x44px
- Tre varianti: `primary`, `secondary`, `outline`
- Focus ring sempre visibile
- Mai usare solo icone senza testo

### SkipLink
- Sempre presente all'inizio della pagina
- Visibile solo al focus (position absolute)
- Permette di saltare direttamente al contenuto principale
- Target: `#main-content`

### Navigation
- **Menu flat**: nessun sotto-menu a cascata
- Descrizioni opzionali per ogni voce di menu
- Responsive con menu mobile a toggle
- `aria-label="Navigazione principale"`

### Breadcrumbs
- Separatori visivi E testuali
- Icona home sempre presente
- `aria-current="page"` per l'ultimo elemento
- `aria-label="Breadcrumb"`

### ServiceCard / WhoWeServeCard
- Icona su sfondo primario (#135DCD) con testo bianco
- Icona + testo (doppia codifica)
- Mai usare solo il colore per comunicare
- Bordo visibile (#135DCD) con padding generoso
- Heading semantico (h3) in grassetto

### RadioPlayer
- Pulsante play/pause: 56x56px (arancione #D75220)
- Pulsante mute: 44x44px
- Stato visivo chiaro (pallino animato arancione quando in riproduzione)
- Etichette sempre visibili con descrizione della stazione
- Annunci per screen reader su ogni cambio di stato
- Volume con slider accessibile (aria-valuetext)
- Informazioni programma corrente e prossimo con icone
- Gestione errori di connessione con messaggi chiari

### AccessibilityToolbar
- Sempre visibile (sticky top)
- Tre pulsanti per modalità visive
- `aria-pressed` per stato attivo
- Salva preferenze in localStorage
- Responsive: collassabile su mobile

## Regole di Codifica

### HTML Semantico
```html
<!-- ✓ CORRETTO -->
<nav aria-label="Navigazione principale">
<main id="main-content" tabIndex={-1}>
<section aria-labelledby="titolo-sezione">
<h2 id="titolo-sezione">Titolo</h2>

<!-- ✗ SBAGLIATO -->
<div class="nav">
<div class="main">
<div class="section">
```

### Gerarchia Heading Rigorosa
- Un solo `<h1>` per pagina
- Mai saltare livelli (h1 → h2 → h3, non h1 → h3)
- Usare heading per struttura semantica, non per stile visivo

### Immagini e Icone
- **Alt text obbligatorio** per tutte le immagini
- Componente `ImageWithFallback` per gestire fallback neutro (SVG grigio)
- Icone decorative: `aria-hidden="true"`
- Icone funzionali: sempre accompagnate da testo visibile
- Mai solo icone senza etichetta testuale
- Immagini raggruppate per famiglia di asset in `src/app/data/siteImages.ts` (serviceImages, trainingImages, instituteImages, anterosGalleryImages, tolomeoGalleryImages)

### Link Accessibili
- Sempre sottolineati (`text-decoration: underline`)
- Spessore sottolineatura: 2px
- Offset: 3px
- Contrasto 4.5:1 minimo
- Testo descrittivo (mai "clicca qui")

### Form Accessibili
- Label sempre visibili (mai placeholder come label)
- `aria-required="true"` per campi obbligatori
- Messaggi di errore con `role="alert"`
- Indicatori di errore non solo di colore
- Layout lineare e prevedibile

### ARIA Landmarks
```html
<nav role="navigation" aria-label="...">
<main id="main-content">
<aside role="complementary" aria-label="...">
<footer role="contentinfo">
<form role="search" aria-label="...">
```

### Live Regions
```html
<div role="status" aria-live="polite">
  Messaggio di conferma
</div>

<div role="alert" aria-live="assertive">
  Errore critico
</div>
```

## Animazioni e Movimento

### Rispetta prefers-reduced-motion
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Regole per le Animazioni
- **Mai animazioni automatiche** che distraggono
- Transizioni solo su interazione utente
- Durata massima: 300ms per micro-interazioni
- Fornire controllo per fermare animazioni

## Navigazione da Tastiera

### Tab Order
- Ordine logico e prevedibile
- Skip link come primo elemento focusabile
- Mai `tabindex` positivi (1, 2, 3...)
- Usare `tabindex="-1"` per elementi non nativamente focusabili che ricevono focus programmaticamente

### Keyboard Shortcuts
- `Tab`: elemento successivo
- `Shift+Tab`: elemento precedente
- `Enter` o `Space`: attivare pulsanti/link
- `Esc`: chiudere modali/menu
- Arrow keys: navigazione in liste/menu

## Testing Accessibilità

### Checklist Manuale
- [ ] Navigazione completa solo con tastiera
- [ ] Skip link funzionante
- [ ] Focus visibile su tutti gli elementi interattivi
- [ ] Contrasto colori verificato (strumento: WebAIM Contrast Checker)
- [ ] Screen reader test (NVDA, JAWS, VoiceOver)
- [ ] Zoom browser fino al 200% senza rottura layout
- [ ] Modalità tema scuro funzionante
- [ ] Modalità testo ingrandito funzionante
- [ ] Form completabili solo con tastiera
- [ ] Tutti i media con alternative testuali

### Strumenti Raccomandati
- **axe DevTools** (Chrome/Firefox extension)
- **WAVE** (Web Accessibility Evaluation Tool)
- **Lighthouse** (Chrome DevTools)
- **Screen reader**: NVDA (Windows), VoiceOver (Mac/iOS), TalkBack (Android)

## Non Fare Mai

❌ Usare `div` o `span` come pulsanti senza `role="button"`
❌ Rimuovere outline focus senza alternativa visibile
❌ Usare solo il colore per comunicare informazioni
❌ Dimensioni target inferiori a 44x44px
❌ Contrasto inferiore a 4.5:1 per testo normale
❌ Testo in immagini (usare HTML/CSS)
❌ Placeholder come unica label per input
❌ `onClick` su elementi non interattivi senza gestione tastiera
❌ Animazioni automatiche senza controllo utente
❌ Video/audio in autoplay
❌ Link con solo icona senza testo
❌ Captcha visivi senza alternativa audio/testuale

## Fare Sempre

✓ Testare con screen reader
✓ Testare con solo tastiera
✓ Usare HTML semantico
✓ Fornire alternative testuali
✓ Mantenere contrasto elevato
✓ Spaziature generose
✓ Focus states evidenti
✓ Headings gerarchici
✓ Skip links
✓ ARIA landmarks
✓ Live regions per annunci
✓ Codifica visiva multipla (colore + icona + testo)

## Risorse

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Atkinson Hyperlegible Font](https://brailleinstitute.org/freefont)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)

---

**Ultima revisione**: Giugno 2026  
**Standard**: WCAG 2.1 Level AA/AAA  
**Progetto**: Istituto dei Ciechi Francesco Cavazza  
**Versione**: 1.1 (Aggiornata con implementazione reale)
