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
    const filter = {
      provider: 'https://github.com/lblod/mock-login-service',
      gebruiker: {
        account: {
          id: '3a91ff60-07c1-4136-ac5e-55cf401e0956',
        },
      },
    };
    return this.store.query('account', {
      include: 'gebruiker.organizations',
      filter: filter,
      page: { size: 10, number: params.page },
      sort: 'gebruiker.achternaam',
    });
  }
}
