import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

// Initialize the allowedTitles set with desired titles
const allowedTitles = new Set([
  'Lokaal Energie- en Klimaatpact 1.0',
  // Add more titles as needed
]);

export default class RowComponent extends Component {
  @service features;

  // temporary solution to show incrementally more detail views, remove in the future
  @action
  showDetailView(title) {
    if (!this.features.get('detailView')) return false; // if detailView feature flag disabled, disable all detailviews

    // Check if the provided title is in the allowedTitles set
    return allowedTitles.has(title);
  }
}
