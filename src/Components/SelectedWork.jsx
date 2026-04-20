import React, { useState, useEffect, useRef } from 'react';
import { motion as Motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi';

const BOUNCE_EASE = [0.34, 1.56, 0.64, 1];

const JellyButton = ({ href, children }) => {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  const state = active ? 'pressed' : hovered ? 'hover' : 'idle';

  const innerVariants = {
    idle: { skewY: 0, rotate: 0, scale: 1, transition: { duration: 0.45, ease: BOUNCE_EASE } },
    hover: {
      rotate: -4,
      skewY: -2,
      scale: 1.02,
      transition: { type: "spring", stiffness: 300, damping: 12 }
    },
    pressed: { skewY: 0, rotate: 0, scale: 0.95, transition: { duration: 0.1, ease: 'easeOut' } },
  };

  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: {
      scale: 1,
      rotate: -8,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  return (
    <Motion.a
      href={href}
      className="relative mt-2 group inline-flex items-center gap-3 pl-5 pr-1 py-1 border border-black rounded-[0.7rem] font-bold text-base cursor-pointer bg-transparent overflow-hidden select-none"
      style={{ WebkitTapHighlightColor: 'transparent' }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => { setHovered(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      variants={innerVariants}
      animate={state}
      initial="idle"
    >
      <Motion.span
        className="text-black"
        variants={{ hover: { rotate: -1, transition: { duration: 0.3 } } }}
      >
        {children}
      </Motion.span>
      <Motion.div
        className="bg-black text-white rounded-[0.65rem] p-2 flex items-center justify-center"
        variants={iconVariants}
      >
        <FiArrowRight size={18} strokeWidth={2.5} />
      </Motion.div>
    </Motion.a>
  );
};

const WorkCard = ({ work, index, isMobile }) => {
  const videoRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative w-full"
      onMouseEnter={() => {
        setHovered(true);
        videoRef.current?.play();
      }}
      onMouseLeave={() => {
        setHovered(false);
        videoRef.current?.pause();
        if (videoRef.current) videoRef.current.currentTime = 0;
      }}
    >
      <div
        style={{
          borderColor: work.hexOverlay,
          perspective: '1500px',
        }}
        className={`relative w-full aspect-[3/4] rounded-[1.52rem] border-[5px] md:border-[7px] bg-white cursor-pointer transition-all duration-700 ease-out overflow-hidden shadow-lg 
          ${!isMobile ? 'hover:transform-[rotateZ(-4deg)_rotateX(-5deg)_rotateY(-5deg)_scale(1.01)] hover:shadow-2xl' : ''}`}
      >
        <video
          ref={videoRef}
          muted loop playsInline
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          src={work.videoSrc}
        />

        {/* Overlay Content with Bubble */}
        <div className="absolute p-4 inset-x-0 bottom-0 flex flex-col items-end pointer-events-none">

          <div className="relative w-full h-[60px] md:h-[80px]" style={{ color: work.hexOverlay }}>
            <svg
              viewBox="0 0 429 90"
              fill="none"
              className="w-full h-full block"
              preserveAspectRatio="none"
            >
              <path d="M428.625 35.0943V136.589C428.625 152.326 428.625 167.249 428.625 170L1.03513e-06 170C-1.56688e-05 167.148 0.000175319 164.808 0.000175319 159.068V77.9695C0.000175319 70.9826 5.03458 65.0132 11.904 63.8674L388.605 1.00885C409.565 -2.47661 428.625 13.7568 428.625 35.0862" fill="currentColor" />
            </svg>

            {/* Floating Arrow Up Right */}
            <div className="absolute top-[30%] right-2 bg-white text-black w-9 h-9 rounded-full shadow-lg overflow-hidden pointer-events-auto"
              style={{
                transform: "translate3d(0%, -30%, 0px)",
                transformStyle: "preserve-3d"
              }}
            >
              <div className="relative w-full h-full transition-transform duration-500 group-hover:-translate-y-full group-hover:translate-x-full">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FiArrowUpRight size={18} strokeWidth={2} />
                </div>
                <div className="absolute inset-0 flex items-center justify-center -translate-x-full translate-y-full transition-all duration-500">
                  <FiArrowUpRight size={18} strokeWidth={2} />
                </div>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: work.hexOverlay }} className="w-full px-4 pb-4 pt-1 flex flex-col gap-2 rounded-b-[0.7rem] -mt-[1px]">
            <h3 className="text-white text-[1.1rem] md:text-2xl font-bold leading-tight tracking-tight">
              {work.title}
            </h3>
            <div className="flex">
              <span className="px-3 py-1 rounded-xl text-white font-bold text-[10px] md:text-sm uppercase tracking-wider bg-white/20 backdrop-blur-sm border border-white/30">
                {work.client}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Main Section ────────────────────────────────────── */

const workData = [
  {
    id: 1,
    title: "Van nul naar vol, binnen 3 weken",
    client: "Bullit",
    videoSrc: "https://gethyped.b-cdn.net/Bullit/Bullit%20%7C%20Loop.mp4",
    link: "/work/bullit",
    hexOverlay: "#FF4D14",
  },
  {
    id: 2,
    title: "Zacht in smaak, sterk in beeld",
    client: "Roasta",
    videoSrc: "https://gethyped.b-cdn.net/Roasta/roasta-loop.mp4",
    link: "/work/roasta",
    hexOverlay: "#0084FF",
  },
  {
    id: 3,
    title: "Content die écht smaakt (en raakt)",
    client: "Loco",
    videoSrc: "https://gethyped.b-cdn.net/Loco/loco-bites-loop.mp4",
    link: "/work/loco-loco",
    hexOverlay: "#00B48A",
  },
];

const SelectedWork = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Your requested mobile stacking logic - reduced overlap based on feedback
  const spaceY = useTransform(scrollYProgress, [0, 0.5], ["-20px", "-50px"]);
  const rotate = useTransform(scrollYProgress, [0, 0.5], [0, 0]); // Prepared for rotation if needed

  return (
    <section id="selected-work" ref={sectionRef} className="section_selected-work bg-[#FAF4EC] py-14 md:py-24 lg:py-32 px-5 md:px-6 overflow-hidden">
      <div className="max-w-7xl md:px-20 mx-auto">

        {/* Header Block */}
        <div className="mb-10 md:mb-20 md:pl-8 md:w-1/2">
          <h2 className="text-4xl md:text-[5.5rem] font-bold tracking-tighter leading-none mb-6 text-black">
            Content<br />dat scoort.
          </h2>
          <p className="text-[1.1rem] md:text-2xl font-semibold md:leading-[1.1] text-black/80 max-w-lg">
            Wij vertellen jouw verhaal. Op een manier die écht past bij jouw doelgroep. Met creatieve content die werkt en het verschil maakt.
          </p>
          <div className="mt-4">
            <JellyButton href="/work">Bekijk al ons werk</JellyButton>
          </div>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-12 lg:gap-16 items-start">
          {workData.map((work, index) => (
            <Motion.div
              key={work.id}
              style={{
                marginBottom: isMobile && index !== workData.length - 1 ? spaceY : 0,
                rotate: isMobile ? (index === 0 ? 2 : index === 1 ? -2 : 1) : 0,
                marginTop: !isMobile ? (index === 0 ? '4px' : index === 1 ? '-80px' : '-155px') : '0px'
              }}
              className="md:!rotate-0 md:!mb-0"
            >
              <WorkCard work={work} index={index} isMobile={isMobile} />
            </Motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SelectedWork;