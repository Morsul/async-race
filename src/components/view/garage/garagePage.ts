import { elementGenerator } from '../../controller/taggenerator';
import { CarCreate, CarMod } from './car_modification/car_modification';
import { RaceField } from './raceField';

export class GarageView {
  private _raceField: RaceField;
  private _carCreation: CarCreate;
  private _carEdit: CarMod;
  private _wrap!: HTMLDivElement;
  constructor() {
    this._carCreation = new CarCreate('Create Car', 'car-creat', 'Type car name here');
    this._carEdit = new CarMod('Update Car', 'car-edit', 'Type car name here');
    this._raceField = new RaceField(this._carEdit.setFields);
    this._carEdit.setButtonFunction(this._raceField.updateCar);
    this._carCreation.setButtonFunction(this._raceField.addCar);
  }

  getGaragePage = async (): Promise<HTMLDivElement> => {
    this._wrap = elementGenerator.createDiv({ className: 'view view__garage' });
    this._wrap.append(this._carCreation.getCarGenerator(), this._carEdit.getCarGenerator(), await this._raceField.getField());
    return this._wrap;
  };

  show = (state: boolean) => {
    if (state) {
      this._wrap.classList.remove('hidden');
    } else {
      this._wrap.classList.add('hidden');
    }
  };
}
