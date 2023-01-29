import { elementGenerator } from '../../controller/taggenerator';
import { getWinnersList, getSingleCar } from '../../controller/request';
import { winnerCarCount, selectParametrs } from '../../variables';
import { SingleWinnerLine } from './singlewinner/singlewinner';
import { WinnerNav } from '../pagination/pagination';
import './winners_styles.scss';

export class WinnerPage {
  private _wrap!: HTMLDivElement;
  private _carListHeadline!: HTMLDivElement;
  private _carList!: HTMLDivElement;
  private _page = 1;
  private _nav: WinnerNav;
  private _filter!: HTMLSelectElement;
  private _filterParam = 0;
  constructor() {
    this._nav = new WinnerNav(this.setPage);
  }

  getWinnerPage = async () => {
    const fragment = document.createDocumentFragment();
    this._wrap = elementGenerator.createDiv({ className: 'winner-list__wrap hidden' });
    this._carList = elementGenerator.createDiv({ className: 'winner-list' });
    this._carListHeadline = elementGenerator.createDiv({ className: 'winner-list winner-list__headline' });

    const firstLine = new SingleWinnerLine();
    this._carListHeadline.append(firstLine.getWinnerLine('Order', undefined, 'Name', 'Wins', 'Best time seconds'));

    this._filter = document.createElement('select');

    fragment.append(this._nav.getCarCountHTML(), await this._nav.getCurrentPageHTML(), this._filter, this._carListHeadline, this._carList, this._nav.getPageNav());
    this.createaOptions();
    this.updatePage();
    this._wrap.append(fragment);
    return this._wrap;
  };

  show = (state: boolean) => {
    if (state) {
      this._wrap.classList.remove('hidden');
    } else {
      this._wrap.classList.add('hidden');
    }
  };

  setPage = (i: number) => {
    this._page = i;
    this.updatePage();
  };

  updatePage = async () => {
    const k = await getWinnersList(this._page, winnerCarCount, this._filterParam);
    if (k.length === 0 && this._page != 1) {
      this.setPage(this._page - 1);
    } else {
      for (let i = 0; i < winnerCarCount; i += 1) {
        if (k[i] !== undefined) {
          const winnerLine = new SingleWinnerLine();
          const c = await getSingleCar(k[i].id);
          const markup = winnerLine.getWinnerLine(i + 1, c.color, c.name, k[i].wins, k[i].time);

          if (this._carList.childNodes.item(i)) {
            this._carList.childNodes.item(i).replaceWith(markup);
          } else {
            this._carList.append(markup);
          }
        }
      }

      for (let i = winnerCarCount + 1; i >= k.length; i -= 1) {
        this.removeCarHtml(i);
      }

      await this._nav.updateCarCount();
      this._nav.updateButtonsState();
    }
  };

  removeCarHtml = async (i: number): Promise<void> => {
    if (this._carList.childNodes.item(i)) {
      this._carList.childNodes.item(i).remove();
    }
  };

  createaOptions = () => {
    selectParametrs.forEach((e, i) => {
      const option = document.createElement('option');
      option.value = String(i);
      option.text = e;
      this._filter.append(option);
    });
    this._filter.addEventListener('change', () => {
      this._filterParam = Number(this._filter.value);
      this.updatePage();
    });
  };
}
