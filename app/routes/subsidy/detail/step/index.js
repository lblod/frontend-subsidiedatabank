import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class SubsidyDetailStepIndexRoute extends Route {
  @service router;
  @service store;

  async beforeModel() {
    let { consumption, step } = this.modelFor('subsidy.detail.step');
    let forms = await this.store.query('subsidy-application-form', {
      filter: {
        'subsidy-application-flow-step': {
          ':id:': step.id,
        },
        'subsidy-measure-consumption': {
          ':id:': consumption.id,
        },
      },
    });

    /**
     * NOTE: for now hardcoded with the assumption "one step has only one form"
    */
    const form = forms.firstObject;
    if (form) {
      return this.router.replaceWith(
        'subsidy.detail.step.detail',
        consumption.id,
        step.id,
        form.id
      );
    } else {
      // TODO: creating a new form here..
      return this.router.replaceWith(
        'subsidy.detail.step.new',
        consumption.id,
        step.id
      );
    }
  }
}
