/**
 * Skip Link - permette agli utenti di screen reader di saltare
 * direttamente al contenuto principale senza ascoltare la navigazione
 * Visibile solo quando riceve il focus (tastiera)
 */
export function SkipLink({ targetId = 'main-content' }: { targetId?: string }) {
  return (
    <a
      href={`#${targetId}`}
      className="skip-link"
      aria-label="Salta al contenuto principale"
    >
      Salta al contenuto principale
    </a>
  );
}
