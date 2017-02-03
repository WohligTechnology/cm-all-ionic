// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleBlackTranslucent();
      }
      var notificationOpenedCallback = function (jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      };

      // window.plugins.OneSignal
      //   .startInit("193cfb85-cbea-4101-b86f-2b1de2109086")
      //   .handleNotificationOpened(notificationOpenedCallback)
      //   .endInit();
    });
  })

  .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider

      .state('loading', {
        url: '/loading',
        templateUrl: 'templates/loading.html',
        controller: 'LoadingCtrl'
      })


      .state('landing', {
        url: '/landing',
        templateUrl: 'templates/landing.html',
        controller: 'LandingCtrl'
      })

  // Athlete State Start

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'appCtrl'
      })

      .state('app.athleteprofile', {
        url: '/athlete/profile',
        views: {
          'menuContentAthlete': {
            templateUrl: 'templates/athlete/profile.html',
            controller: 'AthleteProfileCtrl'
          }
        }
      })
      .state('app.marketplacearticles', {
        url: '/marketplace/articles',
        views: {
          'menuContentAthlete': {
            templateUrl: 'templates/marketplace/articles.html',
            controller: 'AthleteArticlesCtrl'
          }
        }
      })
      .state('app.marketplaceservice', {
        url: '/marketplace/service',
        views: {
          'menuContentAthlete': {
            templateUrl: 'templates/marketplace/service.html',
            controller: 'AthleteServiceCtrl'
          }
        }
      })
      .state('app.marketplaceevent', {
        url: '/marketplace/event',
        views: {
          'menuContentAthlete': {
            templateUrl: 'templates/marketplace/event.html',
            controller: 'AthleteEventsCtrl'
          }
        }
      })
      .state('app.marketplacearticle-detail', {
        url: '/marketplace/article-detail',
        views: {
          'menuContentAthlete': {
            templateUrl: 'templates/marketplace/article-detail.html',
            controller: 'AthleteArticleDetailCtrl'
          }
        }
      })
      .state('app.marketplaceservice-detail', {
        url: '/marketplace/service-detail',
        views: {
          'menuContentAthlete': {
            templateUrl: 'templates/marketplace/service-detail.html',
            controller: 'AthleteServiceDetailCtrl'
          }
        }
      })
      .state('app.marketplaceevent-detail', {
        url: '/marketplace/event-detail',
        views: {
          'menuContentAthlete': {
            templateUrl: 'templates/marketplace/event-detail.html',
            controller: 'AthleteEventDetailCtrl'
          }
        }
      })

      .state('app.personal-goals', {
        url: '/athlete/personal-goals',
        views: {
          'menuContentAthlete': {
            templateUrl: 'templates/athlete/personal-goals.html',
            controller: 'AthletePersonalGoalsCtrl'
          }
        }
      })

      .state('athletelogin', {
        url: '/athlete/login',
        cache: false,
        templateUrl: 'templates/athlete/login.html',
        controller: 'AthleteLoginCtrl'
      })

      .state('athleteregistration', {
        url: '/athlete/registration',
        templateUrl: 'templates/athlete/registration.html',
        controller: 'AthleteRegistrationCtrl'
      })

      .state('app.athlete-edit-profile', {
        url: '/athlete/edit-profile',
        views: {
          'menuContentAthlete': {
            templateUrl: 'templates/athlete/profile-edit.html',
            controller: 'AthleteEditProfileCtrl'
          }
        }
      })

      .state('app.blog', {
        url: '/athlete/blog',
        cache: false,
        views: {
          'menuContentAthlete': {
            templateUrl: 'templates/athlete/blog.html',
            controller: 'AthleteBlogCtrl'
          }
        }
      })

      .state('app.blog-detail', {
        url: '/athlete/blog/:id',
        views: {
          'menuContentAthlete': {
            templateUrl: 'templates/athlete/blog-detail.html',
            controller: 'AthleteBlogDetailCtrl'
          }
        }
      })

      .state('app.chat', {
        url: '/athlete/chat',
        views: {
          'menuContentAthlete': {
            templateUrl: 'templates/athlete/chat.html',
            controller: 'AthleteChatCtrl'
          }
        }
      })

      .state('app.chatdetail', {
        url: '/athlete/chat/detail',
        views: {
          'menuContentAthlete': {
            templateUrl: 'templates/athlete/chat-detail.html',
            controller: 'AthleteChatDetailCtrl'
          }
        }
      })

      .state('app.chat-group', {
        url: '/athlete/chat-group',
        views: {
          'menuContentAthlete': {
            templateUrl: 'templates/athlete/chat-group.html',
            controller: 'AthleteChatGroupCtrl'
          }
        }
      })

      .state('app.coach', {
        url: '/athlete/coach',
        views: {
          'menuContentAthlete': {
            templateUrl: 'templates/athlete/coach.html',
            controller: 'AthleteCoachCtrl'
          }
        }
      })

      .state('app.coach-detail', {
        url: '/athlete/coach/detail',
        views: {
          'menuContentAthlete': {
            templateUrl: 'templates/athlete/coach-detail.html',
            controller: 'AthleteCoachDetailCtrl'
          }
        }
      })

      .state('app.analytics', {
        url: '/athlete/analytics',
        views: {
          'menuContentAthlete': {
            templateUrl: 'templates/athlete/analytics.html',
            controller: 'AthleteAnalyticsCtrl'
          }
        }
      })

      .state('app.injuries', {
        url: '/athlete/injuries',
        cache: false,
        views: {
          'menuContentAthlete': {
            templateUrl: 'templates/athlete/injuries.html',
            controller: 'AthleteInjuryCtrl'
          }
        }
      })


      .state('app.injuries-create', {
        url: '/athlete/injuries-create',
        views: {
          'menuContentAthlete': {
            templateUrl: 'templates/athlete/injuries-create.html',
            controller: 'AthleteInjuryCreateCtrl'
          }
        }
      })

      .state('app.injuries-detail', {
        url: '/athlete/injuries/:id',
        views: {
          'menuContentAthlete': {
            templateUrl: 'templates/athlete/injuries-create.html',
            controller: 'AthleteInjuryDetailCtrl'
          }
        }
      })


      .state('app.search-coaches', {
        url: '/athlete/search-coaches',
        views: {
          'menuContentAthlete': {
            templateUrl: 'templates/athlete/search-coaches.html',
            controller: 'AthleteSearchCoachesCtrl'
          }
        }
      })

      .state('app.search-coaches-detail', {
        url: '/athlete/search-coaches/:id',
        views: {
          'menuContentAthlete': {
            templateUrl: 'templates/athlete/search-coaches-detail.html',
            controller: 'AthleteSearchCoachesDetailCtrl'
          }
        }
      })

      .state('app.notifications', {
        url: '/athlete/notifications',
        views: {
          'menuContentAthlete': {
            templateUrl: 'templates/athlete/notifications.html',
            controller: 'AthleteNotificationsCtrl'
          }
        }
      })

      .state('app.training-diary', {
        url: '/training-diary',
        views: {
          'menuContentAthlete': {
            templateUrl: 'templates/athlete/training-diary.html',
            controller: 'AthleteTrainingDiaryCtrl'
          }
        }
      })
       // Athlete State end



      //  Coach State Start
  // .state('app', {
  //       url: '/app',
  //       abstract: true,
  //       templateUrl: 'templates/coach/menu.html',
  //       controller: 'appCtrl'
  //     })

      .state('app.coachprofile', {
        url: '/coach/profile',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/coach/profile.html',
            controller: 'CoachProfileCtrl'
          }
        }
      })

      .state('coachlogin', {
        url: '/coach/login',
        cache: false,
        templateUrl: 'templates/coach/login.html',
        controller: 'CoachLoginCtrl'
      })

      .state('coachregistration', {
        url: '/coach/registration',
        templateUrl: 'templates/coach/registration.html',
        controller: 'CoachRegistrationCtrl'
      })

      .state('app.coach-edit-profile', {
        url: '/coach/edit-profile',
        views: {
          'menuContent': {
            templateUrl: 'templates/coach/profile-edit.html',
            controller: 'CoachEditProfileCtrl'
          }
        }
      })

      .state('app.coachblog', {
        cache: false,
        url: '/coach/blog',
        views: {
          'menuContent': {
            templateUrl: 'templates/coach/blog.html',
            controller: 'CoachBlogCtrl'
          }
        }
      })

      .state('app.coachblog-detail', {
        url: '/coach/blog/:id',
        views: {
          'menuContent': {
            templateUrl: 'templates/coach/blog-detail.html',
            controller: 'CoachBlogDetailCtrl'
          }
        }
      })

      .state('app.coachchat', {
        url: '/coach/chat',
        views: {
          'menuContent': {
            templateUrl: 'templates/coach/chat.html',
            controller: 'CoachChatCtrl'
          }
        }
      })

      .state('app.coachnotifications', {
        url: '/coach/notifications',
        views: {
          'menuContent': {
            templateUrl: 'templates/coach/notifications.html',
            controller: 'CoachNotificationsCtrl'
          }
        }
      })

      .state('app.coachchatdetail', {
        url: '/coach/chat-detail',
        views: {
          'menuContent': {
            templateUrl: 'templates/coach/chat-detail.html',
            controller: 'CoachChatDetailCtrl'
          }
        }
      })

      .state('app.coachchat-group', {
        url: '/coach/chat-group',
        views: {
          'menuContent': {
            templateUrl: 'templates/coach/chat-group.html',
            controller: 'CoachChatGroupCtrl'
          }
        }
      })

      .state('app.coaches', {
        url: '/coachcoaches',
        views: {
          'menuContent': {
            templateUrl: 'templates/coach/coaches.html',
            controller: 'CoachCoachesCtrl'
          }
        }
      })

      .state('app.competition', {
        cache: false,
        url: '/coach/competition',
        views: {
          'menuContent': {
            templateUrl: 'templates/coach/competition.html',
            controller: 'CoachCompetitionCtrl'
          }
        }
      })

      .state('app.coachanalytics', {
        url: '/coach/analytics',
        views: {
          'menuContent': {
            templateUrl: 'templates/coach/analytics.html',
            controller: 'CoachAnalyticsCtrl'
          }
        }
      })

      .state('app.competition-create', {
        url: '/coach/competition-create',
        views: {
          'menuContent': {
            templateUrl: 'templates/coach/competition-create.html',
            controller: 'CoachCompetitionCreateCtrl'
          }
        }
      })

      .state('app.competition-detail', {
        url: '/coach/competition/:id',
        views: {
          'menuContent': {
            templateUrl: 'templates/coach/competition-create.html',
            controller: 'CoachCompetitionDetailCtrl'
          }
        }
      })

      .state('app.testing', {
        cache: false,
        url: '/coach/testing',
        views: {
          'menuContent': {
            templateUrl: 'templates/coach/testing.html',
            controller: 'CoachTestingCtrl'
          }
        }
      })


      .state('app.testing-create', {
        url: '/coach/testing-create',
        views: {
          'menuContent': {
            templateUrl: 'templates/coach/testing-create.html',
            controller: 'CoachTestingCreateCtrl'
          }
        }
      })

      .state('app.testing-detail', {
        url: '/coachtesting/:id',
        views: {
          'menuContent': {
            templateUrl: 'templates/coach/testing-create.html',
            controller: 'CoachTestingDetailCtrl'
          }
        }
      })


      .state('app.athletes-coaching', {
        url: '/coachathletes-coaching/:page/:keyword',
        views: {
          'menuContent': {
            templateUrl: 'templates/coach/athletes-coaching.html',
            controller: 'CoachAthletesCoachingCtrl'
          }
        }
      })

      .state('app.athletes-coaching-detail', {
        url: '/coachathletes-coaching-detail/:athleteId',
        views: {
          'menuContent': {
            templateUrl: 'templates/coach/athletes-coaching-detail.html',
            controller: 'CoachAthletesCoachingDetailCtrl'
          }
        }
      })

      .state('app.athlete-detail', {
        url: '/coachathlete-detail/:athleteId',
        views: {
          'menuContent': {
            templateUrl: 'templates/coach/athlete-detail.html',
            controller: 'CoachAthleteDetailCtrl'
          }
        }
      })

      .state('app.athletes-request', {
        url: '/coach/athletes-request',
        views: {
          'menuContent': {
            templateUrl: 'templates/coach/athletes-request.html',
            controller: 'CoachAthletesRequestCtrl'
          }
        }
      })

      .state('app.coachtraining-diary', {
        url: '/coach/training-diary',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/coach/training-diary.html',
            controller: 'CoachTrainingDiaryCtrl'
          }
        }
      })
      //Coach State End



      //Marketplace State Start
      .state('marketplaceapp', {
        url: '/marketplaceapp',
        abstract: true,
        templateUrl: 'templates/coach/menu.html',
        controller: 'appCtrl'
      })
      //Marketplace State End
      
      
      ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/loading');
  })

  .filter('ageConvert', function () {
    function calculateAge(birthday) { // birthday is a date
      birthday = new Date(birthday);
      var ageDifMs = Date.now() - birthday.getTime();
      var ageDate = new Date(ageDifMs); // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    function monthDiff(d1, d2) {
      if (d1 < d2) {
        var months = d2.getMonth() - d1.getMonth();
        return months <= 0 ? 0 : months;
      }
      return 0;
    }
    return function (birthdate) {
      var age = calculateAge(birthdate);
      if (age === 0)
        return monthDiff(birthdate, new Date()) + ' months';
      return age + ' years';
    };
  })

  .filter('truncate', function () {
    return function (text, length, end) {
      if (isNaN(length)) {
        length = 10;
      }

      if (end === undefined) {
        end = '...';
      }

      if (text) {
        if (text.length <= length || text.length - end.length <= length) {
          return text;
        } else {
          return String(text).substring(0, length - end.length) + end;
        }
      }
    };
  })

  .directive('readMore', function ($filter, $ionicScrollDelegate, $timeout) {
    return {
      restrict: 'A',
      scope: {
        text: '=readMore',
        limit: '@readMoreLimit'
      },
      transclude: true,
      template: '<span ng-bind-html="outText"></span><a class="read-more" ng-click="toggleReadMore()" ng-if="applyLimit" ng-bind="label"></a>',
      link: function (scope /*, element, attrs */ ) {
        var originalText = scope.text;
        var truncateText = $filter('truncate')(originalText, scope.limit, '...');
        scope.applyLimit = false;
        scope.expanded = false;
        scope.labelExpand = 'Read More';
        scope.labelCollapse = 'Read Less';
        scope.label = scope.labelExpand;

        //Limit Check
        if (scope.text) {
          if (scope.text.length >= scope.limit) {
            scope.applyLimit = true;
            scope.outText = truncateText;
          } else {
            scope.outText = originalText;
          }
        }

        //Read More Toggle
        scope.toggleReadMore = function () {
          scope.expanded = !scope.expanded;
          if (scope.expanded) {
            scope.outText = originalText;
            scope.label = scope.labelCollapse;
            $ionicScrollDelegate.resize();
          } else {
            scope.outText = truncateText;
            scope.label = scope.labelExpand;
            $ionicScrollDelegate.resize();
          }
        };

      }
    };
  })

  .directive('autoGrow', function ($window) {
    return {
      restrict: 'A',
      link: function ($scope, $element, $attrs) {
        $scope.attrs = {
          rows: 1,
          maxLines: 999
        };
        for (var i in $scope.attrs) {
          if ($attrs[i]) {
            $scope.attrs[i] = parseInt($attrs[i]);
          }
        }
        $scope.getOffset = function () {
          var style = $window.getComputedStyle($element[0], null),
            props = ['paddingTop', 'paddingBottom'],
            offset = 0;

          for (var i = 0; i < props.length; i++) {
            offset += parseInt(style[props[i]]);
          }
          return offset;
        };
        $scope.autogrowFn = function () {
          var newHeight = 0,
            hasGrown = false;
          if (($element[0].scrollHeight - $scope.offset) > $scope.maxAllowedHeight) {
            $element[0].style.overflowY = 'scroll';
            newHeight = $scope.maxAllowedHeight;
          } else {
            $element[0].style.overflowY = 'hidden';
            $element[0].style.height = 'auto';
            newHeight = $element[0].scrollHeight - $scope.offset;
            hasGrown = true;
          }
          $element[0].style.height = newHeight + 'px';
          return hasGrown;
        };

        $scope.offset = $scope.getOffset();
        $scope.lineHeight = ($element[0].scrollHeight / $scope.attrs.rows) - ($scope.offset / $scope.attrs.rows);
        $scope.maxAllowedHeight = ($scope.lineHeight * $scope.attrs.maxLines) - $scope.offset;

        $element[0].addEventListener('input', $scope.autogrowFn);
        if ($element[0].value !== '') {
          $scope.autogrowFn();
        }
      }

    };
  })

  .directive('noPaste', function ($filter, $ionicScrollDelegate) {
    return {
      scope: {},
      link: function (scope, element) {
        element.on('cut copy paste', function (event) {
          event.preventDefault();
        });
      }
    };
  })

  .filter('uploadpath', function () {
    return function (input, width, height, style) {
      var other = "";
      if (width && width !== "") {
        other += "&width=" + width;
      }
      if (height && height !== "") {
        other += "&height=" + height;
      }
      if (style && style !== "") {
        other += "&style=" + style;
      }
      if (input) {
        if (input.indexOf('https://') == -1) {
          return imgpath + "?file=" + input + other;
        } else {
          return input;
        }
      }
    };
  })

  .filter('localurl', function () {
    return function (url) {
      return 'img/coach/' + url + '.jpg';
    };
  })

;
