import { elementGenerator } from '../../controller/taggenerator';
import { Car } from '../../controller/car/car';

export class RaceField {
  private _raceField: HTMLDivElement;
  private _carList: Car[];
  constructor() {
    this._raceField = elementGenerator.createDiv({ className: 'race-field' });
    this._carList = [];
  }

  getField = (): HTMLDivElement => {
    return this._raceField;
  };

  addCar = (name: string, color: string): void => {
    const car = new Car();
    this._raceField.append(car.getCar(name, color));
    this._carList.push(car);
    console.log(this._carList);
    // return
  };

  updateCar = (name: string, color: string): void => {
    const car = new Car();
    this._raceField.append(car.getCar(name, color));
    this._carList.push(car);
    console.log(this._carList);
    // return
  };
}
