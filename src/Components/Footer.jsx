import { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { FaLinkedinIn, FaTiktok, FaInstagram, FaYoutube } from 'react-icons/fa6';
import { HiFire, HiMail } from 'react-icons/hi';
import Logo from './Logo';

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
  const socials = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/gethypednl/', icon: <FaLinkedinIn size={18} /> },
    { label: 'TikTok', href: 'https://www.tiktok.com/@gethyped.nl', icon: <FaTiktok size={18} /> },
    { label: 'Instagram', href: 'https://www.instagram.com/gethyped.nl/', icon: <FaInstagram size={18} /> },
    { label: 'YouTube', href: 'https://www.youtube.com/@gethypednl', icon: <FaYoutube size={18} /> },
  ];

  return (
    <footer className="bg-[#FAF4EC]">
      <div className="relative z-20 hidden md:flex flex-col items-center text-center px-6 pt-12 md:pt-16 pb-8 md:pb-12">
        <h2 className="text-[clamp(3.5rem,7vw,88px)] text-[#161616] font-semibold leading-[1.5em] tracking-[-0.05em] mb-2.5">
          Let's Get Hyped!
        </h2>

        <div className="relative flex z-10 items-center justify-center gap-3 cursor-pointer flex-wrap">
          <Motion.a
            href="mailto:info@gethyped.nl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeInOut' }}
            className="inline-flex items-center gap-3 pl-4 pr-1.5 py-1.5 rounded-[12px] text-[14px] font-bold cursor-pointer no-underline outline-none transition-colors bg-transparent border border-[#161616]/60 text-[#161616] hover:bg-white/50 shadow-sm"
          >
            <span className="font-bold text-inherit whitespace-nowrap">Mail ons direct</span>
            <div className="w-[28px] h-[28px] flex items-center justify-center rounded-[8px] text-[16px] transition-colors bg-[#161616] text-white">
              <HiMail />
            </div>
          </Motion.a>

          <Motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeInOut' }}
            className="inline-flex items-center gap-3 pl-4 pr-1.5 py-1.5 rounded-[12px] text-[14px] font-bold cursor-pointer no-underline outline-none transition-colors bg-[#FF5F1F] text-white border border-[#FF5F1F] hover:bg-[#e0521a] shadow-sm"
          >
            <span className="font-bold text-inherit whitespace-nowrap">Get Results</span>
            <div className="w-[28px] h-[28px] flex items-center justify-center rounded-[8px] text-[16px] transition-colors bg-white text-[#FF5F1F]">
              <HiFire />
            </div>
          </Motion.a>
        </div>

        {/* Floating Pink Badge */}
        <div className="absolute right-6 lg:right-28 bottom-0 md:bottom-8 z-50 pointer-events-none hidden md:block">
          <div className="relative w-[120px] h-[120px] rounded-full bg-[#FFA1FA] flex items-center justify-center hover:scale-105 transition-transform duration-300 pointer-events-auto cursor-pointer shadow-sm">
            <Motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, ease: 'linear', repeat: Infinity }}
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
            </Motion.div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[#161616] font-black text-[38px] tracking-[-0.08em] leading-none" style={{ fontFamily: 'Impact, sans-serif', transform: 'rotate(-4deg)' }}>
                GH
              </span>
            </div>
          </div>
        </div>

      </div>

      <div className="relative z-10 w-full overflow-hidden flex items-end py-2 px-4 md:px-12 md:pb-8 pb-8 -mt-16 md:-mt-32">
        <div className="relative w-full h-auto flex flex-col md:flex-row items-center md:items-end justify-center md:justify-between pointer-events-auto">
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

          <div className="relative pt-0 md:pt-0 -mt-8 md:mt-auto md:-mb-14 w-full md:w-auto md:shrink-0 md:self-end flex justify-center md:justify-start md:pl-0.5 origin-center md:origin-bottom-left" style={{ transform: 'rotateX(4deg) rotateY(-10deg) rotateZ(1deg)' }}>
            <div className="flex justify-center md:justify-start items-center md:items-end py-1 px-2 md:px-0 z-10 w-full md:w-auto overflow-visible">
              <div className="transform origin-center md:origin-left scale-[1.05] md:scale-[1.45] flex justify-center md:justify-start w-full md:w-auto ml-0 items-center md:items-end">
                <Logo width={300} height={200} />
              </div>
            </div>
          </div>

          <div className="relative w-full md:w-auto">
            {/* Desktop Layout */}
            <div className="relative z-10 px-6 md:px-0 py-6 md:py-0 mt-34 md:mt-40 hidden md:block w-full">
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
            <div className="relative z-10 flex md:hidden flex-col items-center text-center gap-6 mt-2 mb-0 px-2 w-full">
              {/* Orange Button */}
              <Motion.a
                href="mailto:info@gethyped.nl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 pl-4 pr-1.5 py-1.5 rounded-xl text-[14px] sm:text-[15px] font-bold cursor-pointer no-underline outline-none transition-colors bg-[#FF5F1F] text-white hover:bg-[#e0521a]"
              >
                <span className="font-bold text-inherit whitespace-nowrap">Get Hyped! Neem contact op</span>
                <div className="w-8 h-8 flex items-center justify-center rounded-[10px] bg-[#FAF4EC] text-[#FF5F1F] text-lg">
                  <HiFire />
                </div>
              </Motion.a>

              {/* Nav Links */}
              <div className="flex justify-center gap-1.5 sm:gap-2 mt-2 w-full">
                {['Expertises', 'Work', 'About', 'Contact'].map((item) => (
                  <NavItem href={`#${item.toLowerCase()}`} key={item}>
                    {item}
                  </NavItem>
                ))}
              </div>

              {/* Social Icons */}
              <div className="flex justify-center gap-3 mt-1">
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
