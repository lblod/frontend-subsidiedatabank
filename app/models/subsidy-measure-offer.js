import Model, { attr } from '@ember-data/model';

export default class SubsidyMeasureOfferModel extends Model {
  @attr() title;

  @attr() subsidyApplicationFlow;
  @attr() subsidyApplicationFlowStep;
  @attr() subsidyMeasureConsumptionStatus;
}
