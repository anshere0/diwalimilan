import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package,
  Plus,
  Sparkles,
  Zap,
  Coffee,
  Gamepad,
  X,
  UserCheck,
  AlertCircle,
  Check
} from 'lucide-react';
import { SupplyItem, SupplyCategory, Guest } from '../types';
import { claimSupplyItem, unclaimSupplyItem, getCurrentUser, getConfirmedGuestNames } from '../services/storage';
import { WaxSealStamp } from './RoyalMotifs';
import { ShimmerButton } from './ui/ShimmerButton';

interface ContributionBoardProps {
  supplies: SupplyItem[];
  guests: Guest[];
  onOpenRsvp: () => void;
}

export const ContributionBoard: React.FC<ContributionBoardProps> = ({
  supplies,
  guests,
  onOpenRsvp,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | SupplyCategory>('ALL');
  const [claimingItem, setClaimingItem] = useState<SupplyItem | null>(null);
  const [claimError, setClaimError] = useState('');

  const currentUser = getCurrentUser();
  const confirmedNames = getConfirmedGuestNames();

  // Selected registered guest for claiming
  const [selectedClaimant, setSelectedClaimant] = useState(
    confirmedNames.includes(currentUser?.name || '')
      ? currentUser?.name || ''
      : confirmedNames[0] || ''
  );

  const claimedItems = supplies.filter(s => s.is_claimed);
  const totalItems = supplies.length;
  const progressPercent = totalItems > 0 ? Math.round((claimedItems.length / totalItems) * 100) : 0;

  const filteredSupplies = supplies.filter(s => {
    if (selectedCategory === 'ALL') return true;
    return s.category === selectedCategory;
  });

  const handleClaimSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setClaimError('');

    if (!claimingItem) return;
    if (!selectedClaimant) {
      setClaimError('Please select your registered name or RSVP first.');
      return;
    }

    try {
      await claimSupplyItem(claimingItem.id, selectedClaimant);
      setClaimingItem(null);
    } catch (err: any) {
      setClaimError(err.message || 'Failed to claim item.');
    }
  };

  const handleUnclaim = async (item: SupplyItem) => {
    if (!item.claimed_by) return;

    // Check if the current user matches the claimant
    const isOwner = currentUser?.name.trim().toLowerCase() === item.claimed_by.trim().toLowerCase();
    if (!isOwner) {
      alert(`Only ${item.claimed_by} (or the Host via Admin Deck) can release this item.`);
      return;
    }

    if (window.confirm(`Release "${item.item_name}" back to the pending checklist?`)) {
      try {
        await unclaimSupplyItem(item.id, currentUser?.name);
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  const getCategoryIcon = (cat: SupplyCategory) => {
    switch (cat) {
      case 'DECORATION':
        return <Sparkles className="w-4 h-4 text-marigold" />;
      case 'SOUND & POWER':
        return <Zap className="w-4 h-4 text-blue-400" />;
      case 'FOOD & SNACKS':
        return <Coffee className="w-4 h-4 text-amber-400" />;
      case 'GAMES':
        return <Gamepad className="w-4 h-4 text-emerald-400" />;
      default:
        return <Package className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <section id="supplies" className="py-20 sm:py-28 bg-midnight relative border-t border-gold/15">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Editorial Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-gold uppercase block mb-3 font-mono"
          >
            ✦ महफ़िल का सामान और इंतज़ाम • COLLECTIVE LOGISTICS ✦
          </motion.span>

          <h2 className="font-serif text-4xl sm:text-6xl font-black text-ivory tracking-tight mb-2 leading-none">
            THE BROTHERHOOD <span className="text-gold-gradient">MANIFEST</span>
          </h2>

          <p className="font-hindi text-xl sm:text-2xl text-marigold font-bold tracking-wide mb-2">
            "खाली हाथ कोई नहीं आएगा — हर भाई कुछ न कुछ लाएगा!"
          </p>

          <p className="text-sm sm:text-base text-ivory/80 max-w-xl mx-auto font-sans leading-relaxed mb-8">
            Items arranged are stamped with registered attendee names. If you are registered and can bring an item, claim it below!
          </p>

          {/* Minimalist Progress Meter */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex items-center justify-between text-xs sm:text-sm mb-2">
              <span className="font-serif font-bold text-ivory tracking-wider uppercase">
                Supplies Readiness
              </span>
              <span className="font-serif font-bold text-gold text-base">
                {progressPercent}% Complete ({claimedItems.length} of {totalItems})
              </span>
            </div>
            <div className="w-full bg-midnight h-2.5 rounded-full overflow-hidden border border-gold/30 p-[1px]">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${progressPercent}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-marigold via-gold to-emerald-400 rounded-full shadow-[0_0_10px_rgba(214,173,96,0.6)]"
              />
            </div>
          </div>

          {/* Category Tabs with Animated Pill */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {(['ALL', 'DECORATION', 'SOUND & POWER', 'FOOD & SNACKS', 'GAMES', 'OTHER'] as const).map(cat => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all min-h-[38px] ${
                    isSelected
                      ? 'text-midnight font-bold'
                      : 'text-ivory/70 border border-gold/20 hover:border-gold/50 bg-midnight/80'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="manifestTabPill"
                      className="absolute inset-0 bg-gold rounded-full shadow-sm"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* THE ROYAL MANIFEST LEDGER */}
        <div className="border-t-2 border-b-2 border-gold/40 divide-y divide-gold/15 bg-midnight/90 shadow-2xl rounded-lg overflow-hidden">
          {filteredSupplies.map(item => {
            const isClaimedByMe =
              item.claimed_by &&
              currentUser?.name.trim().toLowerCase() === item.claimed_by.trim().toLowerCase();

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-5 px-4 sm:px-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-burgundy/25 transition-colors group relative"
              >
                <div className="space-y-1 max-w-lg">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs uppercase font-bold text-gold tracking-widest flex items-center gap-1.5 font-mono">
                      {getCategoryIcon(item.category)}
                      <span>{item.category}</span>
                    </span>
                    <span className="text-ivory/30">•</span>
                    <span className="text-xs text-ivory/70 font-semibold font-mono">
                      Qty: {item.quantity}
                    </span>
                  </div>

                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-ivory group-hover:text-gold transition-colors">
                    {item.item_name}
                  </h4>

                  {item.note && (
                    <p className="text-xs sm:text-sm text-ivory/70 italic font-serif">
                      "{item.note}"
                    </p>
                  )}
                </div>

                {/* Status & Claim Action */}
                <div className="shrink-0 flex items-center gap-3">
                  {item.is_claimed ? (
                    <div className="flex items-center gap-3">
                      <WaxSealStamp
                        label={item.claimed_by || 'Confirmed'}
                        sub="ARRANGED BY"
                      />
                      {isClaimedByMe && (
                        <button
                          onClick={() => handleUnclaim(item)}
                          className="text-xs text-ivory/40 hover:text-amber-400 underline font-mono py-1 px-2"
                          title="Release this item back to pending"
                        >
                          Release
                        </button>
                      )}
                    </div>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setClaimError('');
                        setClaimingItem(item);
                        setSelectedClaimant(
                          confirmedNames.includes(currentUser?.name || '')
                            ? currentUser?.name || ''
                            : confirmedNames[0] || ''
                        );
                      }}
                      className="px-5 py-2.5 rounded-full border-2 border-marigold bg-midnight hover:bg-gradient-to-r hover:from-marigold hover:to-gold text-marigold hover:text-midnight font-bold uppercase tracking-wider text-xs sm:text-sm shadow transition-all flex items-center gap-2 min-h-[44px]"
                    >
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                      <span>I'll Bring This!</span>
                    </motion.button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* CLAIM ITEM MODAL (RESTRICTED TO CONFIRMED REGISTERED ATTENDEES ONLY) */}
      <AnimatePresence>
        {claimingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-sm bg-midnight border-2 border-gold/60 rounded-3xl p-6 sm:p-8 shadow-2xl"
            >
              <button
                onClick={() => {
                  setClaimingItem(null);
                  setClaimError('');
                }}
                className="absolute top-4 right-4 p-2 rounded-full text-ivory/60 hover:text-gold hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-full bg-burgundy/80 border border-gold/60 flex items-center justify-center mx-auto mb-3 text-gold shadow-gold-glow">
                  <UserCheck className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-ivory">
                  Claim On Manifest
                </h3>
                <p className="text-sm text-gold-light mt-1 font-serif italic">
                  "{claimingItem.item_name}"
                </p>
              </div>

              {claimError && (
                <div className="mb-4 p-3 rounded-xl bg-red-950/70 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{claimError}</span>
                </div>
              )}

              {confirmedNames.length === 0 ? (
                /* No registered attendees yet */
                <div className="text-center space-y-4">
                  <p className="text-xs text-ivory/70 leading-relaxed font-sans">
                    Only registered attendees can claim party items. Please confirm your RSVP spot first!
                  </p>
                  <ShimmerButton
                    type="button"
                    onClick={() => {
                      setClaimingItem(null);
                      onOpenRsvp();
                    }}
                    variant="gold"
                    size="md"
                    className="w-full min-h-[46px]"
                  >
                    Confirm RSVP First
                  </ShimmerButton>
                </div>
              ) : (
                /* Select from confirmed registered guests */
                <form onSubmit={handleClaimSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gold mb-1.5 font-mono">
                      Select Your Registered Name
                    </label>
                    <select
                      value={selectedClaimant}
                      onChange={e => setSelectedClaimant(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-midnight-card border border-gold/40 text-ivory focus:border-gold text-base"
                    >
                      {confirmedNames.map(name => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                    <p className="text-[11px] text-ivory/60 mt-1.5">
                      Not on the list?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setClaimingItem(null);
                          onOpenRsvp();
                        }}
                        className="text-gold underline font-semibold"
                      >
                        RSVP here first
                      </button>
                    </p>
                  </div>

                  <ShimmerButton
                    type="submit"
                    disabled={!selectedClaimant}
                    variant="gold"
                    size="md"
                    className="w-full mt-2 min-h-[48px]"
                  >
                    Confirm & Stamp My Name
                  </ShimmerButton>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
