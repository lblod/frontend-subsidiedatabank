import Model, { attr, belongsTo } from '@ember-data/model';

export default class SubsidyRequestModel extends Model {
  @attr('date') dateOfRequest;

  // TODO: See if this is needed. We dont seem to have a model file for it.
  // @belongsTo('monetary-amount', {
  //   async: true,
  //   inverse: null,
  // })
  // requestedAmount;

  @belongsTo('subsidy-measure-consumption', {
    async: true,
    inverse: 'subsidyRequest',
  })
  subsidyMeasureConsumption;
}
