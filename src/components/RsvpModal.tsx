import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, AlertTriangle, CheckCircle2, Clock, ShieldAlert } from 'lucide-react';
import confetti from 'canvas-confetti';
import { registerOrUpdateGuest } from '../services/storage';
import { AttendanceStatus } from '../types';
import { ShimmerButton } from './ui/ShimmerButton';

interface RsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const RsvpModal: React.FC<RsvpModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [attendance, setAttendance] = useState<AttendanceStatus>('YES');
  const [message, setMessage] = useState('');
  const [showOnWall, setShowOnWall] = useState(true);
  const [acknowledgedRules, setAcknowledgedRules] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successInfo, setSuccessInfo] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('Please enter your full name, gentleman.');
      return;
    }

    if (!acknowledgedRules) {
      setErrorMessage('You must acknowledge the neighbourhood etiquette & cleanup guidelines.');
      return;
    }

    setLoading(true);

    try {
      const result = await registerOrUpdateGuest({
        name,
        nickname,
        attendance,
        message,
        show_on_wall: showOnWall,
        acknowledged_rules: acknowledgedRules,
      });

      if (result.success) {
        setSuccessInfo(result.message);

        if (attendance === 'YES') {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#D6AD60', '#E89A27', '#F5EBDD'],
          });
        }

        onSuccess();
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit RSVP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccessInfo(null);
    setName('');
    setNickname('');
    setMessage('');
    setAcknowledgedRules(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight/90 backdrop-blur-xl overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md bg-midnight-card border-2 border-gold/50 rounded-3xl p-6 sm:p-8 shadow-2xl my-6"
      >
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 p-2 rounded-full text-ivory/60 hover:text-gold hover:bg-white/5 transition-colors"
          aria-label="Close RSVP Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {successInfo ? (
          /* SUCCESS STATE */
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-burgundy border-2 border-gold mx-auto flex items-center justify-center mb-4 shadow-gold-glow">
              <Sparkles className="w-8 h-8 text-gold animate-bounce" />
            </div>

            <h3 className="font-serif text-3xl font-bold text-ivory mb-1">
              RSVP Recorded!
            </h3>

            <p className="text-sm text-gold-light mb-6 font-medium font-serif">
              {successInfo}
            </p>

            <div className="bg-midnight/90 p-4 rounded-xl border border-gold/30 text-xs sm:text-sm text-ivory/80 mb-6 text-left space-y-2 font-sans">
              <div className="flex justify-between">
                <span className="text-ivory/50">Guest:</span>
                <span className="font-bold text-ivory">{name} {nickname ? `("${nickname}")` : ''}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ivory/50">Attendance:</span>
                <span className="font-bold text-gold">{attendance}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ivory/50">Timing:</span>
                <span className="font-bold text-emerald-400">6:00 PM – 11:00 PM</span>
              </div>
            </div>

            <ShimmerButton
              onClick={handleReset}
              variant="gold"
              size="md"
              className="w-full min-h-[48px]"
            >
              Done & Return to Party Page
            </ShimmerButton>
          </div>
        ) : (
          /* RSVP FORM */
          <div>
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-burgundy/60 border border-gold/30 text-gold text-xs font-semibold uppercase tracking-widest mb-2 font-mono">
                <span>🪔</span>
                <span>स्वागतम • The Diwali Social 2026</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ivory">
                CONFIRM YOUR SPOT
              </h3>
              <p className="font-hindi text-gold text-base font-medium mt-0.5">
                अपनी हाज़िरी दर्ज करें
              </p>
              <p className="text-xs text-ivory/70 mt-1 font-sans">
                12 November 2026 • 6:00 PM to 11:00 PM • Strictly Traditional
              </p>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/70 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-gold mb-1 font-mono">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  placeholder="e.g. Aryan Sehgal"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-midnight border border-gold/30 text-ivory placeholder-ivory/30 focus:border-gold focus:ring-1 focus:ring-gold text-base outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gold mb-1 font-mono">
                  Will You Be There? <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['YES', 'MAYBE', 'NO'] as AttendanceStatus[]).map(status => (
                    <button
                      type="button"
                      key={status}
                      onClick={() => setAttendance(status)}
                      className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold transition-all border min-h-[44px] ${
                        attendance === status
                          ? status === 'YES'
                            ? 'bg-emerald-600 text-white border-emerald-400 shadow-lg'
                            : status === 'MAYBE'
                            ? 'bg-amber-600 text-white border-amber-400 shadow-lg'
                            : 'bg-red-800 text-white border-red-500 shadow-lg'
                          : 'bg-midnight text-ivory/60 border-gold/25 hover:border-gold/50'
                      }`}
                    >
                      {status === 'YES' ? 'YES (100% In)' : status === 'MAYBE' ? 'MAYBE' : 'NO'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="guestNickname" className="block text-xs font-semibold uppercase tracking-wider text-gold mb-1 font-mono">
                  Nickname / Tag <span className="text-ivory/40">(Optional)</span>
                </label>
                <input
                  id="guestNickname"
                  name="guestNickname"
                  type="text"
                  placeholder="e.g. Don, The Host, DJ"
                  value={nickname}
                  onChange={e => setNickname(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-midnight border border-gold/30 text-ivory placeholder-ivory/30 focus:border-gold focus:ring-1 focus:ring-gold text-base outline-none transition-all"
                />
              </div>

              <div>
                <label htmlFor="guestMessage" className="block text-xs font-semibold uppercase tracking-wider text-gold mb-1 font-mono">
                  Hype Quote / Message <span className="text-ivory/40">(Optional)</span>
                </label>
                <textarea
                  id="guestMessage"
                  name="guestMessage"
                  rows={2}
                  placeholder="e.g. Royal Kurta is ironed. Ready to meet everyone."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-midnight border border-gold/30 text-ivory placeholder-ivory/30 focus:border-gold focus:ring-1 focus:ring-gold text-base outline-none resize-none transition-all"
                />
              </div>

              <div className="flex items-center gap-3 bg-midnight/70 p-3 rounded-xl border border-gold/20">
                <input
                  type="checkbox"
                  id="showOnWall"
                  checked={showOnWall}
                  onChange={e => setShowOnWall(e.target.checked)}
                  className="w-4 h-4 rounded text-marigold focus:ring-marigold accent-marigold bg-midnight border-gold/40 cursor-pointer"
                />
                <label htmlFor="showOnWall" className="text-xs text-ivory/80 cursor-pointer select-none">
                  Display my card on <strong className="text-gold">The Guest Wall</strong>
                </label>
              </div>

              <div className="p-3.5 rounded-xl bg-burgundy/40 border border-gold/40 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="acknowledgedRules"
                  required
                  checked={acknowledgedRules}
                  onChange={e => setAcknowledgedRules(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded text-gold focus:ring-gold accent-gold bg-midnight border-gold shrink-0 cursor-pointer"
                />
                <label htmlFor="acknowledgedRules" className="text-xs leading-relaxed text-ivory/90 cursor-pointer select-none">
                  <strong className="text-gold block font-semibold mb-0.5 font-mono">BROTHERHOOD & VENUE PLEDGE:</strong>
                  I will be on time (6 PM), respect the hospital and senior care home with zero fireworks, and I will strictly help with venue cleanup at 11 PM.
                </label>
              </div>

              <ShimmerButton
                type="submit"
                disabled={loading}
                variant="gold"
                size="md"
                className="w-full mt-2 min-h-[50px] shadow-diya"
              >
                {loading ? 'Reserving...' : 'Confirm RSVP Registration'}
              </ShimmerButton>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
};
