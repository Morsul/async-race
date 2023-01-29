import { elementGenerator } from '../../../controller/taggenerator';
import { TCreateCar, TModCar } from '../../../types';
import './carmod_styles.scss';

export class CarCreate {
  protected _createInput: HTMLInputElement;
  protected _createButton: HTMLButtonElement;
  protected _createColor: HTMLInputElement;
  private _warp: HTMLDivElement;

  constructor(buttonName: string, className: string, placeholder: string) {
    this._createInput = elementGenerator.createInput('text', {
      placeholder: `${placeholder}`,
      className: `${className}__input-text`,
    });
    this._createButton = elementGenerator.createButton({ className: `button ${className}__button`, text: `${buttonName}` });
    this._createColor = elementGenerator.createInput('color', { className: `${className}__input-color` });

    this._warp = elementGenerator.createDiv({ className: 'car-edit' });
    this._warp.append(this._createInput, this._createColor, this._createButton);
  }

  setButtonFunction = (fnCar: TCreateCar): void => {
    this._createButton.addEventListener('click', () => {
      fnCar(this._createInput.value, this._createColor.value);
      this._createInput.value = '';
      this._createColor.value = '#000000';
    });
  };

  getCarGenerator = () => this._warp;
}

export class CarMod extends CarCreate {
  protected _carId!: number;
  setFields = (color: string, name: string, id: number): void => {
    this._createInput.value = name;
    this._createColor.value = color;
    this._carId = id;
  };

  setButtonFunction = (fnCar: TModCar): void => {
    this._createButton.addEventListener('click', () => {
      if (this._carId > 0) {
        fnCar(this._createInput.value, this._createColor.value, this._carId);
        this._createInput.value = '';
        this._createColor.value = '#000000';
        this._carId = -1;
      }
    });
  };
}
