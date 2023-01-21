import { elementGenerator } from '../../../controller/taggenerator';
import { TPromiseVoidFn, TModCar } from '../../../types';
import { carRemoveRequest } from '../../../controller/request';

import './car_styles.scss';

export class Car {
  private _carImage!: HTMLDivElement;
  private _carName!: HTMLParagraphElement;
  private _updateFunction: TModCar;
  private _carId!: number;

  constructor(UpdateField: TModCar) {
    this._updateFunction = UpdateField;
  }

  getCar(name: string, id: number, color: string, updateView: TPromiseVoidFn) {
    this._carId = id;
    this._carImage = elementGenerator.createDiv({ className: 'car-image' });
    this._carName = elementGenerator.createParagraph({ className: 'car-name' });
    this._carImage.style.color = color;
    this._carName.innerText = name || '';
    const wrap = elementGenerator.createDiv({ className: 'race-field__car' });
    const carHeader = elementGenerator.createDiv({ className: 'race-field__head' });
    const selectCar = elementGenerator.createButton({ className: 'button race-field__select', text: 'Select' });
    const deleteCar = elementGenerator.createButton({ className: 'button race-field__delete', text: 'Remove' });
    selectCar.addEventListener('click', () => this._updateFunction(color, name, id));

    deleteCar.addEventListener('click', () => {
      this.removeCar(updateView);
    });

    carHeader.append(selectCar, deleteCar);

    const carRaceLine = elementGenerator.createDiv({ className: 'race-field__track' });
    const carFlag = elementGenerator.createDiv({ className: 'race-field__flag' });

    const carRace = elementGenerator.createButton({ className: 'button race-field__select', text: 'A' });
    const carResset = elementGenerator.createButton({ className: 'button race-field__delete', text: 'B' });
    const carOrders = elementGenerator.createDiv({ className: 'car-order' });

    carOrders.append(carRace, carResset);
    carRaceLine.append(carOrders, this._carImage, this._carName, carFlag);

    wrap.append(carHeader, carRaceLine);

    return wrap;
  }

  removeCar = async (updateView: TPromiseVoidFn): Promise<void> => {
    carRemoveRequest(this._carId).then(() => {
      updateView();
    });
  };

  updateCar = (color: string, name: string) => {
    this._carName.innerText = name;
    this._carImage.style.color = color;
  };

  get getId(): number {
    return this._carId;
  }
}
