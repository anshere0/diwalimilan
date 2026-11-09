import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { NeighborhoodEtiquette } from './components/NeighborhoodEtiquette';
import { TheExperience } from './components/TheExperience';
import { RedCarpet } from './components/RedCarpet';
import { ContributionBoard } from './components/ContributionBoard';
import { GameArena } from './components/GameArena';
import { GuestListSection } from './components/GuestListSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { RsvpModal } from './components/RsvpModal';
import { AdminDashboard } from './components/AdminDashboard';
import { SparklerCanvas } from './components/SparklerCanvas';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { MarigoldPetals } from './components/ui/MarigoldPetals';
import {
  getGuests,
  getSupplies,
  getGames,
  getAwards,
  getPartySettings,
  subscribeToStore,
  getConfirmedCount
} from './services/storage';

export const App: React.FC = () => {
  const [guests, setGuests] = useState(getGuests());
  const [supplies, setSupplies] = useState(getSupplies());
  const [games, setGames] = useState(getGames());
  const [awards, setAwards] = useState(getAwards());
  const [settings, setSettings] = useState(getPartySettings());
  const [confirmedCount, setConfirmedCount] = useState(getConfirmedCount());

  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const refreshState = () => {
    setGuests([...getGuests()]);
    setSupplies([...getSupplies()]);
    setGames([...getGames()]);
    setAwards([...getAwards()]);
    setSettings({ ...getPartySettings() });
    setConfirmedCount(getConfirmedCount());
  };

  useEffect(() => {
    const unsubscribe = subscribeToStore(() => {
      refreshState();
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="relative min-h-screen bg-midnight text-ivory font-sans selection:bg-marigold selection:text-midnight overflow-x-hidden">
      {/* Top Scroll Reading Progress */}
      <ScrollProgress />

      {/* Interactive Golden Diwali Embers & Sparkler Canvas */}
      <SparklerCanvas />

      {/* Gentle Floating Marigold Petals */}
      <MarigoldPetals />

      {/* Fixed Sticky Header */}
      <Navbar
        onOpenRsvp={() => setIsRsvpOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        confirmedCount={confirmedCount}
      />

      <main className="relative z-10">
        {/* 1. Cinematic Hero with Light the Diya interaction */}
        <Hero
          onOpenRsvp={() => setIsRsvpOpen(true)}
          confirmedCount={confirmedCount}
        />

        {/* 2. Neighborhood Etiquette (Royal Charter Decree) */}
        <NeighborhoodEtiquette />

        {/* 3. The Vibe (Brotherhood socializer, DIY decor, live dinner) */}
        <TheExperience />

        {/* 4. The Red Carpet Runway & Night Awards */}
        <RedCarpet
          awards={awards}
          guests={guests}
          isVotingOpen={settings.awardsVotingOpen}
        />

        {/* 5. What's Needed & Who's Bringing What (Royal Manifest Ledger) */}
        <ContributionBoard
          supplies={supplies}
          guests={guests}
          onOpenRsvp={() => setIsRsvpOpen(true)}
        />

        {/* 6. Games Arena & Mystery Dare Vault */}
        <GameArena
          games={games}
          isVaultOpen={settings.challengeVaultOpen}
        />

        {/* 7. The Guest List (The Roll of Honor) */}
        <GuestListSection
          guests={guests}
          onOpenRsvp={() => setIsRsvpOpen(true)}
        />

        {/* 8. Venue & Driving Directions */}
        <LocationSection />
      </main>

      {/* 9. Final Experience & WhatsApp Share */}
      <Footer onOpenRsvp={() => setIsRsvpOpen(true)} />

      {/* Modals */}
      <RsvpModal
        isOpen={isRsvpOpen}
        onClose={() => setIsRsvpOpen(false)}
        onSuccess={refreshState}
      />

      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        guests={guests}
        supplies={supplies}
        games={games}
        awards={awards}
        settings={settings}
        onDataRefresh={refreshState}
      />
    </div>
  );
};

export default App;
