import React, { useState } from 'react';
import {
  Shield,
  X,
  Users,
  Package,
  Gamepad2,
  Trophy,
  Download,
  Trash2,
  Lock,
  Flame,
  ToggleLeft,
  ToggleRight,
  Plus,
  AlertCircle
} from 'lucide-react';
import { Guest, SupplyItem, GameIdea, AwardCategory, PartySettings, SupplyCategory } from '../types';
import {
  verifyAdminPasscode,
  exportGuestsToCSV,
  exportSuppliesToCSV,
  setAwardsVoting,
  setChallengeVault,
  deleteSupply,
  deleteGame,
  unclaimSupplyItem,
  addCustomSupply
} from '../services/storage';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  guests: Guest[];
  supplies: SupplyItem[];
  games: GameIdea[];
  awards: AwardCategory[];
  settings: PartySettings;
  onDataRefresh: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  guests,
  supplies,
  games,
  awards,
  settings,
  onDataRefresh,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'CONTROLS' | 'GUESTS' | 'SUPPLIES' | 'GAMES'>('CONTROLS');

  // Admin Add Supply Form State
  const [newItemName, setNewItemName] = useState('');
  const [newCategory, setNewCategory] = useState<SupplyCategory>('DECORATION');
  const [newQuantity, setNewQuantity] = useState('');
  const [newClaimedBy, setNewClaimedBy] = useState('');
  const [newNote, setNewNote] = useState('');
  const [isAddingSupply, setIsAddingSupply] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyAdminPasscode(passcode)) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid passcode. Default is "diwali2026"');
    }
  };

  const handleToggleAwardsVoting = () => {
    setAwardsVoting(!settings.awardsVotingOpen);
    onDataRefresh();
  };

  const handleToggleChallengeVault = () => {
    setChallengeVault(!settings.challengeVaultOpen);
    onDataRefresh();
  };

  const confirmedGuests = guests.filter(g => g.attendance === 'YES');
  const maybeGuests = guests.filter(g => g.attendance === 'MAYBE');
  const claimedSupplies = supplies.filter(s => s.is_claimed);

  const handleAdminAddSupply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    try {
      await addCustomSupply({
        item_name: newItemName.trim(),
        category: newCategory,
        quantity: newQuantity.trim() || '1 unit',
        claimed_by: newClaimedBy.trim() || undefined,
        note: newNote.trim() || undefined,
      });
      setIsAddingSupply(false);
      setNewItemName('');
      setNewQuantity('');
      setNewClaimedBy('');
      setNewNote('');
      onDataRefresh();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-midnight/95 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-midnight-card border-2 border-gold/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header Bar */}
        <div className="px-5 py-3.5 bg-midnight border-b border-gold/20 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-burgundy border border-gold/40 flex items-center justify-center text-gold">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-ivory">
                Executive Host & Admin Deck
              </h3>
              <p className="text-[10px] text-ivory/50">
                Party Night Toggles, RSVP Roster & Master Supplies Management
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-ivory/60 hover:text-gold hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isAuthenticated ? (
          /* AUTH LOGIN */
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center my-auto">
            <div className="w-14 h-14 rounded-full bg-burgundy/80 border border-gold/40 flex items-center justify-center shadow-gold-glow mb-3 text-gold">
              <Lock className="w-7 h-7" />
            </div>

            <h4 className="font-serif text-xl font-bold text-ivory mb-1">
              Host Passcode Required
            </h4>
            <p className="text-xs text-ivory/60 max-w-xs mb-5 font-sans">
              Only the event host can edit party settings, manage the checklist, and toggle live night features.
            </p>

            <form onSubmit={handleLogin} className="w-full max-w-xs space-y-3">
              <input
                type="password"
                placeholder="Default: diwali2026"
                value={passcode}
                onChange={e => setPasscode(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-midnight border border-gold/30 text-ivory text-xs text-center tracking-widest focus:border-gold"
              />
              {authError && <p className="text-xs text-red-400">{authError}</p>}
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-marigold to-gold text-midnight font-bold uppercase tracking-wider text-xs shadow"
              >
                Authenticate Access
              </button>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED DECK */
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Nav Tabs */}
            <div className="flex overflow-x-auto gap-2 px-5 py-2.5 bg-midnight border-b border-gold/15 shrink-0">
              {[
                { id: 'CONTROLS', label: 'Party Night Switches', icon: Flame },
                { id: 'GUESTS', label: `RSVPs (${guests.length})`, icon: Users },
                { id: 'SUPPLIES', label: `Supplies (${claimedSupplies.length}/${supplies.length})`, icon: Package },
                { id: 'GAMES', label: `Games (${games.length})`, icon: Gamepad2 },
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider shrink-0 transition-all border ${
                      activeTab === tab.id
                        ? 'bg-gold text-midnight border-gold font-bold shadow'
                        : 'bg-midnight text-ivory/60 border-gold/15 hover:border-gold/40'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Contents */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {/* TAB 1: PARTY NIGHT CONTROLS */}
              {activeTab === 'CONTROLS' && (
                <div className="space-y-4">
                  <div className="bg-midnight/80 p-5 rounded-2xl border border-gold/30">
                    <h4 className="font-serif text-lg font-bold text-ivory mb-1">
                      Party Night Feature Controls (Admin Only)
                    </h4>
                    <p className="text-xs text-ivory/60 mb-5">
                      Only you can toggle live voting or the dare vault. Guests cannot change these settings.
                    </p>

                    <div className="space-y-4">
                      {/* Awards Voting Toggle */}
                      <div className="flex items-center justify-between p-4 rounded-xl bg-midnight border border-gold/20">
                        <div>
                          <div className="flex items-center gap-2">
                            <Trophy className="w-4 h-4 text-gold" />
                            <strong className="text-sm text-ivory">Live Voting for Awards</strong>
                          </div>
                          <p className="text-xs text-ivory/60 mt-0.5">
                            Status: {settings.awardsVotingOpen ? '🟢 UNLOCKED & LIVE' : '🔒 LOCKED (Opens 9:30 PM)'}
                          </p>
                        </div>
                        <button
                          onClick={handleToggleAwardsVoting}
                          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                            settings.awardsVotingOpen
                              ? 'bg-emerald-600 text-white'
                              : 'bg-midnight border border-gold/30 text-gold hover:bg-gold hover:text-midnight'
                          }`}
                        >
                          {settings.awardsVotingOpen ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                          <span>{settings.awardsVotingOpen ? 'Voting Is Live (Turn Off)' : 'Turn ON Voting'}</span>
                        </button>
                      </div>

                      {/* Challenge Vault Toggle */}
                      <div className="flex items-center justify-between p-4 rounded-xl bg-midnight border border-gold/20">
                        <div>
                          <div className="flex items-center gap-2">
                            <Flame className="w-4 h-4 text-marigold" />
                            <strong className="text-sm text-ivory">Party Dare Vault</strong>
                          </div>
                          <p className="text-xs text-ivory/60 mt-0.5">
                            Status: {settings.challengeVaultOpen ? '🟢 UNLOCKED & LIVE' : '🔒 SNEAK PEEK MODE'}
                          </p>
                        </div>
                        <button
                          onClick={handleToggleChallengeVault}
                          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                            settings.challengeVaultOpen
                              ? 'bg-emerald-600 text-white'
                              : 'bg-midnight border border-gold/30 text-gold hover:bg-gold hover:text-midnight'
                          }`}
                        >
                          {settings.challengeVaultOpen ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                          <span>{settings.challengeVaultOpen ? 'Vault Open (Turn Off)' : 'Turn ON Full Vault'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: GUESTS */}
              {activeTab === 'GUESTS' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-serif text-lg font-bold text-ivory">
                        Confirmed Attendee Roster
                      </h4>
                      <p className="text-xs text-ivory/60">
                        {confirmedGuests.length} confirmed • {maybeGuests.length} maybe
                      </p>
                    </div>

                    <button
                      onClick={exportGuestsToCSV}
                      className="px-3.5 py-1.5 rounded-xl bg-midnight border border-gold/30 text-gold hover:bg-gold hover:text-midnight text-xs font-bold uppercase transition-all flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export CSV</span>
                    </button>
                  </div>

                  <div className="rounded-xl border border-gold/20 overflow-hidden bg-midnight/80">
                    <table className="w-full text-left text-xs text-ivory/80">
                      <thead className="bg-midnight-card text-gold uppercase text-[10px] tracking-wider border-b border-gold/20">
                        <tr>
                          <th className="py-2.5 px-3">Name</th>
                          <th className="py-2.5 px-3">Nickname</th>
                          <th className="py-2.5 px-3">Attendance</th>
                          <th className="py-2.5 px-3">Hype Quote</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gold/10">
                        {guests.map(g => (
                          <tr key={g.id} className="hover:bg-white/5">
                            <td className="py-2.5 px-3 font-bold text-ivory">{g.name}</td>
                            <td className="py-2.5 px-3 text-marigold">{g.nickname || '—'}</td>
                            <td className="py-2.5 px-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${g.attendance === 'YES' ? 'bg-emerald-950 text-emerald-300' : 'bg-amber-950 text-amber-300'}`}>
                                {g.attendance}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 italic truncate max-w-xs">{g.message || '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 3: SUPPLIES */}
              {activeTab === 'SUPPLIES' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-serif text-lg font-bold text-ivory">
                        Party Supplies Logistics (Admin Master Control)
                      </h4>
                      <p className="text-xs text-ivory/60">
                        {claimedSupplies.length} of {supplies.length} items claimed
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsAddingSupply(!isAddingSupply)}
                        className="px-3 py-1.5 rounded-xl bg-gold text-midnight text-xs font-bold uppercase transition-all flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>{isAddingSupply ? 'Close Form' : '+ Add Supply Item'}</span>
                      </button>

                      <button
                        onClick={exportSuppliesToCSV}
                        className="px-3.5 py-1.5 rounded-xl bg-midnight border border-gold/30 text-gold hover:bg-gold hover:text-midnight text-xs font-bold uppercase transition-all flex items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export CSV</span>
                      </button>
                    </div>
                  </div>

                  {/* Add Supply Form for Admin */}
                  {isAddingSupply && (
                    <form onSubmit={handleAdminAddSupply} className="p-4 rounded-xl bg-midnight border border-gold/40 mb-4 space-y-3">
                      <span className="text-xs font-bold text-gold uppercase tracking-wider block">Add New Item to Master Checklist:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <input
                          type="text"
                          required
                          placeholder="Item Name (e.g. 50 Diyas)"
                          value={newItemName}
                          onChange={e => setNewItemName(e.target.value)}
                          className="px-3 py-1.5 rounded-lg bg-midnight-card border border-gold/30 text-ivory text-xs"
                        />
                        <select
                          value={newCategory}
                          onChange={e => setNewCategory(e.target.value as SupplyCategory)}
                          className="px-3 py-1.5 rounded-lg bg-midnight-card border border-gold/30 text-ivory text-xs"
                        >
                          <option value="DECORATION">Decoration</option>
                          <option value="SOUND & POWER">Sound & Power</option>
                          <option value="FOOD & SNACKS">Food & Snacks</option>
                          <option value="GAMES">Games</option>
                          <option value="OTHER">Other</option>
                        </select>
                        <input
                          type="text"
                          placeholder="Quantity (e.g. 2 Strings)"
                          value={newQuantity}
                          onChange={e => setNewQuantity(e.target.value)}
                          className="px-3 py-1.5 rounded-lg bg-midnight-card border border-gold/30 text-ivory text-xs"
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setIsAddingSupply(false)}
                          className="px-3 py-1 rounded-lg text-xs text-ivory/60 hover:text-ivory"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1 rounded-lg bg-gold text-midnight font-bold text-xs uppercase"
                        >
                          Save to Manifest
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="rounded-xl border border-gold/20 overflow-hidden bg-midnight/80">
                    <table className="w-full text-left text-xs text-ivory/80">
                      <thead className="bg-midnight-card text-gold uppercase text-[10px] tracking-wider border-b border-gold/20">
                        <tr>
                          <th className="py-2.5 px-3">Category</th>
                          <th className="py-2.5 px-3">Item</th>
                          <th className="py-2.5 px-3">Quantity</th>
                          <th className="py-2.5 px-3">Brought By</th>
                          <th className="py-2.5 px-3 text-right">Admin Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gold/10">
                        {supplies.map(s => (
                          <tr key={s.id} className="hover:bg-white/5">
                            <td className="py-2.5 px-3 font-semibold text-marigold">{s.category}</td>
                            <td className="py-2.5 px-3 font-bold text-ivory">{s.item_name}</td>
                            <td className="py-2.5 px-3 text-gold">{s.quantity}</td>
                            <td className="py-2.5 px-3">
                              {s.is_claimed ? (
                                <span className="text-emerald-400 font-semibold">{s.claimed_by}</span>
                              ) : (
                                <span className="text-amber-400 italic">Pending volunteer</span>
                              )}
                            </td>
                            <td className="py-2.5 px-3 text-right">
                              {s.is_claimed ? (
                                <button
                                  onClick={() => unclaimSupplyItem(s.id).then(onDataRefresh)}
                                  className="text-[10px] text-ivory/50 hover:text-amber-400 underline mr-3"
                                  title="Unclaim unconditionally as Admin"
                                >
                                  Release
                                </button>
                              ) : null}
                              <button
                                onClick={() => deleteSupply(s.id).then(onDataRefresh)}
                                className="text-ivory/40 hover:text-red-400"
                                title="Delete Item"
                              >
                                <Trash2 className="w-3.5 h-3.5 inline" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 4: GAMES */}
              {activeTab === 'GAMES' && (
                <div>
                  <h4 className="font-serif text-lg font-bold text-ivory mb-2">
                    Game Suggestions & Votes
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {games.map(g => (
                      <div key={g.id} className="bg-midnight p-3.5 rounded-xl border border-gold/20 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <h5 className="font-bold text-ivory text-sm">{g.title}</h5>
                            <span className="text-[10px] text-gold font-bold">{g.votes.length} Votes</span>
                          </div>
                          <p className="text-xs text-ivory/70">{g.rules}</p>
                        </div>
                        <div className="pt-2 mt-2 border-t border-white/5 flex justify-between items-center text-[10px] text-ivory/50">
                          <span>By: {g.suggested_by}</span>
                          {!g.is_preset && (
                            <button
                              onClick={() => deleteGame(g.id).then(onDataRefresh)}
                              className="text-red-400 hover:underline"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
