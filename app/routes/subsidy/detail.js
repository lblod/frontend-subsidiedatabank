import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { registerFormFields } from '@lblod/ember-submission-form-fields';
import ApplicationFormTableEditComponent from 'frontend-subsidiedatabank/components/rdf-form-fields/application-form-table/edit';
import ApplicationFormTableShowComponent from 'frontend-subsidiedatabank/components/rdf-form-fields/application-form-table/show';
import ClimateSubsidyCostsTableComponent from 'frontend-subsidiedatabank/components/rdf-form-fields/climate-subsidy-costs-table';
import EInclusionMaxValidatorComponent from 'frontend-subsidiedatabank/components/rdf-form-fields/e-inclusion-max-validator';
import EngagementTableEditComponent from 'frontend-subsidiedatabank/components/rdf-form-fields/engagement-table/edit';
import EngagementTableShowComponent from 'frontend-subsidiedatabank/components/rdf-form-fields/engagement-table/show';
import EstimatedCostEditComponent from 'frontend-subsidiedatabank/components/rdf-form-fields/estimated-cost-table/edit';
import EstimatedCostShowComponent from 'frontend-subsidiedatabank/components/rdf-form-fields/estimated-cost-table/show';
import ObjectiveTableEditComponent from 'frontend-subsidiedatabank/components/rdf-form-fields/objective-table/edit';
import ObjectiveTableShowComponent from 'frontend-subsidiedatabank/components/rdf-form-fields/objective-table/show';
import PlanLivingTogetherTableEditComponent from 'frontend-subsidiedatabank/components/rdf-form-fields/plan-living-together-table/edit';
import PlanLivingTogetherTableShowComponent from 'frontend-subsidiedatabank/components/rdf-form-fields/plan-living-together-table/show';
import AccountabilityTableEditComponent from 'frontend-subsidiedatabank/components/rdf-form-fields/accountability-table/edit';
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
      }
    );

    return {
      consumption,
      organization:
        consumption.participations.firstObject.participatingOrganization,
    };
  }

  registerTableFields() {
    registerFormFields([
      {
        displayType:
          'http://lblod.data.gift/display-types/applicationFormTable',
        edit: ApplicationFormTableEditComponent,
        show: ApplicationFormTableShowComponent,
      },
      {
        displayType:
          'http://lblod.data.gift/display-types/climateSubsidyCostTable',
        edit: ClimateSubsidyCostsTableComponent,
      },
      {
        displayType:
          'http://lblod.data.gift/display-types/eInclusionMaxValidator',
        edit: EInclusionMaxValidatorComponent,
      },
      {
        displayType: 'http://lblod.data.gift/display-types/engagementTable',
        edit: EngagementTableEditComponent,
        show: EngagementTableShowComponent,
      },
      {
        displayType: 'http://lblod.data.gift/display-types/estimatedCostTable',
        edit: EstimatedCostEditComponent,
        show: EstimatedCostShowComponent,
      },
      {
        displayType: 'http://lblod.data.gift/display-types/objectiveTable',
        edit: ObjectiveTableEditComponent,
        show: ObjectiveTableShowComponent,
      },
      {
        displayType:
          'http://lblod.data.gift/display-types/planLivingTogetherTable',
        edit: PlanLivingTogetherTableEditComponent,
        show: PlanLivingTogetherTableShowComponent,
      },
      {
        displayType: 'http://lblod.data.gift/display-types/accountabilityTable',
        edit: AccountabilityTableEditComponent,
        show: AccountabilityTableShowComponent,
      },
      {
        displayType:
          'http://lblod.data.gift/display-types/urbanRenewalFinancingTotals',
        edit: FinancingTotalsComponent,
      },
    ]);
  }
}
