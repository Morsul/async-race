import { elementGenerator } from '../taggenerator';
import { TModCar } from '../../types';
import './carmod_styles.scss';

export class CarModifier {
  private _createInput: HTMLInputElement;
  private _createButton: HTMLButtonElement;
  private _createColor: HTMLInputElement;
  private _warp: HTMLDivElement;
  constructor(fnCar: TModCar, buttonName: string, className: string, placeholder: string) {
    this._createInput = elementGenerator.createInput('text', {
      placeholder: `${placeholder}`,
      className: `${className}__input-text`,
    });
    this._createButton = elementGenerator.createButton({ className: `button ${className}__button`, text: `${buttonName}` });
    this._createColor = elementGenerator.createInput('color', { className: `${className}__input-color` });
    this._createButton.addEventListener('click', () => {
      fnCar(this._createInput.value, this._createColor.value);
    });

    this._warp = elementGenerator.createDiv({ className: 'car-edit' });
    this._warp.append(this._createInput, this._createColor, this._createButton);
  }

  getCarGenerator() {
    return this._warp;
  }
}
