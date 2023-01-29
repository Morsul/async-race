import { elementGenerator } from './components/controller/taggenerator';
import { GarageView } from './components/view/garage/garagePage';
import { WinnerPage } from './components/view/winner/winners';

export class App {
  garageView = new GarageView();
  winnerView = new WinnerPage();

  start = async (): Promise<void> => {
    //move to header
    const header = elementGenerator.createHTMLElement('header', {});
    const garageButton = elementGenerator.createButton({
      className: 'button button__garage',
      text: 'To Garage',
    });
    const winnerButton = elementGenerator.createButton({
      className: 'button button__garage',
      text: 'To Winner',
    });
    garageButton.addEventListener('click', () => {
      this.garageView.show(true);
      this.winnerView.show(false);
    });
    winnerButton.addEventListener('click', () => {
      this.garageView.show(false);
      this.winnerView.show(true);
      this.winnerView.updatePage();
    });
    header.append(garageButton, winnerButton);
    //move to header end
    document.body.append(header, await this.winnerView.getWinnerPage(), await this.garageView.getGaragePage());
  };
}
