import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ExternalLink, Navigation, Clock, ShieldAlert } from 'lucide-react';
import { SpotlightCard } from './ui/SpotlightCard';
import { ShimmerButton } from './ui/ShimmerButton';

export const LocationSection: React.FC = () => {
  const MAPS_URL = 'https://maps.app.goo.gl/fyFyBPbWkCyxLgbD7';

  return (
    <section id="location" className="py-20 sm:py-28 bg-midnight relative border-t border-gold/15">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-burgundy-light/60 border border-gold/40 text-gold text-xs font-bold uppercase tracking-wider mb-3 font-mono"
          >
            <MapPin className="w-4 h-4 text-marigold" />
            <span>✦ महफ़िल का पता • VENUE COORDINATES ✦</span>
          </motion.div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-ivory tracking-tight mb-2">
            GETTING TO THE <span className="text-gold-gradient">VENUE</span>
          </h2>

          <p className="font-hindi text-xl sm:text-2xl text-marigold font-bold tracking-wide mb-3">
            "ठीक शाम ६ बजे पहुंच जाना — देर की तो मज़ा छूट जाएगा!"
          </p>

          <p className="text-sm sm:text-base text-ivory/80 font-sans">
            12 November 2026 • 6:00 PM to 11:00 PM. Tap below for direct GPS navigation.
          </p>
        </div>

        {/* Location Display Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SpotlightCard
            className="rounded-3xl bg-midnight-card/90 border-2 border-gold/40 p-6 sm:p-10 shadow-2xl backdrop-blur-xl"
            spotlightColor="rgba(214, 173, 96, 0.16)"
            enableTilt={false}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
              <div className="space-y-3.5 text-center sm:text-left">
                <div className="inline-block px-3.5 py-1 rounded-full bg-midnight border border-gold/30 text-xs font-bold text-gold uppercase tracking-wider font-mono">
                  Confirmed GPS Pin
                </div>

                <h3 className="font-serif text-2xl sm:text-4xl font-bold text-ivory">
                  The Diwali Social Gathering
                </h3>

                <p className="text-sm sm:text-base text-ivory/85 leading-relaxed max-w-md font-sans">
                  Direct pin location on Google Maps. Please reach by 6:00 PM sharp so we can begin the DIY venue setup and red carpet ramp walk together!
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3.5 pt-2">
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ShimmerButton
                      variant="gold"
                      size="sm"
                      className="min-h-[46px]"
                    >
                      <ExternalLink className="w-4 h-4 stroke-[2.5]" />
                      <span>Open in Google Maps</span>
                    </ShimmerButton>
                  </a>

                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAPS_URL)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ShimmerButton
                      variant="outline"
                      size="sm"
                      className="min-h-[46px]"
                    >
                      <Navigation className="w-4 h-4 text-marigold" />
                      <span>Get Directions</span>
                    </ShimmerButton>
                  </a>
                </div>
              </div>

              {/* Visual Pin Emblem with Radar Rings */}
              <div className="relative w-36 h-36 rounded-2xl bg-midnight border border-gold/40 flex flex-col items-center justify-center text-center shadow-inner shrink-0 overflow-hidden">
                <div className="absolute inset-0 rounded-2xl border border-gold/20 animate-ping duration-1000 pointer-events-none opacity-20" />
                <div className="w-14 h-14 rounded-full bg-burgundy/80 border border-gold/50 flex items-center justify-center shadow-gold-glow mb-2">
                  <MapPin className="w-7 h-7 text-marigold animate-bounce" />
                </div>
                <span className="text-xs font-bold text-gold tracking-wider font-mono">
                  EXACT PIN
                </span>
              </div>
            </div>

            {/* Quick Notice Pill */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-6 border-t border-gold/20 text-xs sm:text-sm text-ivory/80">
              <div className="flex items-center gap-2.5 bg-midnight/80 p-3.5 rounded-xl border border-gold/15">
                <Clock className="w-5 h-5 text-marigold shrink-0" />
                <span><strong className="text-ivory">6:00 PM Sharp:</strong> Doors open. Don't be late!</span>
              </div>

              <div className="flex items-center gap-2.5 bg-midnight/80 p-3.5 rounded-xl border border-gold/15">
                <ShieldAlert className="w-5 h-5 text-emerald-400 shrink-0" />
                <span><strong className="text-ivory">11:00 PM Cleanup:</strong> All hands on deck to tidy up.</span>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>
      </div>
    </section>
  );
};
