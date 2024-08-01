import Model, { attr, hasMany } from '@ember-data/model';

export default class Werkingsgebied extends Model {
  @attr uri;
  @attr naam;
  @attr niveau;

  @hasMany('organization', { async: true, inverse: null }) organization;
  @hasMany('organization', { async: true, inverse: null })
  organisatiesInProvincie;

  get longName() {
    let niveau = this.niveau;
    let naam = this.naam;
    return `${naam} (${niveau})`;
  }
}
