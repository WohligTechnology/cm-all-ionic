angular.module('marketplaceController', ['starter.services', 'checklist-model', 'ui.calendar', 'ngCordova'])
  //Start of Marketplace controller
  .controller('MarketplaceServiceCtrl', function ($scope, $ionicModal, MyServices, $timeout, $ionicPopup, $http) {
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

    //copied

    $scope.activeTab = 1;
    $scope.skip = 0; //Used in pagination and initial value is 0
    $scope.serviceProviderList = []; //Array used to store list of service providers
    $scope.serviceProvider = {}; //Obj to store req parameters
    $scope.serviceProvider.category = []; //Array to store multiple categories
    $scope.serviceProviderGallery = []; //Array to store gallery of service provider on service popup page
    $scope.gallerySkip = 0; //Used in pagination on serive popup page.
    $scope.enquiryData = {}; //Obj to store enquiry details
    $scope.serviceProvider.searchText = "";
    $scope.isData = false;
    $scope.isGalleryData = false;
    $scope.isText = true;
    $scope.serviceProvider.skip = $scope.skip;

    $scope.categories = ['Sports therapist', 'Physiotherapist', 'Nutritionist', 'Personal Trainers', 'Specialist Doctors', 'Other'];
    var categoriesArrayLength = $scope.categories.length; //variable to store length of $scope.categories array;


    //Get user info if user is logged in
    if ($.jStorage.get('userAthlete')) {
      $scope.userData = $.jStorage.get('userAthlete');
      $scope.userData.userType = "Athlete";
    } else if ($.jStorage.get('userCoach')) {
      $scope.userData = $.jStorage.get('userCoach');
      $scope.userData.userType = "Coach";
    }


    //Function to select tab
    $scope.toggleTab = function (val) {

      if ($scope.activeTab != val) {
        $scope.activeTab = val;
        $scope.skip = 0; //Reinitialize skip to handle the tab switch
        $scope.serviceProviderList = []; //Reinitialize array to handle tab switch
      }
      $scope.serviceProvider.skip = $scope.skip;
      // console.log("$scope.serviceProviderList", $scope.serviceProviderList);
      console.log("$scope.activeTab ", $scope.activeTab);
      var reqObj = {};
      if (val == 1) {
        MyServices.getMostRecentServiceProvider($scope.serviceProvider, function (data) {
          if (data.value) {
            console.log("inside data");
            if (data.data.length > 0) {
              $scope.isData = false;
              var arrayLength = data.data.length;
              for (var i = 0; i < arrayLength; i++) {
                $scope.serviceProviderList.push(data.data[i]);
              }
              $scope.isText = false;
            } else if ($scope.serviceProviderList.length > 0) {
              //toastr.warning('No more Service Provider to load !!!');
              $scope.isData = true;
              $scope.isText = false;
            } else {
              $scope.serviceProviderList = [];
              $scope.isText = false;
            }
          } else {
            $scope.serviceProviderList = [];
            $scope.isText = false;
          }
          console.log("getMostRecentServiceProviderdata", $scope.serviceProviderList);

        });
      }
      if (val == 2) {
        MyServices.getMostPopularServiceProvider($scope.serviceProvider, function (data) {
          if (data.value) {
            console.log("inside popular data");
            if (data.data.length > 0) {
              $scope.isData = false;
              console.log("hiii inside if");
              var arrayLength = data.data.length;
              for (var i = 0; i < arrayLength; i++) {
                $scope.serviceProviderList.push(data.data[i]);
                console.log("hiii inside for");
              }
              $scope.isText = false;
              console.log("$scope.serviceProviderList popular", $scope.serviceProviderList);
            } else if ($scope.serviceProviderList.length > 0) {
              //toastr.warning('No more Service Provider to load !!!');
              $scope.isData = true;
              $scope.isText = false;
            } else {
              $scope.serviceProviderList = [];
              $scope.isText = false;
            }
          } else {
            $scope.serviceProviderList = [];
            $scope.isText = false;
          }
        });
      }
      if (val == 3) { // Empty for now and used for near me tab
        $scope.serviceProviderList = [];
        $scope.isText = false;
      }
    };

    $scope.serviceListBanner = {
      bannerImg: 'img/marketplace/service-list.png',
    };
    // $scope.toggleTab(1);


    //To get gallery of service provider
    $scope.getMyGallery = function (value) {
      $scope.serviceProviderId = {};
      console.log("selected sp value", value);
      $scope.serviceProviderId.userId = value._id;
      $scope.serviceProviderId.skip = $scope.gallerySkip;

      MyServices.getMyImagesVideos($scope.serviceProviderId, function (data) {
        if (data.value) {
          console.log("getMyImages data", data.data);
          if (data.data.length > 0) {
            $scope.isGalleryData = false;
            var arrayLength = data.data.length;
            for (var i = 0; i < arrayLength; i++) {
              $scope.serviceProviderGallery.push(data.data[i]);
            }
          } else if ($scope.serviceProviderGallery.length > 0) {
            //toastr.warning('No more gallery to load !!!');
            $scope.isGalleryData = true;
          } else {
            $scope.serviceProviderGallery = [];
          }
        } else {
          $scope.serviceProviderGallery = [];
        }
      })
    }; //End of getMyGallery  

    //Function to search serive provider
    $scope.searchSP = function (value) {
      $scope.SPArray = [];
      $scope.isText = true;
      $scope.locationArray = [];
      if (value.searchText != "") {
        MyService.searchServiceProvider(value, function (data) {
          if (data.value) {
            console.log("Event data", data.data);
            $scope.SPArray = data.data.spName;
            $scope.locationArray = data.data.location;
          } else {
            console.log("Event data false");
          }
        });
      }
    };

    //Function to get SP based on location search
    $scope.getSPByLocation = function (value) {
      $scope.skip = 0; //Reinitialize skip to filter
      $scope.serviceProviderList = []; //Reinitialize array to handle filter
      $scope.isText = false;
      $scope.serviceProvider.searchText = $scope.locationArray[value]._id;

      $scope.toggleTab($scope.activeTab);
    }; //End of getSPByLocation


    //Function to get SP based on name/surname search
    $scope.getMySP = function (value) {
      var spId = $scope.SPArray[value]._id;
      var fullName = $scope.SPArray[value].name + " " + $scope.SPArray[value].surname;
      $scope.serviceProvider.searchText = fullName;
      $scope.skip = 0; //Reinitialize skip to filter
      $scope.isText = false;
      $scope.serviceProviderList = []; //Reinitialize array to handle filter
      MyServices.getOneSP({
        _id: spId
      }, function (data) {
        if (data.value) {
          $scope.serviceProviderList.push(data.data);
        } else {
          $scope.serviceProviderList = [];
        }

      });
    }; //End of getMySP

    //Function used for pagination on service popup page
    $scope.loadMoreGallery = function () {
      $scope.gallerySkip = $scope.gallerySkip + 6;
      $scope.getMyGallery($scope.servicePopup);
    };

    //Function to increment no of views
    $scope.increamentNoOfViews = function (value) {
      var counter = {};
      counter._id = value._id;

      MyServices.increamentNoOfViewsSP(counter, function (data) {
        if (data.value) {
          console.log("No of views increamented successfully");
        } else {
          console.log("Unable to increment no of views");
        }
      }); //End of increamentNoOfViews service
    }; //End of increamentNoOfViews function

    //Function to get service provider details popup
    $scope.serviceProviderDetails = function (value) {
      $scope.serviceProviderDetailsModal = $uibModal.open({
        animation: true,
        templateUrl: "frontend/views/modal/service-popup.html",
        windowClass: "modal-service",
        scope: $scope
      });
      $scope.isGalleryData = false;
      $scope.gallerySkip = 0;
      $scope.serviceProviderGallery = [];
      $scope.servicePopup = $scope.serviceProviderList[value]; //Store service provider details and display it on service-popup

      $scope.getMyGallery($scope.servicePopup);
      $scope.increamentNoOfViews($scope.servicePopup);
    };

    //Function to get service provider details popup
    $scope.enquiryForm = function (value) {
      //$scope.serviceProviderDetailsModal.close();
      //$scope.enquiryData = $scope.userData;
      if ($scope.userData) {
        $scope.enquiryData.name = $scope.userData.name;
        $scope.enquiryData.mobile = $scope.userData.mobile;
        $scope.enquiryData.email = $scope.userData.email;
      }

      modal = $uibModal.open({
        animation: true,
        templateUrl: "frontend/views/modal/service-enquiry.html",
        windowClass: "modal-service",
        scope: $scope
      });
    };

    //Function to submit equiry     
    $scope.enquireNow = function (value) {
      value._id = $scope.serviceProviderId.userId; //Setting service provider id
      MyServices.saveEnquiry(value, function (data) {
        if (data.value) {
          if (data.data.message == "Enquiry submitted successfully !!!") {
            toastr.success(data.data.message);
          } else {
            toastr.warning(data.data.message);
          }


        } else {
          toastr.error("Unable to submit enquiry");
        }
        $scope.enquiryData = {}; //Reinitialize enquiry obj
        console.log("$scope.enquiryData ", $scope.enquiryData);
      });
    };


    //Function to store multiple categories in array
    $scope.selectCategory = function (value) {
      var serviceProviderCategoryArrayLength = $scope.serviceProvider.category.length;
      for (var i = 0; i < categoriesArrayLength; i++) {
        if (i === value) {
          var category = _.find($scope.serviceProvider.category, function (o) {
            if ($scope.categories[i] === o) {
              return o;
            }
          });
          if (category !== undefined) {
            _.pull($scope.serviceProvider.category, category);
          } else if (category === undefined) {
            $scope.serviceProvider.category.push($scope.categories[i]);
          }
        }
      }
      console.log("category array", $scope.serviceProvider.category);
    }; //End of selectCategory

    //Function to apply filters the SP list
    $scope.applyFilter = function (value) {
      console.log("applyFilter", value);
      $scope.skip = 0; //Reinitialize skip to filter
      $scope.serviceProviderList = []; //Reinitialize array to handle filter

      $scope.toggleTab($scope.activeTab);
    }; //End of applyFilter

    $scope.selected = false;
    //Function to select all categories in array
    $scope.selectAllCategoris = function () {
      $scope.serviceProvider.category = [];
      _.each($scope.categories, function (key) {
        $scope.serviceProvider.category.push(key);
      })
      $scope.selected = true;
    } //End of select all categories

    //Function used for pagination
    $scope.loadMore = function () {
      console.log("loadmore called");
      if ($scope.activeTab == 1) { //For most recent service provider
        $scope.skip = $scope.skip + 6;
        $scope.toggleTab(1);
      } else if ($scope.activeTab == 2) { //for most popular service provider
        $scope.skip = $scope.skip + 6;
        $scope.toggleTab(2);
      } else if ($scope.activeTab == 3) { //for near me service provider
        $scope.skip = $scope.skip + 6;
        $scope.toggleTab(3);
      }
    }

    $scope.toggleTab(1); //Onload function to get list of most recent service providers


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

  .controller('MarketplaceArticlesCtrl', function ($scope, $state, $ionicModal, saveDetail, MyServices, $timeout, $ionicPopup, $http) {
    $scope.searchshow = false;
    $scope.search = function () {
      $scope.searchshow = !$scope.searchshow;

    };
    $scope.articleListBanner = {
      img: ' img/marketplace/article-list-landing.png',
    };

    //copied

    {

      $scope.activeTab = 1;
      $scope.article = {}; //Used to store article data
      $scope.articleList = []; //Array to store list of articals
      $scope.article.category = []; //Array to store multiple categories
      $scope.article.filter = []; //Array to store filters
      $scope.skip = 0; //This is used in pagination. Initial value is 0, and increamented by 10
      $scope.isData = false;
      $scope.isText = true;
      $scope.noMoreItemsAvailable = false;
      $scope.categories = ['Training and performance', 'Nutrition', 'Coaching', 'Parents and Guardians', 'News', 'Tips and Techniques'];
      var categoriesArrayLength = $scope.categories.length; //variable to store length of $scope.categories array;


      // if ($.jStorage.get('userAthlete')) {
      //   $scope.userData = $.jStorage.get('userAthlete');
      //   $scope.userData.userType = "Athlete";
      // } else 
      if ($.jStorage.get('userProfile')) {
        $scope.userData = $.jStorage.get('userProfile');
        $scope.userData.userType = "Coach";
      }

      // $scope.authorProfile = function (data) {
      //   $scope.modalData = data;
      //   modal = $uibModal.open({
      //     animation: true,
      //     templateUrl: "frontend/views/modal/author-profile.html",
      //     scope: $scope
      //   });
      // };

      //Function to select tab
      $scope.toggleTab = function (val) {


        if ($scope.activeTab != val) {
          $scope.noMoreItemsAvailable = false;
          // $scope.noMoreItemsAvailable1 = true;
          $scope.activeTab = val;
          $scope.skip = 0; //Reinitialize skip to handle the tab switch
          $scope.articleList = []; //Reinitialize array to handle tab switch
        }
        $scope.article.skip = $scope.skip;

        console.log("$scope.activeTab ", $scope.activeTab);
        var reqObj = {};
        if (val == 1) {
          MyServices.getAllMostRecentArticles($scope.article, function (data) {
            if (data.value) {
              console.log("inside recent");
              console.log(data.data);
              if (data.data.length > 0) {
                $scope.noMoreItemsAvailable = true;
                var arrayLength = data.data.length;
                for (var i = 0; i < arrayLength; i++) {
                  $scope.articleList.push(data.data[i]);
                }
                $scope.isText = false;
                console.log("recent", $scope.articleList);
              } else if ($scope.articleList.length > 0) {
                $scope.noMoreItemsAvailable = false;
                $scope.isText = false;
              } else {
                $scope.articleList = [];
                $scope.isText = false;
                $scope.noMoreItemsAvailable = false;
              }

            } else {
              $scope.articleList = [];
              $scope.isText = false;
              $scope.noMoreItemsAvailable = false;
            }
            //$scope.noMoreItemsAvailable = true;

          });
        }
        if (val == 2) {
          MyServices.getAllMostPopularArticles($scope.article, function (data) {
            if (data.value) {
              console.log("inside popular");
              if (data.data.length > 0) {
                $scope.noMoreItemsAvailable = true;
                // console.log("hiii inside if");
                var arrayLength = data.data.length;
                for (var i = 0; i < arrayLength; i++) {
                  $scope.articleList.push(data.data[i]);
                  // console.log("hiii inside for");
                }
                $scope.isText = false;
                console.log("popular", $scope.articleList);
              } else if ($scope.articleList.length > 0) {
                //toastr.warning('No more articles to load !!!');
                $scope.noMoreItemsAvailable = false;
                $scope.isText = false;
              } else {
                $scope.articleList = [];
                $scope.isText = false;
                $scope.noMoreItemsAvailable = false;
              }
            } else {
              $scope.articleList = [];
              $scope.noMoreItemsAvailable = false;
              $scope.isText = false;
            }
            //$scope.noMoreItemsAvailable = true;
          });
        }
      };

      //Function to get suggestions for articles
      $scope.searchArticle = function (value) {
        $scope.authorName = [];
        $scope.articleName = [];
        $scope.tagArray = [];
        $scope.isText = true;
        if (value.searchText != "") {
          MyServices.searchArticle(value, function (data) {
            if (data.value) {
              console.log("Event data", data.data);
              $scope.authorName = data.data.authorName;
              $scope.articleName = data.data.articleName;
              $scope.tagArray = data.data.tagData;
            } else {
              console.log("Event data false");
            }
          });
        }
      }; //End of searchArticle 

      //Function to get article based on author name search
      $scope.getAuthor = function (value) {
        var fullName = $scope.authorName[value].name + " " + $scope.authorName[value].surname;
        $scope.article.searchText = fullName;
        $scope.isText = false;
        $scope.articleList = []; //Reinitialize array to handle searched data
        $scope.skip = 0;
        $scope.toggleTab($scope.activeTab);
      }; //End of getAuthor

      //Function to get article based on article name search
      $scope.getArticle = function (value) {
        $scope.article.searchText = $scope.articleName[value].articleName;
        $scope.isText = false;
        $scope.articleList = []; //Reinitialize array to handle searched data
        $scope.skip = 0;
        $scope.toggleTab($scope.activeTab);
      }; //End of getArticle

      //Function to get articles based on tags search
      $scope.getTags = function (value) {
        $scope.article.searchText = $scope.tagArray[value]._id;
        $scope.isText = false;
        $scope.articleList = []; //Reinitialize array to handle searched data
        $scope.skip = 0;
        $scope.toggleTab($scope.activeTab);
      }; //End of getTags

      //Function used for pagination
      $scope.loadMore = function () {
        console.log("loadmore called");
        if ($scope.activeTab == 1) { //For most recent article
          $scope.skip = $scope.skip + 2;
          $scope.toggleTab(1);
          $scope.$broadcast('scroll.infiniteScrollComplete');
        } else if ($scope.activeTab == 2) { //for most popular article
          $scope.skip = $scope.skip + 2;
          $scope.toggleTab(2);
          $scope.$broadcast('scroll.infiniteScrollComplete');
        }
      }

      $scope.articleListBanner = {
        img: 'img/marketplace/article-list-landing.png',
      };
      // $scope.preview = function (value) {
      //   modal = $uibModal.open({
      //     animation: true,
      //     templateUrl: "frontend/views/modal/article-list-view.html",
      //     windowClass: "modal-article-view",
      //     scope: $scope
      //   });

      // _.find($scope.articleList, function (n) {
      //     if (n._id == value) {
      //         $scope.articleDetail = n;
      //     }
      // })

      //Here we have used index position of article to assign object from articleList array to articleDetail
      // $scope.articleDetail = $scope.articleList[value];
    };

    $scope.preview = function (list) {
      $scope.eyeDetails = list;
      $scope.articleopen = $ionicPopup.show({
        templateUrl: 'templates/athlete-modal/article-modal.html',
        scope: $scope,
        cssClass: 'articlepop'
      });
    };

    $scope.checkArticleType = function (value) {
      if (value.articleType == "Free") {
        saveDetail.setArticleDetails(value);
        $state.go('app.marketplace-article-detail');
      } else if (value.articleType == "Paid") {
        var myPopup = $ionicPopup.show({

          title: '<h4>This Article is Paid</h4>',
          scope: $scope,
          buttons: [{
            text: 'OK'
          }, ]
        });
      }
    }


    $scope.closePopup = function () {
      $scope.articleopen.close();
    };
    $scope.closeSearchPopup = function () {
      $scope.searchopen.close();
    };



    //Function to increment no of views
    $scope.increamentNoOfViews = function (id) {
      var counter = {};
      counter._id = id;

      MyServices.increamentNoOfViews(counter, function (data) {
        if (data.value) {
          console.log("No of views increamented successfully");
        } else {
          console.log("Unable to increment no of views");
        }
      }); //End of increamentNoOfViews service
    }; //End of increamentNoOfViews function

    //Function to get details of article
    $scope.getArticleDetails = function (value) {
      if (value != null) {
        if ($scope.articleList[value].articleType == "Free") {

          $scope.increamentNoOfViews($scope.articleList[value]._id); //Function call to increamentNoOfViews

          $state.go('marketplace.article-detail', {
            id: $scope.articleList[value]._id,
            authorId: $scope.articleList[value].authorObjId._id
          });
        } else if ($scope.articleList[value].articleType == "Paid") {
          toastr.warning('This is article is paid', 'Buy this article');
        }
      } else if (value == null) { //This is used for modal(article preview)
        if ($scope.articleDetail.articleType == "Free") {
          $scope.increamentNoOfViews($scope.articleDetail.authorObjId._id); //Function call to increamentNoOfViews
          $state.go('marketplace.article-detail', {
            id: $scope.articleDetail._id,
            authorId: $scope.articleDetail.authorObjId._id
          });
        } else if ($scope.articleDetail.articleType == "Paid") {
          toastr.warning('This is article is paid', 'Buy this article');
        }
      }
    }; //End of getArticleDetails function

    //Function to store multiple categories in array
    $scope.selectCategory = function (value) {
      var articalCategoryArrayLength = $scope.article.category.length;
      for (var i = 0; i < categoriesArrayLength; i++) {
        if (i === value) {
          var category = _.find($scope.article.category, function (o) {
            if ($scope.categories[i] === o) {
              return o;
            }
          });
          if (category !== undefined) {
            _.pull($scope.article.category, category);
          } else if (category === undefined) {
            $scope.article.category.push($scope.categories[i]);
          }
        }
      }

      console.log("category array", $scope.article.category);
    }; //End of selectCategory

    //Function to apply category
    $scope.applyCategory = function (value) {

      if (value == "Free") {
        var filter = _.find($scope.article.filter, function (o) {
          if (value === o) {
            return o;
          }
        });
        if (filter !== undefined) {
          _.pull($scope.article.filter, filter);
        } else {
          $scope.article.filter.push(value);
        }
      } else if (value == "Paid") {
        var filter = _.find($scope.article.filter, function (o) {
          if (value === o) {
            return o;
          }
        });
        if (filter !== undefined) {
          _.pull($scope.article.filter, filter);
        } else {
          $scope.article.filter.push(value);
        }
      }
      console.log("applyCategory ", $scope.article.filter);
    }; //End applyCategory

    //Function to apply filters the article list
    $scope.applyFilter = function (value) {
      console.log("applyFilter", value);
      $scope.skip = 0; //Reinitialize skip to filter
      $scope.articleList = []; //Reinitialize array to handle filter

      $scope.toggleTab($scope.activeTab);
    }; //End of applyFilter

    //Function to get reaction of user
    $scope.getReaction = function (value, id) {

      $scope.article.reaction = value;
      if ($scope.userData) {
        $scope.article.userId = $scope.userData._id;
        $scope.article.accessType = $scope.userData.userType;
        $scope.article.accessToken = $scope.userData.accessToken;
      }
      console.log("user", $scope.userData);
      //$scope.article.articleId = id;//If we directly pass object id 

      //Here id is index position of an object inside articleList array.
      $scope.article.articleId = $scope.articleList[id]._id;

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
            $scope.articleList[id].noOfLikes = data.data.noOfLikes;
            $scope.articleList[id].noOfDisLikes = data.data.noOfDisLikes;

          }
        } // else {
        //     $scope.articleList = [];
        // }
      }); //End of get reaction
    }

    $scope.toggleTab(1); //On load function call for tab: most recent articals



    //
    $scope.searchpop = function () {
      $scope.searchopen = $ionicPopup.show({
        templateUrl: 'templates/athlete-modal/search.html',
        scope: $scope,
        cssClass: 'searchpop'
      });
      $scope.searchshow = !$scope.searchshow;
    }
    $scope.applySearchPopup = function () {
      $scope.applyFilter(1)
      //$scope.searchopen.close();
    }

    $scope.allcategories = {};
    $scope.allcategories.checked = false;

    $scope.selectAllSearchPopup = function () {
      console.log("inside search all");
      if ($scope.allcategories.checked) {
        $scope.allcategories.checked = true;
      } else {
        $scope.allcategories.checked = false;
      }
      for (var i = 0; i < $scope.category.length; i++) {
        $scope.category[i].checked = $scope.allcategories.checked;
      };

    }
    // $scope.categories = ['Training and performance', 'Nutrition', 'Coaching', 'Parents and Guardians', 'News', 'Tips and Techniques'];




  })
  .controller('MarketplaceServiceDetailCtrl', function ($scope, $state, $http, $ionicPopup, MyServices, $ionicLoading, $filter, $ionicModal, $timeout) {
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


  .controller('MarketplaceArticleDetailCtrl', function ($scope, $state, saveDetail, $ionicModal, $timeout, $stateParams, MyServices) {

    $scope._id = $stateParams._id;
    console.log("id", $scope._id);

    // $scope.articleDetail = {
    //   image: ' img/marketplace/artical-popup.png',
    //   title: 'some thoughts,reflections & advice on coaching.',
    //   price: '£ 25',
    //   content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis fringilla, libero eu tempus tempr lectus nunc lacinia ex, vestibulum sollicitudin arcu ante in est. Nulla mollis neque nec imperd pellentesque. Ut efficitur tempor leo non vestibulum. Aliquam ultricies commodo risus, vitaery interdum orci dictum vel. Donec feugiat urna turpis. Aenean vitae eleifend lorem, condimentn lobortis nibh. Proin et venenatis ipsum, eget pulvinar ligula.'

    // };

    $scope.articleBanner = {};

    $scope.articleBanner = saveDetail.getArticleDetails();

    MyServices.getOneArticle($scope._id, function (data) {
      if (data.value === true) {
        console.log(data.data);
        if (angular.isUndefined(data.data.message)) {
          $scope.articleBanner = data.data;
          console.log("data", $scope.articleBanner);
        } else {
          console.log("noMoreItemsAvailable1");
          $scope.noMoreItemsAvailable1 = true;
        }
      }
    });

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


    // $scope.articleBanner = {
    //   bannerImg: ' img/marketplace/article-detail.png',
    //   profile: ' img/marketplace/profile2.png',
    //   title: 'maintaining your winter running routine',
    //   name: 'kristin',
    //   surname: 'dryden',
    //   date: ' December 21, 2016',
    //   category: ' Nutrition',
    //   likes: '25',
    //   dislikes: '3',
    //   content: '<p>Although running outside in the winter can be intimidating due to conditions like ice, snow and cold, you can keep your running mileage up if you have the right gear and follow some practical cold-weather safety tips. Read below for guidance on how to stay warm when battling some of the year’s coldest temperatures.</p><strong>Wear Layers</strong><p>When dressing for the cold, it is important to dress in layers and to remember that you will still feel cold when you first go outside. Once you start running, your body will perceive the outdoor temperature at about 20 degrees warmer than it actually is! This means that if you are warm when you first go outside you are likely overdressed and could end up overheating.</p><p>When it comes to layering clothes, keep in mind that your first layer should always be a wicking layer. This fabric will help to keep sweat off your body, while maintaining your core temperature without overheating. On top of this layer you can wear another top, as well as a windbreaker to give you extra protection against the harsh winter winds.</p><strong>Cover Your Head, Hands and Feet</strong><p>In addition to wearing layers on your body, it is important to wear the appropriate attire on your head, hands and feet.</p><p>For starters, keep your head warm with a good running hat that is form fitting and keeps your ears protected. It is also a good idea to have running-specific gloves. This type of glove has a wicking fabric on the inside to prevent excessive sweat from accumulating on the hands, which may lead to frostbite.</p>'

    // };
    // $scope.articleDetaiLlist = [{
    //   "profile": " img/marketplace/pic1.png",
    //   "name": "vern",
    //   "surname": "gambetta",
    //   "date": "december 1, 2016 ",
    //   "rate": "free",
    //   "img": " img/marketplace/event8.png",
    //   "title": "some thoughts, reflections & advice on coaching."
    // }, {
    //   "profile": " img/marketplace/pic2.png",
    //   "name": "kristin",
    //   "surname": "dryden",
    //   "date": "december 2, 2016 ",
    //   "rate": "£ 22",
    //   "img": " img/marketplace/event12.png",
    //   "title": " biased training"
    // }, {
    //   "profile": " img/marketplace/pic3.png",
    //   "name": "john",
    //   "surname": "grace",
    //   "date": "january 21, 2016 ",
    //   "rate": "free",
    //   "img": " img/marketplace/event9.png",
    //   "title": "is max strength as important as we think?"
    // }];
    // $scope.articleDetail = {
    //   image: 'frontend/img/marketplace/artical-popup.png',
    //   title: 'some thoughts,reflections & advice on coaching.',
    //   price: '£ 25',
    //   content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis fringilla, libero eu tempus tempr lectus nunc lacinia ex, vestibulum sollicitudin arcu ante in est. Nulla mollis neque nec imperd pellentesque. Ut efficitur tempor leo non vestibulum. Aliquam ultricies commodo risus, vitaery interdum orci dictum vel. Donec feugiat urna turpis. Aenean vitae eleifend lorem, condimentn lobortis nibh. Proin et venenatis ipsum, eget pulvinar ligula.'

    // };


  })
//End of Marketplace controller
