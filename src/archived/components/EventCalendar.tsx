import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { Button } from '../components/Button';
import { useTranslation, type Lang } from '../i18n';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  format: 'online' | 'in-person' | 'hybrid';
  category: string;
  spots?: number;
  description: string;
}

interface EventCardProps {
  event: Event;
}

function EventCard({ event }: EventCardProps) {
  const formatBadge = {
    online: { label: 'Online', color: 'bg-primary text-primary-foreground' },
    'in-person': { label: 'In Presenza', color: 'bg-accent text-accent-foreground' },
    hybrid: { label: 'Ibrido', color: 'bg-secondary text-secondary-foreground border-2 border-border' }
  };

  const badge = formatBadge[event.format];

  return (
    <article className="bg-card border-2 border-border p-6 hover:border-primary transition-colors rounded-[9px]">
      <div className="flex flex-col gap-4">
        {/* Header con badge */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-3 py-1 rounded-sm text-sm font-bold ${badge.color}`}>
                {badge.label}
              </span>
              <span className="px-3 py-1 bg-muted text-muted-foreground rounded-sm text-sm font-medium">
                {event.category}
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2">{event.title}</h3>
          </div>
        </div>

        {/* Info evento */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-accent" aria-hidden="true" />
            <span className="font-medium">{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-accent" aria-hidden="true" />
            <span>{event.time}</span>
          </div>
          {event.format === 'in-person' && (
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-accent" aria-hidden="true" />
              <span>Via Castiglione 71, Bologna</span>
            </div>
          )}
          {event.spots && (
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-accent" aria-hidden="true" />
              <span>{event.spots} posti disponibili</span>
            </div>
          )}
        </div>

        {/* Descrizione */}
        <p className="text-foreground leading-relaxed">
          {event.description}
        </p>

        {/* CTA */}
        <div className="pt-2">
          <Button
            variant="primary"
            onClick={() => alert(`Iscrizione a: ${event.title}`)}
          >
            Iscriviti Gratis
          </Button>
        </div>
      </div>
    </article>
  );
}

interface EventCalendarProps {
  events: Event[];
  language: Lang;
}

export function EventCalendar({ events, language }: EventCalendarProps) {
  const t = useTranslation(language);

  return (
    null
  );
}
