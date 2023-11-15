import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { warn } from '@ember/debug';

export default class SubsidyRoute extends Route {
  @service currentSession;
  @service session;
  @service router;

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');

    return this.loadCurrentSession();
  }

  async loadCurrentSession() {
    try {
      await this.currentSession.load();
    } catch (error) {
      warn(error, { id: 'current-session-load-failure' });
      this.router.transitionTo('auth.logout');
    }
  }
}
