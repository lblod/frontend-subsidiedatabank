import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class MockLoginRoute extends Route {
  queryParams = {
    page: {
      refreshModel: true,
    },
  };

  @service session;
  @service store;

  beforeModel() {
    this.session.prohibitAuthentication('index');
  }

  model(params) {
    const filter = { provider: 'https://github.com/lblod/mock-login-service' };
    if (params.organisatie)
      filter.organisatie = { organizations: params.organisatie };
    return this.store.query('account', {
      include: 'gebruiker.organizations',
      filter: filter,
      page: { size: 10, number: params.page },
      sort: 'gebruiker.achternaam',
    });
  }
}
