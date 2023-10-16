import { isEmpty } from '@ember/utils';
import { action } from '@ember/object';
import Route from '@ember/routing/route';
import Snapshot from '../../utils/snapshot';
import { tracked } from '@glimmer/tracking';
import { getQueryParams } from '../../utils/filter-form-helpers';
import { inject as service } from '@ember/service';

export default class SubsidyApplicationsRoute extends Route {
  @service store;
  @tracked filter;

  queryParams;

  constructor() {
    super(...arguments);
    const options = { refreshModel: true };
    this.queryParams = getQueryParams(options);
    this.queryParams['page'] = options;
    this.queryParams['size'] = options;
    this.queryParams['sort'] = options;
    this.lastParams = new Snapshot();
  }

  async model(params) {
    this.filter = params;
    this.lastParams.stageLive(params);


    return this.search(params);
  }

  async search(params) {
    const query = {
      'page[number]': params.page,
    };

    //sort by selected sort or default to last modified subsidy
    query.sort = params.sort ? params.sort : '-modified';

    query.include = [
      'status',
      'subsidy-measure-offer',
      'subsidy-application-forms',
      'subsidy-application-flow.subsidy-measure-offer-series.period',
      'active-subsidy-application-flow-step.subsidy-procedural-step.period',
      'participations.participating-bestuurseenheid.classificatie',
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

    this.lastParams.commit();

    return await this.store.query('subsidy-measure-consumption', query);
  }

  setupController(controller) {
    super.setupController(...arguments);

    if (controller.page !== this.lastParams.committed.page)
      controller.set('page', this.lastParams.committed.page);

    if (controller.filter !== this.filter)
      controller.set('filter', this.filter);
  }

  @action
  loading(/* transition, origin */) {
    // Cancel default loading template
    return;
  }
}
