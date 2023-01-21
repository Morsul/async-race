import { elementGenerator } from '../../controller/taggenerator';
import { Car } from './car/car';
import { getPage, carCreateRequest, carUpdateRequest } from '../../controller/request';
import { raceCarCount } from '../../variables';
import { TRaceCarResponse, TModCar } from '../../types';

export class RaceField {
  private _raceField: HTMLDivElement = elementGenerator.createDiv({ className: 'race-field' });
  private _carInstances = new Array<Car>(raceCarCount);

  constructor(UpdateField: TModCar) {
    for (let i = 0; i < raceCarCount; i += 1) {
      this._carInstances[i] = new Car(UpdateField);
    }
  }

  getField = (): HTMLDivElement => {
    this.updateField();
    return this._raceField;
  };

  updateField = async (): Promise<void> => {
    const k: TRaceCarResponse = await getPage(1, raceCarCount);
    this._carInstances.forEach(async (e, i) => {
      if (k[i] !== undefined) {
        if (e.getId != k[i].id) {
          const cartMarkup = e.getCar(k[i].name, k[i].id, k[i].color, this.updateField);

          if (this._raceField.childNodes.item(i)) {
            this._raceField.childNodes.item(i).replaceWith(cartMarkup);
          } else {
            this._raceField.append(cartMarkup);
          }
        }
      } else {
        this.removeCarHtml(i);
      }
    });
  };

  addCar = async (carName: string, carColor: string): Promise<void> => {
    carCreateRequest(carName, carColor).then(() => this.updateField());
  };

  updateCar = async (name: string, color: string, id: number): Promise<void> => {
    carUpdateRequest(color, name, id).then(() => {
      this._carInstances.forEach((e) => {
        if (e.getId === id) {
          e.updateCar(color, name);
        }
      });
    });
  };

  removeCarHtml = async (i: number): Promise<void> => {
    if (this._raceField.childNodes.item(i)) {
      this._raceField.childNodes.item(i).remove();
    }
  };
}
