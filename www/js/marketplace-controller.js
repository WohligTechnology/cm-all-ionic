angular.module('marketplaceController', ['starter.services', 'checklist-model', 'ui.calendar', 'ngCordova'])
  //Start of Marketplace controller
  .controller('MarketplaceServiceCtrl', function ($scope, $ionicModal, $timeout, $ionicPopup) {
    // $scope.template = TemplateService.changecontent("marketplace/service-provider-list");
    //     TemplateService.title = "Service Providers";
    //     $scope.navigation = NavigationService.getNavMarketplace();
    //     $scope.template.header = ' views/header-web.html';
    //     $scope.activeTab = 1;
    //     $scope.toggleTab = function(val) {
    //         $scope.activeTab = val;
    //     };
    $scope.categories = ['Sports therapist', 'Physiotherapist', 'Nutritionist', 'Personal Trainers', 'Specialist Doctors', 'Other'];

    $scope.searchpop = function () {
      $scope.searchopen = $ionicPopup.show({
        templateUrl: 'templates/athlete-modal/search.html',
        scope: $scope,
        cssClass: 'searchpop'
      });
      $scope.searchshow = !$scope.searchshow;
    }
    $scope.searchPopup = function () {
      $scope.searchopen.close();
    }

    $scope.searchshow = false;
    $scope.search = function () {
      $scope.searchshow = !$scope.searchshow;
    };
    $scope.categories = ['Sports therapist', 'Physiotherapist', 'Nutritionist', 'Personal Trainers', 'Specialist Doctors', 'Other'];

    $scope.serviceListBanner = {
      bannerImg: ' img/marketplace/service-list.png',
    };
    // $scope.serviceList = function() {
    //     modal = $uibModal.open({
    //         animation: true,
    //         templateUrl: " views/modal/service-popup.html",
    //         windowClass: "modal-service",
    //         scope: $scope
    //     });
    // };
    $scope.servicePopup = {
      "image": " img/marketplace/pic2.png",
      "name": "alexi",
      "surname": "gambetta",
      "type": 'orthopedic doctor',
      "country": 'London',
      "website": 'www.coachmentor.com',
      "city": 'big ben city',
      "mailId": 'alexigambetta@gmail.com',
      "description": "<p>When dressing for the cold, it is important to dress in layers and to remember that you will still feel cold when you first go outside. Once you start running, your body will perceive the outdoor temperature at about 20 degrees warmer than it actually is! This means that if you are warm when you first go outside you are likely overdressed and could end up overheating.</p><p>When it comes to layering clothes, keep in mind that your first layer should always be a wicking layer. This fabric will help to keep sweat off your body, while maintaining your core temperature without overheating. On top of this layer you can wear another top, as well as a windbreaker to give you extra protection against the harsh winter winds.</p>"

    };
    $scope.eventsGalleryDetaiLlist = [{
      "img": " img/marketplace/event2.png",
      "url": "https://www.youtube.com/embed/VQ-6nYDqAZc?autoplay=1",
      "classCircle": "play-circle",
      "urlPlay": " img/marketplace/play.png"
    }, {
      "img": " img/marketplace/event6.png",
      "url": " img/marketplace/event6.png",
      "classCircle": "dis-non",
      "urlPlay": ""
    }, {
      "img": " img/marketplace/event4.png",
      "url": " img/marketplace/event4.png",
      "classCircle": "dis-non",
      "urlPlay": ""
    }, {
      "img": " img/marketplace/event12.png",
      "url": "https://www.youtube.com/embed/VQ-6nYDqAZc?autoplay=1",
      "classCircle": "play-circle",
      "urlPlay": " img/marketplace/play.png"
    }, {
      "img": " img/marketplace/event11.png",
      "url": "https://www.youtube.com/embed/VQ-6nYDqAZc?autoplay=1",
      "classCircle": "play-circle",
      "urlPlay": " img/marketplace/play.png"
    }, {
      "img": " img/marketplace/event5.png",
      "url": " img/marketplace/event5.png",
      "classCircle": "dis-non",
      "urlPlay": ""
    }, {
      "img": " img/marketplace/event4.png",
      "url": " img/marketplace/event4.png",
      "classCircle": "dis-non",
      "urlPlay": ""
    }, {
      "img": " img/marketplace/event10.png",
      "url": "https://www.youtube.com/embed/VQ-6nYDqAZc?autoplay=1",
      "classCircle": "play-circle",
      "urlPlay": " img/marketplace/play.png"
    }, {
      "img": " img/marketplace/event7.png",
      "url": " img/marketplace/event7.png",
      "classCircle": "dis-non",
      "urlPlay": ""
    }];
    $scope.servicelist = [{
      "image": "img/marketplace/pic1.png",
      "name": "Alexi",
      "surname": "Gambetta",
      "type": 'Orthopedic Doctor',
      "country": 'London',
      "city": 'big ben city',
      "mailId": 'johnkenly@gmail.com',
      "contactNumber": "9898989898",
      "description": "Proin theul tempus placerat magna, non maximus ame dolor feugiat non.",
      "statusnearby": "nearby"

    }, {
      "image": "img/marketplace/pic2.png",
      "name": "John",
      "surname": "Gambetta",
      "type": 'Orthopedic Doctor',
      "country": 'London',
      "city": 'big ben city',
      "statuspopular": "ispopular",
      "mailId": 'johnkenly@gmail.com',
      "contactNumber": "9898989898",
      "description": " Proin theul tempus placerat magna, non maximus ame dolor feugiat non."

    }, {
      "image": "img/marketplace/pic3.png",
      "name": "Carter",
      "surname": "Gambetta",
      "type": 'Orthopedic Doctor',
      "country": 'London',
      "city": 'big ben city',
      "statuspopular": "ispopular",
      "statusnearby": "nearby",
      "mailId": 'johnkenly@gmail.com',
      "contactNumber": "9898989898",
      "description": "Proin theul tempus placerat magna, non maximus ame dolor feugiat non."

    }, {
      "image": "img/marketplace/pic4.png",
      "name": "Liya",
      "surname": "Gambetta",
      "type": 'Orthopedic Doctor',
      "country": 'London',
      "city": 'big ben city',
      "statusnearby": "nearby",
      "mailId": 'johnkenly@gmail.com',
      "contactNumber": "9898989898",
      "description": "Proin theul tempus placerat magna, non maximus ame dolor feugiat non."
    }, {
      "image": "img/marketplace/pic5.png",
      "name": "Roji",
      "surname": "Gambetta",
      "type": 'Orthopedic Doctor',
      "country": 'London',
      "city": 'big ben city',
      "statuspopular": "ispopular",
      "mailId": 'johnkenly@gmail.com',
      "contactNumber": "9898989898",
      "description": "Proin theul tempus placerat magna, non maximus ame dolor feugiat non."
    }, ];
  })
  .controller('MarketplaceEventsCtrl', function ($scope, $ionicModal, $timeout, $ionicPopup) {

    $scope.searchpop = function () {
      $scope.searchopen = $ionicPopup.show({
        templateUrl: 'templates/athlete-modal/search.html',
        scope: $scope,
        cssClass: 'searchpop',
      });
      $scope.searchshow = !$scope.searchshow;
    }
    $scope.searchPopup = function () {
      $scope.searchopen.close();
    }


    $scope.openfilterpop = function () {
      $scope.datefilteropen = $ionicPopup.show({
        templateUrl: 'templates/athlete-modal/date-filter.html',
        scope: $scope,
        cssClass: 'datefilterpop'
      });
      $scope.searchshow = !$scope.searchshow;
    }
    $scope.closefilterpop = function () {
      $scope.datefilteropen.close();
    }
    $scope.categories = ['Track and Field', 'Park Runs', 'Fun Runs', 'Road Runs', 'Triathlons and Duathlons', 'Extreme and Ultra', 'Trail Racing', 'Other'];
    $scope.searchshow = false;
    $scope.search = function () {
      $scope.searchshow = !$scope.searchshow;
    };
    $scope.eventListBanner = {
      img: ' img/marketplace/event-landing.png',
    };
    // $scope.eventList = function() {
    //     modal = $uibModal.open({
    //         animation: true,
    //         templateUrl: " views/modal/event-popup.html",
    //         windowClass: "modal-event",
    //         scope: $scope
    //     });
    // };
    $scope.categories = ['Track and Field', 'Park Runs', 'Fun Runs', 'Road Runs', 'Triathlons and Duathlons', 'Extreme and Ultra', 'Trail Racing', 'Other'];
    $scope.Eventlist = [{
      "img": " img/marketplace/event12.png",
      "title": "winter running events.",
      "place": "London",
      "statuspopular": "ispopular",
      "date": "jan 22-25, 2017"

    }, {
      "img": " img/marketplace/event11.png",
      "title": " swimming compititions",
      "place": "London",
      "statuspopular": "ispopular",
      "statusnearby": "nearby",
      "date": "dec 22-25, 2016"
    }, {
      "img": " img/marketplace/event9.png",
      "title": "winter running events",
      "place": "London",
      "date": "nov 22-25, 2016"
    }, {
      "img": " img/marketplace/event10.png",
      "title": " swimming compititions",
      "place": "London",
      "date": "oct 22-25, 2016"
    }, {
      "img": " img/marketplace/event6.png",
      "title": "winter running events",
      "place": "London",
      "statusnearby": "nearby",
      "date": "june 22-25, 2016"
    }, {
      "img": " img/marketplace/event3.png",
      "title": "swimming compititions",
      "place": "London",
      "statusnearby": "nearby",
      "date": "march 22-25, 2016"
    }];


    $scope.data = {
      "image": ' img/marketplace/event2-banner.png',
      "title": 'Winter running events',
      "date": 'jan 22-25 2017',
      "place": 'London',

    };

    $scope.eventsGalleryDetaiLlist = [{
      "img": " img/marketplace/event2.png",
      "url": "https://www.youtube.com/embed/VQ-6nYDqAZc?autoplay=1",
      "classCircle": "play-circle",
      "urlPlay": " img/marketplace/play.png"
    }, {
      "img": " img/marketplace/event6.png",
      "url": "",
      "classCircle": "dis-non",
      "urlPlay": ""
    }, {
      "img": " img/marketplace/event12.png",
      "url": "https://www.youtube.com/embed/VQ-6nYDqAZc?autoplay=1",
      "classCircle": "play-circle",
      "urlPlay": " img/marketplace/play.png"
    }, {
      "img": " img/marketplace/event10.png",
      "url": "",
      "classCircle": "dis-non",
      "urlPlay": ""
    }, {
      "img": " img/marketplace/event9.png",
      "url": "https://www.youtube.com/embed/VQ-6nYDqAZc?autoplay=1",
      "classCircle": "play-circle",
      "urlPlay": " img/marketplace/play.png"
    }, {
      "img": " img/marketplace/event7.png",
      "url": "",
      "classCircle": "dis-non",
      "urlPlay": ""
    }, {
      "img": " img/marketplace/event5.png",
      "url": "https://www.youtube.com/embed/VQ-6nYDqAZc?autoplay=1",
      "classCircle": "play-circle",
      "urlPlay": "f img/marketplace/play.png"
    }, {
      "img": " img/marketplace/event8.png",
      "url": "",
      "classCircle": "dis-non",
      "urlPlay": ""
    }, {
      "img": " img/marketplace/event11.png",
      "url": "https://www.youtube.com/embed/VQ-6nYDqAZc?autoplay=1",
      "classCircle": "play-circle",
      "urlPlay": " img/marketplace/play.png"
    }, {
      "img": " img/marketplace/event4.png",
      "url": "",
      "classCircle": "dis-non",
      "urlPlay": ""
    }, {
      "img": " img/marketplace/event10.png",
      "url": "https://www.youtube.com/embed/VQ-6nYDqAZc?autoplay=1",
      "classCircle": "play-circle",
      "urlPlay": " img/marketplace/play.png"
    }, {
      "img": " img/marketplace/event12.png",
      "url": "",
      "classCircle": "dis-non",
      "urlPlay": ""
    }];
  })
  .controller('MarketplaceArticlesCtrl', function ($scope, $ionicModal, MyServices, $timeout, $ionicPopup, $http) {
    $scope.searchshow = false;
    $scope.search = function () {
      $scope.searchshow = !$scope.searchshow;
    };
    $scope.articleListBanner = {
      img: ' img/marketplace/article-list-landing.png',
    };
    $scope.activeTab = 1;
    $scope.article = {}; //Used to store article data
    $scope.articleList = []; //Array to store list of articals
    $scope.article.category = []; //Array to store multiple categories
    $scope.article.filter = []; //Array to store filters
    $scope.skip = 0; //This is used in pagination. Initial value is 0, and increamented by 10
    $scope.isData = false;
    // $scope.view = function() {
    //     modal = $uibModal.open({
    //         animation: true,
    //         templateUrl: " views/modal/article-list-view.html",
    //         windowClass: "modal-article-view",
    //         scope: $scope
    //     });
    // };
    $scope.categories = ['Training and performance', 'Nutrition', 'Coaching', 'Parents and Guardians', 'News', 'Tips and Techniques'];


    // $scope.marketlist = [{
    //   "profile": "img/marketplace/pic1.png",
    //   "name": "vern",
    //   "surname": "gambetta",
    //   "date": "december 1, 2016 ",
    //   "rate": "£ 22",
    //   "likes": "210 ",
    //   "dislikes": "0",
    //   "img": "img/marketplace/event2.png",
    //   "title": "some thoughts, reflections & advice on coaching."
    // }, {
    //   "profile": "img/marketplace/pic4.png",
    //   "name": "kristin",
    //   "surname": "dryden",
    //   "date": "december 2, 2016 ",
    //   "rate": "£ 25",
    //   "likes": "210 ",
    //   "dislikes": "0",
    //   "img": "img/marketplace/event3.png",
    //   "title": " biased training"
    // }, {
    //   "profile": "img/marketplace/pic3.png",
    //   "name": "john",
    //   "surname": "grace",
    //   "date": "january 21, 2016 ",
    //   "rate": "free",
    //   "likes": "210 ",
    //   "dislikes": "0",
    //   "img": "img/marketplace/event4.png",
    //   "title": "is max strength as important as we think?"
    // }, {
    //   "profile": "img/marketplace/pic2.png",
    //   "name": "john",
    //   "surname": "grace",
    //   "date": "january 21, 2016 ",
    //   "rate": "free",
    //   "likes": "210 ",
    //   "dislikes": "0",
    //   "img": "img/marketplace/event5.png",
    //   "title": "is max strength as important as we think?"
    // }];
    $scope.articleDetail = {
      image: 'img/marketplace/artical-popup.png',
      title: 'some thoughts,reflections & advice on coaching.',
      price: '£ 25',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis fringilla, libero eu tempus tempr lectus nunc lacinia ex, vestibulum sollicitudin arcu ante in est. Nulla mollis neque nec imperd pellentesque. Ut efficitur tempor leo non vestibulum. Aliquam ultricies commodo risus, vitaery interdum orci dictum vel. Donec feugiat urna turpis. Aenean vitae eleifend lorem, condimentn lobortis nibh. Proin et venenatis ipsum, eget pulvinar ligula.'

    };

    //most recent
    // $scope.activeTab = val;
    $scope.article.skip = 0; //Reinitialize skip to handle the tab switch
    $scope.marketlist = []; //Reinitialize array to handle tab switch
    $scope.marketlist1 = [];
    // $scope.article.skip = $scope.skip;


    MyServices.getAllMostPopularArticles($scope.article, function (data) {
      if (data.value === true) {
        $scope.marketlist1 = data.data;

        console.log("marketlist1 popular data", $scope.marketlist1);

      }
    });
    MyServices.getAllMostRecentArticles($scope.article, function (data) {
      if (data.value === true) {
        $scope.marketlist = data.data;
        console.log("marketlist recent data", $scope.marketlist);

      }
    });

    // $scope.loadMore = function () {
    //   console.log("loadmore called");
    //   // if ($scope.activeTab == 1) { //For most recent article
    //   $scope.article.skip = $scope.article.skip + 2;
    //   MyServices.getAllMostRecentArticles($scope.article, function (data) {
    //     if (data.value === true) {
    //       $scope.marketlist.push(data.data);
    //       console.log("marketlist recent data", $scope.marketlist);
    //     }
    //   });

    //   $scope.$broadcast('scroll.infiniteScrollComplete');

    // }
    // $scope.moreDataCanBeLoaded = function () {
    //   return ($scope.marketlist.length > $scope.article.skip) ? false : true;
    // }

    $scope.article1 = function (list) {
      $scope.eyeDetails = list;
      $scope.articleopen = $ionicPopup.show({
        templateUrl: 'templates/athlete-modal/article-modal.html',
        scope: $scope,
        cssClass: 'articlepop'
      });
    }

    if ($.jStorage.get('userAthlete')) {
      $scope.userData = $.jStorage.get('userAthlete');
      $scope.userData.userType = "Athlete";
    } else if ($.jStorage.get('userProfile')) {
      $scope.userData = $.jStorage.get('userProfile');
      $scope.userData.userType = "Coach";
    }


    $scope.getReaction = function (value, id) {

      $scope.article.reaction = value;
      $scope.article.userId = $scope.userData._id;
      $scope.article.accessType = $scope.userData.userType;
      $scope.article.accessToken = $scope.userData.accessToken;
      // $scope.article.accessToken= $.jStorage.get("accessToken");

      //$scope.article.articleId = id;//If we directly pass object id 

      //Here id is index position of an object inside articleList array.
      $scope.article.articleId = $scope.marketlist[id]._id;

      MyServices.getReaction($scope.article, function (data) {
        if (data.value) {
          console.log("getReaction data", data.data);
          if (!_.isEmpty(data.data)) {
            var i = 0;
            //Find article using id and update no of like and dislikes of that artical
            // _.find($scope.articleList, function (n) {
            //     if (n._id == id) {
            //         $scope.articleList[i].noOfLikes = data.data.noOfLikes;
            //         $scope.articleList[i].noOfDisLikes = data.data.noOfDisLikes;
            //     }
            //     i++;
            // });

            //To avoid find loop we have used $index
            $scope.marketList[id].noOfLikes = data.data.noOfLikes;
            $scope.marketList[id].noOfDisLikes = data.data.noOfDisLikes;

          }
        } // else {
        //     $scope.articleList = [];
        // }
      }); //End of get reaction
    }

    $scope.closePopup = function () {
      $scope.articleopen.close();
    };



    $scope.searchpop = function () {
      $scope.searchopen = $ionicPopup.show({
        templateUrl: 'templates/athlete-modal/search.html',
        scope: $scope,
        cssClass: 'searchpop'
      });
      $scope.searchshow = !$scope.searchshow;
    }
    $scope.searchPopup = function () {
      $scope.searchopen.close();
    }
    $scope.categories = ['Training and performance', 'Nutrition', 'Coaching', 'Parents and Guardians', 'News', 'Tips and Techniques'];
  })
  .controller('MarketplaceServiceDetailCtrl', function ($scope, $state, $ionicPopup, MyServices, $ionicLoading, $filter, $ionicModal) {
    $scope.servicePopup = {
      "image": "img/marketplace/pic2.png",
      "name": "alexi",
      "surname": "gambetta",
      "type": 'orthopedic doctor',
      "country": 'London',
      "website": 'www.coachmentor.com',
      "city": 'big ben city',
      "mailId": 'alexigambetta@gmail.com',
      "contactNumber": "989989898",
      "description": "<p>When dressing for the cold, it is important to dress in layers and to remember that you will still feel cold when you first go outside. Once you start running, your body will perceive the outdoor temperature at about 20 degrees warmer than it actually is! This means that if you are warm when you first go outside you are likely overdressed and could end up overheating.</p><p>When it comes to layering clothes, keep in mind that your first layer should always be a wicking layer. This fabric will help to keep sweat off your body, while maintaining your core temperature without overheating. On top of this layer you can wear another top, as well as a windbreaker to give you extra protection against the harsh winter winds.</p>"

    };

    $scope.eventsGalleryDetaiLlist = [{
      "img": "  img/marketplace/event2.png",
      "url": "https://www.youtube.com/embed/VQ-6nYDqAZc?autoplay=1",
      "classCircle": "play-circle",
      "urlPlay": "  img/marketplace/play.png"
    }, {
      "img": "  img/marketplace/event6.png",
      "url": "  img/marketplace/event6.png",
      "classCircle": "dis-non",
      "urlPlay": ""
    }, {
      "img": "  img/marketplace/event4.png",
      "url": "  img/marketplace/event4.png",
      "classCircle": "dis-non",
      "urlPlay": ""
    }, {
      "img": "  img/marketplace/event12.png",
      "url": "https://www.youtube.com/embed/VQ-6nYDqAZc?autoplay=1",
      "classCircle": "play-circle",
      "urlPlay": "  img/marketplace/play.png"
    }, {
      "img": "  img/marketplace/event11.png",
      "url": "https://www.youtube.com/embed/VQ-6nYDqAZc?autoplay=1",
      "classCircle": "play-circle",
      "urlPlay": "  img/marketplace/play.png"
    }, {
      "img": "  img/marketplace/event5.png",
      "url": "  img/marketplace/event5.png",
      "classCircle": "dis-non",
      "urlPlay": ""
    }, {
      "img": "  img/marketplace/event4.png",
      "url": "  img/marketplace/event4.png",
      "classCircle": "dis-non",
      "urlPlay": ""
    }, {
      "img": "  img/marketplace/event10.png",
      "url": "https://www.youtube.com/embed/VQ-6nYDqAZc?autoplay=1",
      "classCircle": "play-circle",
      "urlPlay": "  img/marketplace/play.png"
    }, {
      "img": "  img/marketplace/event7.png",
      "url": "  img/marketplace/event7.png",
      "classCircle": "dis-non",
      "urlPlay": ""
    }];
    $scope.eventsGalleryDetaiLlist = _.chunk($scope.eventsGalleryDetaiLlist, 2);
  })
  .controller('MarketplaceEventDetailCtrl', function ($scope, $state, $ionicPopup, MyServices, $ionicLoading, $filter, $ionicModal) {

    $scope.data = {
      "image": 'frontend/img/marketplace/event2-banner.png',
      "title": 'Winter running events',
      "date": 'jan 22-25 2017',
      "place": 'London',

    };
    $scope.eventsGalleryDetaiLlist = [{
      "img": "  img/marketplace/event2.png",
      "url": "https://www.youtube.com/embed/VQ-6nYDqAZc?autoplay=1",
      "classCircle": "play-circle",
      "urlPlay": "  img/marketplace/play.png"
    }, {
      "img": "  img/marketplace/event6.png",
      "url": "  img/marketplace/event6.png",
      "classCircle": "dis-non",
      "urlPlay": ""
    }, {
      "img": "  img/marketplace/event4.png",
      "url": "  img/marketplace/event4.png",
      "classCircle": "dis-non",
      "urlPlay": ""
    }, {
      "img": "  img/marketplace/event12.png",
      "url": "https://www.youtube.com/embed/VQ-6nYDqAZc?autoplay=1",
      "classCircle": "play-circle",
      "urlPlay": "  img/marketplace/play.png"
    }, {
      "img": "  img/marketplace/event11.png",
      "url": "https://www.youtube.com/embed/VQ-6nYDqAZc?autoplay=1",
      "classCircle": "play-circle",
      "urlPlay": "  img/marketplace/play.png"
    }, {
      "img": "  img/marketplace/event5.png",
      "url": "  img/marketplace/event5.png",
      "classCircle": "dis-non",
      "urlPlay": ""
    }, {
      "img": "  img/marketplace/event4.png",
      "url": "  img/marketplace/event4.png",
      "classCircle": "dis-non",
      "urlPlay": ""
    }, {
      "img": "  img/marketplace/event10.png",
      "url": "https://www.youtube.com/embed/VQ-6nYDqAZc?autoplay=1",
      "classCircle": "play-circle",
      "urlPlay": "  img/marketplace/play.png"
    }, {
      "img": "  img/marketplace/event7.png",
      "url": "  img/marketplace/event7.png",
      "classCircle": "dis-non",
      "urlPlay": ""
    }];
    $scope.viewTab = 1;
    $scope.eventsGalleryDetaiLlist = _.chunk($scope.eventsGalleryDetaiLlist, 2);
    $scope.getTab = function (val) {
      if (val == 1) {
        console.log('first');
        $scope.viewTab == 1;
      } else if (val == 2) {
        console.log('second');
        $scope.viewTab == 2;
      } else if (val == 3) {
        console.log('thirs');
        $scope.viewTab == 3;
      } else {
        $scope.viewTab == 1;
      }
    }
  })


  .controller('MarketplaceArticleDetailCtrl', function ($scope, $ionicModal, $timeout) {

    $scope.articleDetail = {
      image: ' img/marketplace/artical-popup.png',
      title: 'some thoughts,reflections & advice on coaching.',
      price: '£ 25',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis fringilla, libero eu tempus tempr lectus nunc lacinia ex, vestibulum sollicitudin arcu ante in est. Nulla mollis neque nec imperd pellentesque. Ut efficitur tempor leo non vestibulum. Aliquam ultricies commodo risus, vitaery interdum orci dictum vel. Donec feugiat urna turpis. Aenean vitae eleifend lorem, condimentn lobortis nibh. Proin et venenatis ipsum, eget pulvinar ligula.'

    };
    $scope.articleBanner = {
      bannerImg: ' img/marketplace/article-detail.png',
      profile: ' img/marketplace/profile2.png',
      title: 'maintaining your winter running routine',
      name: 'kristin',
      surname: 'dryden',
      date: ' December 21, 2016',
      category: ' Nutrition',
      likes: '25',
      dislikes: '3',
      content: '<p>Although running outside in the winter can be intimidating due to conditions like ice, snow and cold, you can keep your running mileage up if you have the right gear and follow some practical cold-weather safety tips. Read below for guidance on how to stay warm when battling some of the year’s coldest temperatures.</p><strong>Wear Layers</strong><p>When dressing for the cold, it is important to dress in layers and to remember that you will still feel cold when you first go outside. Once you start running, your body will perceive the outdoor temperature at about 20 degrees warmer than it actually is! This means that if you are warm when you first go outside you are likely overdressed and could end up overheating.</p><p>When it comes to layering clothes, keep in mind that your first layer should always be a wicking layer. This fabric will help to keep sweat off your body, while maintaining your core temperature without overheating. On top of this layer you can wear another top, as well as a windbreaker to give you extra protection against the harsh winter winds.</p><strong>Cover Your Head, Hands and Feet</strong><p>In addition to wearing layers on your body, it is important to wear the appropriate attire on your head, hands and feet.</p><p>For starters, keep your head warm with a good running hat that is form fitting and keeps your ears protected. It is also a good idea to have running-specific gloves. This type of glove has a wicking fabric on the inside to prevent excessive sweat from accumulating on the hands, which may lead to frostbite.</p>'

    };
    $scope.articleDetaiLlist = [{
      "profile": " img/marketplace/pic1.png",
      "name": "vern",
      "surname": "gambetta",
      "date": "december 1, 2016 ",
      "rate": "free",
      "img": " img/marketplace/event8.png",
      "title": "some thoughts, reflections & advice on coaching."
    }, {
      "profile": " img/marketplace/pic2.png",
      "name": "kristin",
      "surname": "dryden",
      "date": "december 2, 2016 ",
      "rate": "£ 22",
      "img": " img/marketplace/event12.png",
      "title": " biased training"
    }, {
      "profile": " img/marketplace/pic3.png",
      "name": "john",
      "surname": "grace",
      "date": "january 21, 2016 ",
      "rate": "free",
      "img": " img/marketplace/event9.png",
      "title": "is max strength as important as we think?"
    }];
    $scope.articleDetail = {
      image: 'frontend/img/marketplace/artical-popup.png',
      title: 'some thoughts,reflections & advice on coaching.',
      price: '£ 25',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis fringilla, libero eu tempus tempr lectus nunc lacinia ex, vestibulum sollicitudin arcu ante in est. Nulla mollis neque nec imperd pellentesque. Ut efficitur tempor leo non vestibulum. Aliquam ultricies commodo risus, vitaery interdum orci dictum vel. Donec feugiat urna turpis. Aenean vitae eleifend lorem, condimentn lobortis nibh. Proin et venenatis ipsum, eget pulvinar ligula.'

    };
  })
//End of Marketplace controller
