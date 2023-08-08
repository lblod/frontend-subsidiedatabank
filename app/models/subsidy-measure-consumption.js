import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class SubsidyMeasureConsumptionModel extends Model {
  @attr('datetime') created;
  @attr('datetime') modified;

  @belongsTo('gebruiker') creator;
  @belongsTo('gebruiker') lastModifier;
  @belongsTo('subsidy-measure-offer') subsidyMeasureOffer;
  @belongsTo('subsidy-application-flow') subsidyApplicationFlow;
  @belongsTo('subsidy-application-flow-step') activeSubsidyApplicationFlowStep;
  @belongsTo('subsidy-measure-consumption-status') status;
  @hasMany('participation') participations;
  @hasMany('subsidy-application-form') subsidyApplicationForms;

  get deadline() {
    if (this.activeSubsidyApplicationFlowStep)
      return this.activeSubsidyApplicationFlowStep.get(
        'subsidyProceduralStep.period'
      );
    return undefined;
  }
}
