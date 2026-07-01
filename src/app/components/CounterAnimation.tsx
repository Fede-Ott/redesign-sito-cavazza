import { useState, useEffect, useRef } from 'react';

interface CounterAnimationProps {
  end: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export function CounterAnimation({
  end,
  duration = 2000,
  suffix = '',
  className = ''
}: CounterAnimationProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    // Controlla se le animazioni sono fermate
    const checkStopAnimations = () => {
      return document.documentElement.classList.contains('accessibility-stop-animations');
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Se le animazioni sono fermate, mostra subito il valore finale
            if (checkStopAnimations()) {
              setCount(end);
              return;
            }

            // Reset and animate
            setCount(0);

            if (animationRef.current) {
              cancelAnimationFrame(animationRef.current);
            }

            const startTime = Date.now();
            const endTime = startTime + duration;

            const animate = () => {
              // Controlla di nuovo se le animazioni sono state fermate durante l'animazione
              if (checkStopAnimations()) {
                setCount(end);
                if (animationRef.current) {
                  cancelAnimationFrame(animationRef.current);
                }
                return;
              }

              const now = Date.now();
              const remaining = Math.max(0, endTime - now);
              const progress = Math.min(1, 1 - remaining / duration);

              const easeOutQuad = (t: number) => t * (2 - t);
              const easedProgress = easeOutQuad(progress);

              const currentCount = Math.round(easedProgress * end);
              setCount(currentCount);

              if (progress < 1) {
                animationRef.current = requestAnimationFrame(animate);
              } else {
                setCount(end);
              }
            };

            animationRef.current = requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    // Listener per cambiamenti nelle impostazioni di accessibilità
    const handleAccessibilityChange = () => {
      if (checkStopAnimations()) {
        setCount(end);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      }
    };

    window.addEventListener('accessibilitychange', handleAccessibilityChange);

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('accessibilitychange', handleAccessibilityChange);
    };
  }, [end, duration]);

  return (
    <div ref={elementRef} className={className}>
      {count}{suffix}
    </div>
  );
}
