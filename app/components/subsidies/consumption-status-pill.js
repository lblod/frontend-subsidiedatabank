import Component from '@glimmer/component';
import { STATUS } from '../../models/subsidy-measure-consumption-status';

export default class SubsidiesConsumptionStatusPill extends Component {
  get consumption() {
    return this.args.consumption;
  }

  get status() {
    return this.consumption.status;
  }

  get label() {
    return this.status.get('label');
  }

  get skin() {
    switch (this.status.get('uri')) {
      case STATUS.SENT:
        return 'success';
      case STATUS.ACTIVE:
        return 'action';
      case STATUS.CONCEPT:
        return 'warning';
      default:
        return '';
    }
  }
}
