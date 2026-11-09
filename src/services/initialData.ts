import {
  Guest,
  SupplyItem,
  GameIdea,
  AwardCategory,
  PartyDare,
  PartySettings
} from '../types';

// ONLY Ansh Arora is registered right now! No unknown names.
export const INITIAL_GUESTS: Guest[] = [
  {
    id: 'g-ansh-arora',
    name: 'Ansh Arora',
    nickname: 'The Architect',
    attendance: 'YES',
    message: 'Host of the night. Red carpet is ready, gentlemen.',
    show_on_wall: true,
    acknowledged_rules: true,
    created_at: '2026-11-09T18:00:00Z',
  },
];

// Clean supply checklist: all pending for registered guests to claim!
export const INITIAL_SUPPLIES: SupplyItem[] = [
  {
    id: 'sup-1',
    item_name: 'Warm White Fairy Lights (20m+)',
    category: 'DECORATION',
    quantity: '3–4 Strings',
    is_claimed: true,
    claimed_by: 'Ansh Arora',
    note: 'Will hang along the entrance and main perimeter.',
    created_at: '2026-11-09T18:00:00Z',
  },
  {
    id: 'sup-2',
    item_name: 'Earthen Diyas & Cotton Wicks + Oil',
    category: 'DECORATION',
    quantity: '40–50 Diyas + 1L Oil',
    is_claimed: false,
    note: 'For the ceremonial diya lighting setup.',
    created_at: '2026-11-09T18:00:00Z',
  },
  {
    id: 'sup-3',
    item_name: 'Fresh Marigold Garlands (Orange & Yellow)',
    category: 'DECORATION',
    quantity: '6–8 Garlands',
    is_claimed: false,
    note: 'Needed for door hangings and red carpet border.',
    created_at: '2026-11-09T18:00:00Z',
  },
  {
    id: 'sup-4',
    item_name: 'Bluetooth Party Speaker (High Bass)',
    category: 'SOUND & POWER',
    quantity: '1 Unit (Charged)',
    is_claimed: false,
    note: 'JBL / Sony PartyBox ready with AUX & Bluetooth.',
    created_at: '2026-11-09T18:00:00Z',
  },
  {
    id: 'sup-5',
    item_name: 'Heavy Duty Extension Boards & Multi-Plugs',
    category: 'SOUND & POWER',
    quantity: '2 Boards (4+ sockets each)',
    is_claimed: false,
    note: 'Essential for lights and speaker power.',
    created_at: '2026-11-09T18:00:00Z',
  },
  {
    id: 'sup-6',
    item_name: 'Assorted Premium Indian Mithai (Sweets)',
    category: 'FOOD & SNACKS',
    quantity: '1–2 kg (Kaju Katli / Ladoos)',
    is_claimed: false,
    note: 'For sweet celebrations right after diya lighting.',
    created_at: '2026-11-09T18:00:00Z',
  },
  {
    id: 'sup-7',
    item_name: 'Disposable Eco Plates, Cups & Napkins',
    category: 'FOOD & SNACKS',
    quantity: 'Pack of 30 each',
    is_claimed: false,
    note: 'Needed when we order dinner at the venue.',
    created_at: '2026-11-09T18:00:00Z',
  },
  {
    id: 'sup-8',
    item_name: 'Chilled Soft Drinks & Mineral Water Jars',
    category: 'FOOD & SNACKS',
    quantity: '4 Big Bottles + 1 Water Jar',
    is_claimed: false,
    note: 'To keep everyone hydrated during dance battles.',
    created_at: '2026-11-09T18:00:00Z',
  },
  {
    id: 'sup-9',
    item_name: 'Playing Cards & Game Props',
    category: 'GAMES',
    quantity: '2 Decks of Cards',
    is_claimed: false,
    note: 'For high-stakes rounds during downtime.',
    created_at: '2026-11-09T18:00:00Z',
  },
  {
    id: 'sup-10',
    item_name: 'Camera / Gimbal for Red Carpet Shots',
    category: 'OTHER',
    quantity: '1 Kit',
    is_claimed: false,
    note: 'DSLR / Mirrorless for brotherhood portraits.',
    created_at: '2026-11-09T18:00:00Z',
  },
];

export const INITIAL_AWARDS: AwardCategory[] = [
  {
    id: 'award-1',
    title: 'Best Traditional Fit',
    description: 'The sharpest, most impeccably styled traditional outfit of the night.',
    icon: 'Crown',
    votes: {},
  },
  {
    id: 'award-2',
    title: 'Best Red Carpet Walk',
    description: 'Maximum swagger, poise, and attitude down the arrival ramp.',
    icon: 'Sparkles',
    votes: {},
  },
  {
    id: 'award-3',
    title: 'Most Confident Pose',
    description: 'The gentleman who owned the camera flashes without blinking.',
    icon: 'Camera',
    votes: {},
  },
  {
    id: 'award-4',
    title: 'Best Personality',
    description: 'Unmatched energy, constant laughs, and uniting every brother in the room.',
    icon: 'Laugh',
    votes: {},
  },
  {
    id: 'award-5',
    title: 'Main Character of the Night',
    description: 'The undisputed center of gravity from 6:00 PM to 11:00 PM.',
    icon: 'Trophy',
    votes: {},
  },
];

export const INITIAL_GAMES: GameIdea[] = [
  {
    id: 'game-1',
    title: 'Never Have I Ever (Gentlemen’s Edition)',
    rules: '10 fingers up. Unfiltered confessions among brothers. No phones, zero judgement.',
    suggested_by: 'Ansh Arora',
    votes: ['Ansh Arora'],
    is_preset: true,
    created_at: '2026-11-09T18:00:00Z',
  },
  {
    id: 'game-2',
    title: 'Hook Step Face-Off',
    rules: 'Random energetic track drops. Two gentlemen step into the circle and battle out the signature hook step. Crowd decibels decide the winner.',
    suggested_by: 'Ansh Arora',
    votes: ['Ansh Arora'],
    is_preset: true,
    created_at: '2026-11-09T18:00:00Z',
  },
  {
    id: 'game-3',
    title: 'High-Stakes Mafia Showdown',
    rules: 'The classic game of deceit, alliances, and bluffing. Accusations must be delivered with 100% theatrical conviction.',
    suggested_by: 'Ansh Arora',
    votes: ['Ansh Arora'],
    is_preset: true,
    created_at: '2026-11-09T18:00:00Z',
  },
  {
    id: 'game-4',
    title: 'Silent Dumb Charades',
    rules: 'Movie titles and crazy party situations. 60-second time limit per team. No speaking, pure body language.',
    suggested_by: 'Ansh Arora',
    votes: ['Ansh Arora'],
    is_preset: true,
    created_at: '2026-11-09T18:00:00Z',
  },
];

export const PARTY_DARES: PartyDare[] = [
  {
    id: 'dare-1',
    title: 'The Slow-Mo Runway Strut',
    category: 'Swagger',
    description: 'Walk across the room in ultra slow-motion while the circle hums an epic entrance theme.',
    intensity: 'Warm-up',
  },
  {
    id: 'dare-2',
    title: 'The 30-Second Freestyle Hook Step',
    category: 'Dance Battle',
    description: 'The group picks a random beat. Drop your most confident traditional dance move right in the middle.',
    intensity: 'Spicy',
  },
  {
    id: 'dare-3',
    title: 'Poetic Brotherhood Toast',
    category: 'Humour',
    description: 'Give a dramatic, Shakespearean compliment to the gentleman sitting directly to your left.',
    intensity: 'Warm-up',
  },
  {
    id: 'dare-4',
    title: 'Rapid Tongue Twister Duel',
    category: 'Wildcard',
    description: 'Repeat 5 times at top speed without fumbling: "Pital ke patile mein papita peela peela" or take a 10-pushup penalty.',
    intensity: 'Spicy',
  },
  {
    id: 'dare-5',
    title: 'High-Fashion Freeze Pose',
    category: 'Swagger',
    description: 'Strike the most ridiculous magazine cover runway pose and freeze completely unmoving for 15 seconds.',
    intensity: 'Warm-up',
  },
  {
    id: 'dare-6',
    title: 'The Untold Confession',
    category: 'Truth',
    description: 'Reveal one hilarious fact or embarrassing college story nobody in this room knows about you.',
    intensity: 'Legendary',
  },
];

export const INITIAL_SETTINGS: PartySettings = {
  awardsVotingOpen: false, // Locked until party night! (Admin only)
  challengeVaultOpen: false, // Locked until party night! (Admin only)
  partyDate: '12 November 2026 (Thursday)',
  partyTimings: '6:00 PM – 11:00 PM',
};
