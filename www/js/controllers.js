// angular.module('starter.controllers', ['starter.services', 'checklist-model', 'chart.js', 'ui.calendar', 'ngCordova'])
angular.module('starter.controllers', ['starter.services', 'checklist-model', 'ui.calendar', 'ngCordova'])

  .controller('appCtrl', function ($scope, $ionicModal, $window, $timeout, $state, $rootScope, MyServices) {
    $scope.profileData = MyServices.getUser();
    $scope.accessType = MyServices.getAccessType();
    console.log($scope.accessType);

    //Athlete Login Modal
    $ionicModal.fromTemplateUrl('templates/athlete-modal/login.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal1 = modal;
    });
    $scope.openModalAthleteLogin = function () {
      $scope.modal1.show();
    };

    $scope.closeModalAthleteLogin = function () {
      $scope.modal1.hide();
    };
    //Athlete Login Modal end
    //Coach Login Modal
    $ionicModal.fromTemplateUrl('templates/coach-modal/login.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal3 = modal;
    });
    $scope.openModalCoachLogin = function () {
      $scope.modal3.show();
    };

    $scope.closeModalCoachLogin = function () {
      $scope.modal3.hide();
    };
    //Coach Login Modal end
    // Log out
    $scope.logout = function () {
      $.jStorage.flush();
      $state.go('landing');
    };

  })

  .controller('LandingCtrl', function ($scope, $ionicModal, $timeout, $state, $rootScope, MyServices, $ionicHistory, $ionicSlideBoxDelegate) {
    //Athlete Login Modal
    $ionicModal.fromTemplateUrl('templates/athlete-modal/login.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal1 = modal;
    });
    $scope.openModalAthleteLogin = function () {
      $scope.modal1.show();
    };

    $scope.closeModalAthleteLogin = function () {
      $scope.modal1.hide();
    };
    //Athlete Sign Modal
    $ionicModal.fromTemplateUrl('templates/athlete-modal/registration.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal2 = modal;
    });
    $scope.openModalAthleteSignin = function () {
      $scope.modal2.show();
    };

    $scope.closeModalAthleteSignin = function () {
      $scope.modal2.hide();
    };
    // Called each time the slide changes
    $scope.slideChanged = function (index) {
      $scope.slideIndex = index;
    };
    //Coach Login Modal
    $ionicModal.fromTemplateUrl('templates/coach-modal/login.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal3 = modal;
    });
    $scope.openModalCoachLogin = function () {
      $scope.modal3.show();
    };

    $scope.closeModalCoachLogin = function () {
      $scope.modal3.hide();
    };
    //Coach Sign Modal
    $ionicModal.fromTemplateUrl('templates/coach-modal/registration.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal4 = modal;
    });
    $scope.openModalCoachSignin = function () {
      $scope.modal4.show();
    };

    $scope.closeModalCoachSignin = function () {
      $scope.modal4.hide();
    };
    $scope.numbermade = [{
        id: '1',
        name: 'Athlete'
      }, {
        id: '2',
        name: 'Coach'
      }, {
        id: '3',
        name: 'Marketplace'
      }

    ];
    $scope.slideIndex = 0;
    $scope.pagerClicks = function (index) {
      $scope.slideIndex = index;
      $ionicSlideBoxDelegate.slide($scope.slideIndex);
      console.log($scope.slideIndex);
    };
  })

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
