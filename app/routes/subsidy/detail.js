import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { registerFormFields } from '@lblod/ember-submission-form-fields';
import ApplicationFormTableShowComponent from 'frontend-subsidiedatabank/components/rdf-form-fields/application-form-table/show';
import ClimateSubsidyCostsTableComponent from 'frontend-subsidiedatabank/components/rdf-form-fields/climate-subsidy-costs-table';
import EInclusionMaxValidatorComponent from 'frontend-subsidiedatabank/components/rdf-form-fields/e-inclusion-max-validator';
import EngagementTableShowComponent from 'frontend-subsidiedatabank/components/rdf-form-fields/engagement-table/show';
import EstimatedCostShowComponent from 'frontend-subsidiedatabank/components/rdf-form-fields/estimated-cost-table/show';
import ObjectiveTableShowComponent from 'frontend-subsidiedatabank/components/rdf-form-fields/objective-table/show';
import PlanLivingTogetherTableShowComponent from 'frontend-subsidiedatabank/components/rdf-form-fields/plan-living-together-table/show';
import AccountabilityTableShowComponent from 'frontend-subsidiedatabank/components/rdf-form-fields/accountability-table/show';
import FinancingTotalsComponent from 'frontend-subsidiedatabank/components/rdf-form-fields/urban-renewal/financing-totals';

// TODO: check if this file is needed?
export default class SubsidyDetailRoute extends Route {
  @service store;
  @service currentSession;

  constructor() {
    super(...arguments);

    this.registerTableFields();
  }

  async model({ id: consumptionID }) {
    const consumption = await this.store.findRecord(
      'subsidy-measure-consumption',
      consumptionID,
      {
        include: [
          'active-subsidy-application-flow-step',
          'status',
          'subsidy-measure-offer',
          'subsidy-application-forms',
          'subsidy-application-flow.defined-steps.subsidy-procedural-step',
          'subsidy-application-flow.subsidy-measure-offer-series.period',
          'participations.participating-organization',
          'last-modifier',
        ].join(','),
      },
    );

    const participations = await consumption.participations;
    const organization = await participations[0].participatingOrganization;

    return {
      consumption,
      organization,
    };
  }

  registerTableFields() {
    registerFormFields([
      {
        displayType:
          'http://lblod.data.gift/display-types/applicationFormTable',
        show: ApplicationFormTableShowComponent,
      },
      {
        displayType:
          'http://lblod.data.gift/display-types/climateSubsidyCostTable',
        show: ClimateSubsidyCostsTableComponent,
      },
      {
        displayType:
          'http://lblod.data.gift/display-types/eInclusionMaxValidator',
        show: EInclusionMaxValidatorComponent,
      },
      {
        displayType: 'http://lblod.data.gift/display-types/engagementTable',
        show: EngagementTableShowComponent,
      },
      {
        displayType: 'http://lblod.data.gift/display-types/estimatedCostTable',
        show: EstimatedCostShowComponent,
      },
      {
        displayType: 'http://lblod.data.gift/display-types/objectiveTable',
        show: ObjectiveTableShowComponent,
      },
      {
        displayType:
          'http://lblod.data.gift/display-types/planLivingTogetherTable',
        show: PlanLivingTogetherTableShowComponent,
      },
      {
        displayType: 'http://lblod.data.gift/display-types/accountabilityTable',
        show: AccountabilityTableShowComponent,
      },
      {
        displayType:
          'http://lblod.data.gift/display-types/urbanRenewalFinancingTotals',
        show: FinancingTotalsComponent,
      },
    ]);
  }
}
