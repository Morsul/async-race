import { elementGenerator } from '../../../controller/taggenerator';
import { TPromiseVoidFn, TModCar, TVoidFn, TCheckWinnerFn } from '../../../types';
import { carRemoveRequest, startEngine, driveCar, stopEngine, deleteWinnerCar } from '../../../controller/request';

import './car_styles.scss';

export class Car {
  private _updatCar: TModCar;
  private _resetButton: TVoidFn;
  private _checkWinner: TCheckWinnerFn;
  private _carImage!: HTMLDivElement;
  private _carName!: HTMLParagraphElement;
  private _carId!: number;
  private _carRace!: HTMLButtonElement;
  private _carReset!: HTMLButtonElement;
  private _deleteCar!: HTMLButtonElement;
  private _selectCar!: HTMLButtonElement;
  private _controller!: AbortController;
  private _driveState = false;
  private _driveResponse = -1;
  private _driveTime = 0;

  constructor(UpdatCar: TModCar, resetStartButton: TVoidFn, checkWinner: TCheckWinnerFn) {
    this._updatCar = UpdatCar;
    this._resetButton = resetStartButton;
    this._checkWinner = checkWinner;
  }

  getCar = (name: string, id: number, color: string, updateView: TPromiseVoidFn) => {
    this._carId = id;
    this._carImage = elementGenerator.createDiv({ className: 'car-image' });
    this._carName = elementGenerator.createParagraph({ className: 'car-name' });
    this._carImage.style.color = color;
    this._carName.innerText = name || '';

    const wrap = elementGenerator.createDiv({ className: 'race-field__car' });

    const carHeader = elementGenerator.createDiv({ className: 'race-field__head' });
    this._selectCar = elementGenerator.createButton({ className: 'button race-field__select', text: 'Select' });
    this._deleteCar = elementGenerator.createButton({ className: 'button race-field__delete', text: 'Remove' });

    this._selectCar.addEventListener('click', () => this._updatCar(color, name, id));
    this._deleteCar.addEventListener('click', () => {
      this.removeCar(updateView);
    });

    carHeader.append(this._selectCar, this._deleteCar);

    const carRaceLine = elementGenerator.createDiv({ className: 'race-field__track' });
    const carFlag = elementGenerator.createDiv({ className: 'race-field__flag' });

    carRaceLine.append(this.getEngineControls(), this._carImage, this._carName, carFlag);

    wrap.append(carHeader, carRaceLine);
    this._driveState = false;
    return wrap;
  };

  getEngineControls = () => {
    this._carRace = elementGenerator.createButton({ className: 'button race-field__select', text: 'A' });
    this._carReset = elementGenerator.createButton({ className: 'button race-field__delete', text: 'B' });
    const engineControls = elementGenerator.createDiv({ className: 'car-order' });
    this._carRace.addEventListener('click', () => {
      this.startDrive(false);
    });
    this._carReset.addEventListener('click', () => {
      this.resetCar();
    });
    this._carReset.disabled = true;
    engineControls.append(this._carRace, this._carReset);

    return engineControls;
  };

  removeCar = async (updateView: TPromiseVoidFn): Promise<void> => {
    carRemoveRequest(this._carId).then(() => {
      updateView();
      deleteWinnerCar(this._carId);
    });
  };

  updateCar = (color: string, name: string) => {
    this._carName.innerText = name;
    this._carImage.style.color = color;
  };

  setId = (i: number) => {
    this._carId = i;
  };

  get getId(): number {
    return this._carId;
  }

  startDrive = async (isRace: boolean) => {
    this._carRace.disabled = true;
    this._carReset.disabled = false;
    this._deleteCar.disabled = true;
    this._driveState = true;
    this._resetButton();
    await startEngine(this._carId)
      .then((response) => response.json())
      .then((response) => {
        this._driveTime = response.distance / response.velocity / 1000;
        this._carImage.style.transition = `${this._driveTime}s linear`;
        this._carImage.style.transform = 'translateX(calc(100vw - 210px))';
        this._controller = new AbortController();
        driveCar(this._carId, this._controller)
          .then((response) => {
            if (this._driveState) {
              this._deleteCar.disabled = false;
              this._driveResponse = response.status;
              if (this._driveResponse === 500) this.stopCar();
              if (this._driveResponse === 200 && isRace) this._checkWinner(this._carId, this._driveTime);
              this._carImage.style.transition = 'none';
            }
          })
          .catch((e) => {
            console.log(e);
          });
      });
  };

  stopCar = () => {
    const currentPos = Math.round(this._carImage.getBoundingClientRect().left);
    this._carImage.style.transform = `translateX(${currentPos}px)`;
    this._carImage.classList.add('broken');
  };

  resetCar = async () => {
    this._carReset.disabled = true;
    this._driveState = false;
    this._controller.abort();
    this._driveTime = 0;
    this._driveResponse = -1;
    await stopEngine(this._carId).then(() => {
      this._carRace.disabled = false;
      this._carImage.style.transition = 'none';
      this._carImage.style.transform = `translateX(0px)`;
      this._carImage.classList.remove('broken');
      this._resetButton();
      this._deleteCar.disabled = false;
    });
  };

  get getState(): boolean {
    return this._driveState;
  }

  get getDriveTime(): number {
    return this._driveTime;
  }

  get getDriveRespons(): number {
    return this._driveResponse;
  }
}
