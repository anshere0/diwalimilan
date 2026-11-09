import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, Sparkles, HeartPulse, Trash2, ShieldAlert } from 'lucide-react';
import { CornerFiligree } from './RoyalMotifs';
import { SpotlightCard } from './ui/SpotlightCard';

export const NeighborhoodEtiquette: React.FC = () => {
  const rules = [
    {
      icon: <Volume2 className="w-5 h-5 text-gold" />,
      title: 'Sound & Volume Discipline',
      desc: 'Keep music crisp and balanced. Mindful bass attenuation during late hours to avoid ambient resonance.',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-marigold" />,
      title: 'Zero Firecrackers (LEDs & Diyas)',
      desc: 'Strictly zero firecrackers anywhere near the premises. Warm fairy lights, earthen diyas, and music only.',
    },
    {
      icon: <HeartPulse className="w-5 h-5 text-red-400" />,
      title: 'Hospital & Senior Care Respect',
      desc: 'Both institutions are right next door. Zero honking, shouting, or blocked gates and pathways.',
    },
    {
      icon: <Trash2 className="w-5 h-5 text-amber-300" />,
      title: 'Mandatory Cleanup Assistance',
      desc: 'Every gentleman helps clean up plates, cups, and boxes at 11:00 PM. No exceptions.',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-midnight relative border-t border-gold/15">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* The Royal Charter Scroll */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-gradient-to-b from-burgundy via-burgundy-deep to-burgundy p-7 sm:p-12 rounded-3xl border-2 border-gold/60 shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden"
        >
          {/* Ornate Gold Corner Filigrees */}
          <CornerFiligree className="absolute top-2.5 left-2.5" />
          <CornerFiligree className="absolute top-2.5 right-2.5 rotate-90" />
          <CornerFiligree className="absolute bottom-2.5 left-2.5 -rotate-90" />
          <CornerFiligree className="absolute bottom-2.5 right-2.5 rotate-180" />

          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-[0.3em] text-gold font-bold block mb-2 font-mono">
              ✦ तहज़ीब-ए-महफ़िल • BROTHERHOOD PROTOCOL ✦
            </span>
            <h3 className="font-serif text-3xl sm:text-5xl text-ivory font-bold mb-3 leading-tight">
              A SMALL REQUEST, <span className="text-gold-gradient">GENTLEMEN.</span>
            </h3>
            <p className="font-hindi text-gold text-lg sm:text-xl font-medium mb-3">
              "जश्न पूरा होगा, मगर तहज़ीब और अदब के साथ।"
            </p>
            <p className="text-sm sm:text-base text-ivory/90 leading-relaxed font-sans">
              There is an <strong className="text-gold font-bold">old-age home</strong> and a <strong className="text-gold font-bold">hospital</strong> right next door to our venue. We celebrate with full energy, dance, and laughter — while demonstrating unmatched respect and poise.
            </p>
          </div>

          {/* 4 Rules Grid with Spotlight Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
            {rules.map((r, i) => (
              <SpotlightCard
                key={i}
                className="bg-midnight/80 p-5 rounded-2xl border border-gold/30 flex items-start gap-4 group"
                spotlightColor="rgba(214, 173, 96, 0.15)"
                enableTilt={false}
              >
                <div className="w-11 h-11 rounded-xl bg-burgundy/90 border border-gold/40 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 group-hover:border-gold transition-transform">
                  {r.icon}
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-ivory mb-1 group-hover:text-gold transition-colors">
                    {r.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-ivory/80 leading-relaxed">
                    {r.desc}
                  </p>
                </div>
              </SpotlightCard>
            ))}
          </div>

          {/* Banner Tagline */}
          <div className="text-center pt-5 border-t border-gold/30">
            <p className="font-serif text-lg sm:text-xl text-gold font-bold uppercase tracking-wider">
              GOOD VIBES. GREAT MUSIC. ZERO DISTURBANCE.
            </p>
            <p className="text-xs sm:text-sm text-ivory/70 italic mt-1 font-serif">
              "Let’s make memories, not complaints."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
