import React, { useRef, useState, useEffect } from 'react';
import { motion as Motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const expertisesData = [
  {
    id: 1,
    number: '01',
    title: 'Social strategy',
    subtitle: 'Slimme strategie. Sterke start.',
    description: 'We duiken diep in jouw merk, doelgroep en doelen. En vertalen data naar een duidelijk plan met formats die écht impact maken. Zo weet je precies waarom het werkt.',
    videoSrc: 'https://gethyped.b-cdn.net/MD/MD%20Loop%20Schaken.mp4',
    theme: '#f0ede6',
    link: '/expertises/social-strategie'
  },
  {
    id: 2,
    number: '02',
    title: 'Content creation',
    subtitle: 'Content die opvalt en raakt.',
    description: 'We maken content die opvalt. Blijft hangen. En jouw doelgroep raakt. Creatief, snel en energiek. Altijd met het doel voor ogen.',
    videoSrc: 'https://gethyped.b-cdn.net/Expertises/Loop%20BTS%20comp.mp4',
    theme: '#e6c8f0',
    link: '/expertises/content-creatie'
  },
  {
    id: 3,
    number: '03',
    title: 'Activation',
    subtitle: 'Zichtbaar waar en wanneer het telt.',
    description: 'De juiste content verdient het om gezien te worden. We verspreiden de content waar jouw doelgroep is. Zo raakt jouw merk de juiste mensen, precies waar en wanneer het telt.',
    videoSrc: 'https://gethyped.b-cdn.net/Over%20de%20Top/overdetop-loop.mp4',
    theme: '#4ade80',
    link: '/expertises/activatie'
  },
  {
    id: 4,
    number: '04',
    title: 'Data',
    subtitle: 'Inzichten die impact maken.',
    description: 'We duiken in de cijfers om te snappen wat écht werkt. En sturen jouw content scherp bij.',
    videoSrc: 'https://gethyped.b-cdn.net/Expertises/Data%20comp.mp4',
    theme: '#3b82f6',
    link: '/expertises/data'
  }
];

const BOUNCE_EASE = [0.34, 2.27, 0.64, 1];

const ExpertiseButton = ({ expertise }) => {
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

  const iconColor = expertise.id === 1 ? 'black' : 'white';
  const iconBgColor = expertise.id === 1 ? 'white' : 'black';

  const iconVariants = {
    idle: {
      scale: 1,
      backgroundColor: iconBgColor,
      color: iconColor
    },
    hover: {
      scale: 0.92,
      backgroundColor: iconBgColor,
      color: iconColor,
      transition: { duration: 0.2, ease: 'easeOut' }
    },
    pressed: {
      scale: 1,
      backgroundColor: iconBgColor,
      color: iconColor
    },
  };

  return (
    <Motion.a
      href={expertise.link}
      className={`inline-flex items-center px-3 py-2 md:px-6 md:py-3 rounded-[12px] md:rounded-lg font-bold cursor-pointer select-none origin-center ${expertise.id === 1
        ? 'bg-orange-500 text-white'
        : expertise.id === 2
          ? 'bg-white text-black'
          : expertise.id === 3
            ? 'bg-white text-black'
            : 'bg-white text-black border border-gray-200'
        }`}
      style={{ WebkitTapHighlightColor: 'transparent' }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => { setHovered(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      variants={innerVariants}
      animate={state}
      initial="idle"
    >
      <span className="relative z-10 flex items-center gap-2 md:gap-3">
        <span className="text-[12px] md:text-[14px]">Meer over {expertise.title.toLowerCase()}</span>
        <Motion.div
          className="rounded-[10px] md:rounded-lg p-1.5 md:p-2 flex items-center justify-center"
          variants={iconVariants}
          animate={state}
          initial="idle"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 22 21"
            fill="none"
          >
            <path
              d="M11.2832 20.9176L9.14509 18.8002L15.5491 12.3962L-0.00939941 12.3962L-0.00939941 9.30322L15.5491 9.30322L9.14509 2.9096L11.2832 0.78186L21.3511 10.8497L11.2832 20.9176Z"
              fill="currentColor"
            />
          </svg>
        </Motion.div>
      </span>
    </Motion.a>
  );
};

const ExpertiseCard = React.forwardRef(({ expertise, index }, ref) => {
  return (
    <div
      ref={ref}
      className="absolute inset-0 flex items-center justify-center p-4 md:p-8"
      style={{ zIndex: index }}
    >
      <div
        style={{
          backgroundColor: expertise.theme,
          color: expertise.id === 1 ? 'black' : (expertise.id === 4 ? 'white' : 'black')
        }}
        className="relative w-full rounded-xl shadow-xl overflow-hidden px-6 md:px-10 pt-10 pb-8 lg:p-20"
      >
        <div className="relative min-h-[440px] md:min-h-[400px] lg:min-h-[480px] flex flex-col h-full z-20">
          {/* Content Layout */}
          <div className="relative z-20 flex flex-col h-full flex-1">

            {/* Top Row: Label, Title, and Number (Spans full width) */}
            <div className="w-full flex justify-between items-start">
              <div>
                <div className={`inline-block px-3 py-1 md:px-4 md:py-2 rounded-[6px] mb-2 md:mb-6 ${expertise.id === 1 ? 'bg-gray-200' : 'bg-white'
                  }`}>
                  <p className={`text-[13px] md:text-lg font-bold md:font-bold ${expertise.id === 1 ? 'text-black' : 'text-black'
                    }`}>Expertise</p>
                </div>
                <h2 className="text-[40px] md:text-[36px] lg:text-8xl font-bold mb-1.5 md:mb-8 lg:mb-15 text-black leading-none tracking-tighter md:leading-tight break-words lg:whitespace-nowrap">
                  {expertise.title}
                </h2>
              </div>

              <div className={`relative flex text-[60px] md:text-[120px] font-black leading-[0.8] tracking-tighter ${expertise.id === 1
                ? 'text-gray-800/10 md:text-gray-300'
                : 'text-white/20'
                } ${expertise.id === 1
                  ? 'relative -top-6 -right-2 md:-top-8 md:right-4'
                  : expertise.id === 2
                    ? 'relative -top-6 -right-2 md:-top-8 md:right-2'
                    : expertise.id === 3
                      ? 'relative -top-6 -right-2 md:-top-8 md:right-4'
                      : 'relative -top-6 md:-top-8 md:right-4'
                }`}>
                <span>0</span>
                <span>{expertise.id}</span>
              </div>
            </div>

            <div className="relative md:absolute md:-bottom-4 md:-right-2 lg:right-[2%] transform rotate-3 origin-center self-start md:self-auto mt-2 md:mt-0 mb-4 md:mb-0 z-10">
              <div className={`w-[130px] h-[160px] md:w-[260px] md:h-[340px] lg:w-[360px] lg:h-[460px] rounded-[14px] md:rounded-2xl overflow-hidden border-[5px] md:border-8 shadow-md ${expertise.id === 1 ? 'border-orange-500' : 'border-white'
                }`}>
                <video
                  muted
                  loop
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover scale-[1.05]"
                  src={expertise.videoSrc}
                />
              </div>
            </div>

            {/* Bottom Row: Subtitle, Description, Button */}
            <div className="flex flex-col w-full md:max-w-lg mt-10 md:mt-auto pt-2 md:pt-0 relative z-20">
              <h4 className="text-[17px] md:text-[22px] lg:text-3xl font-bold mb-1 md:mb-6 text-black pr-2 md:pr-0 tracking-tight leading-tight">
                {expertise.subtitle}
              </h4>
              <p className="mb-4 md:mb-8 text-black/90 text-[14px] md:text-base lg:text-xl font-normal md:font-semibold pr-8 md:pr-0 max-w-[260px] md:max-w-md leading-[1.35]">
                {expertise.description}
              </p>
              <div className="pb-0 md:pb-0">
                <ExpertiseButton expertise={expertise} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
});

const Expertises = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const cards = cardsRef.current;
    if (!cards || cards.length === 0) return;

    const isMobile = window.innerWidth < 768;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: isMobile ? "+=900" : "+=1600",
        scrub: isMobile ? 0.1 : 0.2,
        pin: true,
      },
    });

    cards.forEach((card, index) => {
      if (index > 0) {
        gsap.set(card, {
          yPercent: 100,
          scale: 0.8,
          opacity: 0
        });
      }

      if (index < cards.length - 1) {
        tl.to(cards[index], {
          scale: 0.85,
          yPercent: -10,
          opacity: 0.5,
          duration: 1,
          ease: "power2.inOut"
        }, index)
        .to(cards[index + 1], {
          yPercent: 0,
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power2.inOut"
        }, index + 0.1);
      }
    });

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-white">
      <div className="relative w-full h-full flex items-center justify-center max-w-[85rem] mx-auto px-2 md:px-10">
        {expertisesData.map((expertise, index) => (
          <ExpertiseCard
            key={expertise.id}
            ref={(el) => cardsRef.current[index] = el}
            expertise={expertise}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default Expertises;