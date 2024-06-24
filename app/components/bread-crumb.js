import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class SharedBreadCrumbComponent extends Component {
  @service router;

  bread = [
    {
      route: 'subsidy.applications',
      crumbs: [{ label: 'Subsidiebeheer' }],
    },
    {
      route: 'subsidy.detail.step.new',
      crumbs: [{ label: 'Bekijk subsidieaanvraag' }],
    },
    {
      route: 'subsidy.detail.step.detail',
      crumbs: [{ label: 'Bekijk subsidieaanvraag' }],
    },
  ];

  get crumbsForRoute() {
    const results = this.bread.filter(
      (value) => value.route === this.router.currentRouteName
    );
    if (results.length <= 0) return [];
    return results[0].crumbs;
  }
}
