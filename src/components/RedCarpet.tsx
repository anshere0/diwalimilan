import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Sparkles, Trophy, Lock, CheckCircle2, Flame, Camera, Laugh, Check } from 'lucide-react';
import { AwardCategory, Guest } from '../types';
import { voteForAward, getCurrentUser } from '../services/storage';
import { RoyalArchDivider, CornerFiligree } from './RoyalMotifs';
import { SpotlightCard } from './ui/SpotlightCard';
import { ShimmerButton } from './ui/ShimmerButton';

interface RedCarpetProps {
  awards: AwardCategory[];
  guests: Guest[];
  isVotingOpen: boolean;
}

export const RedCarpet: React.FC<RedCarpetProps> = ({
  awards,
  guests,
  isVotingOpen,
}) => {
  const [selectedAwardId, setSelectedAwardId] = useState<string>(awards[0]?.id || 'award-1');
  const [selectedNominee, setSelectedNominee] = useState<string>('');
  const [hasVotedNotice, setHasVotedNotice] = useState<string>('');

  const currentUser = getCurrentUser();
  const voterName = currentUser?.name || 'A Gentleman';

  const confirmedGuests = guests.filter(g => g.attendance === 'YES');
  const selectedAward = awards.find(a => a.id === selectedAwardId) || awards[0];

  const handleCastVote = async () => {
    if (!selectedNominee) return;
    try {
      await voteForAward(selectedAward.id, selectedNominee, voterName);
      setHasVotedNotice(`Your vote for "${selectedNominee}" in ${selectedAward.title} has been recorded!`);
      setTimeout(() => setHasVotedNotice(''), 4500);
    } catch (e) {
      console.error(e);
    }
  };

  const getAwardIcon = (title: string) => {
    if (title.includes('Fit')) return <Crown className="w-6 h-6 text-gold" />;
    if (title.includes('Walk')) return <Sparkles className="w-6 h-6 text-marigold" />;
    if (title.includes('Pose')) return <Camera className="w-6 h-6 text-amber-300" />;
    if (title.includes('Personality')) return <Laugh className="w-6 h-6 text-emerald-400" />;
    return <Trophy className="w-6 h-6 text-rose-400" />;
  };

  const getAwardHindiTitle = (title: string) => {
    if (title.includes('Fit')) return 'सबसे शानदार लिबास';
    if (title.includes('Walk')) return 'कातिलाना चाल';
    if (title.includes('Pose')) return 'शाही पोज़';
    if (title.includes('Personality')) return 'महफ़िल की जान';
    return 'आज की रात का सिकंदर';
  };

  const romanNumerals = ['I', 'II', 'III', 'IV', 'V'];

  return (
    <section id="red-carpet" className="py-20 sm:py-28 bg-midnight relative overflow-hidden">
      {/* Visual Ambient Spotlights from Top */}
      <div className="absolute top-0 left-1/4 w-96 h-[600px] bg-gradient-to-b from-marigold/15 via-gold/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-[600px] bg-gradient-to-b from-marigold/15 via-gold/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-gold uppercase block mb-3 font-mono"
          >
            ✦ शाही अंदाज़ और रेड कारपेट • COUTURE & RUNWAY ✦
          </motion.span>

          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-black text-ivory tracking-tight mb-2 leading-none">
            THE <span className="text-gold-gradient">RED CARPET</span> WALK
          </h2>

          <p className="font-hindi text-xl sm:text-3xl text-marigold font-bold tracking-wide mb-2">
            "आज रात सादा लिबास नामंज़ूर है — सिर्फ़ ख़ालिस देसी ठाठ!"
          </p>

          <p className="font-serif text-lg sm:text-2xl text-gold-light italic mb-4">
            "Your everyday outfit has been officially rejected."
          </p>

          <p className="text-sm sm:text-base text-ivory/80 max-w-2xl mx-auto leading-relaxed font-sans mb-8">
            Everyone walks the velvet carpet — zero registrations needed! Show up in your sharpest traditional attire (Sherwani, Bandhgala, Royal Kurta, or Indo-Western) and claim the spotlight.
          </p>

          {/* Sabyasachi / Couture Style Lookbook Strip */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { label: 'Royal Sherwanis', desc: 'Silk Stoles & Zari Brocade' },
              { label: 'Jodhpuri Bandhgalas', desc: 'Structured Velvet & Brass Buttons' },
              { label: 'Lustrous Kurtas', desc: 'Nehru Bundi Jackets' },
              { label: 'Indo-Western Fusion', desc: 'Asymmetric Cuts & Mojaris' },
            ].map(item => (
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                key={item.label}
                className="px-4 py-2.5 rounded-xl bg-midnight border border-gold/30 text-left shadow-sm hover:border-gold hover:shadow-gold-glow transition-all"
              >
                <div className="text-xs sm:text-sm font-bold text-gold font-serif">{item.label}</div>
                <div className="text-[11px] text-ivory/60 font-sans">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <RoyalArchDivider />

        {/* VISUAL CRIMSON VELVET RUNWAY STRIP */}
        <div className="relative my-12 py-10 px-6 sm:px-12 bg-gradient-to-b from-burgundy via-burgundy-deep to-burgundy rounded-3xl border-x-4 border-gold shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden">
          {/* Gold Fringe Borders */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-gold via-marigold to-gold shadow-gold-glow" />
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-gold via-marigold to-gold shadow-gold-glow" />

          {/* Corner Filigrees */}
          <CornerFiligree className="absolute top-2.5 left-2.5" />
          <CornerFiligree className="absolute top-2.5 right-2.5 rotate-90" />
          <CornerFiligree className="absolute bottom-2.5 left-2.5 -rotate-90" />
          <CornerFiligree className="absolute bottom-2.5 right-2.5 rotate-180" />

          <div className="relative text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-bold block mb-1 font-mono">
              ✦ OFFICIAL NIGHT TROPHIES ✦
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-ivory mb-2">
              THE BROTHERHOOD AWARDS
            </h3>
            <p className="text-xs sm:text-sm text-ivory/70 font-sans">
              {isVotingOpen
                ? 'Voting is LIVE! Cast your vote for each award below.'
                : 'Secret live voting unlocks right here on party night at 9:30 PM!'}
            </p>
          </div>

          {/* 5 AWARDS AS ROYAL GOLD PLAQUES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {awards.map((award, idx) => {
              const isSelected = selectedAwardId === award.id;
              return (
                <SpotlightCard
                  key={award.id}
                  onClick={() => setSelectedAwardId(award.id)}
                  className={`p-5 rounded-2xl transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-midnight border-gold shadow-gold-glow scale-[1.02]'
                      : 'bg-midnight/80 border-gold/30 hover:border-gold/60'
                  }`}
                  spotlightColor="rgba(214, 173, 96, 0.2)"
                  enableTilt={false}
                >
                  {/* Roman Numeral Seal */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-serif text-xs sm:text-sm font-black text-gold/80 tracking-widest font-mono">
                      PLAQUE {romanNumerals[idx]}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-burgundy/80 border border-gold/50 flex items-center justify-center shadow-inner">
                      {getAwardIcon(award.title)}
                    </div>
                  </div>

                  <h4 className="font-serif text-xl font-bold text-ivory mb-0.5">
                    {award.title}
                  </h4>

                  <p className="font-hindi text-xs sm:text-sm text-marigold font-bold mb-2">
                    {getAwardHindiTitle(award.title)}
                  </p>

                  <p className="text-xs sm:text-sm text-ivory/75 font-sans leading-relaxed">
                    {award.description}
                  </p>

                  {isSelected && (
                    <div className="mt-3 pt-2.5 border-t border-gold/20 flex items-center justify-between text-xs text-gold font-bold">
                      <span>SELECTED PLAQUE</span>
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </SpotlightCard>
              );
            })}
          </div>

          {/* VOTING STATE (LOCKED VS UNLOCKED) */}
          {!isVotingOpen ? (
            /* LOCKED VAULT STATUS */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 sm:p-8 rounded-2xl bg-midnight/90 border border-gold/40 text-center max-w-xl mx-auto shadow-inner"
            >
              <div className="w-14 h-14 rounded-full bg-burgundy/80 border border-gold/50 flex items-center justify-center mx-auto mb-3 shadow-gold-glow">
                <Lock className="w-6 h-6 text-gold" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-ivory mb-2">
                Ballot Box Opens at 9:30 PM
              </h4>
              <p className="text-sm sm:text-base text-ivory/80 leading-relaxed font-sans">
                Once everyone makes their red carpet entrance and shows off their fit, secret voting opens live! You will be able to cast your vote for your brothers right here.
              </p>
              <div className="mt-4 text-xs sm:text-sm text-marigold font-mono font-medium">
                Host / Admin can activate voting with 1 click in the Admin Deck.
              </div>
            </motion.div>
          ) : (
            /* LIVE BALLOT ACTIVE STATE */
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="p-6 sm:p-8 rounded-2xl bg-midnight border-2 border-gold max-w-xl mx-auto shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4 border-b border-gold/20 pb-3">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-marigold animate-pulse" />
                  <span className="font-serif text-xl sm:text-2xl font-bold text-ivory">
                    Voting: <span className="text-gold">{selectedAward.title}</span>
                  </span>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500">
                  LIVE BALLOT
                </span>
              </div>

              {hasVotedNotice && (
                <div className="mb-4 p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-400 text-emerald-200 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>{hasVotedNotice}</span>
                </div>
              )}

              {confirmedGuests.length === 0 ? (
                <p className="text-sm text-ivory/70 italic font-sans text-center py-4">
                  No confirmed RSVPs yet. As attendees confirm their spot, their names will appear here for voting!
                </p>
              ) : (
                <div className="space-y-4">
                  <label className="block text-xs sm:text-sm font-semibold uppercase tracking-wider text-gold font-sans">
                    Select the brother who earned "{selectedAward.title}":
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {confirmedGuests.map(g => {
                      const isSelected = selectedNominee === g.name;
                      return (
                        <button
                          key={g.id}
                          type="button"
                          onClick={() => setSelectedNominee(g.name)}
                          className={`py-3 px-3.5 rounded-xl text-xs sm:text-sm font-bold text-left transition-all border truncate min-h-[44px] flex items-center justify-between ${
                            isSelected
                              ? 'bg-gold text-midnight border-gold shadow'
                              : 'bg-midnight-card text-ivory/80 border-gold/25 hover:border-gold/50'
                          }`}
                        >
                          <span className="truncate">{g.name}</span>
                          {isSelected && <Check className="w-4 h-4 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  <ShimmerButton
                    onClick={handleCastVote}
                    disabled={!selectedNominee}
                    variant="gold"
                    size="md"
                    className="w-full mt-3 min-h-[48px]"
                  >
                    Cast Ballot for {selectedNominee || 'Nominee'}
                  </ShimmerButton>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
