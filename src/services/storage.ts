import {
  Guest,
  SupplyItem,
  GameIdea,
  AwardCategory,
  PartySettings,
  AttendanceStatus
} from '../types';
import {
  INITIAL_GUESTS,
  INITIAL_SUPPLIES,
  INITIAL_GAMES,
  INITIAL_AWARDS,
  INITIAL_SETTINGS
} from './initialData';

// Storage keys bumped to v4 to purge all previous fake/unknown names!
const STORAGE_KEYS = {
  GUESTS: 'diwali_social_guests_v4',
  SUPPLIES: 'diwali_social_supplies_v4',
  GAMES: 'diwali_social_games_v4',
  AWARDS: 'diwali_social_awards_v4',
  SETTINGS: 'diwali_social_settings_v4',
  ADMIN_CODE: 'diwali_social_admin_code_v4',
  CURRENT_USER: 'diwali_social_current_user_v4',
};

type Listener = () => void;
const listeners: Set<Listener> = new Set();

const notifyListeners = () => {
  listeners.forEach(fn => {
    try {
      fn();
    } catch (e) {
      console.error('Storage listener error:', e);
    }
  });
};

export const subscribeToStore = (listener: Listener) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

function getLocal<T>(key: string, fallback: T): T {
  try {
    const data = localStorage.getItem(key);
    if (!data) return fallback;
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading ${key} from storage:`, err);
    return fallback;
  }
}

function setLocal<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error writing ${key} to storage:`, err);
  }
}

// Current User Identity (who is using this browser session)
export const getCurrentUser = (): { name: string; id: string } | null => {
  return getLocal<{ name: string; id: string } | null>(STORAGE_KEYS.CURRENT_USER, {
    name: 'Ansh Arora',
    id: 'g-ansh-arora',
  });
};

export const setCurrentUser = (user: { name: string; id: string } | null) => {
  setLocal(STORAGE_KEYS.CURRENT_USER, user);
  notifyListeners();
};

/* ==========================================================================
   PARTY SETTINGS (ADMIN DECK ONLY)
   ========================================================================== */

export const getPartySettings = (): PartySettings => {
  return getLocal<PartySettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
};

export const updatePartySettings = (partial: Partial<PartySettings>) => {
  const settings = { ...getPartySettings(), ...partial };
  setLocal(STORAGE_KEYS.SETTINGS, settings);
  notifyListeners();
  return settings;
};

// Admin helper toggles
export const setAwardsVoting = (isOpen: boolean) => {
  return updatePartySettings({ awardsVotingOpen: isOpen });
};

export const setChallengeVault = (isOpen: boolean) => {
  return updatePartySettings({ challengeVaultOpen: isOpen });
};

/* ==========================================================================
   GUEST REGISTRATION & RSVP (ONLY REAL REGISTERED GUESTS)
   ========================================================================== */

export const getGuests = (): Guest[] => {
  return getLocal<Guest[]>(STORAGE_KEYS.GUESTS, INITIAL_GUESTS);
};

export const getConfirmedCount = (): number => {
  return getGuests().filter(g => g.attendance === 'YES').length;
};

export const getConfirmedGuestNames = (): string[] => {
  return getGuests()
    .filter(g => g.attendance === 'YES')
    .map(g => g.name);
};

export const isNameRegistered = (name: string): boolean => {
  const clean = name.trim().toLowerCase();
  return getGuests().some(
    g => g.attendance === 'YES' && g.name.trim().toLowerCase() === clean
  );
};

export const registerOrUpdateGuest = async (payload: {
  name: string;
  nickname?: string;
  attendance: AttendanceStatus;
  message?: string;
  show_on_wall: boolean;
  acknowledged_rules: boolean;
}): Promise<{ success: boolean; guest: Guest; message: string }> => {
  const cleanName = payload.name.trim();
  if (!cleanName) throw new Error('Full Name is required.');
  if (!payload.acknowledged_rules) {
    throw new Error('You must acknowledge the neighbourhood etiquette & cleanup guidelines.');
  }

  const existingGuests = getGuests();
  const existingIndex = existingGuests.findIndex(
    g => g.name.toLowerCase() === cleanName.toLowerCase()
  );

  let guestRecord: Guest;

  if (existingIndex >= 0) {
    // Update existing response
    guestRecord = {
      ...existingGuests[existingIndex],
      nickname: payload.nickname?.trim() || existingGuests[existingIndex].nickname,
      attendance: payload.attendance,
      message: payload.message?.trim() || '',
      show_on_wall: payload.show_on_wall,
      acknowledged_rules: payload.acknowledged_rules,
      updated_at: new Date().toISOString(),
    };
    existingGuests[existingIndex] = guestRecord;
  } else {
    // New registration
    guestRecord = {
      id: `g-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: cleanName,
      nickname: payload.nickname?.trim() || '',
      attendance: payload.attendance,
      message: payload.message?.trim() || '',
      show_on_wall: payload.show_on_wall,
      acknowledged_rules: payload.acknowledged_rules,
      created_at: new Date().toISOString(),
    };
    existingGuests.push(guestRecord);
  }

  setLocal(STORAGE_KEYS.GUESTS, existingGuests);
  setCurrentUser({ name: guestRecord.name, id: guestRecord.id });
  notifyListeners();

  let messageText = 'Spot confirmed! See you on the red carpet, gentleman.';
  if (payload.attendance === 'MAYBE') {
    messageText = 'Response recorded as Maybe. Let us know soon!';
  } else if (payload.attendance === 'NO') {
    messageText = 'Sad to miss you, brother! We will celebrate your spirit.';
  }

  return {
    success: true,
    guest: guestRecord,
    message: messageText,
  };
};

/* ==========================================================================
   PARTY SUPPLIES (ONLY REGISTERED GUESTS CAN CLAIM)
   ========================================================================== */

export const getSupplies = (): SupplyItem[] => {
  return getLocal<SupplyItem[]>(STORAGE_KEYS.SUPPLIES, INITIAL_SUPPLIES);
};

export const claimSupplyItem = async (id: string, guestName: string): Promise<SupplyItem> => {
  const cleanName = guestName.trim();
  if (!cleanName) throw new Error('Your name is required to claim an item.');

  // Verify that the person is registered!
  if (!isNameRegistered(cleanName)) {
    throw new Error('Only confirmed RSVP attendees can claim party supplies. Please RSVP first!');
  }

  const supplies = getSupplies();
  const target = supplies.find(s => s.id === id);
  if (!target) throw new Error('Item not found');

  target.is_claimed = true;
  target.claimed_by = cleanName;

  setLocal(STORAGE_KEYS.SUPPLIES, supplies);
  notifyListeners();
  return target;
};

export const unclaimSupplyItem = async (id: string, requesterName?: string): Promise<SupplyItem> => {
  const supplies = getSupplies();
  const target = supplies.find(s => s.id === id);
  if (!target) throw new Error('Item not found');

  // If a requesterName is provided and is not admin, only the claimant can unclaim their own item!
  if (requesterName && target.claimed_by && requesterName.trim().toLowerCase() !== target.claimed_by.trim().toLowerCase()) {
    throw new Error('Only the person who claimed this item (or the Admin) can release it.');
  }

  target.is_claimed = false;
  target.claimed_by = undefined;

  setLocal(STORAGE_KEYS.SUPPLIES, supplies);
  notifyListeners();
  return target;
};

// Admin only: add supply
export const addCustomSupply = async (payload: {
  item_name: string;
  category: SupplyItem['category'];
  quantity: string;
  claimed_by?: string;
  note?: string;
}): Promise<SupplyItem> => {
  const supplies = getSupplies();
  const newItem: SupplyItem = {
    id: `sup-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    item_name: payload.item_name.trim(),
    category: payload.category,
    quantity: payload.quantity.trim() || '1 unit',
    is_claimed: Boolean(payload.claimed_by && payload.claimed_by.trim()),
    claimed_by: payload.claimed_by?.trim() || undefined,
    note: payload.note?.trim() || '',
    created_at: new Date().toISOString(),
  };

  supplies.push(newItem);
  setLocal(STORAGE_KEYS.SUPPLIES, supplies);
  notifyListeners();
  return newItem;
};

// Admin only: delete supply
export const deleteSupply = async (id: string) => {
  const supplies = getSupplies().filter(s => s.id !== id);
  setLocal(STORAGE_KEYS.SUPPLIES, supplies);
  notifyListeners();
};

/* ==========================================================================
   GAME SUGGESTIONS & VOTING
   ========================================================================== */

export const getGames = (): GameIdea[] => {
  return getLocal<GameIdea[]>(STORAGE_KEYS.GAMES, INITIAL_GAMES);
};

export const addGameSuggestion = async (payload: {
  title: string;
  rules: string;
  suggested_by: string;
}): Promise<GameIdea> => {
  const games = getGames();
  const newGame: GameIdea = {
    id: `game-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    title: payload.title.trim(),
    rules: payload.rules.trim(),
    suggested_by: payload.suggested_by.trim() || 'A Gentleman',
    votes: [payload.suggested_by.trim() || 'Suggestor'],
    is_preset: false,
    created_at: new Date().toISOString(),
  };

  games.unshift(newGame);
  setLocal(STORAGE_KEYS.GAMES, games);
  notifyListeners();
  return newGame;
};

export const voteForGame = async (gameId: string, voterIdentifier: string): Promise<boolean> => {
  const games = getGames();
  const target = games.find(g => g.id === gameId);
  if (!target) throw new Error('Game not found');

  const voter = voterIdentifier.trim() || 'Guest';
  const existingIndex = target.votes.indexOf(voter);

  if (existingIndex >= 0) {
    target.votes.splice(existingIndex, 1);
  } else {
    target.votes.push(voter);
  }

  setLocal(STORAGE_KEYS.GAMES, games);
  notifyListeners();
  return existingIndex < 0;
};

export const deleteGame = async (gameId: string) => {
  const games = getGames().filter(g => g.id !== gameId);
  setLocal(STORAGE_KEYS.GAMES, games);
  notifyListeners();
};

/* ==========================================================================
   AWARDS & NIGHT-TIME VOTING
   ========================================================================== */

export const getAwards = (): AwardCategory[] => {
  return getLocal<AwardCategory[]>(STORAGE_KEYS.AWARDS, INITIAL_AWARDS);
};

export const voteForAward = async (
  awardId: string,
  nomineeName: string,
  voterName: string
) => {
  const awards = getAwards();
  const award = awards.find(a => a.id === awardId);
  if (!award) throw new Error('Award category not found');

  const cleanNominee = nomineeName.trim();
  const cleanVoter = voterName.trim() || 'Guest';

  // Ensure voter only votes once per award
  Object.keys(award.votes).forEach(nominee => {
    award.votes[nominee] = award.votes[nominee].filter(v => v !== cleanVoter);
  });

  if (!award.votes[cleanNominee]) {
    award.votes[cleanNominee] = [];
  }
  award.votes[cleanNominee].push(cleanVoter);

  setLocal(STORAGE_KEYS.AWARDS, awards);
  notifyListeners();
};

/* ==========================================================================
   ADMIN AUTH & CSV EXPORT
   ========================================================================== */

export const verifyAdminPasscode = (passcode: string): boolean => {
  return passcode.trim() === '2026diwali';
};

export const exportGuestsToCSV = () => {
  const guests = getGuests();
  const headers = ['Name', 'Nickname', 'Attendance', 'Message', 'Rules Pledged', 'Timestamp'];
  const rows = guests.map(g => [
    `"${g.name.replace(/"/g, '""')}"`,
    `"${(g.nickname || '').replace(/"/g, '""')}"`,
    g.attendance,
    `"${(g.message || '').replace(/"/g, '""')}"`,
    g.acknowledged_rules ? 'YES' : 'NO',
    g.created_at,
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `Diwali_Social_2026_RSVP_List_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportSuppliesToCSV = () => {
  const supplies = getSupplies();
  const headers = ['Category', 'Item Name', 'Quantity', 'Status', 'Claimed By', 'Notes'];
  const rows = supplies.map(s => [
    s.category,
    `"${s.item_name.replace(/"/g, '""')}"`,
    `"${s.quantity.replace(/"/g, '""')}"`,
    s.is_claimed ? 'CLAIMED' : 'PENDING',
    `"${(s.claimed_by || '').replace(/"/g, '""')}"`,
    `"${(s.note || '').replace(/"/g, '""')}"`,
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `Diwali_Social_2026_Supplies_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
