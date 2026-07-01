import { LucideIcon } from 'lucide-react';

interface WhoWeServeCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

/**
 * Card per sezione "Chi Serviamo" - navigazione per persona
 * Ispirato al Braille Institute
 */
export function WhoWeServeCard({
  icon: Icon,
  title,
  description
}: WhoWeServeCardProps) {
  return (
    <div className="border-2 border-primary p-5 rounded-xl bg-[#ffffff]">
      <div className="flex flex-col gap-3 h-full">
        <div className="w-12 h-12 bg-primary text-primary-foreground rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6" aria-hidden="true" />
        </div>

        <div className="flex-1">
          <h3 className="text-base font-bold mb-2">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
