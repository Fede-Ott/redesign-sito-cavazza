import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from './Button';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
}

/**
 * Card per servizio con:
 * - Icona + testo (doppia codifica visiva)
 * - Spaziature generose
 * - Contrasto elevato
 * - Hover state chiaro
 */
export function ServiceCard({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref
}: ServiceCardProps) {
  return (
    <article className="bg-card border-2 border-border rounded-sm p-6 flex flex-col gap-4 hover:border-primary transition-colors">
      <div className="flex items-start gap-4">
        <div
          className="w-14 h-14 bg-primary text-primary-foreground rounded-sm flex items-center justify-center flex-shrink-0"
          aria-hidden="true"
        >
          <Icon className="w-8 h-8" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
        </div>
      </div>

      <p className="text-foreground leading-relaxed flex-1">
        {description}
      </p>

      <div className="pt-2">
        <Button
          variant="primary"
          onClick={() => {
            const element = document.querySelector(actionHref);
            element?.scrollIntoView({ behavior: 'smooth' });
          }}
          aria-label={`Vai a ${title}`}
        >
          {actionLabel}
        </Button>
      </div>
    </article>
  );
}
