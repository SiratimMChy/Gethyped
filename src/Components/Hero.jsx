import React, { useEffect, useRef } from 'react';
import { motion as Motion } from 'framer-motion';
import { gsap } from 'gsap';


const Hero = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('.results-card');
    const cardsLength = cards.length;

    // ✅ Subtle angles like reference image
    const rotations = [-6, -3, 2, 6];
    const xOffsets = [-2, -1, 1, 2]; // minimal offset
    const yOffsets = [1, -1, 1, -1];

    cards.forEach((card, index) => {
      gsap.set(card, {
        xPercent: xOffsets[index] || 0,
        yPercent: yOffsets[index] || 0,
        rotation: rotations[index] || 0,
      });
    });

    let currentPortion = 0;

    const onMove = (e) => {
      const containerW = container.clientWidth;
      const mouseX = e.clientX - container.getBoundingClientRect().left;
      const activePortion = Math.ceil((mouseX / containerW) * cardsLength);

      if (
        currentPortion !== activePortion &&
        activePortion > 0 &&
        activePortion <= cardsLength
      ) {
        if (currentPortion !== 0) resetPortion(currentPortion - 1);
        currentPortion = activePortion;
        newPortion(currentPortion - 1);
      }
    };

    const onLeave = () => {
      resetPortion(currentPortion - 1);
      currentPortion = 0;

      gsap.to(cards, {
        xPercent: (index) => xOffsets[index] || 0,
        yPercent: (index) => yOffsets[index] || 0,
        rotation: (index) => rotations[index] || 0,
        ease: 'elastic.out(1, 0.75)',
        duration: 0.8,
      });
    };

    function resetPortion(index) {
      if (index < 0 || index >= cardsLength) return;

      gsap.to(cards[index], {
        xPercent: xOffsets[index] || 0,
        yPercent: yOffsets[index] || 0,
        rotation: rotations[index] || 0,
        scale: 1,
        duration: 0.8,
        ease: 'elastic.out(1, 0.75)',
      });
    }

    function newPortion(i) {
      gsap.to(cards[i], {
        xPercent: 0,
        yPercent: 0,
        rotation: 3,
        scale: 1.06,
        duration: 0.8,
        ease: 'elastic.out(1, 0.75)',
      });

      cards.forEach((card, index) => {
        gsap.to(card, {
          xPercent: index !== i ? 24 / (index - i) : 0,
          ease: 'elastic.out(1, 0.75)',
          duration: 0.8,
        });
      });
    }

    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseleave', onLeave);

    return () => {
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <section className="bg-[#f5f0e8]  md:px-16 pt-16 pb-32 overflow-hidden relative z-0">

      {/* Headline + Subtitle */}
      <div className="max-w-5xl mb-5">

        {/* Headline */}
        <h1 className="text-5xl md:text-[6rem] font-bold text-black leading-[0.9] tracking-tight">
          Get Hyped. Get Noticed. Get Results.
        </h1>

        {/* Subtitle */}
        <p className="mt-8 text-lg md:text-xl text-black font-medium max-w-xs">
          Klaar met gokken op content die niets oplevert?
        </p>

      </div>

      {/* Cards */}
      <div
        ref={containerRef}
        className="flex items-end justify-center gap-1 md:gap-2 flex-wrap md:flex-nowrap overflow-x-auto md:overflow-visible pb-4 px-8"
        style={{ zIndex: 10 }}
      >

        {/* Card 1 */}
        <Motion.div
          className="results-card relative shrink-0 rounded-3xl overflow-hidden cursor-pointer"
          style={{
            background: '#2979FF',
            width: 'clamp(200px, 90vw, 360px)',
            height: 'clamp(280px, 105vw, 420px)',
            transform: 'rotate(-14deg)',
            marginBottom: '20px',
            marginRight: '-30px',
          }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="absolute inset-0 p-3 flex flex-col justify-between">
            <span className="text-7xl font-black text-black">10M+</span>
            <div className="border-t border-black/30 pt-2">
              <p className="text-black font-bold text-base">Organische views</p>
              <p className="text-black/60 text-base mt-1">Groei door slimme content</p>
            </div>
          </div>
        </Motion.div>

        {/* Card 2 */}
        <Motion.div
          className="results-card relative shrink-0 rounded-3xl overflow-hidden cursor-pointer"
          style={{
            width: 'clamp(200px, 90vw, 360px)',
            height: 'clamp(280px, 105vw, 420px)',
            transform: 'rotate(-14deg)',
            marginBottom: '0px',
          }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <img src="https://cdn.prod.website-files.com/6848603da8e6ac95794b7498/69c40296636e683096701cda_video-thumb-01.avif" className="absolute inset-0 w-full h-full object-cover" alt="" />
          <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline src="https://gethyped.b-cdn.net/Salontopper/Loop%20Salontopper.mp4" />
        </Motion.div>

        {/* Card 3 */}
        <Motion.div
          className="results-card relative shrink-0 rounded-3xl overflow-hidden cursor-pointer hidden sm:block"
          style={{
            background: '#00C896',
            width: 'clamp(200px, 90vw, 360px)',
            height: 'clamp(280px, 105vw, 420px)',
            transform: 'rotate(-14deg)',
            marginBottom: '20px',
            marginRight: '-30px',
          }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="absolute inset-0 p-3 flex flex-col justify-between">
            <span className="text-7xl font-black text-black">30+</span>
            <div className="border-t border-black/30 pt-2">
              <p className="text-black font-bold text-base">Merken geholpen</p>
              <p className="text-black/60 text-base mt-1">Van start-up tot multinational</p>
            </div>
          </div>
        </Motion.div>

        {/* Card 4 */}
        <Motion.div
          className="results-card relative shrink-0 rounded-3xl overflow-hidden cursor-pointer hidden md:block"
          style={{
            width: 'clamp(200px, 90vw, 360px)',
            height: 'clamp(280px, 105vw, 420px)',
            transform: 'rotate(18deg)',
            marginBottom: '0px',
          }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <img src="https://cdn.prod.website-files.com/6848603da8e6ac95794b7498/69c402fa5b2a05b98200d317_video-thumb-02.avif" className="absolute inset-0 w-full h-full object-cover" alt="" />
          <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline src="https://gethyped.b-cdn.net/Petrol%20Head/petrolhead-loop.mp4" />
        </Motion.div>

      </div>
    </section>
  );
};

export default Hero;