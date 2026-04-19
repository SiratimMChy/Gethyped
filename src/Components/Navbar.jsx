import React, { useState, useEffect } from 'react';
import { motion as Motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import logo from '../assets/logo.png';

const BOUNCE_EASE = [0.34, 2.27, 0.64, 1];

const GetResultsButton = ({ isMobile }) => {
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
    idle: { scale: 1 },
    hover: {
      scale: 0.92,
      transition: { duration: 0.2, ease: 'easeOut' }
    },
    pressed: { scale: 1 },
  };

  if (isMobile) {
    return (
      <Motion.button
        className="bg-[#111111] text-white font-bold py-2 pl-7 pr-2 rounded-2xl text-[18px] flex items-center gap-5 h-[60px] shadow-lg origin-center w-fit"
        style={{ WebkitTapHighlightColor: 'transparent' }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => { setHovered(false); setActive(false); }}
        onMouseDown={() => setActive(true)}
        onMouseUp={() => setActive(false)}
        onTouchStart={() => setActive(true)}
        onTouchEnd={() => { setActive(false); setHovered(false); }}
        variants={innerVariants}
        animate={state}
        initial="idle"
      >
        <span className="tracking-tight">Get Results</span>
        <Motion.span
          className="bg-white rounded-[14px] w-[44px] h-[44px] flex items-center justify-center text-2xl shadow-inner"
          variants={iconVariants}
        >
          🔥
        </Motion.span>
      </Motion.button>
    );
  }

  return (
    <Motion.button
      className="flex items-center gap-2 px-7 py-3 rounded-2xl text-base font-bold bg-[#f5c6e0] border border-[#f0aed4] origin-center"
      style={{ WebkitTapHighlightColor: 'transparent' }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => { setHovered(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      variants={innerVariants}
      animate={state}
      initial="idle"
    >
      <span>Get Results</span>
      <Motion.span
        className="bg-white rounded-lg w-8 h-8 flex items-center justify-center text-base origin-center"
        variants={iconVariants}
      >
        🔥
      </Motion.span>
    </Motion.button>
  );
};

const NavItem = ({ href, children, isMobile, onClick }) => {
  const [hovered, setHovered] = useState(false);

  if (isMobile) {
    return (
      <Motion.li
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 15 }}
        className="w-fit"
      >
        <a
          href={href}
          onClick={onClick}
          className="bg-white text-black font-bold py-2.5 px-6 rounded-lg text-[18px] block text-center shadow-sm active:scale-95 transition-transform"
        >
          {children}
        </a>
      </Motion.li>
    );
  }

  return (
    <li className="relative group">
      <a
        href={href}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative px-6 py-2.5 rounded-xl block overflow-hidden text-base font-bold transition-all duration-300"
      >
        {/* Orange layer — slides in from top */}
        <Motion.span
          className="absolute inset-0 rounded-xl"
          style={{ background: '#ff5f1f', originY: 1 }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: hovered ? 1 : 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        />
        {/* Black layer — slides in from bottom, slightly delayed */}
        <Motion.span
          className="absolute inset-0 rounded-xl"
          style={{ background: '#000', originY: 1 }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: hovered ? 1 : 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut', delay: 0.08 }}
        />
        <span
          className="relative z-10 overflow-hidden flex items-center h-5"
          style={{ color: hovered ? 'white' : '#374151' }}
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
            className="block w-full text-center"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: hovered ? '0%' : '100%', opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            style={{ color: 'white', position: hovered ? 'relative' : 'absolute' }}
          >
            {children}
          </Motion.span>
        </span>
      </a>
    </li>
  );
};

const HamburgerIcon = ({ isOpen }) => (
  <div className="relative w-6 h-6 flex flex-col justify-center items-center">
    <Motion.span
      animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
      className="block w-full h-[2px] bg-black absolute"
    />
    <Motion.span
      animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
      className="block w-full h-[2px] bg-black absolute"
    />
  </div>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full z-[100]">
      {/* Main Navbar Bar - Animates y based on scroll direction */}
      <Motion.div
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`flex items-center justify-between px-6 md:px-8 py-4 bg-transparent relative z-[50]`}
      >
        <a href="/" className={`relative z-[120] transition-opacity duration-300 ${isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <img src={logo} alt="GETHYPED" className="h-12 md:h-16 w-auto" />
        </a>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-1 border border-gray-200 rounded-2xl px-3 py-2 bg-white shadow-sm">
          <NavItem href="#expertises">Expertises</NavItem>
          <NavItem href="#work">Work</NavItem>
          <NavItem href="#about">About</NavItem>
          <NavItem href="#contact">Contact</NavItem>
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <GetResultsButton isMobile={false} />
        </div>
      </Motion.div>

      {/* FIXED Hamburger Button - Always on top, follows the main bar hide animation logic or stays fixed */}
      <Motion.button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        animate={hidden && !isMenuOpen ? { y: "-150%" } : { y: 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`lg:hidden fixed top-[20px] right-[28px] w-10 h-10 rounded-lg z-[200] flex items-center justify-center transition-all duration-300 ${isMenuOpen ? 'bg-white shadow-sm' : 'bg-[#e8a2e8]'
          }`}
      >
        <HamburgerIcon isOpen={isMenuOpen} />
      </Motion.button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-[140] bg-[#f5f0e8]">
            <Motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-[12px] bg-[#f5a6f5] z-[150] rounded-[12px] flex flex-col items-center shadow-2xl overflow-hidden"
            >
              {/* Internal Menu Header */}
              <div className="w-full flex justify-between items-center pt-2 px-6 pb-0">
                <img src={logo} alt="GETHYPED" className="h-16 w-auto" />
                <div className="w-12 h-12" /> {/* Spacer for the fixed X button */}
              </div>

              {/* Link List */}
              <div className="flex-1 flex flex-col items-center justify-center gap-6">
                <ul className="flex flex-col items-center gap-5">
                  <NavItem href="#expertises" isMobile onClick={() => setIsMenuOpen(false)}>Expertises</NavItem>
                  <NavItem href="#work" isMobile onClick={() => setIsMenuOpen(false)}>Work</NavItem>
                  <NavItem href="#about" isMobile onClick={() => setIsMenuOpen(false)}>About</NavItem>
                  <NavItem href="#contact" isMobile onClick={() => setIsMenuOpen(false)}>Contact</NavItem>
                </ul>
              </div>

              {/* Bottom CTA */}
              <div className="p-8 pt-0 w-full flex justify-center pb-12">
                <GetResultsButton isMobile={true} />
              </div>
            </Motion.div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
