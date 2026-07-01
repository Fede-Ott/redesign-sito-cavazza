import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation, type Lang } from '../i18n';
import { useRef, useEffect, useState } from 'react';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
}

/**
 * Componente Testimonianza accessibile
 * Ispirato al Braille Institute - enfasi su empowerment e capacità
 */
export function Testimonial({ quote, author, role }: TestimonialProps) {
  return (
    <blockquote className="border-2 border-accent p-6 rounded-[9px]">
      <div className="flex gap-4">
        <Quote
          className="w-10 h-10 text-accent flex-shrink-0"
          aria-hidden="true"
        />
        <div>
          <p className="text-lg leading-relaxed mb-4 italic">
            "{quote}"
          </p>
          <footer className="not-italic">
            <cite className="font-bold text-foreground not-italic">
              {author}
            </cite>
            <p className="text-sm text-muted-foreground mt-1">
              {role}
            </p>
          </footer>
        </div>
      </div>
    </blockquote>
  );
}

interface TestimonialSectionProps {
  testimonials: Array<{
    quote: string;
    author: string;
    role: string;
  }>;
  language: Lang;
}

export function TestimonialSection({ testimonials, language }: TestimonialSectionProps) {
  const t = useTranslation(language);
  const scrollContainerRefMobile = useRef<HTMLDivElement>(null);
  const scrollContainerRefDesktop = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    const isMobile = window.innerWidth < 500;
    const containerRef = isMobile ? scrollContainerRefMobile : scrollContainerRefDesktop;
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollToNext = () => {
    const isMobile = window.innerWidth < 500;
    const containerRef = isMobile ? scrollContainerRefMobile : scrollContainerRefDesktop;
    if (containerRef.current) {
      const cardWidth = isMobile
        ? containerRef.current.clientWidth // Full width on mobile
        : 320 + 16; // w-80 (320px) + gap-4 (16px) on desktop
      containerRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  };

  const scrollToPrev = () => {
    const isMobile = window.innerWidth < 500;
    const containerRef = isMobile ? scrollContainerRefMobile : scrollContainerRefDesktop;
    if (containerRef.current) {
      const cardWidth = isMobile
        ? containerRef.current.clientWidth // Full width on mobile
        : 320 + 16; // w-80 (320px) + gap-4 (16px) on desktop
      containerRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  };

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      const isMobile = window.innerWidth < 500;
      const containerRef = isMobile ? scrollContainerRefMobile : scrollContainerRefDesktop;
      if (containerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
        // If we're at the end, scroll back to start
        if (scrollLeft >= scrollWidth - clientWidth - 10) {
          containerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollToNext();
        }
      }
    }, 5000); // Auto-scroll every 5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const containerMobile = scrollContainerRefMobile.current;
    const containerDesktop = scrollContainerRefDesktop.current;

    updateScrollButtons();

    if (containerMobile) {
      containerMobile.addEventListener('scroll', updateScrollButtons);
    }
    if (containerDesktop) {
      containerDesktop.addEventListener('scroll', updateScrollButtons);
    }

    window.addEventListener('resize', updateScrollButtons);

    return () => {
      if (containerMobile) {
        containerMobile.removeEventListener('scroll', updateScrollButtons);
      }
      if (containerDesktop) {
        containerDesktop.removeEventListener('scroll', updateScrollButtons);
      }
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, []);

  return (
    <section
      className="py-10 bg-[#ffffff]"
      aria-labelledby="testimonials-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <h2 id="testimonials-title" className="text-xl font-bold">
            {t('testimonials.title')}
          </h2>
          {/* Desktop: frecce in alto a destra */}
          <div className="hidden min-[500px]:flex gap-2">
            <button
              onClick={scrollToPrev}
              disabled={!canScrollLeft}
              aria-label={language === 'it' ? 'Testimonianza precedente' : 'Previous testimonial'}
              className="min-w-[40px] min-h-[40px] flex items-center justify-center bg-accent text-accent-foreground rounded-lg border-2 border-accent hover:bg-accent/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              onClick={scrollToNext}
              disabled={!canScrollRight}
              aria-label={language === 'it' ? 'Prossima testimonianza' : 'Next testimonial'}
              className="min-w-[40px] min-h-[40px] flex items-center justify-center bg-accent text-accent-foreground rounded-lg border-2 border-accent hover:bg-accent/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Mobile: container con frecce ai lati */}
        <div className="relative min-[500px]:hidden">
          <div
            ref={scrollContainerRefMobile}
            className="overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory testimonial-mobile-container"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style>{`
              .testimonial-mobile-container::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            <div className="flex gap-4 min-w-min px-4">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex-shrink-0 w-[calc(100vw-2rem)] snap-center">
                  <blockquote className="border-2 border-accent p-5 rounded-xl h-full">
                    <div className="flex flex-col gap-3 h-full">
                      <Quote
                        className="w-8 h-8 text-accent flex-shrink-0"
                        aria-hidden="true"
                      />
                      <p className="text-sm leading-relaxed italic flex-1">
                        "{testimonial.quote}"
                      </p>
                      <footer className="not-italic">
                        <cite className="font-bold text-foreground not-italic text-sm">
                          {testimonial.author}
                        </cite>
                        <p className="text-xs text-muted-foreground mt-1">
                          {testimonial.role}
                        </p>
                      </footer>
                    </div>
                  </blockquote>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: frecce ai lati sotto il carosello */}
          <div className="flex justify-between items-center mt-4 px-2">
            <button
              onClick={scrollToPrev}
              disabled={!canScrollLeft}
              aria-label={language === 'it' ? 'Testimonianza precedente' : 'Previous testimonial'}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center bg-accent text-accent-foreground rounded-lg border-2 border-accent hover:bg-accent/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-6 h-6" aria-hidden="true" />
            </button>
            <button
              onClick={scrollToNext}
              disabled={!canScrollRight}
              aria-label={language === 'it' ? 'Prossima testimonianza' : 'Next testimonial'}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center bg-accent text-accent-foreground rounded-lg border-2 border-accent hover:bg-accent/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Desktop: scroll container */}
        <div
          ref={scrollContainerRefDesktop}
          className="hidden min-[500px]:block overflow-x-auto pb-4 -mx-4 px-4 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex gap-4 min-w-min">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex-shrink-0 w-80">
                <blockquote className="border-2 border-accent p-5 rounded-xl h-full bg-[#ffffff]">
                  <div className="flex flex-col gap-3 h-full">
                    <Quote
                      className="w-8 h-8 text-accent flex-shrink-0"
                      aria-hidden="true"
                    />
                    <p className="text-sm leading-relaxed italic flex-1">
                      "{testimonial.quote}"
                    </p>
                    <footer className="not-italic">
                      <cite className="font-bold text-foreground not-italic text-sm">
                        {testimonial.author}
                      </cite>
                      <p className="text-xs text-muted-foreground mt-1">
                        {testimonial.role}
                      </p>
                    </footer>
                  </div>
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
