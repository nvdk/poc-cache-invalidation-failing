import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class ZittingModel extends Model {
  @attr opLocatie;
  @attr geplandeStart;
  @belongsTo('bestuursorgaan', { inverse: null }) bestuursorgaan;
}
