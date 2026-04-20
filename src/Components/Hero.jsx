import React, { useState, useEffect } from 'react';
import { motion as Motion } from 'framer-motion';

const Hero = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [randomRotations, setRandomRotations] = useState({ card1: -6, card2: 3 });

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setRandomRotations({
        card1: Math.floor(Math.random() * 21) - 10, // -10 to 10 deg
        card2: Math.floor(Math.random() * 21) - 10, // -10 to 10 deg
      });
    }
  }, []);

  const getXShift = (cardIndex) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    if (isMobile) return 0;

    if (hoveredCard === null) return 0;
    if (cardIndex === hoveredCard) return 0;
    if (cardIndex < hoveredCard) return -30;
    if (cardIndex > hoveredCard) return 70;  
  };

  return (
    <section className="bg-[#f5f0e8] md:px-16 pt-24 md:pt-40 pb-4 md:pb-32 overflow-hidden relative z-0 md:min-h-[90vh]">
      {/* Search/Headline Text */}
      <div className="max-w-5xl mb-4 px-2 md:px-0">
        <h1 className="text-[2.5rem] md:text-[6.4rem] font-semibold md:font-bold text-black leading-[0.95] tracking-[-0.05em]">
          {/* Mobile */}
          <span className="md:hidden">
            Get Hyped.<br />Get Noticed.<br />Get Results.
          </span>
          {/* Desktop*/}
          <span className="hidden md:inline">
            Get Hyped. Get <br /> Noticed. Get Results. 
          </span>
        </h1>
        <p className="mt-6 text-sm md:text-xl text-black font-medium max-w-xs leading-[1.3]">
          Klaar met gokken op content<br className="md:hidden" /> die niets oplevert?
        </p>
      </div>

      {/* Cards Area */}
      <div className="flex items-center md:items-end justify-center md:gap-0 flex-nowrap overflow-visible pb-4 z-10 relative">

        {/* Card 1 */}
        <Motion.div
          onMouseEnter={() => setHoveredCard(1)}
          onMouseLeave={() => setHoveredCard(null)}
          className="shrink-0 relative block"
          style={{ marginBottom: '-6px' }}
          initial={{ opacity: 0, y: 60 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            x: getXShift(1),
            rotate: hoveredCard === 1 ? 0 : randomRotations.card1,
            scale: hoveredCard === 1 ? 1.08 : 1,
            zIndex: hoveredCard === 1 ? 50 : 4,
          }}
        >
          <div
            className="results-card relative rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer shadow-[4px_4px_16px_rgba(0,0,0,0.1)] w-[47vw] h-[65vw] md:w-[380px] md:h-[480px]"
            style={{ background: '#2979FF' }}
          >
            <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-between">
              <span className="text-[2.5rem] md:text-7xl font-black text-black leading-none tracking-tight">
                10M+
              </span>
              <div className="border-t border-black/30 pt-2 md:pt-4">
                <p className="text-black font-bold text-[0.8rem] md:text-base leading-tight">
                  Organische views
                </p>
                <p className="text-black/70 text-[0.65rem] md:text-base mt-2 leading-tight">
                  Groei door slimme content
                </p>
              </div>
            </div>
          </div>
        </Motion.div>

        {/* Card 2 */}
        <Motion.div
          onMouseEnter={() => setHoveredCard(2)}
          onMouseLeave={() => setHoveredCard(null)}
          className="shrink-0 relative block -ml-6 md:-ml-12"
          style={{ marginBottom: '-3px' }}
          initial={{ opacity: 0, y: 60 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            x: getXShift(2),
            rotate: hoveredCard === 2 ? 0 : randomRotations.card2,
            scale: hoveredCard === 2 ? 1.08 : 1,
            zIndex: hoveredCard === 2 ? 50 : 3,
          }}
        >
          <div className="results-card relative rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer shadow-[4px_4px_16px_rgba(0,0,0,0.1)] w-[47vw] h-[65vw] md:w-[380px] md:h-[480px]">
            <img
              src="https://cdn.prod.website-files.com/6848603da8e6ac95794b7498/69c40296636e683096701cda_video-thumb-01.avif"
              className="absolute inset-0 w-full h-full object-cover"
              alt=""
            />
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              src="https://gethyped.b-cdn.net/Salontopper/Loop%20Salontopper.mp4"
            />
          </div>
        </Motion.div>

        {/* Card 3 */}
        <Motion.div
          onMouseEnter={() => setHoveredCard(3)}
          onMouseLeave={() => setHoveredCard(null)}
          className="shrink-0 relative hidden sm:block -ml-10 md:-ml-12"
          style={{ marginBottom: '20px' }}
          initial={{ opacity: 0, y: 60 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            x: getXShift(3),
            rotate: hoveredCard === 3 ? 0 : -3,
            scale: hoveredCard === 3 ? 1.08 : 1,
            zIndex: hoveredCard === 3 ? 50 : 2,
          }}
        >
          <div
            className="results-card relative rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer shadow-[4px_4px_16px_rgba(0,0,0,0.1)] w-[47vw] h-[65vw] md:w-[380px] md:h-[480px]"
            style={{ background: '#00C896' }}
          >
            <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-between">
              <span className="text-[2.5rem] md:text-7xl font-black text-black leading-none tracking-tight">
                30+
              </span>
              <div className="border-t border-black/30 pt-2 md:pt-4">
                <p className="text-black font-bold text-[0.8rem] md:text-base leading-tight">
                  Merken geholpen
                </p>
                <p className="text-black/70 text-[0.65rem] md:text-base mt-2 leading-tight">
                  Van start-up tot multinational
                </p>
              </div>
            </div>
          </div>
        </Motion.div>

        {/* Card 4 */}
        <Motion.div
          onMouseEnter={() => setHoveredCard(4)}
          onMouseLeave={() => setHoveredCard(null)}
          className="shrink-0 relative hidden md:block -ml-10 md:-ml-12"
          style={{ marginBottom: '0px' }}
          initial={{ opacity: 0, y: 60 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            x: getXShift(4),
            rotate: hoveredCard === 4 ? 0 : 6,
            scale: hoveredCard === 4 ? 1.08 : 1,
            zIndex: hoveredCard === 4 ? 50 : 1,
          }}
        >
          <div className="results-card relative rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer shadow-[4px_4px_16px_rgba(0,0,0,0.1)] w-[47vw] h-[65vw] md:w-[380px] md:h-[480px]">
            <img
              src="https://cdn.prod.website-files.com/6848603da8e6ac95794b7498/69c402fa5b2a05b98200d317_video-thumb-02.avif"
              className="absolute inset-0 w-full h-full object-cover"
              alt=""
            />
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              src="https://gethyped.b-cdn.net/Petrol%20Head/petrolhead-loop.mp4"
            />
          </div>
        </Motion.div>

      </div>
    </section>
  );
};

export default Hero;