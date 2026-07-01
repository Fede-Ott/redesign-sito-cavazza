import { CheckCircle, X } from 'lucide-react';
import { useEffect } from 'react';

interface NewsletterNotificationProps {
  isVisible: boolean;
  onClose: () => void;
  language: 'it' | 'en';
}

export function NewsletterNotification({ isVisible, onClose, language }: NewsletterNotificationProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const messages = {
    title: {
      it: 'Iscrizione Confermata!',
      en: 'Subscription Confirmed!'
    },
    message: {
      it: 'Grazie per esserti iscritto alla nostra newsletter. Riceverai aggiornamenti su eventi, progetti e notizie.',
      en: 'Thank you for subscribing to our newsletter. You will receive updates on events, projects and news.'
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 animate-slide-up">
      <div className="bg-accent text-accent-foreground rounded-xl shadow-2xl max-w-md border-4 border-primary">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <CheckCircle className="w-8 h-8" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2">{messages.title[language]}</h3>
              <p className="text-sm leading-relaxed">{messages.message[language]}</p>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 min-w-[32px] min-h-[32px] flex items-center justify-center hover:opacity-80 transition-opacity"
              aria-label={language === 'it' ? 'Chiudi' : 'Close'}
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
