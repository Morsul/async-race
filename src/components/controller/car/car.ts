import { elementGenerator } from '../taggenerator';
import './car_styles.scss';

export class Car {
  private _carImage: HTMLDivElement;
  private _carName: HTMLParagraphElement;
  constructor() {
    this._carImage = elementGenerator.createDiv({ className: 'car-image' });
    this._carName = elementGenerator.createParagraph({ className: 'car-name' });
  }

  getCar(name: string, color: string) {
    this._carImage.style.color = color;
    this._carName.innerText = name;
    const wrap = elementGenerator.createDiv({ className: 'race-field__car' });
    const carHeader = elementGenerator.createDiv({ className: 'race-field__head' });
    const selectCar = elementGenerator.createButton({ className: 'button race-field__select', text: 'Select' });
    const deleteCar = elementGenerator.createButton({ className: 'button race-field__delete', text: 'Remove' });

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
}
