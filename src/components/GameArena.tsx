import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gamepad2,
  ThumbsUp,
  Plus,
  Dices,
  RefreshCw,
  X,
  Sparkles,
  Flame
} from 'lucide-react';
import { GameIdea, PartyDare } from '../types';
import { PARTY_DARES } from '../services/initialData';
import { addGameSuggestion, voteForGame, getCurrentUser } from '../services/storage';
import { SpotlightCard } from './ui/SpotlightCard';
import { ShimmerButton } from './ui/ShimmerButton';

interface GameArenaProps {
  games: GameIdea[];
  isVaultOpen: boolean;
}

export const GameArena: React.FC<GameArenaProps> = ({ games }) => {
  const [isSuggestModalOpen, setIsSuggestModalOpen] = useState(false);

  // Suggest Form State
  const currentUser = getCurrentUser();
  const [title, setTitle] = useState('');
  const [rules, setRules] = useState('');
  const [suggestedBy, setSuggestedBy] = useState(currentUser?.name || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dare Generator State
  const [currentDare, setCurrentDare] = useState<PartyDare>(PARTY_DARES[0]);
  const [isSpinning, setIsSpinning] = useState(false);

  const voterIdentity = currentUser?.name || 'Guest';

  const handleVote = async (gameId: string) => {
    try {
      await voteForGame(gameId, voterIdentity);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSuggestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !rules.trim()) return;

    setIsSubmitting(true);
    try {
      await addGameSuggestion({
        title: title.trim(),
        rules: rules.trim(),
        suggested_by: suggestedBy.trim() || 'A Gentleman',
      });
      setIsSuggestModalOpen(false);
      setTitle('');
      setRules('');
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRollDare = () => {
    setIsSpinning(true);
    let counter = 0;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * PARTY_DARES.length);
      setCurrentDare(PARTY_DARES[randomIndex]);
      counter++;
      if (counter > 7) {
        clearInterval(interval);
        setIsSpinning(false);
      }
    }, 90);
  };

  return (
    <section id="games" className="py-20 sm:py-28 bg-gradient-to-b from-midnight via-burgundy-deep/30 to-midnight relative border-t border-gold/15">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-burgundy-light/60 border border-gold/40 text-gold text-xs font-semibold uppercase tracking-widest mb-3 font-mono"
          >
            <Gamepad2 className="w-4 h-4 text-marigold" />
            <span>✦ खेल, हंसी और दांव • HIGH STAKES ENTERTAINMENT ✦</span>
          </motion.div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-ivory tracking-tight mb-2">
            THE <span className="text-gold-gradient">GAMES & DARES</span>
          </h2>

          <p className="font-hindi text-xl sm:text-2xl text-marigold font-bold tracking-wide mb-2">
            "बोरियत की कोई गुंजाइश नहीं — जो हारा, वो सबको हंसाएगा!"
          </p>

          <p className="font-serif text-lg sm:text-xl text-gold-light italic mb-3">
            "No boring conversations allowed. We play to win."
          </p>

          <p className="text-sm sm:text-base text-ivory/80 max-w-lg mx-auto mb-7 font-sans leading-relaxed">
            Here are some of the battles planned. Got a game that can make everyone lose their minds? Suggest it below!
          </p>

          <ShimmerButton
            onClick={() => setIsSuggestModalOpen(true)}
            variant="gold"
            size="md"
            className="mx-auto min-h-[46px] shadow-diya"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Suggest A Game Idea</span>
          </ShimmerButton>
        </div>

        {/* GAMES GRID WITH 3D SPOTLIGHT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16">
          {games.map((game, idx) => {
            const hasVoted = game.votes.includes(voterIdentity);

            return (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
              >
                <SpotlightCard
                  className="bg-midnight-card/90 p-6 sm:p-7 border border-gold/30 hover:border-gold/60 shadow-royal-card flex flex-col justify-between h-full group"
                  spotlightColor="rgba(214, 173, 96, 0.16)"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-midnight border border-gold/25 text-marigold">
                        {game.is_preset ? 'Featured Game' : 'Community Pitch'}
                      </span>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleVote(game.id)}
                        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all border min-h-[38px] ${
                          hasVoted
                            ? 'bg-gold text-midnight border-gold shadow'
                            : 'bg-midnight text-ivory/80 border-gold/30 hover:border-gold hover:text-gold'
                        }`}
                      >
                        <ThumbsUp className={`w-3.5 h-3.5 ${hasVoted ? 'fill-midnight' : ''}`} />
                        <span>{game.votes.length} Votes</span>
                      </motion.button>
                    </div>

                    <h4 className="font-serif text-xl sm:text-2xl font-bold text-ivory mb-2 group-hover:text-gold transition-colors">
                      {game.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-ivory/80 font-sans leading-relaxed mb-4">
                      {game.rules}
                    </p>
                  </div>

                  <div className="pt-3.5 border-t border-gold/15 text-xs text-ivory/60 flex justify-between font-mono">
                    <span>Suggested by: <strong className="text-ivory font-semibold">{game.suggested_by}</strong></span>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>

        {/* MYSTERY DARE VAULT TEASER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-midnight-card/90 border-2 border-gold/40 p-6 sm:p-10 shadow-2xl backdrop-blur-xl text-center relative overflow-hidden"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-midnight border border-gold/40 text-gold text-xs font-bold uppercase tracking-wider mb-3">
            <Dices className="w-4 h-4 text-marigold" />
            <span>Mystery Challenge Vault</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-4xl font-bold text-ivory mb-2">
            A GLIMPSE INTO THE PARTY DARES
          </h3>

          <p className="text-xs sm:text-base text-ivory/80 max-w-xl mx-auto mb-7 font-sans leading-relaxed">
            We have multiple secret challenges and high-energy showdowns planned for the night. Here’s a sneak peek from the vault:
          </p>

          {/* Random Dare Card with 3D Tilt */}
          <div className="max-w-lg mx-auto bg-midnight/95 p-6 rounded-2xl border-2 border-gold/40 shadow-inner mb-7 text-left relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-marigold px-3 py-1 rounded-full bg-burgundy/80 border border-gold/30 font-mono">
                {currentDare.category}
              </span>
              <span className="text-xs text-gold font-bold flex items-center gap-1 font-mono">
                <Flame className="w-3.5 h-3.5 text-marigold" />
                {currentDare.intensity} Intensity
              </span>
            </div>

            <h4 className={`font-serif text-2xl font-bold text-ivory mb-2 transition-all ${isSpinning ? 'opacity-30 blur-sm' : 'opacity-100'}`}>
              {currentDare.title}
            </h4>

            <p className={`text-xs sm:text-sm text-ivory/85 leading-relaxed font-sans transition-all ${isSpinning ? 'opacity-30' : 'opacity-100'}`}>
              "{currentDare.description}"
            </p>
          </div>

          <ShimmerButton
            onClick={handleRollDare}
            disabled={isSpinning}
            variant="gold"
            size="md"
            className="mx-auto min-h-[46px] shadow-diya"
          >
            <RefreshCw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
            <span>Roll Another Sneak Peek Dare</span>
          </ShimmerButton>

          <p className="text-xs sm:text-sm text-ivory/60 mt-5 italic font-serif">
            "The full vault of spontaneous challenges unlocks live at the party!"
          </p>
        </motion.div>
      </div>

      {/* SUGGEST GAME MODAL */}
      <AnimatePresence>
        {isSuggestModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md bg-midnight-card border-2 border-gold/50 rounded-3xl p-6 sm:p-7 shadow-2xl"
            >
              <button
                onClick={() => setIsSuggestModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full text-ivory/60 hover:text-gold hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-5">
                <h3 className="font-serif text-2xl font-bold text-ivory">
                  Pitch A Game Idea
                </h3>
                <p className="text-xs sm:text-sm text-ivory/60 mt-1 font-sans">
                  Suggest something hilarious for the party night.
                </p>
              </div>

              <form onSubmit={handleSuggestSubmit} className="space-y-4">
                <div>
                  <label htmlFor="gameTitle" className="block text-xs font-semibold uppercase tracking-wider text-gold mb-1 font-mono">
                    Game Name
                  </label>
                  <input
                    id="gameTitle"
                    name="gameTitle"
                    type="text"
                    required
                    placeholder="e.g. 60-Second Lemon Relay"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-midnight border border-gold/30 text-ivory placeholder-ivory/30 focus:border-gold text-base"
                  />
                </div>

                <div>
                  <label htmlFor="gameRules" className="block text-xs font-semibold uppercase tracking-wider text-gold mb-1 font-mono">
                    Rules & Quick Explanation
                  </label>
                  <textarea
                    id="gameRules"
                    name="gameRules"
                    required
                    rows={3}
                    placeholder="How is it played and who wins?"
                    value={rules}
                    onChange={e => setRules(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-midnight border border-gold/30 text-ivory placeholder-ivory/30 focus:border-gold text-base resize-none"
                  />
                </div>

                <div>
                  <label htmlFor="gameSuggestedBy" className="block text-xs font-semibold uppercase tracking-wider text-gold mb-1 font-mono">
                    Your Name
                  </label>
                  <input
                    id="gameSuggestedBy"
                    name="gameSuggestedBy"
                    type="text"
                    placeholder="e.g. Rohan"
                    value={suggestedBy}
                    onChange={e => setSuggestedBy(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-midnight border border-gold/30 text-ivory placeholder-ivory/30 focus:border-gold text-base"
                  />
                </div>

                <ShimmerButton
                  type="submit"
                  disabled={isSubmitting || !title.trim() || !rules.trim()}
                  variant="gold"
                  size="md"
                  className="w-full mt-2 min-h-[48px]"
                >
                  {isSubmitting ? 'Submitting...' : 'Pitch Game to Brotherhood'}
                </ShimmerButton>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
