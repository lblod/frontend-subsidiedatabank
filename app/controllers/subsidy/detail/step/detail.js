import Controller from '@ember/controller';
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

  get isActiveStep() {
    return (
      this.consumption.activeSubsidyApplicationFlowStep.get('id') ===
      this.step.id
    );
  }

  get canSubmit() {
    return (
      (!this.submitted && this.isActiveStep && this.isInSubmittablePeriod) ||
      this.testMode
    );
  }

  get isInSubmittablePeriod() {
    return !(
      this.submittablePeriodNeedsToStart || this.submittablePeriodExpired
    );
  }

  get submittablePeriodNeedsToStart() {
    const today = new Date();
    console.log('dddd', this.deadline);
    const begin = this.deadline.begin;
    if (!begin) {
      return true;
    } else {
      return today < begin;
    }
  }

  get submittablePeriodExpired() {
    const today = new Date();
    const end = this.deadline.end;
    if (!end) {
      return false;
    } else {
      return today > end;
    }
  }

  get deadline() {
    return this.model.step.get('deadline').content;
  }

  reset() {
    this.error = null;
    this.forceShowErrors = false;
  }
}
