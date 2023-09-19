import Model, { attr, belongsTo } from '@ember-data/model';

export default class SubsidyApplicationFlowStepModel extends Model {
  @attr order;

  // A reference to an external procedure (application flow step)
  @attr externalProcessLink;

  // TODO: add form relationship
  // @belongsTo('file') formSpecification;
  @belongsTo('subsidy-application-flow') applicationFlow;
  @belongsTo('subsidy-procedural-step') subsidyProceduralStep;

  @belongsTo('subsidy-application-flow-step', {
    inverse: 'nextApplicationStep',
  })
  previousApplicationStep;

  @belongsTo('subsidy-application-flow-step', {
    inverse: 'previousApplicationStep',
  })
  nextApplicationStep;

  get deadline() {
    return this.subsidyProceduralStep.get('period');
  }
}
