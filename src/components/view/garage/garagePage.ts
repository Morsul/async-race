import { elementGenerator } from '../../controller/taggenerator';
import { CarModifier } from '../../controller/car_modification/car_modification';
import { RaceField } from './raceField';

export class GarageView {
  private _carCreation: CarModifier;
  private _carEdit: CarModifier;
  private _raceField: RaceField;
  constructor() {
    this._raceField = new RaceField();
    this._carCreation = new CarModifier(this._raceField.addCar, 'Create Car', 'car-creat', 'Type car name here');
    this._carEdit = new CarModifier(this._raceField.updateCar, 'Update Car', 'car-edit', 'Type car name here');
  }

  getGaragePage = (): HTMLDivElement => {
    const view = elementGenerator.createDiv({ className: 'view view__garage' });
    view.append(this._carCreation.getCarGenerator(), this._carEdit.getCarGenerator(), this._raceField.getField());
    return view;
  };
}
