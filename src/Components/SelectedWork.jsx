import React from 'react';
import { motion as Motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/* ─── Shared Components ───────────────────────────────── */

const JellyButton = ({ href, children }) => {
  const [hovered, setHovered] = React.useState(false);
  const [active, setActive] = React.useState(false);

  const state = active ? 'pressed' : hovered ? 'hover' : 'idle';

  /* Matches Webflow's --bounce-ease and --speed variables exactly */
  const innerVariants = {
    idle:    { skewY: 0, rotate: 0, scale: 1, transition: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] } },
    hover:   { skewY: -4, rotate: -1, scale: 1.02, transition: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] } },
    pressed: { skewY: 0, rotate: 0, scale: 0.95, transition: { duration: 0.1, ease: 'easeOut' } },
  };

  /* Matches Webflow's .button-default__icon transition (--speed-faster: 0.15s) */
  const iconVariants = {
    idle:    { scale: 1, transition: { duration: 0.15, ease: 'easeOut' } },
    hover:   { scale: 0.92, transition: { duration: 0.15, ease: 'easeOut' } },
    pressed: { scale: 1 },
  };

  /* Matches Webflow's --border-radius-ease and width shrink on hover */
  const bgVariants = {
    idle:    { width: '100%', transition: { duration: 0.45, ease: [0.34, 1.37, 0.64, 1] } },
    hover:   { width: 'calc(100% - 0.5em)', transition: { duration: 0.45, ease: [0.34, 1.37, 0.64, 1] } },
    pressed: { width: '100%' },
  };

  return (
    <Motion.a
      href={href}
      className="button-default is-outline relative inline-flex cursor-pointer select-none"
      style={{ WebkitTapHighlightColor: 'transparent' }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => { setHovered(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
    >
      <Motion.div
        className="relative flex items-center gap-3 px-5 py-2.5 will-change-transform"
        variants={innerVariants}
        animate={state}
        initial="idle"
      >
        {/* __background — the pill shape that shrinks on hover */}
        <Motion.span
          className="absolute inset-0 border border-black pointer-events-none rounded-lg"
          variants={bgVariants}
          animate={state}
          initial="idle"
        />

        {/* __text */}
        <span className="relative z-10 font-semibold text-[0.9375rem] tracking-[-0.02em] text-[#131313] leading-none whitespace-nowrap">
          {children}
        </span>

        {/* __icon */}
        <Motion.div
          className="relative z-10 flex items-center justify-center w-8 h-8 rounded-lg bg-[#131313] text-white shrink-0"
          variants={iconVariants}
          animate={state}
          initial="idle"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 0 22 21" fill="none">
            <path d="M11.2832 20.9176L9.14509 18.8002L15.5491 12.3962L-0.00939941 12.3962L-0.00939941 9.30322L15.5491 9.30322L9.14509 2.9096L11.2832 0.78186L21.3511 10.8497L11.2832 20.9176Z" fill="currentColor" />
          </svg>
        </Motion.div>
      </Motion.div>
    </Motion.a>
  );
};

/* ─── Work Card Component ────────────────────────────── */

const WorkCard = ({ work, index }) => {
  const isDown = work.slant === "down";
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 150 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 150 });

  const rotateX = useTransform(smoothY, [-1, 1], [4, -4]);
  const rotateY = useTransform(smoothX, [-1, 1], [-4, 4]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const xPct = (event.clientX - rect.left) / rect.width;
    const yPct = (event.clientY - rect.top) / rect.height;
    mouseX.set(xPct * 2 - 1);
    mouseY.set(yPct * 2 - 1);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <Motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`relative cursor-pointer group w-full ${work.className || ''}`}
      style={{ perspective: 1200 }}
    >
      <Motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`relative rounded-4xl border-[6px] md:border-8 ${work.borderColor} w-full h-87.5 md:h-125 overflow-hidden shadow-2xl bg-gray-900 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-shadow duration-500`}
      >
        <video
          muted loop autoPlay playsInline
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          src={work.videoSrc}
        />

        {/* Floating Overlay Content */}
        <div
          className="absolute inset-0 pointer-events-none p-4 md:p-6 flex flex-col justify-end"
          style={{ translateZ: 50 }}
        >
          <div className="relative w-full h-45 md:h-50">
            <div className="absolute inset-0 z-0 flex items-end overflow-hidden rounded-3xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                viewBox="0 0 429 174"
                fill="none"
                className="w-full h-full"
                preserveAspectRatio="none"
                style={{
                  color: work.hexOverlay,
                  transform: isDown ? "scaleX(-1)" : "none"
                }}
              >
                <path d="M428.625 35.0943V136.589C428.625 152.326 428.625 167.249 428.625 173.088L1.03513e-06 173.082C-1.56688e-05 170.148 0.000175319 166.808 0.000175319 159.068V77.9695C0.000175319 70.9826 5.03458 65.0132 11.904 63.8674L388.605 1.00885C409.565 -2.47661 428.625 13.7568 428.625 35.0862" fill="currentColor"></path>
              </svg>
            </div>

            <div className="relative z-10 w-full h-full pt-16 px-6 pb-6 flex flex-col justify-end">
              <h3 className="text-white text-[1.25rem] md:text-[1.5rem] font-bold leading-[1.1] mb-3">
                {work.title}
              </h3>
              <div className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-3 py-1 rounded-lg text-sm font-semibold w-max uppercase tracking-wider">
                {work.client}
              </div>
            </div>

            {/* Floating Arrow Icon */}
            <div className="absolute top-2 right-2 md:top-4 md:right-4 w-11 h-11 md:w-13 md:h-13 bg-white rounded-full flex items-center justify-center shadow-xl z-20 overflow-hidden pointer-events-auto">
              <div className="relative w-full h-full">
                <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)] group-hover:translate-x-10 group-hover:-translate-y-10">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)] -translate-x-10 translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Motion.div>
    </Motion.div>
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
    borderColor: "border-[#FF4D14]",
    hexOverlay: "#FF4D14",
    slant: "up",
  },
  {
    id: 2,
    title: "Zacht in smaak, sterk in beeld",
    client: "Roasta",
    videoSrc: "https://gethyped.b-cdn.net/Roasta/roasta-loop.mp4",
    link: "/work/roasta",
    borderColor: "border-[#0084FF]",
    hexOverlay: "#0084FF",
    slant: "up",
  },
  {
    id: 3,
    title: "Content die écht smaakt (en raakt)",
    client: "Loco",
    videoSrc: "https://gethyped.b-cdn.net/Loco/loco-bites-loop.mp4",
    link: "/work/loco-loco",
    borderColor: "border-[#00B48A]",
    hexOverlay: "#00B48A",
    slant: "up",
  },
];

const SelectedWork = () => {
  return (
    <section id="selected-work" className="section_selected-work bg-[#FAF4EC] py-14 md:py-20 lg:py-32 overflow-hidden">
      <div className="padding-global max-w-350 mx-auto px-5 md:px-8">

        {/* Row 1: Header Block */}
        <div className="mb-8 md:mb-4 md:pl-12">
          <h2 className="text-[2.5rem] md:text-[4.5rem] lg:text-[5rem] font-black text-black leading-[1.05] tracking-tight mb-4 md:mb-6">
            Content<br />dat scoort.
          </h2>
          <div className="max-w-110">
            <p className="text-[1rem] md:text-[1.25rem] font-semibold text-gray-800 leading-normal mb-5 md:mb-8">
              Wij vertellen jouw verhaal. Op een manier die écht past bij jouw doelgroep. Met creatieve content die werkt en het verschil maakt.
            </p>
            <JellyButton href="/work">Bekijk al ons werk</JellyButton>
          </div>
        </div>

        {/* Row 2: Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-8 lg:gap-20 items-start max-w-7xl">

          {/* Card 1: Orange (Left) */}
          <div className="lg:mt-18">
            <WorkCard work={workData[0]} index={0} />
          </div>

          {/* Card 2: Blue (Middle) */}
          <div className="lg:-mt-8">
            <WorkCard work={workData[1]} index={1} />
          </div>

          {/* Card 3: Green (Right) */}
          <div className="lg:-mt-32">
            <WorkCard work={workData[2]} index={2} />
          </div>
        </div>

      </div>
    </section>
  );
};

export default SelectedWork;