import React from 'react';
import { motion } from 'framer-motion';
import { Share2, Flame, Sparkles } from 'lucide-react';
import { ShimmerButton } from './ui/ShimmerButton';

interface FooterProps {
  onOpenRsvp: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenRsvp }) => {
  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `🪔 *THE DIWALI SOCIAL 2026 — BROTHERS' EDITION*\n` +
      `_One Night. Unlimited Memories._\n\n` +
      `📅 *Date:* 12 November 2026 (Thursday)\n` +
      `⏰ *Timings:* 6:00 PM to 11:00 PM (Sharp!)\n` +
      `📍 *Location:* https://maps.app.goo.gl/fyFyBPbWkCyxLgbD7\n` +
      `👔 *Dress Code:* Strictly Traditional — Red Carpet Edition\n\n` +
      `✨ Red carpet ramp walk, high-stakes games, food ordered live, and brotherhood.\n` +
      `🧹 *Note:* Everyone helps with post-party cleanup!\n\n` +
      `Confirm your RSVP spot on the website now!`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <footer className="relative bg-gradient-to-b from-midnight via-burgundy-deep to-midnight pt-24 pb-16 overflow-hidden border-t-2 border-gold/30">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
        {/* Animated Glowing Diya */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="w-20 h-20 mx-auto rounded-full bg-midnight-card border-2 border-gold/50 flex items-center justify-center shadow-diya mb-8 relative"
        >
          <div className="w-9 h-12 diya-flame animate-flicker" />
          <div className="absolute -inset-3 rounded-full border border-gold/20 animate-pulse pointer-events-none" />
        </motion.div>

        {/* Cinematic Closing Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-2 mb-6"
        >
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-ivory tracking-tight uppercase leading-tight">
            LIGHTS WILL FADE.
          </h2>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-gold tracking-tight uppercase leading-tight">
            MUSIC WILL STOP.
          </h2>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-marigold tracking-tight uppercase leading-tight">
            MEMORIES WILL STAY.
          </h2>
          <p className="font-hindi text-xl sm:text-3xl text-gold font-bold tracking-wide pt-4">
            "दिये बुझेंगे, महफ़िल थमेगी, मगर यह यारी हमेशा रहेगी!"
          </p>
        </motion.div>

        {/* Date & Event Details */}
        <div className="mb-4">
          <span className="font-serif text-lg sm:text-xl font-bold text-ivory tracking-wider block">
            12 NOVEMBER 2026 • 6:00 PM TO 11:00 PM
          </span>
          <span className="text-xs sm:text-sm tracking-[0.25em] text-gold uppercase font-bold block mt-1 font-mono">
            THE DIWALI SOCIAL • दीपावली मिलन
          </span>
        </div>

        <blockquote className="font-serif text-base sm:text-lg text-gold-light italic max-w-md mx-auto mb-10 font-normal">
          "See you on the red carpet, gentlemen."
        </blockquote>

        {/* Final CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-12">
          <ShimmerButton
            onClick={onOpenRsvp}
            variant="gold"
            size="md"
            className="w-full sm:w-auto min-h-[50px] shadow-diya"
          >
            <Flame className="w-4 h-4 fill-midnight" />
            <span>Confirm RSVP Spot</span>
          </ShimmerButton>

          <ShimmerButton
            onClick={handleWhatsAppShare}
            variant="emerald"
            size="md"
            className="w-full sm:w-auto min-h-[50px]"
          >
            <Share2 className="w-4 h-4" />
            <span>Share on WhatsApp</span>
          </ShimmerButton>
        </div>

        {/* Gold Filigree Divider */}
        <div className="gold-divider mb-8" />

        {/* Brotherhood Attribution */}
        <div className="text-xs sm:text-sm text-ivory/60 space-y-1 font-sans">
          <p>The Diwali Social 2026 • Private Brotherhood Gathering</p>
          <p className="text-xs text-ivory/45">
            Good Vibes, Great Music, Zero Disturbance • Post-Party Cleanup Mandatory
          </p>
        </div>
      </div>
    </footer>
  );
};
