import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * LenisProvider Component
 * Integrates Lenis for momentum-based smooth scrolling.
 * Synchronized with GSAP ScrollTrigger for performance-critical animations.
 */
const LenisProvider = ({ children }) => {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8, // Slightly softer feel
      touchMultiplier: 2,
      infinite: false,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    // Integrate with GSAP ticker for high-performance RAF
    const update = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Global access for potential debugging or external control
    window.lenis = lenis;

    return () => {
      lenis.destroy();
      gsap.ticker.remove(update);
      window.lenis = null;
    };
  }, []);

  return <>{children}</>;
};

export default LenisProvider;
