// import {Vector3} from "three";
interface dataPlaneteInt {
  name: string;
  mass: number;
  radius: number;
  semi_major_axis: number;
  orbital_period_: number;
  semi_major_axis_: number;
  semi_major_axis_orig:number;
  period: number;
  period_orig: number;
  star_radius: number;
  star_name: string;
  star_distance: number;
  star_age: string | number;
  text: string;
  discovered: number;
}

// type Vector3=Vector3;

// interface dataSystemeInt {
//   [index: number]: {
//     dataPlaneteInt;
//   };
//   uid: number;
// }

// interface dataSystemeInt extends Array<dataPlaneteInt> {uid: number; }

type dataSystemeInt = {planetes:dataPlaneteInt[]} &  {uid: number; };

type dataSystemeSInt = dataSystemeInt[] ;

// interface dataSystemeSInt extends Array<dataSystemeInt> {uid: number; }
