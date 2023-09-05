import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { NEW_STATUS } from '../../../../models/submission-document-status';

export default class SubsidyApplicationsEditStepNewRoute extends Route {
  @service router;
  @service currentSession;
  @service store;

  async beforeModel() {
    const newStatuses = await this.store.query('submission-document-status', {
      page: { size: 1 },
      'filter[:uri:]': NEW_STATUS,
    });

    if (newStatuses.length) this.newStatus = newStatuses.firstObject;
  }

  async model() {
    let { consumption } = this.modelFor('subsidy.edit');
    let { step } = this.modelFor('subsidy.edit.step');

    // TODO: this datamodel property is in comment atm
    // const spec = await step.get('formSpecification');

    let form = this.store.createRecord('subsidy-application-form', {
      creator: this.currentSession.user,
      lastModifier: this.currentSession.user,
      subsidyApplicationFlowStep: step,
      subsidyMeasureConsumption: consumption,
      status: this.newStatus,
    });
    console.log('form', form.serialize());
    // console.log('spec', spec);
    // form.sources.pushObject(spec);
    await form.save();

    consumption.subsidyApplicationForms.pushObject(form);
    await consumption.save();

    return { consumption, step, form };
  }

  afterModel(model) {
    let { consumption, step, form } = model;
    this.router.replaceWith(
      'subsidy.edit.step.edit',
      consumption.id,
      step.id,
      form.id
    );
  }
}
