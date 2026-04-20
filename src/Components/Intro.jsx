import React, { useEffect, useRef, useState } from 'react';
import { motion as Motion } from 'framer-motion';

const BOUNCE_EASE = [0.34, 2.27, 0.64, 1];
const SLIDE_EASE = [0.32, 0.72, 0, 1];

const JellyButton = ({ href, children }) => {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  const state = active ? 'pressed' : hovered ? 'hover' : 'idle';

  const innerVariants = {
    idle: { skewY: 0, rotate: 0, scale: 1 },
    hover: {
      skewY: -4, rotate: -1, scale: 1.02,
      transition: { duration: 0.3, ease: BOUNCE_EASE }
    },
    pressed: {
      skewY: 0, rotate: 0, scale: 0.95,
      transition: { duration: 0.1, ease: 'easeOut' }
    },
  };

  const iconVariants = {
    idle: {
      scale: 1,
      backgroundColor: '#1A1A1A',
      color: '#FAF4EC'
    },
    hover: {
      scale: 0.92,
      backgroundColor: '#1A1A1A',
      color: '#FAF4EC',
      transition: { duration: 0.2, ease: 'easeOut' }
    },
    pressed: {
      scale: 1,
      backgroundColor: '#1A1A1A',
      color: '#FAF4EC'
    },
  };

  return (
    <Motion.a
      href={href}
      className="relative inline-flex items-center gap-4 py-2 pl-6 pr-2 border border-black rounded-lg overflow-hidden cursor-pointer select-none"
      style={{ WebkitTapHighlightColor: 'transparent' }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => { setHovered(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      variants={innerVariants}
      animate={state}
      initial="idle"
    >
      <span className="relative z-10 flex items-center gap-4">
        <span className="font-semibold text-[1rem] tracking-tight text-[#1A1A1A]">
          {children}
        </span>
        <Motion.span
          className="flex items-center justify-center w-10 h-10 rounded-lg border border-black"
          variants={iconVariants}
          animate={state}
          initial="idle"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 22 21" fill="none">
            <path d="M11.2832 20.9176L9.14509 18.8002L15.5491 12.3962L-0.00939941 12.3962L-0.00939941 9.30322L15.5491 9.30322L9.14509 2.9096L11.2832 0.78186L21.3511 10.8497L11.2832 20.9176Z" fill="currentColor" />
          </svg>
        </Motion.span>
      </span>
    </Motion.a>
  );
};

const DownArrowSvg = ({ color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 26 27" fill="none">
    <path
      d="M0.876668 14.4267L3.42629 11.852L11.1376 19.5634L11.1376 0.828689L14.8621 0.828689L14.8621 19.5634L22.5609 11.852L25.123 14.4267L12.9999 26.5498L0.876668 14.4267Z"
      fill={color}
    />
  </svg>
);

const IconArrowButton = ({ href }) => {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  const state = active ? 'pressed' : hovered ? 'hover' : 'idle';

  // Skew animation to match the JellyButton
  const innerVariants = {
    idle: { skewX: 0, rotate: 0, scale: 1 },
    hover: {
      skewX: -1, rotate: -1, scale: 1.02,
      transition: { duration: 0.3, ease: BOUNCE_EASE }
    },
    pressed: {
      skewX: 0, rotate: 0, scale: 0.95,
      transition: { duration: 0.1, ease: 'easeOut' }
    },
  };

  return (
    <Motion.a
      href={href}
      className="relative flex items-center justify-center w-11 h-11 border border-black rounded-xl overflow-hidden cursor-pointer select-none bg-white"
      variants={innerVariants}
      animate={state}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => { setHovered(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
        <Motion.span
          className="absolute"
          animate={{ y: hovered ? '200%' : '0%' }}
          transition={{ duration: 0.4, ease: SLIDE_EASE }}
        >
          <DownArrowSvg color="#E84E1B" />
        </Motion.span>
        <Motion.span
          className="absolute"
          initial={{ y: '-200%' }}
          animate={{ y: hovered ? '0%' : '-200%' }}
          transition={{ duration: 0.4, ease: SLIDE_EASE }}
        >
          <DownArrowSvg color="#E84E1B" />
        </Motion.span>
      </div>
    </Motion.a>
  );
};

/* ─── Intro Section ───────────────────────────────────── */

const Intro = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) video.play();
        else { video.pause(); video.currentTime = 0; }
      });
    }, { threshold: 0.25 });
    observer.observe(video);
    return () => observer.unobserve(video);
  }, []);

  return (
    <section id="intro-home" className="section_intro bg-[#FAF4EC] py-6 md:py-32 overflow-hidden">
      <div className="padding-global max-w-[1440px] mx-auto px-5 md:px-8">
        <div className="container-col-12">

          {/* Main Heading — matching Webflow's structure */}
          <div className="grid grid-cols-1 lg:grid-cols-12 mb-12 lg:mb-32">
            <div className="lg:col-span-12">
              <h2 className="text-[1.55rem] md:text-[3.5rem] lg:text-[4rem] font-semibold text-black leading-[1.1] tracking-[-0.04em] max-w-[1280px]">
                Wij maken content die<br className="md:hidden" />
                opvalt. Die blijft hangen.<br className="md:hidden" /><br className="hidden md:block" />
                Die jouw doelgroep<br className="md:hidden" />
                raakt en jouw merk in<br className="md:hidden" /><br className="hidden md:block" />
                beweging brengt. Snel,<br className="md:hidden" />
                krachtig en energiek.
              </h2>
            </div>
          </div>

          {/* Bottom Grid: Video + Content + Scroll Button */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-end">

            {/* 1. Small Video Card (md:col-span-3) */}
            <div className="p-1 md:col-span-5 lg:col-span-3 order-1 rotate-[4deg] md:rotate-0 transition-transform max-w-[86%] md:max-w-none">
              <div className="small-image aspect-[2/3] md:aspect-4/5 rounded-xl overflow-hidden relative shadow-lg">
                <img
                  src="https://cdn.prod.website-files.com/6848603da8e6ac95794b7498/6894757aa6dd3f84f6e463a2_Anniek%20Bril.webp"
                  alt="Anniek Bril"
                  className="w-full h-full object-cover hidden md:block"
                />
                <video
                  ref={videoRef}
                  muted loop playsInline autoPlay
                  className="w-full h-full object-cover md:hidden"
                  src="https://gethyped.b-cdn.net/New%20Reach/new-reach-loop.mp4"
                />
              </div>
            </div>

            {/* 2. Content Wrap (md:col-span-6) */}
            <div className="md:col-span-7 lg:col-span-6 lg:col-start-5 order-2">
              <div className="content-wrap flex flex-col gap-10">
                <p className="text-[1.25rem] md:text-[1.5rem] font-medium text-black leading-[1.4] max-w-[540px]">
                  We stoppen niet bij mooie plaatjes en vette beelden. We maken het meetbaar. Zo weet je precies wat werkt en wat niet. Nooit meer content zonder strategie. Nooit meer content zonder resultaat.
                </p>
                <div className="button-wrap">
                  <JellyButton href="/about">Leer ons kennen</JellyButton>
                </div>
              </div>
            </div>

            {/* 3. Icon Button (lg:col-span-1) */}
            <div className="hidden lg:flex md:col-span-12 lg:col-span-2 justify-end order-3 lg:mb-0">
              <IconArrowButton href="#expertises" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
