import { create } from "zustand";

interface PlanetstoreInt {
  planet: dataPlaneteInt;
  updateData: (planet: dataPlaneteInt) => void;
}

interface DeplacementstoreInt {
  nActive: number;
  gachette: boolean;
  droite: boolean;
  gauche: boolean;
  onClickGauche: () => void;
  onClickDroite: () => void;
  updateGachette: () => void;
  stopDroite: () => void;
  stopGauche: () => void;
  nActiveUp: () => void;
  nActiveDown: () => void;
}

const EmptyPlanet = (): dataPlaneteInt => ({
  name: "",
  mass: 0,
  radius: 0,
  semi_major_axis: 0,
  orbital_period_: 0,
  semi_major_axis_: 0,
  period: 0,
  star_radius: 0,
  star_name: "",
  star_distance: 0,
  star_age: 0,
  text: "",
  discovered: 0,
});

// interface dataPlaneteInt {
//   name: string;
//   mass: number;
//   radius: number;
//   semi_major_axis: number;
//   orbital_period_: number;
//   semi_major_axis_: number;
//   period: number;
//   star_radius: number;
//   star_name: string;
//   star_distance: number;
//   star_age: string | number;
//   text: string;
//   discovered: number;
// }

// const EmptySystem = (): dataSystemeInt => {
//   var tt: dataPlaneteInt = EmptyPlanet();

//   return [{
//     0:tt,
//     uid: 0,
//   }];
// };

const EmptySystem = (): dataSystemeInt => {
  var tt: dataPlaneteInt = EmptyPlanet();

  return {
    planetes:[tt],
    uid: 0,
  };
};

export const useDeplacementStore = create<DeplacementstoreInt>((set) => ({
  nActive: 2,
  gachette: false,
  droite: false,
  gauche: false,
  onClickGauche: () =>
    set(() => ({
      gachette: true,
      droite: true,
    })),
  onClickDroite: () =>
    set(() => ({
      gachette: true,
      gauche: true,
    })),
  updateGachette: () => set(() => ({ gachette: false })),
  stopDroite: () => set(() => ({ gauche: false, droite: false })),
  stopGauche: () => set(() => ({ droite: false, gauche: false })),
  nActiveUp: () => set((state: any) => ({ nActive: state.nActive + 1 })),
  nActiveDown: () => set((state: any) => ({ nActive: state.nActive - 1 })),
}));

export const usePlanetStore = create<PlanetstoreInt>((set) => ({
  planet: EmptyPlanet(),
  updateData: (planet: dataPlaneteInt) =>
    set(() => ({
      planet: planet,
    })),
}));
