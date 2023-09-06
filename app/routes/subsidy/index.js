import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class SubsidyIndexRoute extends Route {
  @service router;
  @service currentSession;

  beforeModel(/* transition */) {
    this.router.transitionTo('subsidy.applications');
  }
}
