import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, ExternalLink, Calendar } from 'lucide-react';

interface RadioPlayerProps {
  streamUrl: string;
  stationName: string;
  websiteUrl?: string;
  scheduleUrl?: string;
}

interface Program {
  title: string;
  startTime: string;
  endTime: string;
  isReplay?: boolean;
}

interface CurrentProgram {
  title: string;
  startTime: string;
  endTime: string;
  isReplay: boolean;
}

interface NextProgram {
  title: string;
  startTime: string;
  endTime: string;
  isReplay: boolean;
}

interface ProgramState {
  current: CurrentProgram | null;
  next: NextProgram | null;
  loading: boolean;
}

/**
 * Player radio accessibile con:
 * - Controlli grandi (44x44px+)
 * - Stati chiari (in riproduzione/pausa)
 * - Annunci per screen reader
 * - Controllo volume semplificato
 * - Etichette sempre visibili
 */
// Palinsesto completo Radio Oltre basato su dati reali
const WEEKLY_SCHEDULE: Record<number, Program[]> = {
  1: [ // Lunedì
    { title: 'Quanto Basta', startTime: '08:00', endTime: '08:05' },
    { title: 'INCIPIT', startTime: '09:00', endTime: '09:30' },
    { title: 'Juke Box', startTime: '09:30', endTime: '10:00', isReplay: true },
    { title: 'Moebius', startTime: '10:30', endTime: '11:00' },
    { title: 'Corpi impuri', startTime: '12:30', endTime: '13:00' },
    { title: 'Circolare periferica', startTime: '14:30', endTime: '15:00' },
    { title: 'Quanto Basta', startTime: '16:30', endTime: '16:35' },
    { title: 'Fatterelli Bolognesi', startTime: '17:00', endTime: '17:30' },
    { title: 'Moebius', startTime: '18:30', endTime: '19:00', isReplay: true },
    { title: 'R.O.C. Story', startTime: '20:00', endTime: '20:30' },
    { title: 'Corpi impuri', startTime: '20:30', endTime: '21:00', isReplay: true },
    { title: 'A letto con le galline', startTime: '22:00', endTime: '22:30' }
  ],
  2: [ // Martedì
    { title: 'INCIPIT', startTime: '09:00', endTime: '09:30' },
    { title: 'R.O.C.', startTime: '09:30', endTime: '10:00' },
    { title: 'Wikirunner', startTime: '10:30', endTime: '11:30' },
    { title: 'Klara', startTime: '11:30', endTime: '12:00' },
    { title: 'Vite affogate nel blues', startTime: '15:30', endTime: '16:00' },
    { title: 'R.O.C.', startTime: '16:30', endTime: '17:00', isReplay: true },
    { title: 'Klara', startTime: '19:30', endTime: '20:00', isReplay: true },
    { title: 'A letto con le galline', startTime: '22:00', endTime: '22:30' }
  ],
  3: [ // Mercoledì
    { title: 'Quanto Basta', startTime: '08:00', endTime: '08:05' },
    { title: 'INCIPIT', startTime: '09:00', endTime: '09:30' },
    { title: 'Wikirunner', startTime: '11:30', endTime: '12:00', isReplay: true },
    { title: 'Quanto Basta', startTime: '15:30', endTime: '15:35' },
    { title: 'Wikirunner', startTime: '19:30', endTime: '20:00', isReplay: true },
    { title: 'Circolare periferica', startTime: '20:00', endTime: '20:30', isReplay: true },
    { title: 'A letto con le galline', startTime: '22:00', endTime: '22:30' }
  ],
  4: [ // Giovedì
    { title: 'INCIPIT', startTime: '09:00', endTime: '09:30' },
    { title: 'Klara', startTime: '16:30', endTime: '17:00', isReplay: true },
    { title: 'Corpi impuri', startTime: '17:30', endTime: '18:00', isReplay: true },
    { title: 'R.O.C.', startTime: '18:00', endTime: '18:30', isReplay: true },
    { title: 'R.O.C. Story', startTime: '20:00', endTime: '20:30', isReplay: true },
    { title: 'A letto con le galline', startTime: '22:00', endTime: '22:30' }
  ],
  5: [ // Venerdì
    { title: 'Quanto Basta', startTime: '08:00', endTime: '08:05' },
    { title: 'INCIPIT', startTime: '09:00', endTime: '09:30' },
    { title: 'Fatterelli Bolognesi', startTime: '11:30', endTime: '12:00', isReplay: true },
    { title: 'Vite affogate nel blues', startTime: '15:30', endTime: '16:00', isReplay: true },
    { title: 'Quanto Basta', startTime: '16:30', endTime: '16:35' },
    { title: 'Wikirunner', startTime: '17:30', endTime: '18:00', isReplay: true },
    { title: 'Moebius', startTime: '18:30', endTime: '19:00', isReplay: true },
    { title: 'A letto con le galline', startTime: '22:00', endTime: '22:30' }
  ],
  6: [ // Sabato
    { title: 'Programmazione Weekend', startTime: '09:00', endTime: '22:00' }
  ],
  0: [ // Domenica
    { title: 'Programmazione Weekend', startTime: '09:00', endTime: '22:00' }
  ]
};

export function RadioPlayer({ streamUrl, stationName, websiteUrl, scheduleUrl }: RadioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [hasError, setHasError] = useState(false);
  const [programState, setProgramState] = useState<ProgramState>({
    current: null,
    next: null,
    loading: true
  });
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Aggiorna programma corrente e prossimo ogni minuto
  useEffect(() => {
    updatePrograms();
    const interval = setInterval(updatePrograms, 60000); // Aggiorna ogni minuto
    return () => clearInterval(interval);
  }, []);

  const parseTime = (timeStr: string): { hours: number; minutes: number } => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return { hours, minutes };
  };

  const timeToMinutes = (hours: number, minutes: number): number => {
    return hours * 60 + minutes;
  };

  const updatePrograms = () => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 = Domenica, 1 = Lunedì, etc.
    const currentMinutes = timeToMinutes(now.getHours(), now.getMinutes());

    const todaySchedule = WEEKLY_SCHEDULE[dayOfWeek] || [];

    let currentProgram: CurrentProgram | null = null;
    let nextProgram: NextProgram | null = null;

    // Trova il programma corrente
    for (let i = 0; i < todaySchedule.length; i++) {
      const program = todaySchedule[i];
      const start = parseTime(program.startTime);
      const end = parseTime(program.endTime);
      const startMinutes = timeToMinutes(start.hours, start.minutes);
      const endMinutes = timeToMinutes(end.hours, end.minutes);

      if (currentMinutes >= startMinutes && currentMinutes < endMinutes) {
        currentProgram = {
          title: program.title,
          startTime: program.startTime,
          endTime: program.endTime,
          isReplay: program.isReplay || false
        };

        // Il prossimo programma è quello dopo
        if (i + 1 < todaySchedule.length) {
          const next = todaySchedule[i + 1];
          nextProgram = {
            title: next.title,
            startTime: next.startTime,
            endTime: next.endTime,
            isReplay: next.isReplay || false
          };
        } else {
          // Se è l'ultimo programma, prendi il primo di domani
          const tomorrowDay = (dayOfWeek + 1) % 7;
          const tomorrowSchedule = WEEKLY_SCHEDULE[tomorrowDay] || [];
          if (tomorrowSchedule.length > 0) {
            const next = tomorrowSchedule[0];
            nextProgram = {
              title: next.title,
              startTime: next.startTime,
              endTime: next.endTime,
              isReplay: next.isReplay || false
            };
          }
        }
        break;
      }
    }

    // Se non c'è programma corrente, trova il prossimo
    if (!currentProgram) {
      for (let i = 0; i < todaySchedule.length; i++) {
        const program = todaySchedule[i];
        const start = parseTime(program.startTime);
        const startMinutes = timeToMinutes(start.hours, start.minutes);

        if (currentMinutes < startMinutes) {
          nextProgram = {
            title: program.title,
            startTime: program.startTime,
            endTime: program.endTime,
            isReplay: program.isReplay || false
          };
          break;
        }
      }

      // Se non c'è nessun programma dopo, prendi il primo di domani
      if (!nextProgram) {
        const tomorrowDay = (dayOfWeek + 1) % 7;
        const tomorrowSchedule = WEEKLY_SCHEDULE[tomorrowDay] || [];
        if (tomorrowSchedule.length > 0) {
          const next = tomorrowSchedule[0];
          nextProgram = {
            title: next.title,
            startTime: next.startTime,
            endTime: next.endTime,
            isReplay: next.isReplay || false
          };
        }
      }
    }

    setProgramState({
      current: currentProgram,
      next: nextProgram,
      loading: false
    });
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        announceToScreenReader(`${stationName} in pausa`);
      } else {
        setHasError(false);
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            announceToScreenReader(`${stationName} in riproduzione`);
          })
          .catch((error) => {
            console.error('Errore riproduzione:', error);
            setHasError(true);
            setIsPlaying(false);
            announceToScreenReader('Errore nel caricamento dello stream. Verifica la tua connessione.');
          });
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      announceToScreenReader(isMuted ? 'Audio attivato' : 'Audio disattivato');
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
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

  const currentProgramDisplay = programState.current || {
    title: 'Programmazione musicale',
    startTime: '--:--',
    endTime: '--:--',
    isReplay: false
  };

  return (
    <div
      className="p-0"
      role="region"
      aria-label={`Player radio ${stationName}`}
    >
      <audio
        ref={audioRef}
        src={streamUrl}
        preload="none"
        onError={() => {
          setHasError(true);
          setIsPlaying(false);
        }}
        onLoadedData={() => setHasError(false)}
      />

      {/* Messaggio errore - solo quando c'è un errore di caricamento */}
      {hasError && (
        <div className="bg-destructive/10 border-2 border-destructive rounded-sm p-4 mb-4" role="alert">
          <p className="text-sm font-medium text-destructive-foreground">
            <strong>Errore di connessione:</strong> Impossibile caricare lo streaming.
            Verifica la tua connessione internet o riprova più tardi.
            Puoi anche ascoltare Radio Oltre chiamando il{' '}
            <a href="tel:+390512091411" className="font-bold underline">
              051 209 1411
            </a>
          </p>
        </div>
      )}

      <div className="flex flex-col gap-6">
        {/* Titolo e stato */}
        <div>
          {/* Descrizione */}
          <div className="mb-3">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Radio Oltre è la prima radio italiana interamente dedicata ai temi dell'inclusione e dell'accessibilità.
              Programmi, interviste, musica e approfondimenti per una società più equa e accessibile per tutti.
            </p>
            {websiteUrl && (
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm mt-2 font-bold no-underline hover:underline"
                style={{ color: '#D75220' }}
              >
                Visita il sito
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            )}
          </div>

          <div className="flex items-center gap-2 mb-4" role="status" aria-live="polite">
            <div
              className={`w-3 h-3 rounded-full ${isPlaying ? 'animate-pulse' : ''}`}
              style={{ backgroundColor: isPlaying ? '#D75220' : '#9ca3af' }}
              aria-hidden="true"
            />
            <span className="text-sm font-bold">
              {isPlaying ? 'In riproduzione' : 'In pausa'}
            </span>
          </div>

          {/* Programma Corrente */}
          {!programState.loading && (
            <div className="p-4 mb-3 rounded-[9px]" style={{ backgroundColor: '#FFDED2' }}>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full animate-pulse mt-2" style={{ backgroundColor: '#D75220' }} aria-hidden="true" />
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: '#D75220' }}>
                    • In Onda Ora
                  </p>
                  <p className="font-bold text-lg text-foreground mb-1">
                    {currentProgramDisplay.title}
                    {currentProgramDisplay.isReplay && (
                      <span className="ml-2 text-xs font-normal bg-muted text-muted-foreground px-2 py-1 rounded-sm">
                        Replica
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {currentProgramDisplay.startTime} - {currentProgramDisplay.endTime}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Prossimo programma */}
          {!programState.loading && programState.next && (
            <div className="p-3 rounded-[9px] border-2" style={{ borderColor: '#D75220' }}>
              <div className="flex items-start gap-2">
                <Calendar className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#D75220' }} aria-hidden="true" />
                <div className="flex-1">
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    Prossimo Programma
                  </p>
                  <p className="font-bold text-foreground">
                    {programState.next.title}
                    {programState.next.isReplay && (
                      <span className="ml-2 text-xs font-normal bg-muted text-muted-foreground px-2 py-1 rounded-sm">
                        Replica
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Ore {programState.next.startTime}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Fallback quando non ci sono programmi */}
          {!programState.loading && !programState.current && !programState.next && (
            <div className="bg-secondary border-l-4 border-muted-foreground p-3 rounded-sm">
              <p className="text-sm text-muted-foreground">
                Musica in programmazione libera
              </p>
            </div>
          )}
        </div>

        {/* Controlli principali */}
        <div className="flex items-center gap-4">
          <button
            onClick={togglePlay}
            className="min-w-[56px] min-h-[56px] rounded-full flex items-center justify-center transition-colors shadow-lg text-white"
            style={{ backgroundColor: '#D75220' }}
            aria-label={isPlaying ? 'Metti in pausa' : 'Riproduci'}
          >
            {isPlaying ? (
              <Pause className="w-8 h-8" aria-hidden="true" />
            ) : (
              <Play className="w-8 h-8" aria-hidden="true" />
            )}
          </button>

          {/* Controllo volume */}
          <div className="flex-1 flex items-center gap-3">
            <button
              onClick={toggleMute}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-secondary rounded-sm transition-colors"
              aria-label={isMuted ? 'Attiva audio' : 'Disattiva audio'}
              aria-pressed={isMuted}
            >
              {isMuted ? (
                <VolumeX className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Volume2 className="w-6 h-6" aria-hidden="true" />
              )}
            </button>

            <label className="flex-1 flex items-center gap-2 sm:gap-3">
              <span className="text-sm font-medium hidden sm:inline-block sm:min-w-[60px]">Volume:</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="flex-1 h-[44px] cursor-pointer"
                style={{ accentColor: '#D75220' }}
                aria-label="Controllo volume"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(volume * 100)}
                aria-valuetext={`Volume al ${Math.round(volume * 100)}%`}
              />
              <span className="text-sm min-w-[35px] sm:min-w-[40px] font-normal" aria-hidden="true">
                {Math.round(volume * 100)}%
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
