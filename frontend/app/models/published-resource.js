import Model, { attr } from '@ember-data/model';

export default class PublishedResourceModel extends Model {
  @attr body;
  @attr createdOn;
}
