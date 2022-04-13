import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service store;

  async model() {
    return this.store.query('zitting', {
      'page[number]': 0,
      'page[size]': 10,
      sort: '-geplande-start'
    });
  }
}
