import Model, { attr, hasMany } from '@ember-data/model';

export default class SubsidyMeasureOfferModel extends Model {
  // @attr() title;
  // @attr() subsidyApplicationFlow;
  // @attr() subsidyApplicationFlowStep;
  // @attr() subsidyMeasureConsumptionStatus;

  // TODO: top was original code, bottom is from loket
  @attr title;
  @attr externalInformation;
  @hasMany('subsidy-measure-offer-series') series;
}
