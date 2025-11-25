import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class RowComponent extends Component {
  @service features;

  get firstParticipation() {
    // We assume the data was included and loaded before the component renders, so we don't have to deal with the async states.
    return this.args.consumption.hasMany('participations').value().at(0);
  }

  get isViewableSubsidy() {
    if (
      this.args.consumption.status.get('id') ==
      '6373b454-22b6-4b65-b98f-3d86541f2fcf'
    ) {
      return false;
    }

    return true;
  }

  projectName = (consumption) => {
    return consumption.hasMany('subsidyApplicationForms').value()?.at(0)
      ?.projectName;
  };
}
