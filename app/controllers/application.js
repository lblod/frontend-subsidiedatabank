import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class ApplicationController extends Controller {
  @service session;
  @service() router;

  appTitle = 'Subsidiedatabank';

  logout = () => {
    this.session.invalidate();
  };

  get isIndexOrLoading() {
    return (
      this.router.currentRouteName === 'subsidy.applications' ||
      this.router.currentRouteName === 'loading'
    );
  }
}
