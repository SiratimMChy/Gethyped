import React, { useState, useRef } from 'react';
import { motion as Motion } from 'framer-motion';
import { gsap } from 'gsap';
import logo from '../assets/logo.png';

const NavItem = ({ href, children }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <li className="relative">
      <a
        href={href}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative px-4 py-1.5 rounded-xl block overflow-hidden text-sm font-bold"
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
          className="relative z-10 overflow-hidden flex items-center"
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
            className="block"
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

const CTAButton = () => (
  <Motion.button
    whileHover={{ scale: 1.08, rotate: -5, transition: { duration: 0.15, ease: 'easeOut' } }}
    whileTap={{ scale: 0.95, rotate: 0 }}
    transition={{ duration: 0.4, ease: 'easeInOut' }}
    className="flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-bold"
    style={{ background: '#f5c6e0', border: '2px solid #f0aed4' }}
  >
    <span className="font-bold text-black">Get Results</span>
    <span className="bg-white rounded-xl w-8 h-8 flex items-center justify-center text-base shadow-sm">
      🔥
    </span>
  </Motion.button>
);

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-[#f5f0e8]">

      {/* Logo */}
      <a href="/">
        <img src={logo} alt="GETHYPED" className="h-15 w-auto" />
      </a>

      {/* Nav Links */}
      <ul className="hidden md:flex items-center gap-1 border border-gray-200 rounded-2xl px-2 py-1.5 bg-white">
        <NavItem href="#expertises">Expertises</NavItem>
        <NavItem href="#work">Work</NavItem>
        <NavItem href="#about">About</NavItem>
        <NavItem href="#contact">Contact</NavItem>
      </ul>

      {/* CTA */}
      <CTAButton />

    </nav>
  );
};

export default Navbar;
