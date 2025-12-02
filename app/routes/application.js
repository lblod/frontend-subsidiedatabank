import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import ENV from 'frontend-subsidiedatabank/config/environment';

export default class ApplicationRoute extends Route {
  @service currentSession;
  @service plausible;
  @service session;

  async beforeModel() {
    await this.session.setup();
    this.startAnalytics();
    await this._loadCurrentSession();
  }

  async _loadCurrentSession() {
    try {
      await this.currentSession.load();
    } catch (error) {
      console.error(error);
      this.session.invalidate();
    }
  }

  startAnalytics() {
    let { domain, apiHost } = ENV.plausible;

    if (
      domain !== '{{ANALYTICS_APP_DOMAIN}}' &&
      apiHost !== '{{ANALYTICS_API_HOST}}'
    ) {
      this.plausible.enable({
        domain,
        apiHost,
      });
    }
  }
}
