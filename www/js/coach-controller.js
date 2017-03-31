angular.module('coachController', ['starter.services', 'checklist-model', 'ui.calendar', 'ngCordova'])

.controller('CoachRegistrationCtrl', function ($scope, $state, $ionicPopup, MyServices, $filter, $ionicLoading, $ionicModal) {

  $scope.formData = {};

  $scope.toggleOthers = function () {
    if ($scope.formData.specialisations.otherVal === true) {
      $scope.formData.specialisationOther = 'Others';
    } else {
      $scope.formData.specialisationOther = '';
    }
  };

  $scope.coachingFocus = [
    'Sprinting', 'Middle Distance', 'Endurance', 'Throws', 'Jumps', 'Hurdles', 'Race Walking', 'Hill/Fell Running', 'Cross Country', 'Triathlon'
  ];

  $scope.specialisations = [
    'Coaching athletes with a disability', 'Coaching female athletes', 'Eating disorders', 'First aid', 'Long-term athlete development', 'Mentored practice', 'Strength and conditioning', 'Fitness in Running and Walking', 'Children in Athletics'
  ];

  $scope.maxDate = $filter('date')(new Date(), 'yyyy-MM-dd');

  $scope.gender = ['Male', 'Female'];

  $scope.credentials = ['Level 1', 'Level 2', 'Level 3', 'Level 4'];

  $scope.onlyAplha = /^[a-zA-Z_]+$/;
  $scope.validTel = /^[+0-9]{10,15}$/;
  $scope.validNum = /^[0-9]+$/;
  $scope.validEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  MyServices.getCountries(function (data) {
    $scope.countries = data;
  });

  //Loading
  $scope.showLoading = function (value, time) {
    $ionicLoading.show({
      template: value,
      duration: time
    });
  };
  $scope.hideLoading = function () {
    $ionicLoading.hide();
  };

  //Password Validator
  $scope.valid1 = false;
  $scope.valid2 = false;
  $scope.passwordValidator = function (password) {
    $scope.passwordInvalid = true;
    if (password && password.length >= 8 && password.length <= 15) {
      $scope.valid1 = true;
    } else {
      $scope.valid1 = false;
    }
    if (/([a-zA-Z])/.test(password) && /([0-9])/.test(password)) {
      $scope.valid2 = true;
    } else {
      $scope.valid2 = false;
    }
    if ($scope.valid1 && $scope.valid2) {
      $scope.passwordInvalid = false;
    } else {
      $scope.passwordInvalid = true;
    }
  };

  //Submit Form
  $scope.submitData = function (formData) {
    $scope.showLoading('Please wait...', 15000);
    MyServices.registerCoach(formData, function (data) {
      if (data.value === true) {
        $scope.formData = {};
        $scope.hideLoading();
        $scope.registerMsg = "Successfully registed";
        $scope.showLoading($scope.registerMsg, 3000);
        $scope.modal4.hide();
        $state.go('landing');
      } else {
        console.log(data.error.error);
        $scope.hideLoading();
        if (_.isEmpty(data.error.error)) {
          $scope.showLoading('Registration Faild', 2000);
        } else {
          $scope.showLoading(data.error.error, 2000);
        }
      }
    });
  };

  //Terms Popup
  $scope.termsID = {
    _id: "580cc6877f2ec11727460f1f"
  };
  $scope.privacyID = {
    _id: "580cc67b7f2ec11727460f1c"
  };
  $scope.termsPopup = function (data) {
    $scope.myPopup = $ionicPopup.show({
      template: '<p>Do you agree to the Coach Mentor <span class="link" ng-click="staticModal(termsID)">Terms of Service</span> and <span class="link" ng-click="staticModal(privacyID)">Privacy Policy</span>?</p>',
      title: 'Terms & Conditions',
      scope: $scope,
      buttons: [{
        text: 'No'
      }, {
        text: '<b>Yes</b>',
        type: 'button-positive',
        onTap: function (e) {
          $scope.submitData(data);
        }
      }]
    });
  };


  //Terms Modal
  $ionicModal.fromTemplateUrl('templates/coach-modal/static-page.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  });
  $scope.staticModal = function (id) {
    $scope.staticData = '';
    $scope.myPopup.close();
    $scope.showLoading('Loading...', 15000);
    MyServices.getStatic(id, function (data) {
      if (data.value === true) {
        $scope.staticData = data.data;
        $scope.hideLoading();
      } else {
        $scope.hideLoading();
        $scope.showLoading('Loading Failed', 2000);
      }
    });
    $scope.modal.show();
  };
  $scope.closeModal = function () {
    $scope.modal.hide();
  };
})

.controller('CoachLoginCtrl', function ($scope, $ionicModal, $timeout, $ionicHistory, $ionicLoading, MyServices, $state) {
  $ionicHistory.clearCache();
  $ionicHistory.clearHistory();
  $ionicHistory.removeBackView();

  //Forgot Password
  $ionicModal.fromTemplateUrl('templates/coach-modal/forgot-password.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function () {
    $scope.modal.show();
  };
  $scope.closeModal = function () {
    $scope.modal.hide();
  };
  //Forgot End Password

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
  //Coach Sign Modal End


  $scope.validEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  //Loading
  $scope.showLoading = function (value, time) {
    $ionicLoading.show({
      template: value,
      duration: time
    });
  };
  $scope.hideLoading = function () {
    $ionicLoading.hide();
  };

  $scope.callAPI = function (formData) {
    MyServices.login(formData, function (data) {
      if (data.value === true) {
        $scope.formData = {};
        $scope.hideLoading();
        $scope.showLoading('Login Successful', 2000);
        MyServices.setCoachUser(data.data);
        $scope.modal3.hide();
        $state.go('app.coach-profile');
        MyServices.setAccessType("Coach");
      } else {
        $scope.hideLoading();
        $scope.showLoading(data.data.message, 2000);
      }
    });
  };
  //Submit Form
  $scope.submitData = function (formData) {
    $scope.showLoading('Please wait...', 15000);
    if (window.plugins) {
      if (window.plugins.OneSignal) {
        window.plugins.OneSignal.getIds(function (ids) {
          console.log(ids.userId);
          formData.deviceId = ids.userId;
          if (formData.deviceId) {
            $scope.callAPI(formData);
          } else {
            $scope.callAPI(formData);
          }
        });
      }
    } else {
      $scope.callAPI(formData);
    }

  };
})

.controller('CoachProfileCtrl', function ($scope, $ionicScrollDelegate, $ionicHistory, $rootScope, MyServices, $ionicLoading) {
  $ionicHistory.clearCache();
  $ionicHistory.clearHistory();
  $ionicHistory.removeBackView();
  $scope.profileData = MyServices.getUser();
  console.log($scope.profileData);
  //Loading
  $scope.showLoading = function (value, time) {
    $ionicLoading.show({
      template: value,
      duration: time
    });
  };
  $scope.hideLoading = function () {
    $ionicLoading.hide();
  };

  //Reload Profile
  $scope.reloadProfile = function () {
    MyServices.getProfileCoach($scope.profileData, function (data) {
      if (data.value === true) {
        MyServices.setCoachUser(data.data);
        $scope.$broadcast('scroll.refreshComplete');
      } else {
        $scope.$broadcast('scroll.refreshComplete');
        $scope.showLoading('Error Updating Profile', 1000);
      }
    });
  };
  $scope.reloadProfile();

  //Profile Incomplete Check
  $scope.profileIncomplete = function () {
    if (!$scope.profileData.experience || !$scope.profileData.expertise || !$scope.profileData.achievements) {
      return true;
    } else {
      return false;
    }
  };
  // console.log($scope.profileData);
  var i = 0;
  var coach = $scope.profileData._id;
  $scope.showCoachNotification = function (coach) {
    $scope.totalItems = undefined;
    $scope.coachnotifications = undefined;
    $scope.currentPage = 1;
    MyServices.getCoachNotification({
      Id: coach,
      page: $scope.currentPage
    }, ++i, function (response, ini) {
      if (ini == i) {
        if (response.value == true) {
          $scope.isAthlete = false;
          $scope.coachnotifications = response.data.results;
          $scope.notificationCount = response.data.unreadcount;
          $scope.maxRow = response.data.count;
          $scope.totalItems = response.data.total;

        } else {
          $scope.coachnotifications = [];
        }
      }

    })
  };

  $scope.showCoachNotification(coach);



})


.controller('CoachEditProfileCtrl', function ($scope, $state, MyServices, $ionicModal, $filter, $ionicLoading, $cordovaFileTransfer, $cordovaCamera) {
  $scope.editData = MyServices.getUser();
  $scope.editData.dob = new Date($scope.editData.dob);
  $scope.dummyPassword = '12345678';

  if ($scope.editData.specialisationOther) {
    $scope.editData.specialisations.otherVal = true;
  }
  //Toggle Other Specialisations
  $scope.toggleOthers = function () {
    if ($scope.editData.specialisations.otherVal === true) {
      $scope.editData.specialisationOther = 'Others';
    } else {
      $scope.editData.specialisationOther = '';
    }
  };

  $scope.coachingFocus = [
    'Sprinting', 'Middle Distance', 'Endurance', 'Throws', 'Jumps', 'Hurdles', 'Race Walking', 'Hill/Fell Running', 'Cross Country', 'Triathlon'
  ];

  $scope.specialisations = [
    'Coaching athletes with a disability', 'Coaching female athletes', 'Eating disorders', 'First aid', 'Long-term athlete development', 'Mentored practice', 'Strength and conditioning', 'Fitness in Running and Walking', 'Children in Athletics'
  ];

  $scope.maxDate = $filter('date')(new Date(), 'yyyy-MM-dd');

  $scope.gender = ['Male', 'Female'];

  $scope.credentials = ['Level 1', 'Level 2', 'Level 3', 'Level 4'];

  $scope.onlyAplha = /^[a-zA-Z_]+$/;
  $scope.validTel = /^[+0-9]{10,15}$/;
  $scope.validNum = /^[0-9]+$/;

  MyServices.getCountries(function (data) {
    $scope.countries = data;
  });

  //Loading
  $scope.showLoading = function (value, time) {
    $ionicLoading.show({
      template: value,
      duration: time
    });
  };
  $scope.hideLoading = function () {
    $ionicLoading.hide();
  };


  //Profile Incomplete Check
  $scope.profileIncomplete = function () {
    if (!$scope.editData.experience || !$scope.editData.expertise || !$scope.editData.achievements) {
      return true;
    } else {
      return false;
    }
  };

  //Password Validator
  $scope.passwordData = {};
  $scope.valid1 = false;
  $scope.valid2 = false;
  $scope.passwordValidator = function (password) {
    $scope.passwordInvalid = true;
    if (password && password.length >= 8 && password.length <= 15) {
      $scope.valid1 = true;
    } else {
      $scope.valid1 = false;
    }
    if (/([a-zA-Z])/.test(password) && /([0-9])/.test(password)) {
      $scope.valid2 = true;
    } else {
      $scope.valid2 = false;
    }
    if ($scope.valid1 && $scope.valid2) {
      $scope.passwordInvalid = false;
    } else {
      $scope.passwordInvalid = true;
    }
  };

  //Submit Form
  $scope.submitData = function (formData) {
    $scope.showLoading('Please wait...', 15000);
    MyServices.editProfileCoach(formData, function (data) {
      if (data.value === true) {
        $scope.hideLoading();
        MyServices.setCoachUser(data.data);
        $scope.showLoading('Profile Updated', 2000);
        $state.go('app.coach-profile');
      } else {
        $scope.hideLoading();
        $scope.showLoading('Profile is not updated,please try again', 2000);
      }
    });
  };

  MyServices.getCountries(function (data) {
    $scope.countries = data;
  });

  $ionicModal.fromTemplateUrl('templates/coach-modal/password.html', {
    id: 1,
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modalPassword = modal;
  });

  $ionicModal.fromTemplateUrl('templates/coach-modal/price.html', {
    id: 2,
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modalPrice = modal;
  });

  $ionicModal.fromTemplateUrl('templates/coach-modal/coaching-limit.html', {
    id: 3,
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modalLimit = modal;
  });

  // Update Password
  $scope.passwordData = {};
  $scope.changePassword = function () {
    $scope.passwordData.accessToken = $scope.editData.accessToken;
    $scope.modalPassword.show();
  };
  $scope.submitPassword = function (formData) {
    $scope.showLoading('Please wait...', 15000);
    MyServices.changePasswordCoach(formData, function (data) {
      if (data.value === true) {
        $scope.passwordData = {};
        $scope.hideLoading();
        $scope.showLoading('Password is Updated', 2000);
        $state.go('app.coach-profile');
        $scope.closeModal();
      } else {
        $scope.hideLoading();
        $scope.showLoading('Password is not updated,please try again', 2000);
      }
    });
  };

  $scope.closeModal = function () {
    $scope.modalPassword.hide();
    $scope.modalPrice.hide();
    $scope.modalLimit.hide();
  };

  //Update Price
  $scope.priceData = {};
  $scope.changePrice = function () {
    $scope.priceData.coachAskingPrice = $scope.editData.coachAskingPrice;
    $scope.modalPrice.show();
  };
  $scope.rangePrice = function (val) {
    var intVal = parseInt(val);
    if (intVal >= 1 && intVal <= 500) {
      $scope.priceData.coachAskingPrice = intVal;
    }
  };
  $scope.submitPrice = function (data) {
    $scope.editData.coachAskingPrice = data.coachAskingPrice;
    $scope.submitData($scope.editData);
  };

  //Update Coaching Limit
  $scope.limitData = {};
  $scope.changeLimit = function () {
    $scope.limitData.coachingLimit = $scope.editData.coachingLimit;
    $scope.modalLimit.show();
  };
  $scope.rangeLimit = function (val) {
    var intVal = parseInt(val);
    if (intVal >= 1 && intVal <= 200) {
      $scope.limitData.coachingLimit = intVal;
    }
  };
  $scope.submitLimit = function (data) {
    $scope.editData.coachingLimit = data.coachingLimit;
    console.log($scope.editData);
    $scope.submitData($scope.editData);
  };

  // Upload Profile Pic
  $scope.selectImage = function () {
    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
    $cordovaCamera.getPicture(options).then(function (imageURI) {
      $scope.profileImage = imageURI;
      $scope.uploadImage($scope.profileImage);
    }, function (err) {
      // error
    });
  };

  //Upload Image
  $scope.uploadImage = function (imageURI) {
    $scope.showLoading('Uploading Image...', 10000);
    $cordovaFileTransfer.upload(adminurl + 'upload', imageURI)
      .then(function (result) {
        // Success!
        console.log(result.response);
        result.response = JSON.parse(result.response);
        $scope.editData.profilePic = result.response.data[0];
        $scope.submitData($scope.editData);
      }, function (err) {
        // Error
        $scope.hideLoading();
        $scope.showLoading('Error', 2000);
      }, function (progress) {
        // constant progress updates
      });
  };

})

.controller('CoachBlogCtrl', function ($scope, $ionicModal, MyServices, $ionicLoading, $ionicPopup) {
  $scope.currentPage = 1;
  var i = 0;
  $scope.allBlog = [];
  $scope.search = {
    keyword: ""
  };
  $scope.more = {
    Data: true
  };

  //Loading
  $scope.showLoading = function (value, time) {
    $ionicLoading.show({
      template: value,
      duration: time
    });
  };
  $scope.hideLoading = function () {
    $ionicLoading.hide();
  };


  //On Change Search Function
  $scope.searchChange = function (keywordChange) {
    if (keywordChange === '') {
      $scope.allBlog = [];
      $scope.showAllBlog(keywordChange);
    } else {
      $scope.showAllBlog(keywordChange);
    }
  };

  //Get All blog
  $scope.showAllBlog = function (keywordChange) {
    if (keywordChange) {
      $scope.currentPage = 1;
      $scope.allBlog = [];
    }
    MyServices.searchBlog({
      page: $scope.currentPage,
      keyword: $scope.search.keyword
    }, ++i, function (data, ini) {
      if (ini == i) {
        if (data.value) {
          _.forEach(data.data.results, function (value) {
            $scope.allBlog.push(value);
          });
          $scope.totalItems = data.data.total;
          if ($scope.totalItems > $scope.allBlog.length) {
            $scope.currentPage++;
            $scope.$broadcast('scroll.infiniteScrollComplete');
          } else {
            $scope.more.Data = false;
          }
        } else {
          $scope.showLoading('Error Loading Blogs', 2000);
        }
      }
    });
  };

  //Load More
  $scope.loadMore = function () {
    // $scope.more.Data = false;
    console.log('Load More');
    $scope.showAllBlog();
  };
})

.controller('CoachBlogDetailCtrl', function ($scope, $ionicModal, $ionicLoading, MyServices, $ionicPopup, $stateParams, $filter, $state) {
  $scope.formData = {};
  $scope.selectAthlete = {};
  $scope.blogId = $stateParams.id;

  //Loading
  $scope.showLoading = function (value, time) {
    $ionicLoading.show({
      template: value,
      duration: time
    });
  };
  $scope.hideLoading = function () {
    $ionicLoading.hide();
  };

  $scope.showLoading('Please wait...', 15000);

  //Select Athletes
  $ionicModal.fromTemplateUrl('templates/coach-modal/add-athlete.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  });
  $scope.closeModal = function () {
    $scope.modal.hide();
  };
  $scope.addAthlete = function () {
    $scope.modal.show();
    $scope.getAthlete('');
  };
  //Search Athlete API
  var j = 0;

  $scope.getAthlete = function (search) {
    $scope.athletes = [];
    MyServices.searchAthlete({
      keyword: search
    }, ++j, function (data, ci) {
      if (ci == j) {
        _.each(data.data.results, function (key) {
            $scope.athletes.push(key.athlete);
          })
          // $scope.athletes = data.data.results;
      }
    });
  };
  //Remove Selected Athlete
  $scope.removeAthlete = function (pos) {
    $scope.formData.athlete.splice(pos, 1);
  };
  //Match Selected
  $scope.matchAthlete = function () {
    $scope.formData.newathlete = $scope.selectAthlete.array;
  };

  //Loading
  $scope.showLoading = function (value, time) {
    $ionicLoading.show({
      template: value,
      duration: time
    });
  };
  $scope.hideLoading = function () {
    $ionicLoading.hide();
  };

  //Submit Form
  $scope.submitData = function (formData) {
    if (formData.newathlete) {
      formData.athlete = _.map($scope.formData.newathlete, function (key) {
        return key._id;
      });
    }
    $scope.showLoading('Please wait...', 15000);
    MyServices.updateBlog(formData, function (data) {
      if (data.value === true) {
        $scope.hideLoading();
        $scope.showLoading('Coach Updates shared successfully', 2000);
        $state.go('app.coach-blog');
      } else {
        $scope.hideLoading();
        // $scope.showLoading('Error Editing Coach Updates', 2000);
      }
    });
  };

  //get one edit
  if ($stateParams.id) {
    MyServices.getOneBlog({
      _id: $stateParams.id
    }, function (response) {
      if (response.data) {
        $scope.hideLoading();
        $scope.formData = response.data;
        $scope.selectAthlete.array = $scope.formData.newathlete = response.data.athlete;
      } else {
        $scope.formData = {};
      }
    });
  }

  //Delete Popup
  $scope.deletePop = function (id) {
    $scope.myPopup = $ionicPopup.show({
      template: '<p>Are you sure want to delete the blog?</p>',
      title: 'Confirmation Message',
      scope: $scope,
      buttons: [{
        text: 'No'
      }, {
        text: '<b>Yes</b>',
        type: 'button-positive',
        onTap: function (e) {
          $scope.deleteBlog(id);
        }
      }]
    });
  };
  $scope.deleteBlog = function (id) {
    $scope.showLoading("Loading...", 10000);
    if (id) {
      MyServices.deleteBlog({
        _id: id
      }, function (data) {
        if (data.value) {
          $scope.hideLoading();
          $scope.showLoading("Blog Deleted", 2000);
          $state.go('app.coach-blog');

        } else {
          $scope.hideLoading();
          $scope.showLoading("Error Deleting Blog", 2000);
        }
      });
    }
  };

})

.controller('CoachCompetitionCtrl', function ($scope, $ionicModal, MyServices, $ionicLoading, $ionicPopup) {
  $scope.currentPage = 1;
  var i = 0;
  $scope.allCompetition = [];
  $scope.search = {
    keyword: ""
  };
  $scope.more = {
    Data: true
  };

  //Loading
  $scope.showLoading = function (value, time) {
    $ionicLoading.show({
      template: value,
      duration: time
    });
  };
  $scope.hideLoading = function () {
    $ionicLoading.hide();
  };


  //On Change Search Function
  $scope.searchChange = function (keywordChange) {
    if (keywordChange === '') {
      $scope.allCompetition = [];
      $scope.showAllCompetition(keywordChange);
    } else {
      $scope.showAllCompetition(keywordChange);
    }
  };

  //Get All Competiton
  $scope.showAllCompetition = function (keywordChange) {
    if (keywordChange) {
      $scope.currentPage = 1;
      $scope.allCompetition = [];
    }
    MyServices.searchCompetition({
      page: $scope.currentPage,
      keyword: $scope.search.keyword
    }, ++i, function (data, ini) {
      if (ini == i) {
        if (data.value) {
          _.forEach(data.data.results, function (value) {
            $scope.allCompetition.push(value);
          });
          $scope.totalItems = data.data.total;
          if ($scope.totalItems > $scope.allCompetition.length) {
            $scope.currentPage++;
            $scope.$broadcast('scroll.infiniteScrollComplete');
          } else {
            $scope.more.Data = false;
          }
        } else {
          $scope.showLoading('Error Loading Competitions', 2000);
        }
      }
    });
  };

  //Load More
  $scope.loadMore = function () {
    // $scope.more.Data = false;
    console.log('Load More');
    $scope.showAllCompetition();
  };

  //Delete Popup
  $scope.deletePop = function (id) {
    $scope.myPopup = $ionicPopup.show({
      template: '<p>Are you sure want to delete the competition?</p>',
      title: 'Confirmation Message',
      scope: $scope,
      buttons: [{
        text: 'No'
      }, {
        text: '<b>Yes</b>',
        type: 'button-positive',
        onTap: function (e) {
          $scope.deleteCompetition(id);
        }
      }]
    });
  };
  $scope.deleteCompetition = function (id) {
    $scope.showLoading("Loading...", 10000);
    if (id) {
      MyServices.deleteCompetition({
        _id: id
      }, function (data) {
        if (data.value) {
          $scope.allCompetition = [];
          $scope.showAllCompetition();
          $scope.hideLoading();
          $scope.showLoading("Competition Deleted", 2000);
        } else {
          $scope.hideLoading();
          $scope.showLoading("Error Deleting Competition", 2000);
        }
      });
    }
  };
})

.controller('CoachCompetitionCreateCtrl', function ($scope, $ionicModal, $ionicLoading, MyServices, $ionicPopup, $stateParams, $filter, $state) {
  $scope.title = 'Create';
  //$scope.selectAthlete = {};
  $scope.selectTrainingPlan = {};
  $scope.selectTrainingPlan.array = [];
  $scope.formData = {
    iskey: false
  };
  $scope.today = $filter('date')(new Date(), 'yyyy-MM-dd');

  //Match start date & end date
  $scope.matchDate = function () {
    $scope.formData.endDate = $scope.formData.startDate;
  };

  //Select Athletes Modal 
  // $ionicModal.fromTemplateUrl('templates/coach-modal/add-athlete.html', {
  //   scope: $scope,
  //   animation: 'slide-in-up'
  // }).then(function (modal) {
  //   $scope.modal = modal;
  // });
  // $scope.closeModal = function () {
  //   $scope.modal.hide();
  // };
  // $scope.addAthlete = function () {
  //   $scope.modal.show();
  //   $scope.getAthlete('');
  // };

  $ionicModal.fromTemplateUrl('templates/coach-modal/add-trainingPlan.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  });
  $scope.closeModal = function () {
    $scope.modal.hide();
  };
  $scope.addTrainingPlan = function () {
    $scope.modal.show();
    $scope.getTrainingPlan('');
  };
  //Search Athlete API
  var j = 0;
  $scope.getTrainingPlan = function (search) {
    MyServices.searchTrainingPlan({
      keyword: search
    }, function (data) {
      if (data.value) {
        $scope.trainingPlan = data.data.results;
      }
    });
  };
  //Remove Selected Athlete
  // $scope.removeAthlete = function (pos) {
  //   $scope.formData.athlete.splice(pos, 1);
  // };
  //Match Selected
  // $scope.matchAthlete = function () {
  //   $scope.formData.athlete = $scope.selectAthlete.array;
  // };

  $scope.removeTrainingPlan = function (pos) {
    $scope.formData.masterTrainingPlan.splice(pos, 1);
  };
  $scope.formData.masterTrainingPlan = [];
  $scope.matchTrainingPlan = function (data) {
    console.log(data);
    //_.assign($scope.formData.trainingPlan, data)
    $scope.formData.masterTrainingPlan = data;
  };

  //Loading
  $scope.showLoading = function (value, time) {
    $ionicLoading.show({
      template: value,
      duration: time
    });
  };
  $scope.hideLoading = function () {
    $ionicLoading.hide();
  };

  //Submit Form
  $scope.submitData = function (formData) {
    $scope.showLoading('Please wait...', 15000);
    MyServices.saveCompetition(formData, function (data) {
      if (data.value === true) {
        $scope.hideLoading();
        $scope.showLoading('Competition Created', 2000);
        $state.go('app.coach-competition');
      } else {
        $scope.hideLoading();
        $scope.showLoading(data.data.message, 2000);
      }
    });
  };

})

.controller('CoachCompetitionDetailCtrl', function ($scope, $ionicModal, $ionicLoading, MyServices, $ionicPopup, $stateParams, $filter, $state) {
  $scope.title = 'Edit';
  //$scope.formData = {};
  $scope.competitionId = $stateParams.id;
  //$scope.selectAthlete = {};
  $scope.selectTrainingPlan = {};
  $scope.selectTrainingPlan.array = [];
  $scope.formData = {};
  $scope.today = $filter('date')(new Date(), 'yyyy-MM-dd');

  //Match start date & end date
  $scope.matchDate = function () {
    $scope.formData.endDate = $scope.formData.startDate;
  };

  $ionicModal.fromTemplateUrl('templates/coach-modal/add-trainingPlan.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  });
  $scope.closeModal = function () {
    $scope.modal.hide();
  };
  $scope.addTrainingPlan = function () {
    $scope.modal.show();
    $scope.getTrainingPlan('');
  };
  //Search Athlete API
  var j = 0;
  $scope.getTrainingPlan = function (search) {
    MyServices.searchTrainingPlan({
      keyword: search
    }, function (data) {
      if (data.value) {
        $scope.trainingPlan = data.data.results;
      }
    });
  };
  //Remove Selected Athlete
  // $scope.removeAthlete = function (pos) {
  //   $scope.formData.athlete.splice(pos, 1);
  // };
  //Match Selected
  // $scope.matchAthlete = function () {
  //   $scope.formData.athlete = $scope.selectAthlete.array;
  // };

  $scope.removeTrainingPlan = function (pos) {
    $scope.formData.trainingPlan.splice(pos, 1);
  };
  $scope.formData.trainingPlan = [];
  $scope.matchTrainingPlan = function (data) {
    console.log(data);
    //_.assign($scope.formData.trainingPlan, data)
    $scope.formData.trainingPlan = data;
  };

  //Loading
  $scope.showLoading = function (value, time) {
    $ionicLoading.show({
      template: value,
      duration: time
    });
  };
  $scope.hideLoading = function () {
    $ionicLoading.hide();
  };

  //Submit Form
  $scope.submitData = function (formData) {
    $scope.showLoading('Please wait...', 15000);
    MyServices.updateCompetition(formData, function (data) {
      if (data.value === true) {
        $scope.hideLoading();
        $scope.showLoading('Competition Updated', 2000);
        $state.go('app.coach-competition');
      } else {
        $scope.hideLoading();
        $scope.showLoading('Error Editing Competition', 2000);
      }
    });
  };

  //get one edit
  if ($stateParams.id) {
    MyServices.getOneCompetition({
      _id: $stateParams.id
    }, function (response) {
      if (response.data) {
        $scope.formData = response.data;
        $scope.selectTrainingPlan.array = $scope.formData.trainingPlan = response.data.masterTrainingPlan;
        if ($scope.formData.startDate) {
          $scope.formData.startDate = new Date($scope.formData.startDate);
          $scope.formData.endDate = new Date($scope.formData.endDate);
        }
      } else {
        $scope.formData = {};
      }
    });
  }

  //Delete Popup
  $scope.deletePop = function (id) {
    $scope.myPopup = $ionicPopup.show({
      template: '<p>Are you sure want to delete the competition?</p>',
      title: 'Confirmation Message',
      scope: $scope,
      buttons: [{
        text: 'No'
      }, {
        text: '<b>Yes</b>',
        type: 'button-positive',
        onTap: function (e) {
          $scope.deleteCompetition(id);
        }
      }]
    });
  };
  $scope.deleteCompetition = function (id) {
    $scope.showLoading("Loading...", 10000);
    if (id) {
      MyServices.deleteCompetition({
        _id: id
      }, function (data) {
        if (data.value) {
          $scope.hideLoading();
          $scope.showLoading("Competition Deleted", 2000);
          $state.go('app.coach-competition');

        } else {
          $scope.hideLoading();
          $scope.showLoading("Error Deleting Competition", 2000);
        }
      });
    }
  };

})

.controller('CoachTestingCtrl', function ($scope, $ionicModal, MyServices, $ionicLoading, $ionicPopup) {
  $scope.currentPage = 1;
  var i = 0;
  $scope.allTest = [];
  $scope.search = {
    keyword: ""
  };
  $scope.more = {
    Data: true
  };

  //Loading
  $scope.showLoading = function (value, time) {
    $ionicLoading.show({
      template: value,
      duration: time
    });
  };
  $scope.hideLoading = function () {
    $ionicLoading.hide();
  };

  //On Change Search Function
  $scope.searchChange = function (keywordChange) {
    if (keywordChange === '') {
      $scope.allTest = [];
      $scope.showAllTest(keywordChange);
    } else {
      $scope.showAllTest(keywordChange);
    }
  };

  $scope.showAllTest = function (keywordChange) {
    if (keywordChange) {
      $scope.currentPage = 1;
      $scope.allTest = [];
    }
    MyServices.searchTest({
      page: $scope.currentPage,
      keyword: $scope.search.keyword
    }, ++i, function (data, ini) {
      if (ini == i) {
        if (data.value) {
          _.forEach(data.data.results, function (value) {
            $scope.allTest.push(value);
          });
          $scope.totalItems = data.data.total;
          if ($scope.totalItems > $scope.allTest.length) {
            $scope.currentPage++;
            $scope.$broadcast('scroll.infiniteScrollComplete');
          } else {
            $scope.more.Data = false;
          }
        } else {
          $scope.showLoading('Error Loading Test', 2000);
        }
      }
    });
  };

  //Load More
  $scope.loadMore = function () {
    // $scope.more.Data = false;
    console.log('Load More');
    $scope.showAllTest();
  };

  //Delete Popup
  $scope.deletePop = function (id) {
    $scope.myPopup = $ionicPopup.show({
      template: '<p>Are you sure want to delete the test?</p>',
      title: 'Confirmation Message',
      scope: $scope,
      buttons: [{
        text: 'No'
      }, {
        text: '<b>Yes</b>',
        type: 'button-positive',
        onTap: function (e) {
          $scope.deleteTest(id);
        }
      }]
    });
  };
  $scope.deleteTest = function (id) {
    $scope.showLoading("Loading...", 10000);
    if (id) {
      MyServices.deleteTest({
        _id: id
      }, function (data) {
        if (data.value) {
          $scope.allTest = [];
          $scope.showAllTest();
          $scope.hideLoading();
          $scope.showLoading("Test Deleted", 2000);
        } else {
          $scope.hideLoading();
          $scope.showLoading("Error Deleting Test", 2000);
        }
      });
    }
  };
})

.controller('CoachTestingCreateCtrl', function ($scope, $ionicModal, $ionicLoading, MyServices, $ionicPopup, $stateParams, $filter, $state) {
  $scope.title = 'Create';
  //$scope.selectAthlete = {};
  $scope.selectTrainingPlan = {};
  $scope.selectTrainingPlan.array = [];
  $scope.formData = {};
  $scope.today = $filter('date')(new Date(), 'yyyy-MM-dd');

  //Match start date & end date
  $scope.matchDate = function () {
    $scope.formData.endDate = $scope.formData.startDate;
  };

  $ionicModal.fromTemplateUrl('templates/coach-modal/add-trainingPlan.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  });
  $scope.closeModal = function () {
    $scope.modal.hide();
  };
  $scope.addTrainingPlan = function () {
    $scope.modal.show();
    $scope.getTrainingPlan('');
  };
  //Search Athlete API
  var j = 0;
  $scope.getTrainingPlan = function (search) {
    MyServices.searchTrainingPlan({
      keyword: search
    }, function (data) {
      if (data.value) {
        $scope.trainingPlan = data.data.results;
      }
    });
  };

  $scope.removeTrainingPlan = function (pos) {
    $scope.formData.masterTrainingPlan.splice(pos, 1);
  };
  $scope.formData.masterTrainingPlan = [];
  $scope.matchTrainingPlan = function (data) {
    console.log(data);
    //_.assign($scope.formData.trainingPlan, data)
    $scope.formData.masterTrainingPlan = data;
  };

  //Loading
  $scope.showLoading = function (value, time) {
    $ionicLoading.show({
      template: value,
      duration: time
    });
  };
  $scope.hideLoading = function () {
    $ionicLoading.hide();
  };

  //Submit Form
  $scope.submitData = function (formData) {
    // if (formData.newathlete) {
    //   formData.athlete = _.map($scope.formData.newathlete, function (key) {
    //     return key._id;
    //   });
    // }
    $scope.showLoading('Please wait...', 15000);
    MyServices.saveTest(formData, function (data) {
      if (data.value === true) {
        $scope.hideLoading();
        $scope.showLoading('Test Created', 2000);
        $state.go('app.coach-testing');
      } else {
        $scope.hideLoading();
        $scope.showLoading(data.data.message, 2000);
      }
    });
  };
})

.controller('CoachTestingDetailCtrl', function ($scope, $ionicModal, $ionicLoading, MyServices, $ionicPopup, $stateParams, $filter, $state) {
  $scope.title = 'Edit';
  //$scope.formData = {};
  $scope.testId = $stateParams.id;
  //$scope.selectAthlete = {};
  $scope.selectTrainingPlan = {};
  $scope.selectTrainingPlan.array = [];
  $scope.formData = {};
  $scope.today = $filter('date')(new Date(), 'yyyy-MM-dd');

  //Match start date & end date
  $scope.matchDate = function () {
    $scope.formData.endDate = $scope.formData.startDate;
  };

  $ionicModal.fromTemplateUrl('templates/coach-modal/add-trainingPlan.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  });
  $scope.closeModal = function () {
    $scope.modal.hide();
  };
  $scope.addTrainingPlan = function () {
    $scope.modal.show();
    $scope.getTrainingPlan('');
  };
  //Search Athlete API
  var j = 0;
  $scope.getTrainingPlan = function (search) {
    MyServices.searchTrainingPlan({
      keyword: search
    }, function (data) {
      if (data.value) {
        $scope.trainingPlan = data.data.results;
      }
    });
  };
  //Remove Selected Athlete
  // $scope.removeAthlete = function (pos) {
  //   $scope.formData.athlete.splice(pos, 1);
  // };
  //Match Selected
  // $scope.matchAthlete = function () {
  //   $scope.formData.athlete = $scope.selectAthlete.array;
  // };

  $scope.removeTrainingPlan = function () {
    // $scope.formData.trainingPlan.splice(pos, 1);
    $scope.formData.masterTrainingPlan = {};
  };
  $scope.formData.trainingPlan = [];
  $scope.matchTrainingPlan = function (data) {
    console.log(data);
    //_.assign($scope.formData.trainingPlan, data)
    $scope.formData.trainingPlan = data;
  };

  //Loading
  $scope.showLoading = function (value, time) {
    $ionicLoading.show({
      template: value,
      duration: time
    });
  };
  $scope.hideLoading = function () {
    $ionicLoading.hide();
  };

  //Submit Form
  $scope.submitData = function (formData) {
    if (formData.newathlete) {
      formData.athlete = _.map($scope.formData.newathlete, function (key) {
        return key._id;
      });
    }
    $scope.showLoading('Please wait...', 15000);
    MyServices.updateTest(formData, function (data) {
      if (data.value === true) {
        $scope.hideLoading();
        $scope.showLoading('Test Updated', 2000);
        $state.go('app.coach-testing');
      } else {
        $scope.hideLoading();
        $scope.showLoading('Error Editing Test', 2000);
      }
    });
  };

  //get one edit
  if ($stateParams.id) {
    MyServices.getOneTest({
      _id: $stateParams.id
    }, function (response) {
      if (response.data) {
        $scope.formData = response.data;
        $scope.selectTrainingPlan.array = $scope.formData.trainingPlan = response.data.masterTrainingPlan;
        if ($scope.formData.startDate) {
          $scope.formData.startDate = new Date($scope.formData.startDate);
          $scope.formData.endDate = new Date($scope.formData.endDate);
        }
      } else {
        $scope.formData = {};
      }
    });
  }

  //Delete Popup
  $scope.deletePop = function (id) {
    $scope.myPopup = $ionicPopup.show({
      template: '<p>Are you sure want to delete the test?</p>',
      title: 'Confirmation Message',
      scope: $scope,
      buttons: [{
        text: 'No'
      }, {
        text: '<b>Yes</b>',
        type: 'button-positive',
        onTap: function (e) {
          $scope.deleteTest(id);
        }
      }]
    });
  };
  $scope.deleteTest = function (id) {
    $scope.showLoading("Loading...", 10000);
    if (id) {
      MyServices.deleteTest({
        _id: id
      }, function (data) {
        if (data.value) {
          $scope.hideLoading();
          $scope.showLoading("Test Deleted", 2000);
          $state.go('app.coach-testing');

        } else {
          $scope.hideLoading();
          $scope.showLoading("Error Test Test", 2000);
        }
      });
    }
  };
})

.controller('CoachAnalyticsCtrl', function ($scope, $ionicModal) {
  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
})


.controller('CoachTrainingDiaryCtrl', function ($scope, $ionicModal, $ionicLoading, uiCalendarConfig, MyServices, $ionicScrollDelegate, $timeout, $filter, $location) {
  //Loading
  $scope.showLoading = function (value, time) {
    $ionicLoading.show({
      template: value,
      duration: time
    });
  };
  $scope.hideLoading = function () {
    $ionicLoading.hide();
  };

  //Select Athlete
  $ionicModal.fromTemplateUrl('templates/coach-modal/select-athlete.html', {
    id: 1,
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal2 = modal;
  });
  $scope.openSelect = function () {
    $scope.modal2.show();
    $scope.getAthlete('');
  };

  $scope.closeModal = function () {
    $scope.modal2.hide();
  };

  //Selector data
  $scope.formData = {};
  $scope.matchName = function (data) {
    $scope.formData = data;
    $scope.reloadData();
  };

  $scope.athleteData = [];
  $scope.paramData = {};
  $scope.userData = [];

  var j = 0;

  $scope.getsearch = function (search) {
    if (search) {
      $scope.paramData.keyword = search;
    }
    $scope.getAthlete();
  };

  // $scope.paramData.keyword = "";
  $scope.athleteDetails = [];

  $scope.getAthlete = function () {
    $scope.showLoading('Loading...', 20000);
    if ($.jStorage.get('userProfile')) {
      $scope.userData = $.jStorage.get('userProfile');
    }
    if ($scope.userData) {
      console.log("inside user");
      $scope.paramData.accessType = "Coach";
      $scope.paramData.accessToken = $scope.userData.accessToken[0];
      console.log($scope.paramData);
      MyServices.searchAthlete($scope.paramData, function (data) {
        if (data.value) {
          $scope.hideLoading();
          $scope.athletes = data.data.results;
          console.log($scope.athletes);
        }
      });
    }

  };

  $scope.reloadData = function () {
    $scope.phase = [];
    $scope.aspects = [];
    $scope.competitions = [];
    $scope.tests = [];
  };

  $scope.changeAthlete = function () {
    $scope.athleteData = [];
    $scope.showLoading('Loading...', 10000);
    MyServices.getAthletePlans($scope.athletes[0], function (data) {
      if (data.value === true) {
        $scope.hideLoading();
        console.log(data);
        if (data.data.TrainingPlan) {
          $scope.showPlan = true;
          $scope.trainingActivity = data.data.TrainingActivity;
          $scope.trainingPlan = data.data.TrainingPlan[0];
          $scope.trainingPhases = data.data.TrainingPlan[0].phase;
          $scope.generatePlan($scope.trainingPlan.startDate, $scope.trainingPhases, $scope.trainingActivity);
          $scope.generateDiaryPhases($scope.trainingPlan.startDate, $scope.trainingPhases);
          $scope.generateDiary(data.data.Aspect, data.data.Competition, data.data.Test);
          console.log($scope.trainingPlan.startDate);
          $scope.trainingDiary = [$scope.phase, $scope.aspects, $scope.competitions, $scope.tests];
          $timeout(function () {
            var todayScroll = new Date();
            $scope.todayScroll = 'scroll' + $filter('date')(todayScroll, 'ddMMyy');
            $scope.scrollTo($scope.todayScroll);
          }, 300);
        } else {
          $scope.showPlan = false;
        }
      } else {
        $scope.hideLoading();
        $scope.showLoading('Error loading Training Diary!', 2000);
        console.log(data);
      }
    });
  };
  $scope.athletes = [];

  $scope.athleteNoteData = {};
  //Feedback Modal
  $ionicModal.fromTemplateUrl('templates/athlete-modal/notes.html', {
    id: 1,
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.noteModal = modal;
  });
  $scope.openNotes = function (activity) {
    // console.log(activity);
    $scope.athleteNoteData = activity.athleteNoteData;
    $scope.coachNoteData = activity.coachNoteData;
    $scope.activityID = activity._id;
    $scope.userAthlete = true;
    $scope.showAthleteShared = true;
    $scope.noteModal.show();
  };
  $scope.closeNotes = function () {
    $scope.noteModal.hide();
    $scope.currentType = 'Shared';
    $scope.switchType($scope.currentType);
  };

  // Function for Save Notes

  //Note Switcher
  $scope.currentNote = 'Athlete';
  $scope.switchNote = function (val) {
    $scope.currentNote = val;
    $scope.currentType = 'Shared';
  };

  //Type Switcher
  $scope.currentType = 'Shared';
  $scope.switchType = function (val) {
    $scope.currentType = val;
    if (val === 'Personal') {
      $scope.showAthletePersonal = true;
      $scope.showAthleteShared = false;
    } else {
      $scope.showAthletePersonal = false;
      $scope.showAthleteShared = true;
    }
  };


  //Saving Notes
  $scope.saveAthleteNotes = function (notedata) {
      $scope.athleteData = MyServices.getUser();
      $scope.athleteNoteData.athleteId = $scope.athleteData._id,
        $scope.athleteNoteData.activityID = $scope.activityID,
        $scope.athleteNoteData.notesAthlete = {
          sharedNote: notedata.sharedNote,
          personalNote: notedata.personalNote
        }
      MyServices.saveNote($scope.athleteNoteData, function (data) {
        if (data.value == true) {
          $scope.closeNotes();
          console.log("Note saved successfully");
        } else {
          $scope.closeNotes();
          console.log("Error while saving Note.");

        }
      })
    }
    // Function for Save Notes End
    //Event Click Modal
  $ionicModal.fromTemplateUrl('templates/modal-event-click.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal1 = modal;
  });
  $scope.openEvent = function (event) {
    console.log(event);
    if (event.type == 'clickable') {
      $scope.eventInfo = event;
      $scope.modal1.show();
    }

  };
  $scope.closeEvent = function () {
    $scope.modal1.hide();
  };

  $scope.phase = [];
  $scope.generateDiaryPhases = function (startDate, data) {
    var k = 0;
    for (var i = 0; i < data.length; i++) {
      if (i % 2 == 1) {
        phaseType = 'phaseOdd';
      } else {
        phaseType = 'phaseEven';
      }
      for (var j = 0; j < data[i].duration; j++) {
        $scope.phase.push({
          type: 'phase',
          title: data[i].title,
          start: moment(startDate).add(k, 'week').toDate(),
          end: moment(startDate).add(++k, 'week').toDate(),
          className: phaseType,
          allDay: true,
          sort: "a"
        });
      }
    }
    console.log($scope.phase);
  };
  $scope.aspects = [];
  $scope.competitions = [];
  $scope.tests = [];

  $scope.generateDiary = function (aspects, competitions, tests) {
    for (var i = 0; i < aspects.length; i++) {
      $scope.aspects.push({
        type: 'clickable',
        title: aspects[i].name,
        start: moment(aspects[i].startDate).toDate(),
        end: moment(aspects[i].endDate).toDate(),
        details: aspects[i].details,
        className: ['aspects'],
        allDay: true,
        sort: "m"
      });
    }

    for (var j = 0; j < competitions.length; j++) {
      var compClass;
      var compSort;
      if (competitions[j].isKey === true) {
        compClass = 'keyCompetitions';
        compSort = "g";
      } else if (competitions[j].isKey === false) {
        compClass = "competitions";
        compSort = "h";
      }
      $scope.competitions.push({
        type: 'clickable',
        title: competitions[j].name,
        start: moment(competitions[j].startDate).toDate(),
        end: moment(competitions[j].endDate).toDate(),
        details: competitions[j].details,
        className: compClass,
        allDay: true,
        sort: compSort
      });
    }

    for (var k = 0; k < tests.length; k++) {
      $scope.tests.push({
        type: 'clickable',
        title: tests[k].name,
        start: moment(tests[k].startDate).toDate(),
        end: moment(tests[k].endDate).toDate(),
        details: tests[k].details,
        className: ['tests'],
        allDay: true,
        sort: "j"
      });
    }
  };


  $scope.generatePlan = function (startDate, phases, trainingActivity) {
    $scope.trainingPhasesData = [];
    var k = 0;

    for (var i = 0; i < phases.length; i++) {

      if (i % 2 == 1) {
        phaseType = 'tp-odd';
      } else {
        phaseType = 'tp-even';
      }

      for (var l = 0; l < phases[i].duration; l++) {

        $scope.trainingPhasesData.push({
          name: phases[i].title,
          phaseNumber: i + l + 1,
          className: phaseType,
          activities: []
        });

        var loopStart = 0 + k;
        var loopDuration = 7;
        var loopEnd = loopDuration + k;
        console.log('Loop Start', loopStart);
        console.log('Loop End', loopEnd);
        for (var j = loopStart; j < loopEnd; j++) {
          if (trainingActivity[j].name == 'Rest Day') {
            $scope.trainingPhasesData[l].activities.push({
              _id: trainingActivity[j]._id,
              name: trainingActivity[j].name,
              detail: 'No Training',
              volume: '',
              intensity: '',
              startDate: moment(startDate).add(j, 'days').toDate(),
              athleteNoteData: trainingActivity[j].notesAthlete,
              coachNoteData: trainingActivity[j].notesCoach
            });
          } else {
            $scope.trainingPhasesData[l].activities.push({
              _id: trainingActivity[j]._id,
              name: trainingActivity[j].name,
              detail: trainingActivity[j].detail,
              volume: trainingActivity[j].volume,
              intensity: trainingActivity[j].intensity,
              startDate: moment(startDate).add(j, 'days').toDate(),
              athleteNoteData: trainingActivity[j].notesAthlete,
              coachNoteData: trainingActivity[j].notesCoach
            });
          }
        }
        k = k + loopDuration;
      }
    }
    console.log($scope.trainingPhasesData);
  };

  $scope.formData = {};
  $scope.formData.ID = $.jStorage.get('userProfile')._id;
  $scope.showPlan = undefined;

  $scope.scrollTo = function (target) {
    $location.hash(target); //set the location hash
    var handle = $ionicScrollDelegate.$getByHandle('listScroll');
    handle.anchorScroll(true); // 'true' for animation
  };

  $scope.checkToday = function (data) {
    if ($scope.todayScroll == 'scroll' + $filter('date')(data, 'ddMMyy')) {
      return true;
    } else {
      return false;
    }
  };

  //View Switcher
  $scope.currentScreen = 'List';
  $scope.switchView = function (val) {
    if (val == 'Diary') {
      $scope.scrollTo('diaryId');
    } else if (val == 'List') {
      $scope.scrollTo($scope.todayScroll);
    }
    $scope.currentScreen = val;
  };

  // $scope.showLoading('Loading...', 10000);
  $scope.athleteData = [];
  $scope.trainingDiary = [];

  /* alert on eventClick */
  $scope.diaryClick = function (obj) {

  };

  /* Change View */
  $scope.activeView = 'month';
  $scope.changeView = function (view) {
    uiCalendarConfig.calendars.athleteDiary.fullCalendar('changeView', view);
    $scope.activeView = view;
  };

  //Navigate Buttons
  $scope.navigate = function (val) {
    uiCalendarConfig.calendars.athleteDiary.fullCalendar(val);
  };

  $scope.uiConfig = {
    calendar: {
      firstDay: 1,
      height: 450,
      editable: false,
      eventClick: $scope.openEvent,
      viewRender: function (view) {
        $scope.viewTitle = view.title;
      }
    }
  };
})

.controller('CoachAthletesCoachingCtrl', function ($scope, $ionicModal, MyServices, $stateParams) {
  $scope.profileData = MyServices.getUser();
  var coachId = $scope.profileData._id;
  var i = 0;
  $scope.search = {
    keyword: ""
  };
  if ($stateParams.keyword) {
    $scope.search.keyword = $stateParams.keyword;
  }
  $scope.changePage = function (page) {
    var goTo = "app.coach-athletes-coaching";
    if ($scope.search.keyword) {
      goTo = "app.coach-athletes-coaching";
    }
    $state.go(goTo, {
      page: page,
      keyword: $scope.search.keyword
    });
  };

  $scope.showAllNotification = function (coachId) {
    MyServices.getAllRequest({
      Id: coachId
    }, function (response) {
      if (response.value == true) {
        $scope.athletes = response.data;
        $scope.requestCount = $scope.athletes.length;
      }
    })
  }
  $scope.showAllNotification(coachId);

  $scope.getMyAthletes = function (keywordChange) {
    $scope.totalItems = undefined;
    $scope.athletecoaching = undefined;
    if (keywordChange) {
      $scope.currentPage = 1;
    }
    MyServices.getMyAthletes({
      page: $scope.currentPage,
      keyword: $scope.search.keyword
    }, ++i, function (response, ini) {
      if (ini == i) {
        if (response.value) {
          $scope.athletecoaching = response.data.results;
          $scope.totalItems = response.data.total;
          $scope.maxRow = response.data.options.count;
        } else {
          $scope.athletecoaching = [];
        }
      }
    });
  };
  $scope.getMyAthletes();
})

.controller('CoachAthletesRequestCtrl', function ($scope, $ionicModal, MyServices, $ionicPopup, $ionicLoading) {
  $scope.profileData = MyServices.getUser();

  $scope.reason = function (notificationId) {
    $scope.Id = notificationId;
    $scope.data = {};
    var myPopup = $ionicPopup.show({
      template: '<textarea auto-grow type="password" ng-model="data.reasonForRejection"><textarea>',
      title: '<h4>Reject Unsubscription!</h4>',
      subTitle: 'Please enter some reason',
      scope: $scope,
      buttons: [{
        text: 'Cancel'
      }, {
        text: '<b>Reject</b>',
        type: 'button-assertive',
        onTap: function (e) {
          $scope.rejectRequest($scope.data.message);
        }
      }, ]
    });
  };

  $scope.showLoading = function (value, time) {
    $ionicLoading.show({
      template: value,
      duration: time
    });
  };
  $scope.hideLoading = function () {
    $ionicLoading.hide();
  };
  var coachId = $scope.profileData._id;
  $scope.showAllNotification = function (coachId) {
    MyServices.getAllRequest({
      Id: coachId
    }, function (response) {
      if (response.value == true) {
        $scope.athletes = response.data;
        $scope.requestCount = $scope.athletes.length;
      }
    })
  }
  $scope.showAllNotification(coachId);

  $scope.rejectRequest = function (requestRejectData) {
    var athleteCoaching = {};
    athleteCoaching._id = $scope.Id;
    athleteCoaching.status = "Rejected";
    athleteCoaching.readRequestStatus = true;
    athleteCoaching.reason = requestRejectData
    $scope.acceptRejectRequest(athleteCoaching, 'reject');
  }

  $scope.acceptRequest = function (Id) {
    var athleteCoaching = {};
    athleteCoaching._id = Id;
    athleteCoaching.status = "Payment Pending";
    athleteCoaching.readRequestStatus = true;
    // athleteCoaching.acceptedDate = moment().format();
    $scope.acceptRejectRequest(athleteCoaching, 'accept');
  }

  $scope.acceptRejectRequest = function (athleteCoaching, data) {
    MyServices.updateAthleteCoaching(athleteCoaching, function (response) {
      $scope.showLoading('Loading...', 10000);
      if (response.value == true) {
        if (data == 'accept') {
          $scope.hideLoading();
          // toastr.success('Request accepted', 'Thank you');
        } else {
          // $scope.modalInstance.close();
          // toastr.success('Request Rejected', 'Thank you');
        }
        $scope.showAllNotification(coachId);
      }
    })
  }


})

.controller('CoachAthletesCoachingDetailCtrl', function ($scope, $ionicModal, $stateParams, MyServices, $ionicPopup) {
  $scope.unsubscribe = {};
  if ($stateParams.athleteId) {
    $scope.athleteCoaching = undefined;
    MyServices.getOneAthleteCoached({
      athleteId: $stateParams.athleteId
    }, function (response) {
      if (response.value) {
        $scope.athleteCoaching = response.data;
      } else {
        $scope.athleteCoaching = [];
      }
    })
  }
  $scope.reason = function (athleteCoachId, coachID) {
    $scope.unsubscribe._id = athleteCoachId;
    $scope.unsubscribe.coachID = coachID;
    $scope.data = {};
    var myPopup = $ionicPopup.show({
      template: '<textarea auto-grow type="password" ng-model="data.reasonForRejection"><textarea>',
      title: '<h4>Unsubscription!</h4>',
      subTitle: 'Please enter some reason',
      scope: $scope,
      buttons: [{
        text: 'Cancel'
      }, {
        text: '<b>Reject</b>',
        type: 'button-assertive',
        onTap: function (e) {
          $scope.unsubscribe.reason = $scope.data.reasonForRejection;
          $scope.rejectRequest();
        }
      }, ]
    });
  };

  $scope.rejectRequest = function () {
    $scope.unsubscribe.status = "Unsubscribe";
    MyServices.Unsubscribeathlete($scope.unsubscribe, function (response) {
      // if (response.value === true) {
      // } else {
      // }
    })
  }

})

.controller('CoachAthleteDetailCtrl', function ($scope, $ionicModal, $stateParams, MyServices, $ionicLoading) {
  $scope.showLoading = function (value, time) {
    $ionicLoading.show({
      template: value,
      duration: time
    });
  };
  $scope.hideLoading = function () {
    $ionicLoading.hide();
  };

  if ($stateParams.athleteId) {
    $scope.athleteProfile = undefined;
    MyServices.getOneAthleteProfile({
      _id: $stateParams.athleteId
    }, function (response) {
      $scope.showLoading('Loading...', 10000);
      if (response.value) {
        $scope.hideLoading();
        $scope.athleteProfile = response.data;
        // console.log($scope.athleteProfile)
      } else {
        $scope.athleteProfile = [];
      }
    })
  };
})

.controller('CoachNotificationsCtrl', function ($scope, $ionicModal, MyServices, $ionicScrollDelegate, $ionicPopup, $ionicLoading) {
  //Loading
  $scope.showLoading = function (value, time) {
    $ionicLoading.show({
      template: value,
      duration: time
    });
  };
  $scope.hideLoading = function () {
    $ionicLoading.hide();
  };

  $scope.showLoading('Loading...', 10000);
  $scope.profileData = MyServices.getUser();
  // $scope.notifications = [{
  //   name: 'Matt',
  //   surname: 'Chant',
  //   type: 'athleteUnsubscribe'
  // }, {
  //   name: 'Matt',
  //   surname: 'Chant',
  //   type: 'competition'
  // }];



  // console.log($scope.profileData);
  var i = 0;
  var coach = $scope.profileData._id;

  $scope.showCoachNotification = function (coach) {
    $scope.totalItems = undefined;
    $scope.coachnotifications = undefined;
    $scope.currentPage = 1;
    MyServices.getCoachNotification({
      Id: coach,
      page: $scope.currentPage
    }, ++i, function (response, ini) {
      if (ini == i) {
        if (response.value == true) {
          $scope.hideLoading();

          $scope.isAthlete = false;
          $scope.coachnotifications = response.data.results;
          $scope.notificationCount = response.data.unreadcount;
          $scope.maxRow = response.data.count;
          $scope.totalItems = response.data.total;

        } else {
          $scope.hideLoading();

          $scope.coachnotifications = [];
        }
      }

    });
  };

  // $scope.showCoachNotification(coach);

  $scope.readNotification = function () {
    $scope.totalItems = undefined;
    $scope.athletenotifications = undefined;
    $scope.coachnotifications = undefined;
    $scope.currentPage = 1;
    MyServices.readcoachNotification({
      Id: coach,
      page: $scope.currentPage
    }, ++i, function (response, ini) {
      if (ini == i) {
        if (response.value == true) {
          $scope.isAthlete = false;
          $scope.coachnotifications = response.data.results;
          $scope.notificationCount = response.data.unreadcount;
          $scope.maxRow = response.data.options.count;
          $scope.totalItems = response.data.total;
          $scope.showCoachNotification(coach);
        } else {
          $scope.coachnotifications = [];
        }
      }

    })
  }

  $scope.readNotification();

})


.controller('CoachChatCtrl', function ($scope, $ionicModal, $state, MyServices, $stateParams, $ionicLoading) {
  //Loading
  $scope.showLoading = function (value, time) {
    $ionicLoading.show({
      template: value,
      duration: time
    });
  };
  $scope.hideLoading = function () {
    $ionicLoading.hide();
  };
  $scope.showLoading("Loading...", 10000);
  $scope.coachProfile = MyServices.getUser();
  var coachId = $scope.coachProfile._id;
  var i = 0;
  $scope.search = {
    keyword: ""
  };
  if ($stateParams.keyword) {
    $scope.search.keyword = $stateParams.keyword;
  }
  //Get all athletes By coach
  $scope.getMyAthletes = function (keywordChange) {

    $scope.totalItems = undefined;
    $scope.athletes = undefined;
    if (keywordChange) {
      $scope.currentPage = 1;
    }
    MyServices.getMyAthletes({
      page: $scope.currentPage,
      keyword: $scope.search.keyword
    }, ++i, function (response, ini) {

      if (ini == i) {
        if (response.value) {
          $scope.chatathletes = response.data.results;
          console.log($scope.athletes);
          $scope.totalItems = response.data.total;
          $scope.maxRow = response.data.options.count;
        } else {
          $scope.athletes = [];
        }
      }
    });
  };

  $scope.getMyAthletes();

  //get all chats of coach
  $scope.getMyChats = function () {
    MyServices.getMyChats({
      coach: coachId
    }, function (response) {
      $scope.hideLoading();
      if (response.data != "No chat Found") {
        $scope.coachChats = response.data;
        $scope.athleteId = response.data[0].athleteId;
        //service to get unread chat count
        MyServices.getUnreadChatCount({
          athleteId: $scope.athleteId,
          coachId: coachId
        }, function (response) {
          if (response.data.UnreadCount.length > 0) {
            $scope.unreadcount = response.data.UnreadCount[0].count;
          }
          // $.jStorage.set('chatID', response.data.latestChat[0]._id);
        });
      } else {
        $scope.coachChats = [];
      }
    });
  };

  $scope.getMyChats();


  $ionicModal.fromTemplateUrl('templates/coach-modal/chat.html', {
    id: 1,
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modalChat = modal;
  });
  $scope.newChat = function () {
    $scope.modalChat.show();
  };

  $ionicModal.fromTemplateUrl('templates/coach-modal/group-chat.html', {
    id: 2,
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modalGroup = modal;
  });
  $scope.newGroupChat = function () {
    $scope.modalGroup.show();
  };

  $scope.closeModal = function () {
    $scope.modalGroup.hide();
    $scope.modalChat.hide();
  };

  $scope.startChat = function (athleteId, athleteName) {
    $scope.athleteId = athleteId;
    $scope.athleteName = athleteName;
    $state.go('app.coach-chatdetail', {
      id: athleteId,
      name: athleteName
    });
    $scope.modalChat.hide();
  };

})

.controller('CoachChatDetailCtrl', function ($scope, $state, $ionicScrollDelegate, $timeout, $stateParams, MyServices, $ionicLoading) {
  //Loading+
  $scope.messages = [];
  $scope.showLoading = function (value, time) {
    $ionicLoading.show({
      template: value,
      duration: time
    });
  };
  $scope.hideLoading = function () {
    $ionicLoading.hide();
  };
  $scope.showLoading("Loading...", 10000);
  $scope.coachProfile = MyServices.getUser();
  var coachId = $scope.coachProfile._id;
  $scope.chatData = {};

  $ionicScrollDelegate.scrollBottom();
  $scope.hideTime = true;

  $scope.timeStamp = function () {
    var d = new Date();
    d = d.toLocaleTimeString().replace(/:\d+ /, ' ');
    return d;
  };
  console.log($stateParams);
  var athleteId = $stateParams.id;
  $scope.myAthlete = $stateParams.name;


  io.socket.on("statusChangedToRead" + coachId + athleteId, function (data) {
    console.log("Read is called");
    // if ($state.current.name == "app.coach-chatdetail") {
    //   MyServices.getAllmessages($scope.chatData, function (data) {});
    // }
    $scope.messages = _.map($scope.messages, function (n) {
      n.sent = true;
      n.isRead = true;
      return n;
    });
    console.log(" $scope.messages", $scope.messages);
    $scope.$apply();
  });

  function updateReadStatus() {
    console.log("$scope.chatId =", $scope.chatId)
    MyServices.updateReadStatus({
      athleteId: athleteId,
      coachId: coachId,
      from: "athlete"
    }, function (response) {
      console.log('read');
    });
  }


  //Function to get chat id


  // Get all chat messages
  $scope.skip = 0;
  $scope.getAllMessages = function () {
    $scope.messages = [];
    $scope.chatData.coach = $scope.coachProfile._id;
    $scope.chatData.athlete = athleteId;
    $scope.chatData.skip = $scope.skip;
    MyServices.getAllmessages($scope.chatData, function (data) {
      $scope.hideLoading();
      if (data.data.length > 0) {
        $scope.chatMsgs = data.data[0].message;
        console.log($scope.chatMsgs);
        _.each($scope.chatMsgs, function (key) {
          if (key.from == "athlete") {
            $scope.messages.push({
              userId: 'he',
              message: key.message,
              time: key.time,
            });

            $scope.chatId = data.data[0]._id;
            updateReadStatus();

          } else if (key.from == "coach") {
            $scope.messages.push({
              userId: 'me',
              message: key.message,
              time: key.time,
              sent: true
            });
          }
        });

        //check if read or not
        _.each($scope.chatMsgs, function (key) {
          if (key.from == "coach" && key.isRead == true) {
            $scope.messages = _.map($scope.messages, function (n) {
              n.isRead = true;
              return n;
            });
          }
        })
      } else {
        $scope.messages = [];
      }

      //updateReadStatus();
      $ionicScrollDelegate.scrollBottom();
    });
  };

  $scope.getAllMessages();

  io.socket.on("chatAdded", function (data) {
    console.log(data);
    MyServices.getAllmessages($scope.chatData, function () {});
    var arr = _.filter($scope.messages, {
      randomVal: data.message.randomVal
    });
    console.log(arr);
    if (arr.length > 0) {
      $scope.messages = _.map($scope.messages, function (n) {
        if (n.randomVal == data.message.randomVal) {
          n.sent = true;
        }
        return n;
      });

    } else {
      data.message.messageObj.userId = "he";
      $scope.messages.push(data.message.messageObj);
      updateReadStatus();
    }
    $scope.$apply();
    $ionicScrollDelegate.scrollBottom();
  });

  io.socket.get(adminurl + "chat/getCoachSocket", {
    _id: $scope.coachProfile._id
  }, function (data) {


  });

  io.socket.on("statusChangedToRead", function (data) {
    $scope.messages = _.map($scope.messages, function (n) {
      n.isRead = true;
      return n;
    });
    // console.log("kjdfkljsadkfjsadf", $scope.messages);
    $scope.$apply();
  });

  //Send chat message from coach 
  $scope.sendMessage = function () {
    if ($scope.data.message !== '' && $scope.data.message) {
      var randomNo = _.random(0, 10000);
      var obj = _.cloneDeep($scope.data);
      var messageObj = {
        userId: 'me',
        message: obj.message,
        text: obj.message,
        time: $scope.timeStamp(),
        randomVal: randomNo
      };
      $scope.messages.push(messageObj);
      //$scope.data.message = "";
      $scope.data.message = undefined;
      $ionicScrollDelegate.scrollBottom();
      $scope.chatData.coach = $scope.coachProfile._id;
      $scope.chatData.athlete = athleteId;
      $scope.chatData.message = {
        message: obj.message,
        time: $scope.timeStamp(),
        from: "coach",
        randomVal: randomNo,
        messageObj: messageObj
      };
      $scope.chatData.sentMessageTo = "athlete";
      MyServices.sendChatMessages($scope.chatData, function (data) {
        console.log(data);
      });
    }

  };

  $scope.chatTap = function (m) {
    m.showTime = true;
    $timeout(function () {
      m.showTime = false;
    }, 4000);
  };
  $scope.openKb = function () {
    cordova.plugins.Keyboard.open();
  };

  $scope.data = {};
})



.controller('CoachChatGroupCtrl', function ($scope, $ionicScrollDelegate, $timeout) {

  $scope.hideTime = true;

  $scope.timeStamp = function () {
    var d = new Date();
    d = d.toLocaleTimeString().replace(/:\d+ /, ' ');
    return d;
  };

  $scope.sendMessage = function () {

    if ($scope.data.message !== '' && $scope.data.message) {
      console.log($scope.data.message);
      $scope.messages.push({
        userId: 'me',
        text: $scope.data.message,
        time: $scope.timeStamp()
      });

      delete $scope.data.message;
      $ionicScrollDelegate.scrollBottom();
    }

  };

  $scope.chatTap = function (m) {
    m.showTime = true;
    $timeout(function () {
      m.showTime = false;
    }, 4000);
  };
  $scope.openKb = function () {
    cordova.plugins.Keyboard.open();
  };

  $scope.data = {};
  $scope.messages = [{
    userId: 'he',
    name: 'Sachin',
    surname: 'Sachin',
    text: 'Hello! Welcome to Coach Mentor',
    time: $scope.timeStamp()
  }];

})
