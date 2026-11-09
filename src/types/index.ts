export type AttendanceStatus = 'YES' | 'MAYBE' | 'NO';

export interface Guest {
  id: string;
  name: string;
  nickname?: string;
  attendance: AttendanceStatus;
  message?: string;
  show_on_wall: boolean;
  acknowledged_rules: boolean;
  created_at: string;
  updated_at?: string;
}

export type SupplyCategory = 'DECORATION' | 'SOUND & POWER' | 'GAMES' | 'FOOD & SNACKS' | 'OTHER';

export interface SupplyItem {
  id: string;
  item_name: string;
  category: SupplyCategory;
  quantity: string;
  is_claimed: boolean;
  claimed_by?: string;
  note?: string;
  created_at: string;
}

export interface GameIdea {
  id: string;
  title: string;
  rules: string;
  suggested_by: string;
  votes: string[]; // List of voter identifiers
  is_preset?: boolean;
  created_at: string;
}

export interface AwardCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  votes: Record<string, string[]>; // nomineeName -> array of voter names
}

export interface PartyDare {
  id: string;
  title: string;
  category: 'Dance Battle' | 'Humour' | 'Truth' | 'Swagger' | 'Wildcard';
  description: string;
  intensity: 'Warm-up' | 'Spicy' | 'Legendary';
}

export interface PartySettings {
  awardsVotingOpen: boolean;
  challengeVaultOpen: boolean;
  partyDate: string;
  partyTimings: string;
}
