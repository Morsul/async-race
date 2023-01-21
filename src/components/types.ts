export type TCreateCar = (name: string, color: string) => void;

export type TModCar = (name: string, color: string, id: number) => void;

export type TPromiseVoidFn = () => Promise<void>;

export type TCar = { name: string; id: number; color: string };

export type TRaceCarResponse = Array<TCar>;
