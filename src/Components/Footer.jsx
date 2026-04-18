import { useState, useRef } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { FaLinkedinIn, FaTiktok, FaInstagram, FaYoutube } from 'react-icons/fa6';
import { HiFire, HiMail } from 'react-icons/hi';
import Logo from './Logo';

const BOUNCE_EASE = [0.34, 2.27, 0.64, 1];

const images = [
  "https://cdn.prod.website-files.com/6848603da8e6ac95794b7498/684c3404e57460370b97757c_7719b29e960423bac19acd325c901392_gh-logo-blue.svg",
  "https://cdn.prod.website-files.com/6848603da8e6ac95794b7498/684c3415233f03ab6c1143fa_gh-logo-pink.svg",
  "https://cdn.prod.website-files.com/6848603da8e6ac95794b7498/684c3415e192971624995445_gh-logo-green.svg",
  "https://cdn.prod.website-files.com/6848603da8e6ac95794b7498/684c3415b3eecf81e4b1d9a7_gh-logo-red.svg"
];

const buttonVariants = {
  idle: { skewY: 0, rotate: 0, scale: 1 },
  hover: { skewY: -4, rotate: -1, scale: 1.02, transition: { duration: 0.15, ease: BOUNCE_EASE } },
  pressed: { skewY: 0, rotate: 0, scale: 0.95, transition: { duration: 0.05, ease: 'easeOut' } }
};

const iconVariants = {
  idle: { scale: 1 },
  hover: { scale: 0.92, transition: { duration: 0.1, ease: 'easeOut' } },
  pressed: { scale: 1 }
};

const NavItem = ({ href, children }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative">
      <a
        href={href}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative px-2 md:px-4 py-2 rounded-[10px] block overflow-hidden text-[12px] md:text-[15px] font-semibold bg-white no-underline whitespace-nowrap shadow-sm"
      >
        {/* Orange layer — slides in from top */}
        <Motion.span
          className="absolute inset-0 rounded-[10px]"
          style={{ background: '#ff5f1f', originY: 1 }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: hovered ? 1 : 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        />
        {/* Black layer — slides in from bottom, slightly delayed */}
        <Motion.span
          className="absolute inset-0 rounded-[10px]"
          style={{ background: '#000', originY: 1 }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: hovered ? 1 : 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut', delay: 0.08 }}
        />
        <span
          className="relative z-10 overflow-hidden flex items-center justify-center"
          style={{ color: hovered ? 'white' : '#1a1a1a' }}
        >
          {/* Original text — slides out upward on hover */}
          <Motion.span
            className="block"
            animate={{ y: hovered ? '-100%' : '0%', opacity: hovered ? 0 : 1 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            style={{ position: hovered ? 'absolute' : 'relative' }}
          >
            {children}
          </Motion.span>
          {/* Hover text — slides in from below */}
          <Motion.span
            className="block"
            animate={{ y: hovered ? '0%' : '100%', opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            style={{ color: 'white', position: hovered ? 'relative' : 'absolute' }}
          >
            {children}
          </Motion.span>
        </span>
      </a>
    </div>
  );
};

const Footer = () => {
  const [mailHovered, setMailHovered] = useState(false);
  const [mailActive, setMailActive] = useState(false);
  const [resultsHovered, setResultsHovered] = useState(false);
  const [resultsActive, setResultsActive] = useState(false);
  const [floatingImages, setFloatingImages] = useState([]);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const mailState = mailActive ? 'pressed' : mailHovered ? 'hover' : 'idle';
  const resultsState = resultsActive ? 'pressed' : resultsHovered ? 'hover' : 'idle';

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const distance = Math.hypot(
      x - lastMousePos.current.x,
      y - lastMousePos.current.y
    );

    if (distance > 120) {
      const newImg = {
        id: Date.now(),
        src: images[Math.floor(Math.random() * images.length)],
        x,
        y,
        rotation: Math.random() * 24 - 12,
      };

      setFloatingImages((prev) => [...prev.slice(-9), newImg]);
      lastMousePos.current = { x, y };

      setTimeout(() => {
        setFloatingImages((prev) =>
          prev.filter((img) => img.id !== newImg.id)
        );
      }, 1200);
    }
  };

  const socials = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/gethypednl/', icon: <FaLinkedinIn size={18} /> },
    { label: 'TikTok', href: 'https://www.tiktok.com/@gethyped.nl', icon: <FaTiktok size={18} /> },
    { label: 'Instagram', href: 'https://www.instagram.com/gethyped.nl/', icon: <FaInstagram size={18} /> },
    { label: 'YouTube', href: 'https://www.youtube.com/@gethypednl', icon: <FaYoutube size={18} /> },
  ];

  return (
    <footer className="bg-[#FAF4EC] relative" onMouseMove={handleMouseMove}>
      {/* Floating Images */}
      <AnimatePresence>
        {floatingImages.map((img) => (
          <Motion.div
            key={img.id}
            initial={{
              opacity: 0,
              scale: 0.3,
              rotate: img.rotation - 10,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: img.rotation,
              y: 0,
              transition: {
                type: "spring",
                stiffness: 150,
                damping: 15,
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.5,
              rotate: img.rotation + 5,
              transition: { duration: 0.4, ease: "easeInOut" },
            }}
            style={{
              position: "absolute",
              left: img.x,
              top: img.y,
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
              zIndex: 15,
            }}
          >
            <img
              src={img.src}
              alt="Brand Logo"
              className="w-48 h-auto object-contain"
            />
          </Motion.div>
        ))}
      </AnimatePresence>
      <div className="relative z-20 hidden lg:flex flex-col items-center text-center px-6 pt-12 lg:pt-16 pb-8 lg:pb-12 overflow-hidden">
        <h2 className="text-[clamp(3.5rem,7vw,88px)] text-[#161616] font-semibold leading-[1.5em] tracking-[-0.05em] mb-2.5 relative z-0">
          Let's Get Hyped!
        </h2>

        <div className="relative flex z-10 items-center justify-center gap-3 cursor-pointer flex-wrap">
          <Motion.a
            href="mailto:info@gethyped.nl"
            variants={buttonVariants}
            animate={mailState}
            initial="idle"
            onHoverStart={() => setMailHovered(true)}
            onHoverEnd={() => { setMailHovered(false); setMailActive(false); }}
            onMouseDown={() => setMailActive(true)}
            onMouseUp={() => setMailActive(false)}
            style={{ WebkitTapHighlightColor: 'transparent' }}
            className="inline-flex items-center gap-3 pl-4 pr-1.5 py-1.5 rounded-[12px] text-[14px] font-bold cursor-pointer no-underline outline-none transition-colors bg-white border border-[#161616]/60 text-[#161616] shadow-sm origin-center select-none"
          >
            <span className="font-bold text-inherit whitespace-nowrap relative z-10">Mail ons direct</span>
            <Motion.div
              variants={iconVariants}
              className="w-[28px] h-[28px] flex items-center justify-center rounded-[8px] text-[16px] transition-colors bg-[#161616] text-white relative z-10">
              <HiMail />
            </Motion.div>
          </Motion.a>

          <Motion.a
            href="#contact"
            variants={buttonVariants}
            animate={resultsState}
            initial="idle"
            onHoverStart={() => setResultsHovered(true)}
            onHoverEnd={() => { setResultsHovered(false); setResultsActive(false); }}
            onMouseDown={() => setResultsActive(true)}
            onMouseUp={() => setResultsActive(false)}
            style={{ WebkitTapHighlightColor: 'transparent' }}
            className="inline-flex items-center gap-3 pl-4 pr-1.5 py-1.5 rounded-[12px] text-[14px] font-bold cursor-pointer no-underline outline-none transition-colors bg-[#FF5F1F] text-white border border-[#FF5F1F] shadow-sm origin-center select-none"
          >
            <span className="font-bold text-inherit whitespace-nowrap relative z-10">Get Results</span>
            <Motion.div
              variants={iconVariants}
              className="w-[28px] h-[28px] flex items-center justify-center rounded-[8px] text-[16px] transition-colors bg-white text-[#FF5F1F] relative z-10">
              <HiFire />
            </Motion.div>
          </Motion.a>
        </div>

        {/* Floating Pink Badge */}
        <div className="absolute right-6 lg:right-28 bottom-0 lg:bottom-8 z-50 pointer-events-none hidden lg:block">
          <div className="relative w-[120px] h-[120px] rounded-full bg-[#FFC6FF] flex items-center justify-center shadow-sm">
            <div
              className="absolute inset-0 w-full h-full"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                <path
                  id="badgeTextPath"
                  d="M 50, 50 m -33.5, 0 a 33.5,33.5 0 1,1 67,0 a 33.5,33.5 0 1,1 -67,0"
                  fill="none"
                />
                <text className="text-[10px] font-bold tracking-[0.1em] uppercase fill-[#161616]">
                  <textPath href="#badgeTextPath" startOffset="0%" textLength="210">
                    GET HYPED • GET NOTICED • GET RESULTS •
                  </textPath>
                </text>
              </svg>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-black font-black text-[48px] tracking-[-0.0005em] leading-none" style={{ fontFamily: 'Impact, Arial Black, sans-serif', fontWeight: '900', transform: 'rotate(10deg)' }}>
                GH
              </span>
            </div>
          </div>
        </div>

      </div>

      <div className="relative z-10 w-full overflow-hidden flex items-end py-2 px-4 lg:px-12 lg:pb-8 pb-8 -mt-16 lg:-mt-32">
        <div className="relative w-full h-auto flex flex-col lg:flex-row items-center lg:items-end justify-center lg:justify-between pointer-events-auto">
          <div
            className="absolute inset-0 bg-[#EBE7DF]"
            style={{
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '30px',
              transform: 'skewY(-10deg)',
              transformOrigin: 'top right',
              width: '100%',
              bottom: '-100px'
            }}
          ></div>

          <div className="relative pt-0 lg:pt-0 -mt-8 min-[375px]:-mt-7 min-[425px]:-mt-4.5 md:-mt-0 lg:mt-auto lg:-mb-14 w-full lg:w-auto lg:shrink-0 lg:self-end flex justify-center lg:justify-start lg:pl-0.5 origin-center lg:origin-bottom-left" style={{ transform: 'rotateX(4deg) rotateY(-10deg) rotateZ(1deg)' }}>
            <div className="flex justify-center lg:justify-start items-center lg:items-end py-1 px-2 lg:px-0 z-10 w-full lg:w-auto overflow-visible">
              <div className="transform origin-center lg:origin-left scale-[1.08] min-[375px]:scale-[1.18] min-[425px]:scale-[1.35] md:scale-[1.75] lg:scale-[1.45] flex justify-center lg:justify-start w-full lg:w-auto ml-0 items-center lg:items-end">
                <Logo width={300} height={200} />
              </div>
            </div>
          </div>

          <div className="relative w-full lg:w-auto">
            {/* Desktop Layout */}
            <div className="relative z-10 px-6 lg:px-0 py-6 lg:py-0 mt-34 lg:mt-40 hidden lg:block w-full">
              <div className="max-w-[720px] ml-auto flex flex-col justify-end w-full">

                {/* Top Content Row using Strict Grid aligned geometry */}
                <div className="grid grid-cols-[1fr_200px] gap-x-16 md:gap-x-16 gap-y-4 w-full items-start">

                  {/* Row 1: Nav Links & Contact Info */}
                  {/* Left Top */}
                  <div className="flex gap-3 xl:gap-4 md:mt-[20px]">
                    {['Expertises', 'Work', 'About', 'Contact'].map((item) => (
                      <NavItem href={`#${item.toLowerCase()}`} key={item}>
                        {item}
                      </NavItem>
                    ))}
                  </div>

                  {/* Right Top */}
                  <div className="flex flex-col gap-0.5">
                    <span className="font-bold text-[#161616] text-[16px]">Contact</span>
                    <a href="mailto:info@gethyped.nl" className="text-[#161616] text-[14px] font-medium leading-tight hover:opacity-80">info@gethyped.nl</a>
                    <a href="tel:+31615337496" className="text-[#161616] text-[14px] font-medium leading-tight hover:opacity-80">+31 6 1533 7496</a>
                  </div>

                  {/* Row 2: Follow Us & Adres Info */}
                  {/* Left Bottom */}
                  <div className="flex items-center gap-8 md:gap-10">
                    <span className="font-bold text-[#161616] text-[16px] whitespace-nowrap">Follow us</span>
                    <div className="flex gap-3 md:gap-4">
                      {socials.map((social, i) => (
                        <Motion.a
                          key={i}
                          href={social.href || '#'}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          transition={{ duration: 0.05 }}
                          className="bg-white w-10 h-10 flex items-center justify-center rounded-full transition-all text-black shadow-sm"
                        >
                          <span className="flex items-center justify-center">
                            {social.icon}
                          </span>
                        </Motion.a>
                      ))}
                    </div>
                  </div>

                  {/* Right Bottom */}
                  <div className="flex flex-col gap-0.5">
                    <span className="font-bold text-[#161616] text-[16px]">Adres</span>
                    <p className="text-[#161616] text-[14px] font-medium leading-tight">Beltrumsestraat 6,<br />7141 AL Groenlo</p>
                  </div>
                </div>

                {/* Bottom Signature Row */}
                <div className="flex justify-between items-center w-full mt-12 md:mt-2">
                  <div className="flex-1 flex justify-start">
                    <p className="text-[13px] md:text-xs font-medium text-gray-500">© 2025 Get Hyped</p>
                  </div>
                  <div className="flex-1 flex justify-center md:-ml-[10%]">
                    <p className="text-[13px] md:text-xs font-medium text-gray-500">© Design by Dylan</p>
                  </div>
                  <div className="w-[200px] flex justify-start">
                    <a href="#" className="text-[13px] md:text-xs font-medium text-gray-500 hover:text-[#161616] transition-colors">Privacyvoorwaarden</a>
                  </div>
                </div>

              </div>
            </div>

            {/* Mobile Layout */}
            <div className="relative z-10 flex lg:hidden flex-col items-center text-center gap-6 mt-2 min-[375px]:mt-6 min-[425px]:mt-11 md:mt-24 mb-0 px-2 w-full">
              {/* Orange Button */}
              <Motion.a
                href="mailto:info@gethyped.nl"
                initial="idle"
                whileHover="hover"
                whileTap="pressed"
                variants={buttonVariants}
                style={{ WebkitTapHighlightColor: 'transparent' }}
                className="inline-flex items-center gap-2 min-[375px]:gap-3 pl-3 min-[375px]:pl-4 pr-1 min-[375px]:pr-1.5 py-1.5 rounded-xl text-[12px] min-[375px]:text-[14px] sm:text-[15px] font-bold cursor-pointer no-underline outline-none transition-colors bg-[#FF5F1F] text-white origin-center select-none max-w-full"
              >
                <span className="font-bold text-inherit whitespace-normal min-[375px]:whitespace-nowrap text-center relative z-10">Get Hyped! Neem contact op</span>
                <Motion.div
                  variants={iconVariants}
                  className="w-7 h-7 min-[375px]:w-8 min-[375px]:h-8 shrink-0 flex items-center justify-center rounded-[10px] bg-[#FAF4EC] text-[#FF5F1F] text-lg relative z-10"
                >
                  <HiFire />
                </Motion.div>
              </Motion.a>

              {/* Nav Links */}
              <div className="flex justify-center flex-wrap gap-1.5 sm:gap-2 mt-2 w-full">
                {['Expertises', 'Work', 'About', 'Contact'].map((item) => (
                  <NavItem href={`#${item.toLowerCase()}`} key={item}>
                    {item}
                  </NavItem>
                ))}
              </div>

              {/* Social Icons */}
              <div className="flex justify-center flex-wrap gap-3 mt-1">
                {socials.map((social, i) => (
                  <Motion.a
                    key={i}
                    href={social.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.05 }}
                    className="bg-white w-[42px] h-[42px] flex items-center justify-center rounded-full transition-all text-black"
                  >
                    <span className="flex items-center justify-center">
                      {social.icon}
                    </span>
                  </Motion.a>
                ))}
              </div>

              {/* Contact Info */}
              <div className="flex flex-col items-center gap-1.5 mt-2 text-[14px] font-medium text-[#1a1a1a]">
                <p>info@gethyped.nl</p>
                <p>+31 6 1533 7496</p>

                <div className="text-center mt-3">
                  <p>Beltrumsestraat 6,</p>
                  <p>7141 AL Groenlo</p>
                </div>
              </div>

              {/* Footer Meta */}
              <div className="flex flex-col items-center gap-2.5 mt-4 text-[11px] text-[#6b7280] font-medium">
                <p>Privacyvoorwaarden</p>
                <p>© 2025 Get Hyped</p>
                <p>© Design by Dylan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
