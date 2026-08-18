import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { config } from '../config';
import { ROOM_SEQUENCE } from '../data/roomSequence';

export const useAppStore = create(
  persist(
    (set, get) => ({
      hasEntered:       false,
      audioState:       'muted',   // 'playing' | 'muted'
      currentRoomIndex: 0,         // which room she's currently on (0-16)
      maxUnlockedIndex: 0,         // highest room she's REACHED — cannot skip ahead
      devicePerformance:'high',
      unlockedEasterEgg:false,
      easterEggTapCount:0,
      candlesBlown:     false,
      selectedFlower:   null,

      setHasEntered: (val) => set({ hasEntered: val }),
      setAudioState: (state) => set({ audioState: state }),
      toggleAudio: () => set((s) => ({ audioState: s.audioState === 'playing' ? 'muted' : 'playing' })),

      /* ── Room navigation ──
         canUnlock: only let her go to rooms she's already been on
         or the VERY NEXT one (one step ahead at a time)            */
      setCurrentRoomIndex: (index) => {
        const TOTAL = ROOM_SEQUENCE.length;
        if (index < 0 || index >= TOTAL) return;
        set((state) => {
          const furthestAllowed = Math.min(TOTAL - 1, state.maxUnlockedIndex + 1);
          if (index > furthestAllowed) return state;
          return {
            currentRoomIndex: index,
            maxUnlockedIndex: Math.max(state.maxUnlockedIndex, index),
          };
        });
      },

      /* Advance one step forward — only callable from the footer Next button */
      nextRoom: () => {
        const { currentRoomIndex } = get();
        get().setCurrentRoomIndex(currentRoomIndex + 1);
      },

      prevRoom: () => {
        const { currentRoomIndex } = get();
        get().setCurrentRoomIndex(currentRoomIndex - 1);
      },

      /* Explicitly unlock next room (called after completing each room) */
      unlockNextRoom: () => {
        const { currentRoomIndex, maxUnlockedIndex } = get();
        const newMax = Math.max(maxUnlockedIndex, currentRoomIndex + 1);
        set({ maxUnlockedIndex: newMax });
      },

      /* Check if a route index is accessible */
      canAccessRoom: (index) => {
        return index <= get().maxUnlockedIndex + 1; // can peek one ahead
      },

      setCandlesBlown: (val) => set({ candlesBlown: val }),
      setSelectedFlower: (flower) => set({ selectedFlower: flower }),

      detectPerformance: () => {
        if (typeof window !== 'undefined') {
          const c = navigator.hardwareConcurrency || 4;
          const m = navigator.deviceMemory || 4;
          set({ devicePerformance: c < 4 || m < 4 ? 'low' : 'high' });
        }
      },

      triggerHaptic: (duration = 20) => {
        if (typeof window !== 'undefined' && 'vibrate' in navigator) {
          try { navigator.vibrate(duration); } catch (_) {}
        }
      },

      tapEasterEgg: () => {
        const n = get().easterEggTapCount + 1;
        if (n >= 3) {
          get().triggerHaptic([30, 50, 30, 50, 80]);
          set({ unlockedEasterEgg: true, easterEggTapCount: 0 });
        } else {
          get().triggerHaptic(15);
          set({ easterEggTapCount: n });
        }
      },

      closeEasterEgg: () => set({ unlockedEasterEgg: false }),

      /* Reset everything (for testing) */
      resetProgress: () => set({ currentRoomIndex: 0, maxUnlockedIndex: 0, hasEntered: false }),
    }),
    {
      name: 'bhuntu-progress', // persists in localStorage so she can continue later
      partialize: (s) => ({
        hasEntered:        s.hasEntered,
        currentRoomIndex:  s.currentRoomIndex,
        maxUnlockedIndex:  s.maxUnlockedIndex,
      }),
    }
  )
);
