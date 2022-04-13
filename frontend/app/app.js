import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'frontend/config/environment';
import Inflector from 'ember-inflector';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}
const inflector = Inflector.inflector;
inflector.irregular('zitting', 'zittingen');
inflector.irregular('bestuursorgaan', 'bestuursorganen');



loadInitializers(App, config.modulePrefix);
