import { elementGenerator } from '../../controller/taggenerator';
import { Car } from './car/car';
import { getPage, carCreateRequest, carUpdateRequest, getWinner, addWinner, updateWinner, getSingleCar } from '../../controller/request';
import { raceCarCount, carBrand, carModal, carColor } from '../../variables';
import { TRaceCarResponse, TModCar } from '../../types';
import { RaceNav } from '../pagination/pagination';
import './garage.scss';

export class RaceField {
  private _raceField: HTMLDivElement = elementGenerator.createDiv({ className: 'race-field' });
  private _carInstances = new Array<Car>(raceCarCount);
  private _page = 1;
  private _nav: RaceNav;
  private _generateCars: HTMLButtonElement = elementGenerator.createButton({ className: 'button generate-cars', text: 'Create 100 cars' });
  private _startRace: HTMLButtonElement = elementGenerator.createButton({ className: 'button', text: 'Start Race' });
  private _restRace: HTMLButtonElement = elementGenerator.createButton({ className: 'button', text: 'Resset Cars' });
  private _winnerWindow: HTMLDivElement = elementGenerator.createParagraph({ className: 'congratulation-window hidden' });
  private _canAddWinner = true;
  constructor(UpdatCar: TModCar) {
    this._nav = new RaceNav(this.setPage);
    for (let i = 0; i < raceCarCount; i += 1) {
      this._carInstances[i] = new Car(UpdatCar, this.resetStartButton, this.checkRaceWinner);
    }
    this._generateCars.addEventListener('click', () => {
      this.generateCars();
    });
    this._startRace.addEventListener('click', () => {
      this.startRace();
    });
    this._restRace.addEventListener('click', () => {
      this.resetRace();
    });
    this._winnerWindow.addEventListener('click', () => {
      this.hideWinner();
    });
  }

  getField = async (): Promise<DocumentFragment> => {
    this.updateField();
    const fragment = document.createDocumentFragment();
    fragment.append(this._winnerWindow, this._startRace, this._restRace, this._generateCars, this._nav.getCarCountHTML(), await this._nav.getCurrentPageHTML(), this._raceField, this._nav.getPageNav());
    return fragment;
  };

  setPage = (i: number): void => {
    this._page = i;
    this.updateField();
  };

  updateField = async (): Promise<void> => {
    const k: TRaceCarResponse = await getPage(this._page, raceCarCount);

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
        e.setId(-1);
      }
      for (let i = raceCarCount + 1; i >= k.length; i -= 1) {
        this.removeCarHtml(i);
      }
    });
    await this._nav.updateCarCount();
    this._nav.updateButtonsState();
    this.resetStartButton();
  };

  addCar = async (carName: string, carColor: string): Promise<void> => {
    carCreateRequest(carName, carColor).then(() => this.updateField());
  };

  addCarMultipleCars = async (carName: string, carColor: string): Promise<void> => {
    carCreateRequest(carName, carColor);
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

  generateCars = async () => {
    this._generateCars.disabled = true;
    for (let i = 0; i < 100; i += 1) {
      const name = carBrand[this.generateNumber(carBrand.length)] + ' ' + carModal[this.generateNumber(carModal.length)];
      const color = carColor[this.generateNumber(carColor.length)];
      await this.addCarMultipleCars(name, color);
    }
    await this.updateField().then(() => {
      this._generateCars.disabled = false;
    });
  };

  private generateNumber = (max: number) => {
    return Math.floor(Math.random() * (max + 1));
  };

  private startRace = () => {
    this._startRace.disabled = true;
    this._nav.changeBothStates(false);
    this._carInstances.forEach((e) => {
      if (e.getId > -1) {
        e.startDrive(true);
      }
    });
  };

  private resetRace = () => {
    this._carInstances.forEach((e) => {
      if (e.getId > -1) {
        e.resetCar();
      }
    });
  };

  resetStartButton = () => {
    for (let i = 0; i < raceCarCount; i += 1) {
      if (this._carInstances[i].getState && this._carInstances[i].getId > 0) {
        this._startRace.disabled = true;
        return;
      }
    }
    this._canAddWinner = true;
    this._startRace.disabled = false;
  };

  checkRaceWinner = (id: number, time: number) => {
    for (let i = 0; i < raceCarCount; i += 1) {
      if (time > this._carInstances[i].getDriveTime && this._carInstances[i].getDriveRespons === 200) {
        return;
      }
    }
    if (this._canAddWinner) this.setWinner(id, time);
  };

  setWinner = (id: number, time: number) => {
    this._canAddWinner = false;
    this._nav.changeBothStates(true);
    this.showWinner(id);
    getWinner(id).then((response) => {
      if (response.status === 404) {
        addWinner(id, time);
      }
      if (response.status === 200) {
        response.json().then((response) => {
          if (time < response.time) {
            updateWinner(id, response.wins + 1, time);
          }
        });
      }
    });
  };

  showWinner = async (id: number) => {
    const car = await getSingleCar(id);
    this._winnerWindow.innerText = `Car ${car.name} won race`;
    this._winnerWindow.classList.remove('hidden');
  };

  hideWinner = () => {
    this._winnerWindow.classList.add('hidden');
  };
}
