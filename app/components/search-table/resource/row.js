import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

const allowedSubsidies = new Set([
  "64d40351-8128-464f-990f-41066154583e", //Lokaal Energie- en Klimaatpact 1.0
]);

export default class RowComponent extends Component {
  @service features;

  get isViewableSubsidy() {
    const currentSubsidy = this.args.consumption.subsidyMeasureOffer.get('id')
    return allowedSubsidies.has(currentSubsidy);
  }
}
