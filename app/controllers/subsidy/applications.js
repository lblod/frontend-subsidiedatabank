import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { typeOf } from '@ember/utils';

export default class SubsidyApplicationsController extends Controller {
  @service router;
  @service currentSession;

  page = 0;
  size = 15;
  sort = '-modified';
}
