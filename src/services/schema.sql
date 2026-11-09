-- ============================================================================
-- THE DIWALI SOCIAL 2026 — SUPABASE DATABASE SCHEMA
-- ============================================================================

-- Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. GUESTS TABLE
CREATE TABLE IF NOT EXISTS guests (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  nickname TEXT,
  attendance TEXT NOT NULL CHECK (attendance IN ('YES', 'MAYBE', 'NO')),
  message TEXT,
  show_on_wall BOOLEAN DEFAULT true,
  acknowledged_rules BOOLEAN NOT NULL DEFAULT false,
  is_waitlist BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CONTRIBUTIONS TABLE
CREATE TABLE IF NOT EXISTS contributions (
  id TEXT PRIMARY KEY,
  guest_name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('DECORATION', 'EQUIPMENT', 'GAMES', 'FOOD', 'OTHER')),
  item_name TEXT NOT NULL,
  quantity TEXT NOT NULL,
  note TEXT,
  is_arranged BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. GAME SUGGESTIONS TABLE
CREATE TABLE IF NOT EXISTS game_suggestions (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  rules TEXT NOT NULL,
  materials TEXT,
  format TEXT NOT NULL CHECK (format IN ('INDIVIDUAL', 'TEAM', 'ALL')),
  suggested_by TEXT NOT NULL,
  is_anonymous BOOLEAN DEFAULT false,
  status TEXT NOT NULL DEFAULT 'APPROVED' CHECK (status IN ('PENDING', 'APPROVED', 'LINEUP', 'COMPLETED')),
  votes TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. RAMP WALK REGISTRATIONS TABLE
CREATE TABLE IF NOT EXISTS ramp_walk_registrations (
  id TEXT PRIMARY KEY,
  guest_name TEXT NOT NULL,
  song_preference TEXT NOT NULL,
  tagline TEXT NOT NULL,
  outfit_description TEXT NOT NULL,
  votes_by_category JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TALENT REGISTRATIONS TABLE
CREATE TABLE IF NOT EXISTS talent_registrations (
  id TEXT PRIMARY KEY,
  guest_name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  duration TEXT NOT NULL,
  equipment_needed TEXT,
  status TEXT DEFAULT 'APPROVED',
  cheers INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. SONG SUGGESTIONS TABLE
CREATE TABLE IF NOT EXISTS song_suggestions (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  genre TEXT NOT NULL,
  suggested_by TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) Configuration
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ramp_walk_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE talent_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE song_suggestions ENABLE ROW LEVEL SECURITY;

-- Allow Public Read & Insert for Diwali party guests
CREATE POLICY "Public Read All Guests" ON guests FOR SELECT USING (true);
CREATE POLICY "Public Insert/Update Guests" ON guests FOR ALL USING (true);

CREATE POLICY "Public Read All Contributions" ON contributions FOR SELECT USING (true);
CREATE POLICY "Public Insert/Update Contributions" ON contributions FOR ALL USING (true);

CREATE POLICY "Public Read All Games" ON game_suggestions FOR SELECT USING (true);
CREATE POLICY "Public Insert/Update Games" ON game_suggestions FOR ALL USING (true);

CREATE POLICY "Public Read All Ramp Walks" ON ramp_walk_registrations FOR SELECT USING (true);
CREATE POLICY "Public Insert/Update Ramp Walks" ON ramp_walk_registrations FOR ALL USING (true);

CREATE POLICY "Public Read All Talents" ON talent_registrations FOR SELECT USING (true);
CREATE POLICY "Public Insert/Update Talents" ON talent_registrations FOR ALL USING (true);

CREATE POLICY "Public Read All Songs" ON song_suggestions FOR SELECT USING (true);
CREATE POLICY "Public Insert/Update Songs" ON song_suggestions FOR ALL USING (true);

