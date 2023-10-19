import Route from '@ember/routing/route';
import { isEmpty } from '@ember/utils';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import DataTableRouteMixin from 'ember-data-table/mixins/route';

export default class SubsidyApplicationsIndexRoute extends Route.extend(
  DataTableRouteMixin
) {
  @service store;

  queryParams = {
    subsidieType: {
      refreshModel: true,
    },
    bestuurseenheden: {
      refreshModel: true,
    },
    bestuursType: {
      refreshModel: true,
    },
    subsidieStatus: {
      refreshModel: true,
    },
    aanvraagDatum: {
      refreshModel: true,
    },
  };

  modelName = 'subsidy-measure-consumption';

  mergeQueryOptions(params) {
    const query = {};

    query.include = [
      'status',
      'subsidy-measure-offer',
      'subsidy-application-forms',
      'subsidy-application-flow.subsidy-measure-offer-series.period',
      'active-subsidy-application-flow-step.subsidy-procedural-step.period',
      'participations',
      'last-modifier',
    ].join(',');

    // TODO generate this based on form configuration?
    if (!isEmpty(params.search)) query[`filter`] = params.search;

    if (params.subsidieType)
      query['filter[subsidy-measure-offer][:uri:]'] = params.subsidieType;

    if (params.bestuurseenheden)
      query['filter[participations][participating-bestuurseenheid][:uri:]'] =
        params.bestuurseenheden;

    if (params.bestuursType)
      query[
        'filter[participations][participating-bestuurseenheid][classificatie][:uri:]'
      ] = params.bestuursType;

    if (params.aanvraagDatum) query['filter[modified]'] = params.aanvraagDatum;

    if (params.subsidieStatus)
      query['filter[status][:uri:]'] = params.subsidieStatus;

    return query;
  }
}
