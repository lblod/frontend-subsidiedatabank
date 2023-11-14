import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { NEW_STATUS } from '../../../../models/submission-document-status';

// TODO: we shouldn't really create new forms, look into removing this and disabling opening uncreated steps
export default class SubsidyDetailStepNewRoute extends Route {
  @service router;
  @service currentSession;
  @service store;

  async beforeModel() {
    const newStatuses = await this.store.query('submission-document-status', {
      page: { size: 1 },
      'filter[:uri:]': NEW_STATUS,
    });

    if (newStatuses.length) this.newStatus = newStatuses.at(0);
  }

  async model() {
    let { consumption } = this.modelFor('subsidy.detail');
    let { step } = this.modelFor('subsidy.detail.step');

    const spec = await step.formSpecification;

    let form = this.store.createRecord('subsidy-application-form', {
      creator: this.currentSession.user,
      lastModifier: this.currentSession.user,
      subsidyApplicationFlowStep: step,
      subsidyMeasureConsumption: consumption,
      status: this.newStatus,
    });

    form.sources.push(spec);
    await form.save();

    const forms = await consumption.subsidyApplicationForms;
    forms.push(form);
    await consumption.save();

    return { consumption, step, form };
  }

  afterModel(model) {
    let { consumption, step, form } = model;
    this.router.replaceWith(
      'subsidy.detail.step.detail',
      consumption.id,
      step.id,
      form.id
    );
  }
}
