import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Users, Crown, UtensilsCrossed, Palette } from 'lucide-react';
import { SpotlightCard } from './ui/SpotlightCard';
import { BlurText } from './ui/TextReveal';

export const TheExperience: React.FC = () => {
  const highlights = [
    {
      icon: <Users className="w-6 h-6 text-gold" />,
      title: 'Brotherhood Socializer',
      desc: 'Many of us are meeting each other for the very first time. No awkward small talk — just pure warmth, laughs, and new bonds.',
      badge: 'THE GATHERING',
    },
    {
      icon: <Palette className="w-6 h-6 text-marigold" />,
      title: 'DIY Venue Setup',
      desc: 'We transform the venue ourselves. Stringing warm fairy lights, lighting 40+ earthen diyas, and setting up the space together.',
      badge: 'ALL HANDS IN',
    },
    {
      icon: <Crown className="w-6 h-6 text-amber-300" />,
      title: 'Red Carpet Ramp Walk',
      desc: 'Every single brother walks the carpet in their sharpest traditional fit. Photos, swagger, and awards at the end of the night.',
      badge: 'STRICTLY TRADITIONAL',
    },
    {
      icon: <UtensilsCrossed className="w-6 h-6 text-rose-400" />,
      title: 'Live Dinner Order',
      desc: 'No cold buffet trays. We poll the room live at the venue and order hot fresh food (biryanis, rolls, desserts) together.',
      badge: 'HOT & FRESH',
    },
  ];

  return (
    <section id="vibe" className="py-20 sm:py-28 bg-midnight relative overflow-hidden border-t border-gold/15">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-burgundy/20 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-burgundy-light/60 border border-gold/40 text-gold text-xs font-semibold uppercase tracking-widest mb-3 font-mono"
          >
            <Sparkles className="w-4 h-4 text-marigold" />
            <span>✦ जलसा और जश्न • THE GATHERING ✦</span>
          </motion.div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-ivory tracking-tight mb-2">
            INDIAN FESTIVE LUXURY & <span className="text-gold-gradient">BROTHERHOOD</span>
          </h2>

          <p className="font-hindi text-gold-light text-lg sm:text-xl mb-3 font-medium">
            "देसी ठाठ, बेमिसाल यारी और यादगार शाम"
          </p>

          <p className="text-ivory/80 text-sm sm:text-base leading-relaxed font-sans">
            A genuine, high-energy get-together. Dress sharp in traditional wear, bring your best spirit, break the ice, and make it a night to remember.
          </p>
        </div>

        {/* 4 Interactive 3D Spotlight Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {highlights.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
            >
              <SpotlightCard
                className="bg-midnight-card/90 p-6 sm:p-7 border border-gold/30 hover:border-gold/60 shadow-royal-card flex flex-col justify-between h-full group"
                spotlightColor="rgba(214, 173, 96, 0.18)"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-midnight border border-gold/40 flex items-center justify-center shadow-inner group-hover:scale-105 group-hover:border-gold transition-all duration-300">
                      {item.icon}
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-wider text-gold/75 px-2.5 py-0.5 rounded-full border border-gold/25 bg-midnight">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-ivory mb-2 group-hover:text-gold transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-ivory/75 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
