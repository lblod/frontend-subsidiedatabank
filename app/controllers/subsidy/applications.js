import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class SubsidyApplicationsController extends Controller {
  @service router;
  @service currentSession;

  page = 0;
  size = 15;
  sort = '-modified';
}
