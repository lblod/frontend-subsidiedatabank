import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class SubsidyDetailIndexRoute extends Route {
  @service router;

  /**
   * Redirect to the most BLANK step to be show to the user
   *
   * NOTE: always assumes a consumption to have the proper model defined.
   */
  async beforeModel() {
    let { consumption } = this.modelFor('subsidy.detail');
    /**
     * NOTE: first we always try to transition to the defined active-step.
     */
    let active = await consumption.get('activeSubsidyApplicationFlowStep');
    if (active) {
      return this.redirectToStep(consumption, active);
    }

    await consumption.subsidyApplicationFlow.get('definedSteps');
    const steps = await consumption.subsidyApplicationFlow.get(
      'sortedDefinedSteps'
    );

    if (!steps || steps.length === 0) throw 'corrupt flow: no steps defined';
    /**
     * NOTE: if no active-step was found and the consumption has been sent we transition to the last step.
     */
    if (consumption.get('status.isSent')) {
      const last = steps.at(steps.length - 1);
      return this.redirectToStep(consumption, last);
    }

    /**
     * NOTE: we default back to the first step.
     */
    const first = steps.at(0);
    return this.redirectToStep(consumption, first);
  }

  redirectToStep(consumption, step) {
    return this.router.transitionTo(
      'subsidy.detail.step',
      consumption.id,
      step.id
    );
  }
}
