import { create } from "zustand";
export const useDeplacementStore = create((set) => ({
  nActive: 2,
  gachette: false,
  droite: false,
  gauche: false,
  onClickGauche: () =>
    set((state) => ({
      gachette: true,
      droite: true,
    })),
  onClickDroite: () =>
    set((state) => ({
      gachette: true,
      gauche: true,
    })),
  updateGachette: () => set((state) => ({ gachette: false })),
  stopDroite: () => set((state) => ({ gauche: false, droite: false })),
  stopGauche: () => set((state) => ({ droite: false, gauche: false })),
  nActiveUp: () => set((state) => ({ nActive: state.nActive + 1 })),
  nActiveDown: () => set((state) => ({ nActive: state.nActive - 1 })),
}));

export const usePlanetStore = create((set) => ({
  planet: { name: "" },
  updateData: (planet) =>
    set((state) => ({
      planet: planet,
    })),
}));
