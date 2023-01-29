import { elementGenerator } from '../../controller/taggenerator';
import { getCarCount, getWinnerCarCount } from '../../controller/request';
import { raceCarCount, winnerCarCount } from '../../variables';
import { TSetPageFn } from '../../types';

export class PageNav {
  private _nextPage: HTMLButtonElement = elementGenerator.createButton({ className: 'nextPage', text: 'Next Page' });
  private _prevPage: HTMLButtonElement = elementGenerator.createButton({ className: 'nextPage', text: 'Prev Page' });
  protected _carCountText: HTMLParagraphElement = elementGenerator.createParagraph({ className: 'pageCount', text: `Garage (0)` });
  private _currenPage: HTMLParagraphElement = elementGenerator.createParagraph({ className: 'pageCount', text: `Current Page #1` });
  private _pageCounter = 1;
  protected _carCount = 0;
  private _setPage: TSetPageFn;
  private _carCountView: number;

  constructor(SetPage: TSetPageFn, ccv: number) {
    this._nextPage.addEventListener('click', () => {
      this.updateCurrentPage(1);
    });
    this._prevPage.addEventListener('click', () => {
      this.updateCurrentPage(-1);
    });
    this._setPage = SetPage;
    this._carCountView = ccv;
  }

  getCurrentPageHTML = async () => {
    this.updateButtonsState();
    return this._currenPage;
  };

  getCarCountHTML = () => this._carCountText;

  getPageNav = () => {
    const fragment = document.createDocumentFragment();
    fragment.append(this._prevPage, this._nextPage);
    return fragment;
  };

  updateCurrentPage = (count: number) => {
    this._pageCounter += count;
    this._currenPage.innerHTML = `Current Page #${this._pageCounter}`;
    this._setPage(this._pageCounter);
  };

  updateButtonsState = () => {
    if (this._pageCounter === 1) {
      this._prevPage.disabled = true;
    } else if (this._prevPage.disabled) {
      this._prevPage.disabled = false;
    }

    if (this._pageCounter >= this._carCount / this._carCountView) {
      this._nextPage.disabled = true;
    } else if (this._nextPage.disabled) {
      this._nextPage.disabled = false;
    }
  };

  getPageCounter = () => this._pageCounter;

  changeBothStates = (state: boolean) => {
    if (state) {
      this.updateButtonsState();
    } else {
      this._nextPage.disabled = true;
      this._prevPage.disabled = true;
    }
  };
}

export class RaceNav extends PageNav {
  constructor(SetPage: TSetPageFn) {
    super(SetPage, raceCarCount);
  }
  updateCarCount = async (): Promise<void> => {
    this._carCount = await getCarCount();
    this._carCountText.innerHTML = `Garage (${this._carCount})`;
  };
}

export class WinnerNav extends PageNav {
  constructor(SetPage: TSetPageFn) {
    super(SetPage, winnerCarCount);
  }
  updateCarCount = async (): Promise<void> => {
    this._carCount = await getWinnerCarCount();
    this._carCountText.innerHTML = `Winner count (${this._carCount})`;
  };
}
