import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Shield, Menu, X, Flame, Sparkles } from 'lucide-react';
import { festiveAudio } from '../utils/audio';

interface NavbarProps {
  onOpenRsvp: () => void;
  onOpenAdmin: () => void;
  confirmedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenRsvp,
  onOpenAdmin,
  confirmedCount,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const unsubscribe = festiveAudio.subscribe(playing => {
      setIsPlaying(playing);
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);

      const sections = ['home', 'vibe', 'red-carpet', 'supplies', 'games', 'guests', 'location'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      unsubscribe();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleAudioToggle = () => {
    festiveAudio.toggle();
  };

  const navLinks = [
    { label: 'THE VIBE', href: '#vibe', id: 'vibe' },
    { label: 'RED CARPET', href: '#red-carpet', id: 'red-carpet' },
    { label: 'SUPPLIES', href: '#supplies', id: 'supplies' },
    { label: 'GAMES & DARES', href: '#games', id: 'games' },
    { label: 'GUEST LIST', href: '#guests', id: 'guests' },
    { label: 'VENUE', href: '#location', id: 'location' },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-midnight/90 backdrop-blur-xl border-b border-gold/25 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.8)] py-3'
          : 'bg-gradient-to-b from-midnight via-midnight/80 to-transparent py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <a
            href="#home"
            className="flex items-center gap-3 group focus:outline-none shrink-0"
          >
            <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-burgundy via-burgundy-light to-midnight border border-gold/60 flex items-center justify-center shadow-gold-glow group-hover:scale-105 transition-transform shrink-0">
              <span className="text-2xl animate-flicker">🪔</span>
              <span className="absolute -inset-1 rounded-full border border-gold/20 animate-pulse pointer-events-none" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-gold block leading-tight group-hover:text-gold-light transition-colors">
                THE DIWALI SOCIAL
              </span>
              <span className="text-xs tracking-[0.18em] text-ivory/75 uppercase block font-sans font-medium">
                दीपावली मिलन • Brothers' Edition 2026
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 bg-midnight-card/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-gold/20 shadow-inner">
            {navLinks.map(link => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`relative px-3.5 py-1.5 text-xs xl:text-sm font-semibold tracking-wider uppercase transition-colors duration-200 rounded-full ${
                    isActive ? 'text-midnight font-bold' : 'text-ivory/80 hover:text-gold'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavCapsule"
                      className="absolute inset-0 bg-gradient-to-r from-marigold to-gold rounded-full shadow-sm"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action Icons & RSVP CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio Toggle */}
            <button
              onClick={handleAudioToggle}
              title={isPlaying ? 'Mute Diwali Music' : 'Play Festive Diwali Music (Sitar & Shenhai)'}
              className={`p-2.5 sm:px-3.5 sm:py-2 rounded-full border transition-all text-xs sm:text-sm flex items-center gap-1.5 min-h-[44px] ${
                isPlaying
                  ? 'border-gold bg-gold/20 text-gold shadow-gold-glow font-bold'
                  : 'border-gold/30 bg-midnight/80 text-ivory/80 hover:border-gold hover:text-gold'
              }`}
            >
              {isPlaying ? (
                <Volume2 className="w-4 h-4 animate-pulse text-gold" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
              <span className="hidden sm:inline font-sans text-xs font-semibold">
                {isPlaying ? 'Diwali Music ON' : 'Diwali Music'}
              </span>
            </button>

            {/* Admin Key Button */}
            <button
              onClick={onOpenAdmin}
              title="Admin & Host Deck"
              className="p-2.5 rounded-full border border-gold/30 bg-midnight/80 text-ivory/80 hover:border-gold hover:text-gold hover:shadow-gold-glow transition-all min-h-[44px] min-w-[44px] flex items-center justify-center group"
            >
              <Shield className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>

            {/* Persistent RSVP CTA */}
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenRsvp}
              className="relative group overflow-hidden px-4 sm:px-6 py-2.5 rounded-full bg-gradient-to-r from-marigold via-gold to-marigold text-midnight font-bold text-xs sm:text-sm tracking-wider uppercase shadow-diya hover:shadow-diya-lg transition-all min-h-[44px] flex items-center border border-gold-light/40"
            >
              <span className="relative z-10 flex items-center gap-1.5 font-bold">
                <Flame className="w-4 h-4 fill-midnight" />
                <span>RSVP</span>
                {confirmedCount > 0 && (
                  <span className="bg-midnight/25 text-midnight px-1.5 py-0.5 rounded text-xs font-black ml-0.5">
                    {confirmedCount}
                  </span>
                )}
              </span>
              <span className="absolute inset-0 bg-white/25 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
            </motion.button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 text-ivory hover:text-gold transition-colors focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-white/5"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden bg-midnight/98 border-b-2 border-gold/30 px-6 py-6 backdrop-blur-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.button
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-base font-semibold tracking-wider text-ivory hover:text-gold py-3.5 border-b border-gold/15 transition-colors uppercase min-h-[48px] flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="text-gold/40 text-xs">✦</span>
                </motion.button>
              ))}
              <div className="pt-5 flex items-center justify-between">
                <span className="text-sm text-ivory/80">
                  Attendance: <strong className="text-gold font-bold">{confirmedCount} Brothers</strong>
                </span>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenRsvp();
                  }}
                  className="px-6 py-2.5 bg-gradient-to-r from-marigold to-gold text-midnight font-bold text-xs rounded-full uppercase shadow-diya min-h-[44px] flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4 fill-midnight" />
                  <span>Confirm Spot</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
