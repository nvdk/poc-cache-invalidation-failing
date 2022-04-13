import Controller from '@ember/controller';
import {inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
export default class IndexController extends Controller {
  @service store;
  @service router;
  @tracked refresh;

  @action
  async createMeeting() {
    const meeting = this.store.createRecord('zitting', { geplandeStart: (new Date()).toISOString()});
    await meeting.save();
    document.location.reload();
//    this.router.refresh();
  }

  @action
  async deleteMeeting(meeting) {
    const id = meeting.id;
    await meeting.destroyRecord();
    this.refreshRoute();
  }

  refreshRoute(countdown = 3) {
    if (countdown == 0) {
      document.location.reload();
    }
    else {
      this.refresh = countdown;
      setTimeout(() => this.refreshRoute(countdown-1), 1000);
    }
  }
}
