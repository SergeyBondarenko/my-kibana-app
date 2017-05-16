import moment from 'moment';
import chrome from 'ui/chrome';
import uiModules from 'ui/modules';
import uiRoutes from 'ui/routes';

import 'ui/autoload/styles';
import './less/main.less';
import template from './templates/index.html';

uiRoutes.enable();
uiRoutes
.when('/', {
  template,
  resolve: {
    currentTime($http) {
      return $http.get('../api/sentinl/example').then(function (resp) {
        return resp.data.time;
      });
    }
  }
});

uiModules
.get('app/sentinl', [])
.controller('sentinlHelloWorld', function ($scope, $route, $interval) {
  $scope.title = 'Sentinl';
  $scope.description = 'Kibana Alert App for Elasticsearch';

  const currentTime = moment($route.current.locals.currentTime);
  $scope.currentTime = currentTime.format('HH:mm:ss');
  const unsubscribe = $interval(function () {
    $scope.currentTime = currentTime.add(1, 'second').format('HH:mm:ss');
  }, 1000);
  $scope.$watch('$destroy', unsubscribe);
});
