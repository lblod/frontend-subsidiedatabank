import Model, { attr, hasMany } from '@ember-data/model';

export default class Gebruiker extends Model {
  @attr uri;
  @attr voornaam;
  @attr achternaam;

  @hasMany('account', { async: true, inverse: null }) account;
  @hasMany('organization', {
    async: false,
    inverse: null,
    polymorphic: true,
  })
  organizations;

  get group() {
    return this.organizations.at(0);
  }

  get fullName() {
    return `${this.voornaam} ${this.achternaam}`.trim();
  }
}
