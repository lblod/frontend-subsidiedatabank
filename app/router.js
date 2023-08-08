import EmberRouter from '@ember/routing/router';
import config from 'frontend-subsidiedatabank/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('mock-login');
  this.route('login');
  this.route('loading');
  this.route('subsidy', function () {
    this.route('applications', function () {});
  });

  this.route('legaal', function () {
    this.route('cookieverklaring');
    this.route('disclaimer');
    this.route('toegankelijkheidsverklaring');
  });
});
