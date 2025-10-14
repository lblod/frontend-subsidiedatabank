import EmbroiderRouter from '@embroider/router';
import config from 'frontend-subsidiedatabank/config/environment';

export default class Router extends EmbroiderRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('mock-login');
  this.route('login');
  this.route('subsidy', function () {
    this.route('applications');
    this.route('detail', { path: '/:id' }, function () {
      this.route('step', { path: '/steps/:step_id' }, function () {
        this.route('new');
        this.route('detail', { path: '/forms/:form_id' });
        this.route('skipped');
      });
    });
  });

  this.route('legaal', function () {
    this.route('cookieverklaring');
    this.route('disclaimer');
    this.route('toegankelijkheidsverklaring');
  });

  this.route('auth', { path: '/authorization' }, function () {
    this.route('login');
    this.route('callback');
    this.route('logout');
  });
});
