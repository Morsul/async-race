import { elementGenerator } from '../controller/taggenerator';
import { GarageView } from './garage/garagePage';

export class App {
  garageView = new GarageView();
  start = (): void => {
    const header = elementGenerator.createHTMLElement('header', {});
    const garageButton = elementGenerator.createButton({
      className: 'button button__garage',
      text: 'To Garage',
    });
    const winnerButton = elementGenerator.createButton({
      className: 'button button__garage',
      text: 'To Winner',
    });
    header.append(garageButton, winnerButton);
    document.body.append(header, this.garageView.getGaragePage());
  };
}
