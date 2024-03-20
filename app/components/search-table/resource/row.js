import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

const allowedSubsidies = new Set([
   '64d40351-8128-464f-990f-41066154583e', // Lokaal Energie- en Klimaatpact 1.0
   '70cc4947-33a3-4d26-82e0-2e1eacd2fea2', // Fietssubsidie
   'be6311ab-3a16-478c-9cc1-a233439c44b5', // Oekraine Nooddorpen
   'b03215cf-2206-493c-b534-0546a2479eef', // Oekraine Opknapwerken slaapplekken
]);


export default class RowComponent extends Component {
  @service features;

  get isViewableSubsidy() {
    if (this.args.consumption.status.get('id') == "6373b454-22b6-4b65-b98f-3d86541f2fcf") {
      return false;
    }

    const currentSubsidy = this.args.consumption.subsidyMeasureOffer.get('id');
    return allowedSubsidies.has(currentSubsidy);
  }
}
