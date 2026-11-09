import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MessageSquareQuote } from 'lucide-react';
import { Guest } from '../types';
import { RoyalArchDivider, CornerFiligree, WaxSealStamp } from './RoyalMotifs';
import { SpotlightCard } from './ui/SpotlightCard';
import { ShimmerButton } from './ui/ShimmerButton';

interface GuestListSectionProps {
  guests: Guest[];
  onOpenRsvp: () => void;
}

export const GuestListSection: React.FC<GuestListSectionProps> = ({ guests, onOpenRsvp }) => {
  // Only display confirmed guests who consented to show on wall
  const confirmedGuests = guests.filter(
    g => g.attendance === 'YES' && g.show_on_wall !== false
  );

  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <section id="guests" className="py-20 sm:py-28 bg-midnight relative border-t border-gold/15">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Editorial Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-gold uppercase block mb-3 font-mono"
          >
            ✦ महफ़िल के ख़ास मेहमान • THE ROLL OF HONOR ✦
          </motion.span>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-black text-ivory tracking-tight mb-2 leading-none">
            THE <span className="text-gold-gradient">GUEST LIST</span>
          </h2>

          <p className="font-hindi text-xl sm:text-2xl text-marigold font-bold tracking-wide mb-3">
            "नाम दर्ज होते ही आपकी कुर्सी और इज़्ज़त पक्की!"
          </p>

          <div className="text-xl sm:text-2xl font-serif text-gold font-bold mb-4 tracking-wide">
            [{confirmedGuests.length} GENTLEMEN CONFIRMED]
          </div>

          <p className="text-sm sm:text-base text-ivory/80 max-w-lg mx-auto font-sans leading-relaxed">
            Names are etched on the roll of honor immediately upon RSVP confirmation. Confirm your spot to claim your number.
          </p>
        </div>

        {/* Guest Roster (Luxury Editorial Layout with Giant Serif Watermarks) */}
        {confirmedGuests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16">
            {confirmedGuests.map((guest, index) => (
              <motion.div
                key={guest.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <SpotlightCard
                  className="p-6 sm:p-7 bg-gradient-to-br from-burgundy/40 via-midnight to-burgundy-deep/60 border border-gold/40 rounded-2xl shadow-xl overflow-hidden group hover:border-gold transition-all"
                  spotlightColor="rgba(214, 173, 96, 0.2)"
                >
                  {/* Giant Serif Watermark Number in Background */}
                  <span className="absolute -right-2 -bottom-4 font-serif text-8xl sm:text-9xl font-black text-gold/10 select-none pointer-events-none group-hover:text-gold/20 transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      {/* Monogram Crest */}
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full border-2 border-gold/60 bg-burgundy/80 flex items-center justify-center font-serif text-lg font-bold text-gold shadow-gold-glow shrink-0 group-hover:scale-105 transition-transform">
                          {getInitials(guest.name)}
                        </div>
                        <div>
                          <span className="font-mono text-xs font-bold text-gold/80 block uppercase tracking-wider">
                            ENTRY #{String(index + 1).padStart(2, '0')}
                          </span>
                          <h3 className="font-serif text-2xl font-bold text-ivory group-hover:text-gold transition-colors">
                            {guest.name}
                          </h3>
                        </div>
                      </div>

                      <WaxSealStamp label="CONFIRMED" sub="STATUS" className="shrink-0" />
                    </div>

                    {guest.nickname && (
                      <p className="text-base text-marigold font-serif italic mb-2">
                        "{guest.nickname}"
                      </p>
                    )}

                    {guest.message && (
                      <div className="mt-3 pt-3 border-t border-gold/15">
                        <p className="text-xs sm:text-sm text-ivory/80 italic font-serif flex items-start gap-2 leading-relaxed">
                          <MessageSquareQuote className="w-4 h-4 text-gold/60 shrink-0 mt-0.5" />
                          <span>"{guest.message}"</span>
                        </p>
                      </div>
                    )}
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        ) : (
          /* EMPTY GUEST LIST STATE (Regal Invitation) */
          <div className="relative max-w-md mx-auto text-center bg-gradient-to-b from-burgundy/50 to-midnight p-8 sm:p-12 rounded-3xl border-2 border-gold/50 shadow-2xl mb-16 overflow-hidden">
            <CornerFiligree className="absolute top-2.5 left-2.5" />
            <CornerFiligree className="absolute top-2.5 right-2.5 rotate-90" />
            <CornerFiligree className="absolute bottom-2.5 left-2.5 -rotate-90" />
            <CornerFiligree className="absolute bottom-2.5 right-2.5 rotate-180" />

            <div className="w-16 h-16 rounded-full bg-burgundy/80 border-2 border-gold/60 flex items-center justify-center mx-auto mb-4 text-3xl shadow-gold-glow animate-flicker">
              🪔
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ivory mb-2">
              The Roll Awaits You
            </h3>

            <p className="text-sm text-ivory/80 font-sans leading-relaxed mb-6">
              Be the next gentleman to cement your name on the official roll of honor.
            </p>

            <ShimmerButton
              onClick={onOpenRsvp}
              variant="gold"
              size="md"
              className="w-full min-h-[46px]"
            >
              <Sparkles className="w-4 h-4 fill-midnight" />
              <span>Claim Your Entry Spot</span>
            </ShimmerButton>
          </div>
        )}

        <RoyalArchDivider />
      </div>
    </section>
  );
};
