import Controller from '@ember/controller';

import { action } from '@ember/object';

import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class SubsidyDetailStepDetailController extends Controller {
  // To mimic user testing as much as possible
  // we introduce testMode queryparam, which skips some of the (blocking) frontend business logic.
  queryParams = ['testMode'];

  @service currentSession;
  @service store;
  @service router;

  @tracked testMode;
  @tracked error;
  @tracked datasetTriples = [];
  @tracked addedTriples = [];
  @tracked removedTriples = [];
  @tracked forceShowErrors = false;

  constructor() {
    super(...arguments);
  }

  get submitted() {
    return this.semanticForm.get('status').get('isSent');
  }

  get formStore() {
    return this.model.formStore;
  }

  get graphs() {
    return this.model.graphs;
  }

  get sourceNode() {
    return this.model.sourceNode;
  }

  get form() {
    return this.model.form;
  }

  get semanticForm() {
    return this.model.semanticForm;
  }

  get consumption() {
    return this.model.consumption;
  }

  get step() {
    return this.model.step;
  }

  reset() {
    this.error = null;
    this.forceShowErrors = false;
  }
}
