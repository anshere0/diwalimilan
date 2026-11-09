import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Clock, Sparkles, ChevronDown, CheckCircle, ShieldAlert } from 'lucide-react';
import confetti from 'canvas-confetti';
import { festiveAudio } from '../utils/audio';
import { RoyalJaliBackground } from './RoyalMotifs';
import { GoldenRays } from './ui/GoldenRays';
import { BlurText } from './ui/TextReveal';
import { ShimmerButton } from './ui/ShimmerButton';

interface HeroProps {
  onOpenRsvp: () => void;
  confirmedCount: number;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRsvp, confirmedCount }) => {
  const [isDiyaLit, setIsDiyaLit] = useState<boolean>(() => {
    return localStorage.getItem('diwali_social_diya_lit') === 'true';
  });

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Event Date: 12 November 2026 at 18:00 IST
  useEffect(() => {
    const targetDate = new Date('2026-11-12T18:00:00+05:30').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLightDiya = () => {
    setIsDiyaLit(true);
    localStorage.setItem('diwali_social_diya_lit', 'true');

    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#D6AD60', '#E89A27', '#F5EBDD', '#FF6F1E', '#B08838'],
    });

    festiveAudio.start();
  };

  const handleExploreClick = () => {
    const element = document.getElementById('vibe');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-[96vh] flex items-center justify-center overflow-hidden bg-midnight pt-28 pb-20">
      {/* Royal Indian Jali Motif Background */}
      <RoyalJaliBackground opacity="opacity-[0.05]" />

      {/* Cinematic Golden Volumetric Light Rays */}
      <GoldenRays />

      {/* Dynamic Radial Velvet Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] sm:w-[1000px] h-[750px] sm:h-[1000px] bg-[radial-gradient(circle_at_center,rgba(75,22,39,0.55)_0%,rgba(16,12,13,0.98)_70%)] pointer-events-none z-0" />

      {/* SCREEN 1: DARK PROLOGUE SCREEN */}
      <AnimatePresence>
        {!isDiyaLit ? (
          <motion.div
            initial={{ opacity: 1, scale: 0.98 }}
            exit={{ opacity: 0, scale: 1.08 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-xl mx-auto py-16"
          >
            {/* The Ceremonial Diya */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
              className="relative mb-10 cursor-pointer group"
              onClick={handleLightDiya}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-gradient-to-b from-burgundy-light/60 via-burgundy-deep/80 to-midnight border-2 border-gold/70 flex items-center justify-center shadow-diya group-hover:shadow-diya-lg transition-all duration-500 relative">
                <div className="w-20 h-28 sm:w-24 sm:h-32 diya-flame animate-flicker opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                <div className="absolute -bottom-5 text-4xl sm:text-5xl filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
                  🪔
                </div>
                <div className="absolute -inset-6 rounded-full border border-marigold/35 animate-pulse pointer-events-none" />
                <div className="absolute -inset-12 rounded-full border border-gold/15 animate-ping pointer-events-none duration-1000" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-midnight/80 border border-gold/40 text-gold text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] mb-4"
            >
              <Sparkles className="w-4 h-4 text-marigold" />
              <span>✦ शुभ दीपोत्सव • INAUGURAL CEREMONY ✦</span>
            </motion.div>

            <h2 className="font-serif text-4xl sm:text-6xl text-ivory font-bold mb-4 tracking-tight leading-tight">
              Ignite The <span className="text-gold-gradient">Celebration</span>
            </h2>

            <p className="font-hindi text-gold-light text-xl sm:text-2xl mb-2 font-normal">
              दिये की लौ जलाएं और महफ़िल में दाखिल हों
            </p>

            <p className="text-ivory/80 text-base sm:text-lg mb-10 max-w-md font-sans leading-relaxed">
              A private Diwali gathering to unite, dress sharp, and celebrate. Tap the sacred flame to enter the night.
            </p>

            <ShimmerButton
              onClick={handleLightDiya}
              size="lg"
              variant="gold"
              className="min-h-[54px] shadow-diya"
            >
              <Sparkles className="w-5 h-5 fill-midnight" />
              <span>Light The Diya & Enter</span>
            </ShimmerButton>
          </motion.div>
        ) : (
          /* SCREEN 2: REVEALED COUTURE EDITORIAL HERO */
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center py-6 sm:py-10 flex flex-col items-center"
          >
            {/* Royal Gold Seal Tag */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-midnight/80 border border-gold/60 shadow-gold-glow mb-6"
            >
              <span className="animate-flicker text-base">🪔</span>
              <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-gold uppercase font-serif">
                THE ANNUAL BROTHERHOOD ASSEMBLY • STRICTLY TRADITIONAL
              </span>
            </motion.div>

            {/* GRAND BIG HINDI DISPLAY TITLE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.8 }}
              className="mb-1"
            >
              <h2 className="font-hindi text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-gold-gradient tracking-wide leading-tight drop-shadow-[0_4px_30px_rgba(214,173,96,0.45)]">
                दीपावली मिलन
              </h2>
            </motion.div>

            {/* Massive Editorial Headline */}
            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-ivory tracking-tight mb-3 leading-none select-none">
              THE <span className="text-gold-gradient drop-shadow-[0_4px_25px_rgba(214,173,96,0.35)]">DIWALI</span> SOCIAL
            </h1>

            {/* Warm Homely Welcoming Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
              className="font-hindi text-xl sm:text-3xl md:text-4xl text-marigold font-bold tracking-wide mb-3"
            >
              "घर जैसी गरमाहट, यारों का साथ और दीवाली की रौनक"
            </motion.p>

            {/* Tagline with Gold Leaf Styling */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.7 }}
              className="font-serif text-xl sm:text-3xl text-gold-light italic font-normal tracking-wide mb-2"
            >
              One Night. Unlimited Memories.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.7 }}
              className="text-xs sm:text-sm md:text-base text-ivory/80 font-bold tracking-[0.2em] uppercase mb-9"
            >
              Dress Sharp. Bring Your Energy. Leave With Stories.
            </motion.p>

            {/* Timings, Date & Venue Pill Row (Clean floating aesthetic) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7 }}
              className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 mb-10 text-sm sm:text-base text-ivory/90"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-gold/40 bg-midnight shadow-md">
                <Calendar className="w-4 h-4 text-gold shrink-0" />
                <span className="font-semibold text-ivory">12 Nov 2026 (Thursday)</span>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-marigold bg-midnight shadow-diya/30">
                <Clock className="w-4 h-4 text-marigold shrink-0" />
                <span className="font-bold text-gold">6:00 PM – 11:00 PM</span>
              </div>

              <a
                href="https://maps.app.goo.gl/fyFyBPbWkCyxLgbD7"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-gold/40 bg-midnight hover:border-gold hover:text-gold transition-colors shadow-md"
              >
                <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                <span className="font-medium">Google Maps Pin</span>
              </a>

              {confirmedCount > 0 && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/50 bg-midnight text-emerald-300 shadow-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-bold"><strong>{confirmedCount}</strong> Confirmed</span>
                </div>
              )}
            </motion.div>

            {/* THE BROTHERHOOD PLEDGE BANNER (Royal Maroon Velvet Ribbon) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55, duration: 0.7 }}
              className="relative w-full max-w-2xl bg-gradient-to-r from-burgundy-deep via-burgundy to-burgundy-deep py-4 px-6 sm:px-8 rounded-2xl border-y-2 border-gold/60 shadow-2xl mb-11 text-center font-sans overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="flex items-center justify-center gap-2 font-bold text-gold mb-1.5 uppercase tracking-wider text-xs sm:text-sm">
                <ShieldAlert className="w-4 h-4 text-marigold shrink-0" />
                <span>तहज़ीब-ए-महफ़िल • Punctuality & Cleanup Mandate</span>
              </div>
              <p className="text-sm sm:text-base text-ivory leading-relaxed font-medium">
                ⏰ <strong className="text-gold font-bold">Doors open at 6:00 PM sharp</strong> — arrive on time for the grand ramp walk.  
                <br className="hidden sm:inline" />
                🧹 <strong className="text-gold font-bold">Cleanup at 11:00 PM is mandatory</strong> for every gentleman present.
              </p>
            </motion.div>

            {/* HORIZONTAL MINIMALIST COUNTDOWN */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.7 }}
              className="w-full max-w-2xl py-6 border-y border-gold/30 mb-11"
            >
              <span className="text-xs uppercase tracking-[0.25em] text-gold/80 font-semibold block mb-4 font-mono">
                ✦ TIME REMAINING UNTIL THE CARPET ROLLS OUT ✦
              </span>
              <div className="flex items-center justify-center gap-4 sm:gap-10">
                {[
                  { label: 'DAYS', value: timeLeft.days },
                  { label: 'HOURS', value: timeLeft.hours },
                  { label: 'MINUTES', value: timeLeft.minutes },
                  { label: 'SECONDS', value: timeLeft.seconds },
                ].map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <span className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-gold tabular-nums tracking-tight">
                      {String(item.value).padStart(2, '0')}
                    </span>
                    <span className="text-[11px] sm:text-xs tracking-[0.2em] text-ivory/60 font-sans uppercase font-bold mt-1">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ACTION BUTTONS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md justify-center"
            >
              <ShimmerButton
                onClick={onOpenRsvp}
                size="md"
                variant="gold"
                className="w-full sm:w-auto min-h-[50px] shadow-diya"
              >
                <Sparkles className="w-5 h-5 fill-midnight" />
                <span>Confirm Your Spot (RSVP)</span>
              </ShimmerButton>

              <ShimmerButton
                onClick={handleExploreClick}
                size="md"
                variant="outline"
                className="w-full sm:w-auto min-h-[50px]"
              >
                <span>The Plan</span>
                <ChevronDown className="w-4 h-4 text-gold" />
              </ShimmerButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
