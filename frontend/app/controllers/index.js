import Controller from '@ember/controller';
import {inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { v4 as uuid } from 'uuid';

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
  async createPublication() {
    const meetingUUID = uuid();
    const agendapointUUID = uuid();
    const template = `
<div class="au-c-template au-c-template--agenda agendapunten" prefix="eli: http://data.europa.eu/eli/ontology# prov: http://www.w3.org/ns/prov# mandaat: http://data.vlaanderen.be/ns/mandaat# besluit: http://data.vlaanderen.be/ns/besluit# ext: http://mu.semte.ch/vocabularies/ext/ person: http://www.w3.org/ns/person# persoon: http://data.vlaanderen.be/ns/persoon# dateplugin: http://say.data.gift/manipulators/insertion/ besluittype: https://data.vlaanderen.be/id/concept/BesluitType/ dct: http://purl.org/dc/terms/ mobiliteit: https://data.vlaanderen.be/ns/mobiliteit# lblodmow: http://data.lblod.info/vocabularies/mobiliteit/">
  <div about="http://data.lblod.info/id/zittingen/${meetingUUID}" typeof="besluit:Zitting">
    <h1>Agenda voor <span property="http://data.vlaanderen.be/ns/besluit#isGehoudenDoor" resource="http://data.lblod.info/id/bestuursorganen/a600fe2543971bf1e2a5bb387e2fd5a1744a1a096c080a9fbe0563d0c3fce61b" typeof="besluit:Bestuursorgaan">Bijzonder Comité voor de Sociale Dienst Aalst</span>, zitting
      gepland op <span property="http://data.vlaanderen.be/ns/besluit#geplandeStart" content="2022-04-01T17:38:41.840Z" datatype="http://www.w3.org/2001/XMLSchema#dateTime">01/04/2022 19:38</span></h1>
    <ul class="au-c-template-list">
      <li class="au-c-template-list__item" property="besluit:behandelt" resource="http://data.lblod.info/id/agendapunten/${agendapointUUID}" typeof="besluit:Agendapunt">
        Agendapunt -
        <span property="besluit:geplandOpenbaar" datatype="xsd:boolean" content="true">
          <span class="au-c-template-public">Gepland openbaar</span>
        </span>
        <h2>
          1. <span property="dc:title">let's try something</span>
            <span property="besluit:Agendapunt.type" resource="http://lblod.data.gift/concepts/bdf68a65-ce15-42c8-ae1b-19eeb39e20d0" typeof="skos:Concept">gepland</span>
        </h2>
      </li>
    </ul>
  </div>
</div>
`;
    const publishedresource = this.store.createRecord('published-resource', { body: template, createdOn: (new Date()).toISOString()});
    await publishedresource.save();
    this.refreshRoute(6);
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
