import type { KeyboardEvent, MouseEvent } from 'react';

/**
 * Skip Link - permette agli utenti di screen reader di saltare
 * direttamente al contenuto principale senza ascoltare la navigazione
 * Visibile solo quando riceve il focus (tastiera)
 */
export function SkipLink({
  targetId = 'main-content',
  pageLabel,
}: {
  targetId?: string;
  pageLabel?: string;
}) {
  const activateSkipLink = (event: MouseEvent<HTMLAnchorElement> | KeyboardEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const target = document.getElementById(targetId);
    if (!target) return;

    target.focus({ preventScroll: true });
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (window.location.hash !== `#${targetId}`) {
      window.history.replaceState(null, '', `#${targetId}`);
    }
  };

  const visibleText = pageLabel
    ? `Salta al contenuto principale (${pageLabel})`
    : 'Salta al contenuto principale';

  return (
    <a
      href={`#${targetId}`}
      className="skip-link"
      onClick={activateSkipLink}
      onKeyDown={(event) => {
        if (event.key === ' ') {
          activateSkipLink(event);
        }
      }}
      aria-label={visibleText}
    >
      {visibleText}
    </a>
  );
}
