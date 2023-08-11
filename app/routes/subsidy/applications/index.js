/* eslint-disable ember/no-mixins */
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import DataTableRouteMixin from 'ember-data-table/mixins/route';

export default class SubsidyApplicationsIndexRoute extends Route.extend(
  DataTableRouteMixin
) {
  @service store;

  modelName = 'subsidy-measure-consumption';

  mergeQueryOptions(params) {
    console.log(params);

    return {
      include: [
        'status',
        'subsidy-measure-offer',
        'subsidy-application-forms',
        'participations',
      ].join(','),
    };
  }

  // original for reference, TODO: delete
  // mergeQueryOptions() {
  //   return {
  //     include: [
  //       'status',
  //       'subsidy-measure-offer',
  //       'subsidy-application-forms',
  //       'subsidy-application-flow.subsidy-measure-offer-series.period',
  //       'active-subsidy-application-flow-step.subsidy-procedural-step.period',
  //       'participations',
  //       'last-modifier',
  //     ].join(','),
  //   };
  // }
}
