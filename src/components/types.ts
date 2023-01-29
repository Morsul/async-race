export type TCreateCar = (name: string, color: string) => void;

export type TModCar = (name: string, color: string, id: number) => void;

export type TSetPageFn = (i: number) => void;

export type TVoidFn = () => void;

export type TCheckWinnerFn = (id: number, time: number) => void;

export type TPromiseVoidFn = () => Promise<void>;

export type TRaceCarResponse = Array<ICar>;

export type TWinnerCarResponse = Array<IWinnerCar>;

export interface ICar {
  name: string;
  id: number;
  color: string;
}
export interface IWinnerCar {
  id: number;
  time: number;
  wins: number;
}
