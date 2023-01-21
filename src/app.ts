import { elementGenerator } from './components/controller/taggenerator';
import { GarageView } from './components/view/garage/garagePage';

export class App {
  garageView = new GarageView();

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
    header.append(garageButton, winnerButton);
    //move to header end
    document.body.append(header, await this.garageView.getGaragePage());
  };
}
