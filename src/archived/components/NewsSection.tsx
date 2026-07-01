import { Calendar, ArrowRight } from 'lucide-react';
import { type Lang } from '../i18n';

interface NewsItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  link: string;
}

interface NewsSectionProps {
  news: NewsItem[];
  language: Lang;
  onNavigate: (page: 'eventi', tab?: string) => void;
}

export function NewsSection({ news, language, onNavigate }: NewsSectionProps) {
  const title = language === 'it' ? 'Ultime Notizie dall\'Istituto' : 'Latest News from the Institute';
  const readMore = language === 'it' ? 'Leggi di più' : 'Read more';

  return (
    <section className="bg-secondary py-12" aria-labelledby="news-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="news-title" className="text-3xl font-bold mb-8">
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <article
              key={item.id}
              className="bg-background border-2 border-border p-6 hover:border-primary hover:shadow-lg transition-all rounded-[9px]"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <Calendar className="w-4 h-4" aria-hidden="true" />
                <time dateTime={item.date}>{item.date}</time>
              </div>

              <h3 className="text-xl font-bold mb-3 leading-tight">
                {item.title}
              </h3>

              <p className="text-foreground leading-relaxed mb-4">
                {item.excerpt}
              </p>

              <button
                onClick={() => onNavigate('eventi', 'notizie')}
                className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all no-underline bg-transparent border-0 cursor-pointer p-0"
              >
                <span>{readMore}</span>
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
