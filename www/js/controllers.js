// angular.module('starter.controllers', ['starter.services', 'checklist-model', 'chart.js', 'ui.calendar', 'ngCordova'])
angular.module('starter.controllers', ['starter.services', 'checklist-model', 'ui.calendar', 'ngCordova'])

  .controller('LoadingCtrl', function ($scope, $ionicModal, $timeout, $state, $rootScope, MyServices, $ionicHistory) {
    $scope.loadingData = MyServices.getUser();
    $scope.accessType = MyServices.getAccessType();
    if ($scope.loadingData) {
      if ($scope.accessType == 'Athlete') {
        $state.go('app.athlete-profile');
      } else if ($scope.accessType == 'Coach') {
        $state.go('app.coach-profile');
      }
    } else {
      $state.go('landing');
    }
  })

;
