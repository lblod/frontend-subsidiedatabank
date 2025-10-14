import { belongsTo, hasMany } from '@ember-data/model';
import OrganizationModel from './organization';

export default class Bestuurseenheid extends OrganizationModel {
  @hasMany('participation', {
    async: true,
    polymorphic: true,
    inverse: 'participatingOrganization',
    as: 'organization',
  })
  participations;

  @belongsTo('bestuurseenheid-classificatie-code', {
    async: true,
    inverse: null,
  })
  classificatie;
}
