import { elementGenerator } from '../../../controller/taggenerator';

export class SingleWinnerLine {
  getWinnerLine = (carOrder: number | string, carColor: string | undefined, carName: string, carWins: number | string, carTime: number | string) => {
    const wrap = elementGenerator.createDiv({ className: 'single-winner' });
    const order = elementGenerator.createParagraph({ className: 'single-winner__order', text: `${carOrder}` });
    const name = elementGenerator.createParagraph({ className: ' single-winner__name', text: `${carName}` });
    const wins = elementGenerator.createParagraph({ className: ' single-winner__wins', text: `${carWins}` });
    let time: HTMLDivElement;

    if (typeof carTime === 'number') {
      time = elementGenerator.createParagraph({ className: ' single-winner__time', text: `${Math.round(carTime * 100) / 100}` });
    } else {
      time = elementGenerator.createParagraph({ className: ' single-winner__time', text: `${carTime}` });
    }

    let car: HTMLDivElement;
    if (carColor === undefined) {
      car = elementGenerator.createDiv({ className: ' single-winner__car', text: 'Car' });
    } else {
      car = elementGenerator.createDiv({ className: ' single-winner__car' });
      car.style.color = carColor;
    }

    wrap.append(order, car, name, wins, time);
    return wrap;
  };
}
