angular.module('athleteController', ['starter.services', 'checklist-model', 'ui.calendar', 'ngCordova'])

  .controller('AthleteLoginCtrl', function ($scope, $state, $ionicPopup, MyServices, $ionicLoading, $ionicModal, $ionicHistory) {
    $ionicHistory.clearCache();
    $ionicHistory.clearHistory();
    $ionicHistory.removeBackView();
    //forgot password
    $ionicModal.fromTemplateUrl('templates/athlete-modal/forgot-password.html', {
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
    //forgot password end
    //Signup 
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
    //Signup end
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

    //athlete Login function start
    $scope.callAPI = function (formData) {
      MyServices.athletelogin(formData, function (data) {
        if (data.value === true) {
          $scope.formData = {};
          $scope.hideLoading();
          $scope.showLoading('Login Successful!', 2000);
          MyServices.setAthleteUser(data.data);
          $scope.modal1.hide();
          $state.go('app.athlete-profile');
          MyServices.setAccessType("Athlete");
        } else {
          $scope.hideLoading();
          $scope.showLoading(data.error.message, 2000);
        }
      });
    };
    //athlete Login function end
    //Submit Form
    $scope.submitData = function (formData) {
      $scope.showLoading('Please wait...', 15000);
      if (window.plugins) {
        if (window.plugins.OneSignal) {
          window.plugins.OneSignal.getIds(function (ids) {
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

  .controller('AthletePersonalGoalsCtrl', function ($scope, $state, $ionicPopup, MyServices, $ionicLoading, $ionicModal, $ionicHistory) {
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
    $scope.showLoading('Loading...', 15000);
    $scope.getPersonalGoals = function () {
      $scope.personalgoals = undefined;
      MyServices.getKeyAthleteCompetitions(function (data) {
        if (data.value) {
          $scope.hideLoading();
          $scope.personalgoals = data.data;
        } else {
          $scope.hideLoading();
          $scope.personalgoals = [];
        }
      });
    };
    $scope.getPersonalGoals();
  })


  .controller('AthleteForgotPasswordCtrl', function ($scope, $ionicModal, $timeout) {

  })

  .controller('AthleteProfileCtrl', function ($scope, $ionicScrollDelegate, $ionicModal, $ionicHistory, $rootScope, MyServices, $ionicLoading) {
    $ionicHistory.clearCache();
    $ionicHistory.clearHistory();
    $ionicHistory.removeBackView();
    $scope.profileData = MyServices.getUser();
    console.log($scope.profileData);
    $scope.profilePic = null;
    $scope.validTel = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
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
      MyServices.getProfileAthlete($scope.profileData, function (data) {
        if (data.value === true) {
          MyServices.setAthleteUser(data.data);
          $scope.$broadcast('scroll.refreshComplete');
        } else {
          $scope.$broadcast('scroll.refreshComplete');
          $scope.showLoading('Error Updating Profile!', 1000);
        }
      });
    };
    $scope.reloadProfile();

    var athlete = $scope.profileData._id;
    var i = 0;

    //to view profile
    $ionicModal.fromTemplateUrl('templates/viewImage.html', {
      id: 1,
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.viewImageModal = modal;
    });

    $scope.viewProfile = function (value) {

      $scope.profilePic = value;
      $scope.viewImageModal.show();
    };
    $scope.closeEvent = function () {
      $scope.viewImageModal.hide();
    }
    //Notification of athlete start
    $scope.showAthleteNotification = function (athlete) {
      $scope.totalItems = undefined;
      $scope.athletenotifications = undefined;
      $scope.currentPage = 1;
      MyServices.getAthleteNotification({
        Id: athlete,
        page: $scope.currentPage
      }, ++i, function (response, ini) {
        if (ini == i) {
          if (response.value == true) {
            $scope.isAthlete = true;
            $scope.athletenotifications = response.data.results;;
            $scope.notificationCount = response.data.unreadcount;
            $.jStorage.set("notificationCount", $scope.notificationCount);
            $scope.maxRow = response.data.count;
            $scope.totalItems = response.data.total;

          } else {
            $scope.athletenotifications = [];
          }
        }

      })
    }
    $scope.showAthleteNotification(athlete);
    //Notification of athlete end

    //Profile Incomplete Check
    $scope.profileIncomplete = function () {
      if (!$scope.profileData.country || !$scope.profileData.mobile || !$scope.profileData.sports || !$scope.profileData.about || !$scope.profileData.events || !$scope.profileData.achievements || !$scope.profileData.previousSeasonReview) {
        return true;
      } else {
        return false;
      }
    };
  })

  .controller('AthleteEditProfileCtrl', function ($scope, $state, MyServices, $ionicModal, $filter, $ionicLoading, $cordovaCamera, $cordovaFileTransfer) {
    $scope.editData = MyServices.getUser();
    $scope.editData.dob = new Date($scope.editData.dob);
    $scope.dummyPassword = '12345678';

    $scope.maxDate = $filter('date')(new Date(), 'yyyy-MM-dd');

    $scope.gender = ['Male', 'Female'];

    $scope.athleteFocus = [
      'Sprinting', 'Middle Distance', 'Endurance', 'Throws', 'Jumps', 'Hurdles', 'Race Walking', 'Hill/Fell Running', 'Cross Country', 'Triathlon', 'Team Sport'
    ];

    $scope.onlyAplha = /^[a-zA-Z_]+$/;
    $scope.validEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    MyServices.getCountries(function (data) {
      $scope.countries = data;
    });

    //Profile Incomplete Check
    $scope.profileIncomplete = function () {
      if (!$scope.editData.country || !$scope.editData.mobile || !$scope.editData.sports || !$scope.editData.about || !$scope.editData.events || !$scope.editData.achievements || !$scope.editData.previousSeasonReview) {
        return true;
      } else {
        return false;
      }
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
      MyServices.editProfileAthlete(formData, function (data) {
        if (data.value === true) {
          $scope.hideLoading();
          MyServices.setAthleteUser(data.data);
          console.log(data.data);
          $scope.showLoading('Profile Updated!', 2000);
          $state.go('app.athlete-profile');
        } else {
          $scope.hideLoading();
          $scope.showLoading('Profile is not updated, please Try Again!', 2000);
        }
      });
    };

    MyServices.getCountries(function (data) {
      $scope.countries = data;
    });


    // Update Password
    $ionicModal.fromTemplateUrl('templates/athlete-modal/password.html', {
      id: 1,
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modalPassword = modal;
    });

    $scope.passwordData = {};
    $scope.changePassword = function () {
      $scope.passwordData.accessToken = $scope.editData.accessToken;
      $scope.modalPassword.show();
    };
    $scope.submitPassword = function (formData) {
      $scope.showLoading('Please wait...', 15000);
      MyServices.changePasswordAthlete(formData, function (data) {
        if (data.value === true) {
          $scope.passwordData = {};
          $scope.hideLoading();
          $scope.showLoading('Password Updated!', 2000);
          $state.go('app.athlete-profile');
          $scope.closeModal();
        } else {
          $scope.hideLoading();
          $scope.showLoading('Password is not updated,please try again', 2000);
        }
      });
    };

    $scope.closeModal = function () {
      $scope.modalPassword.hide();
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
          result.response = JSON.parse(result.response);
          $scope.editData.profilePic = result.response.data[0];
          $scope.submitData($scope.editData);
        }, function (err) {
          // Error
          $scope.hideLoading();
          $scope.showLoading('Error!', 2000);
        }, function (progress) {
          // constant progress updates
        });
    };
  })


  .controller('AthleteBlogCtrl', function ($scope, $ionicModal, MyServices, $ionicLoading, $ionicPopup) {
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
      MyServices.searchBlogForAthlete({
        page: $scope.currentPage,
        keyword: $scope.search.keyword
      }, ++i, function (data, ini) {
        if (ini == i) {
          if (data.value) {
            console.log(data.data.results.reactions);
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
      $scope.showAllBlog();
    };
    $scope.toggle = function () {
      $scope.searchBlog = !$scope.searchBlog;
    };
  })

  .controller('AthleteBlogDetailCtrl', function ($scope, $ionicModal, $ionicLoading, MyServices, $ionicPopup, $stateParams, $filter, $state) {
    $scope.formData = {};
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

    //get one edit
    if ($stateParams.id) {
      MyServices.getOneBlogForAthlete({
        _id: $stateParams.id
      }, function (response) {
        if (response.data) {
          $scope.formData = response.data;
        } else {
          $scope.formData = {};
        }
      });
    }

    //Reactions
    $scope.athlete = MyServices.getUser();
    $scope.getReaction = function (val) {
      MyServices.getReactionBlog({
        type: val,
        _id: $stateParams.id,
        athlete: $scope.athlete._id
      }, function (response) {
        if (response.value) {
          $scope.formData = response.data;
        } else {
          console.log("Unable to update reaction");
        }
      });
    };

  })

  .controller('AthleteChatCtrl', function ($scope, $ionicModal, $state, MyServices, $ionicLoading) {
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
    $scope.athleteData = MyServices.getUser();
    $scope.startChat = function () {
      $state.go('app.athlete-chatdetail');
      $scope.modalChat.hide();
    };
    var athleteId = $scope.athleteData._id;
    $scope.hideChat = undefined;
    $scope.myCoachProfile = {};
    if (athleteId) {
      MyServices.getMyCoach({
        athleteId: athleteId
      }, function (response) {
        if (response.value === true) {
          $scope.hideChat = true;
          $scope.myCoachProfile = response.data.coach;
          $scope.getAllMessages($scope.myCoachProfile._id);
          $scope.getUnreadChatCount($scope.myCoachProfile._id);
        } else {
          $scope.myCoachProfile = "";
          $scope.hideChat = false;
        }
      });
    };

    $scope.getChatDetails = function () {
      $state.go('app.athlete-chatdetail', {
        chatId: $scope.chatId
      });
    }

    $scope.getUnreadChatCount = function (coachID) {
      //To get chat id. Because outsite this coach id is undefined
      MyServices.getUnreadChatCount({
        athleteId: athleteId,
        coachId: coachID
      }, function (response) {
        console.log(response);
        if (response.value) {
          $scope.chatMsg = response.data.latestChat[0].lastDoc.message;
          if (response.data.UnreadCount.length > 0) {
            $scope.unreadcount = response.data.UnreadCount[0].count;
            $scope.chatMsg = response.data.latestChat[0].lastDoc.message;
          }
          // if (response.data.latestChat != undefined) {
          //   $scope.chatId = response.data.latestChat[0]._id;
          // }
        }
      });
    }


    // Get all messages
    $scope.skip = 0;
    $scope.chatData = {};
    $scope.getAllMessages = function (coach) {
      $scope.messages = [];
      $scope.chatData.coach = coach;
      $scope.chatData.athlete = athleteId;
      $scope.chatData.skip = $scope.skip;
      MyServices.getAllmessages($scope.chatData, function (data) {
        $scope.hideLoading();
        if (data.data.length > 0) {
          $scope.chatId = data.data[0]._id;
          // console.log(data);
          // $scope.chatMsg = data.data[0].message[0].message;
        } else {
          $scope.chatMsg = "Start a chat with coach";
        }
      });
    };

  })

  .controller('AthleteChatDetailCtrl', function ($scope, $ionicScrollDelegate, $stateParams, $state, $timeout, MyServices, $ionicLoading) {
    //Loading
    $scope.messages = [];
    console.log($state);
    console.log($state.current);
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

    $scope.athleteData = MyServices.getUser();
    var athleteId = $scope.athleteData._id;
    var chatId = $stateParams.chatId;
    // $scope.myCoachProfile = {};
    if (athleteId) {
      MyServices.getMyCoach({
        athleteId: athleteId
      }, function (response) {
        if (response.value === true) {
          $scope.myCoachProfile = response.data.coach;

          //Cahange status of message
          io.socket.on("statusChangedToRead" + athleteId + $scope.myCoachProfile._id, function (data) {

            // if ($state.current.name == "app.athlete-chatdetail") {
            //   MyServices.getAllmessages($scope.chatData, function (data) {});
            // }
            console.log("Read is called");
            $scope.messages = _.map($scope.messages, function (n) {
              n.sent = true;
              n.isRead = true;
              return n;
            });
            console.log(" $scope.messages", $scope.messages);
            $scope.$apply();
          });
          console.log("Cool");
          $scope.getAllMessages();

        } else {
          $scope.myCoachProfile = "";
        }
      });
    }

    function updateReadStatus() {
      MyServices.updateReadStatus({
        athleteId: athleteId,
        coachId: $scope.chatData.coach,
        from: "coach"
      }, function (response) {
        console.log('read');
      });
    }
    // Get all messages
    $scope.skip = 0;
    $scope.getAllMessages = function () {
      console.log("SAD");
      $scope.messages = [];
      $scope.chatData.coach = $scope.myCoachProfile._id;
      $scope.chatData.athlete = athleteId;
      $scope.chatData.skip = $scope.skip;
      MyServices.getAllmessages($scope.chatData, function (data) {
        $scope.hideLoading();
        console.log(data);
        if (data.data.length > 0) {
          $scope.chatMsgs = data.data[0].message;
          console.log("$scope.chatMsgs", $scope.chatMsgs);
          _.each($scope.chatMsgs, function (key) {
            if (key.from == "athlete") {
              $scope.messages.push({
                userId: 'me',
                message: key.message,
                time: key.time,
                sent: true,
                isRead: key.isRead
              });
            } else if (key.from == "coach") {
              $scope.messages.push({
                userId: 'he',
                message: key.message,
                time: key.time,
                isRead: key.isRead
              });
            }
          });
          updateReadStatus();
          $ionicScrollDelegate.scrollBottom();
        } else {
          $scope.chatMsgs = [];
        }

      });
    };


    //scoket Code
    io.socket.on("chatAdded", function (data) {
      console.log(data);
      var arr = _.filter($scope.messages, {
        randomVal: data.message.randomVal
      });

      MyServices.getAllmessages($scope.chatData, function () { });

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

    io.socket.get(adminurl + "chat/getAthleteSocket", {
      _id: athleteId
    }, function (data) {

    });

    $scope.hideTime = true;

    $scope.timeStamp = function () {
      var d = new Date();
      d = d.toLocaleTimeString().replace(/:\d+ /, ' ');
      return d;
    };

    //Send Message 
    $scope.chatData = {};
    $scope.sendMessage = function () {
      // $scope.messages = [];
      if ($scope.data.message !== '' && $scope.data.message) {
        var randomNo = _.random(0, 10000);
        var obj = _.cloneDeep($scope.data);
        var messageObj = {
          userId: 'me',
          message: obj.message,
          time: $scope.timeStamp(),
          randomVal: randomNo
        };
        $scope.messages.push(messageObj);
      }

      //$scope.data.message = "";
      $scope.data.message = undefined;
      $ionicScrollDelegate.scrollBottom();
      $scope.chatData.coach = $scope.myCoachProfile._id;
      $scope.chatData.athlete = athleteId;
      $scope.chatData.message = {
        message: obj.message,
        time: $scope.timeStamp(),
        from: "athlete",
        randomVal: randomNo,
        messageObj: messageObj
      };
      $scope.chatData.sentMessageTo = "coach";
      MyServices.sendChatMessages($scope.chatData, function (data) {
        console.log("send");
      });
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
    console.log("On Sent");
    console.log(_.cloneDeep($scope.chatData.message));

  })

  .controller('AthleteChatGroupCtrl', function ($scope, $ionicScrollDelegate, $timeout) {

    $scope.hideTime = true;

    $scope.timeStamp = function () {
      var d = new Date();
      d = d.toLocaleTimeString().replace(/:\d+ /, ' ');
      return d;
    };

    $scope.sendMessage = function () {

      if ($scope.data.message !== '' && $scope.data.message) {
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
      name: 'Usain',
      surname: 'Usain',
      text: 'Hello! Welcome to Coach Mentor!',
      time: $scope.timeStamp()
    }];

  })

  .controller('AthleteAnalyticsCtrl', function ($scope, $ionicModal) {
    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];
  })

  .controller('AthleteInjuryCtrl', function ($scope, $ionicModal, MyServices, $ionicLoading, $ionicPopup) {
    $scope.currentPage = 1;
    var i = 0;
    $scope.allInjury = [];
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
        $scope.allInjury = [];
        $scope.showAllInjury(keywordChange);
      } else {
        $scope.showAllInjury(keywordChange);
      }
    };

    //Get All Competiton
    $scope.showAllInjury = function (keywordChange) {
      if (keywordChange) {
        $scope.currentPage = 1;
        $scope.allInjury = [];
      }
      MyServices.searchInjury({
        page: $scope.currentPage,
        keyword: $scope.search.keyword
      }, ++i, function (data, ini) {
        if (ini == i) {
          if (data.value) {
            _.forEach(data.data.results, function (value) {
              $scope.allInjury.push(value);
            });
            $scope.totalItems = data.data.total;
            if ($scope.totalItems > $scope.allInjury.length) {
              $scope.currentPage++;
              $scope.$broadcast('scroll.infiniteScrollComplete');
            } else {
              $scope.more.Data = false;
            }
          } else {
            $scope.showLoading('Error Loading Injuries', 2000);
          }
        }
      });
    };

    //Load More
    $scope.loadMore = function () {
      $scope.showAllInjury();
    };

    //Delete Popup
    $scope.deletePop = function (id) {
      $scope.myPopup = $ionicPopup.show({
        template: '<p>Are you sure want to delete the injury?</p>',
        title: 'Confirmation Message',
        scope: $scope,
        buttons: [{
          text: 'No'
        }, {
          text: '<b>Yes</b>',
          type: 'button-positive',
          onTap: function (e) {
            $scope.deleteInjury(id);
          }
        }]
      });
    };
    $scope.deleteInjury = function (id) {
      $scope.showLoading("Loading...", 10000);
      if (id) {
        MyServices.deleteInjury({
          _id: id
        }, function (data) {
          if (data.value) {
            $scope.allInjury = [];
            $scope.showAllInjury();
            $scope.hideLoading();
            $scope.showLoading("Injury Deleted", 2000);
          } else {
            $scope.hideLoading();
            $scope.showLoading("Error Deleting Injury", 2000);
          }
        });
      }
    };
  })

  .controller('AthleteInjuryCreateCtrl', function ($scope, $ionicModal, $ionicLoading, MyServices, $ionicPopup, $stateParams, $filter, $state) {
    $scope.title = 'Add';
    $scope.selectAthlete = {};
    $scope.formData = {};
    $scope.oneWeekLater = $filter('date')(moment().add(7, 'days'));
    $scope.severity = ['Minor', 'Moderate', 'Severe'];

    //Match start date & end date
    $scope.matchDate = function () {
      $scope.formData.resumeTrainingDate = $scope.formData.injuryDate;
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
      MyServices.saveInjury(formData, function (data) {
        if (data.value === true) {
          $scope.hideLoading();
          $scope.showLoading('Injury Created', 2000);
          $state.go('app.athlete-injuries');
        } else {
          $scope.hideLoading();
          $scope.showLoading(data.data.message, 2000);
        }
      });
    };
  })

  .controller('AthleteInjuryDetailCtrl', function ($scope, $ionicModal, $ionicLoading, MyServices, $ionicPopup, $stateParams, $filter, $state) {
    $scope.title = 'Edit';
    $scope.formData = {};
    $scope.selectAthlete = {};
    $scope.injuryId = $stateParams.id;
    $scope.oneWeekLater = $filter('date')(moment().add(7, 'days'));
    $scope.severity = ['Minor', 'Moderate', 'Severe'];

    //Match start date & end date
    $scope.matchDate = function () {
      $scope.formData.resumeTrainingDate = $scope.formData.injuryDate;
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
      MyServices.updateInjury(formData, function (data) {
        if (data.value === true) {
          $scope.hideLoading();
          $scope.showLoading('Injury Updated', 2000);
          $state.go('app.athlete-injuries');
        } else {
          $scope.hideLoading();
          $scope.showLoading('Error while Updated Injury', 2000);
        }
      });
    };

    //get one edit
    if ($stateParams.id) {
      MyServices.getOneInjury({
        _id: $stateParams.id
      }, function (response) {
        if (response.data) {
          $scope.formData = response.data;
          $scope.selectAthlete.array = $scope.formData.athlete = response.data.athlete;
          if ($scope.formData.resumeTrainingDate) {
            $scope.formData.injuryDate = new Date($scope.formData.injuryDate);
            $scope.formData.resumeTrainingDate = new Date($scope.formData.resumeTrainingDate);
          }
        } else {
          $scope.formData = {};
        }
      });
    }

    //Delete Popup
    $scope.deletePop = function (id) {
      $scope.myPopup = $ionicPopup.show({
        template: '<p>Are you sure want to delete the injury?</p>',
        title: 'Confirmation Message',
        scope: $scope,
        buttons: [{
          text: 'No'
        }, {
          text: '<b>Yes</b>',
          type: 'button-positive',
          onTap: function (e) {
            $scope.deleteInjury(id);
          }
        }]
      });
    };
    $scope.deleteInjury = function (id) {
      $scope.showLoading("Loading...", 10000);
      if (id) {
        MyServices.deleteInjury({
          _id: id
        }, function (data) {
          if (data.value) {
            $scope.hideLoading();
            $scope.showLoading("Injury Deleted", 2000);
            $state.go('app.athlete-injuries');

          } else {
            $scope.hideLoading();
            $scope.showLoading("Error Deleting Injury", 2000);
          }
        });
      }
    };

  })

  .controller('AthleteSearchCoachesCtrl', function ($scope, $ionicModal, MyServices, $ionicLoading, $ionicPopup) {
    $scope.profileData = MyServices.getUser();
    $scope.currentPage = 1;
    $scope.filter = {};
    var i = 0;
    $scope.allCoaches = [];
    $scope.search = {
      keyword: ""
    };
    $scope.more = {
      Data: true
    };
    $ionicModal.fromTemplateUrl('templates/athlete-modal/coach-filter.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });
    $scope.closeModal = function () {
      $scope.modal.hide();
    };
    $scope.openFilter = function () {
      $scope.modal.show();
    };

    $ionicModal.fromTemplateUrl('templates/viewImage.html', {
      id: 1,
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.viewImageModal = modal;
    });

    // $scope.viewProfile = function (value) {

    //   $scope.profilePic = value;
    //   $scope.viewImageModal.show();
    // };
    $scope.closeEvent = function () {
      $scope.viewImageModal.hide();
    }


    $scope.myCoachProfile = {};
    if ($scope.profileData) {
      MyServices.getMyCoach({
        athleteId: $scope.profileData._id
      }, function (response) {
        if (response.value == true) {
          $scope.myCoachProfile = response.data;
          $scope.coachId = $scope.myCoachProfile.coach._id;
          console.log($scope.myCoachProfile);
        } else { }
        $scope.showAllCoaches();
      })
    }

    $scope.filterData = [{
      name: 'Age',
      value: ['Less than 20 years', '21 - 25 years', '26 - 30 years', '31 - 35 years', '36 - 40 years', 'More than 40 years']
    }, {
      name: 'Coaching Focus',
      value: ['Sprinting', 'Middle Distance', 'Endurance', 'Throws', 'Jumps', 'Hurdles', 'Hill/Fell Running', 'Cross Country', 'Team Sport']
    }, {
      name: 'Gender',
      value: ['Male', 'Female']
    }, {
      name: 'Credentials',
      value: ['Level 1', 'Level 2', 'Level 3', 'Level 4']
    }, {
      name: 'Coaching Experience',
      value: ['0 - 5 years', '6 - 10 years', '11 - 15 years', '16 - 20 years', 'More than 20 years']
    }];

    $scope.filterActive = 0;
    $scope.selectedFilters = {};

    $scope.changeFilter = function (data) {
      $scope.filterActive = data;
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
        $scope.allCoaches = [];
        $scope.showAllCoaches(keywordChange);
      } else {
        $scope.showAllCoaches(keywordChange);
      }
    };

    //console.log("$scope.myCoachProfile._id", $scope.myCoachProfile.coach._id);
    // if (!_.isEmpty($scope.myCoachProfile)) {
    //   var coachId = $scope.myCoachProfile.coach._id;
    // }
    console.log($scope.coachId);
    $scope.currentPage = 0;
    //Get All coaches
    $scope.showAllCoaches = function (keywordChange) {
      MyServices.searchAllCoaches({
        page: $scope.currentPage,
        keyword: $scope.search.keyword,
        filter: $scope.filter,
        myCoachId: $scope.coachId
      }, ++i, function (data, ini) {
        if (ini == i) {
          if (data.value) {
            if (data.data.results.length == 0) {
              $scope.more.Data = false;
            } else {
              _.forEach(data.data.results, function (value) {
                $scope.allCoaches.push(value);
              });

              $scope.$broadcast('scroll.infiniteScrollComplete');
              // $scope.totalItems = data.data.total;
              // if ($scope.totalItems > $scope.allCoaches.length) {
              // 
              //  
              // } else {
              //   $scope.more.Data = false;
              // }
            }
          } else {
            $scope.showLoading('Error Loading coaching', 2000);
          }
        }
      });
    };

    //Load More
    $scope.loadMore = function () {
      $scope.currentPage++;
      $scope.showAllCoaches();
    };

    // filter apply Start
    $scope.filter.age = [];
    $scope.filter.coachingFocus = [];
    $scope.filter.gender = [];
    $scope.filter.credentials = [];
    $scope.filter.experience = [];
    $scope.pushSubCategory = function (subcat, catName) {
      var numberPattern = /\d+/g;
      //age
      if (catName == 'Age') {
        // console.log($scope.selectedFilters[subcat]);
        if ($scope.selectedFilters[subcat] == true) {
          var agedata = subcat.match(numberPattern);
          if (agedata.length > 1) {
            var age = agedata[0] + "-" + agedata[1];
          } else {
            age = agedata[0];
          }
          $scope.filter.age.push(age);
        } else {
          var arraydata = $scope.filter.age.indexOf(subcat);
          $scope.filter.age.splice(arraydata, 1);
        }
      }
      //Coaching Focus
      if (catName == 'Coaching Focus') {
        if ($scope.selectedFilters[subcat] == true) {
          $scope.filter.coachingFocus.push(subcat);
        } else {
          var arraydata = $scope.filter.coachingFocus.indexOf(subcat);
          $scope.filter.coachingFocus.splice(arraydata, 1);
        }
      }

      //Gender
      if (catName == 'Gender') {
        if ($scope.selectedFilters[subcat] == true) {
          $scope.filter.gender.push(subcat);
        } else {
          var arraydata = $scope.filter.gender.indexOf(subcat);
          $scope.filter.gender.splice(arraydata, 1);
        }
      }

      //Credentials
      if (catName == 'Credentials') {
        if ($scope.selectedFilters[subcat] == true) {
          $scope.filter.credentials.push(subcat);
        } else {
          var arraydata = $scope.filter.credentials.indexOf(subcat);
          $scope.filter.credentials.splice(arraydata, 1);
        }
      }

      //Coaching Experience
      if (catName == 'Coaching Experience') {
        if ($scope.selectedFilters[subcat] == true) {
          var experiencedata = subcat.match(numberPattern);
          if (experiencedata.length > 1) {
            var experience = experiencedata[0] + "-" + experiencedata[1];
          } else {
            experience = experiencedata[0];
          }
          $scope.filter.experience.push(experience);
        } else {
          var arraydata = $scope.filter.experience.indexOf(subcat);
          $scope.filter.experience.splice(arraydata, 1);
        }
      }
    }

    $scope.filterParameteres = function () {
      // $.jStorage.set("setFilter");
      $scope.currentPage = 0;
      $scope.allCoaches = [];
      $scope.showAllCoaches();
      $scope.closeModal();
    };
    // filter apply end

  })

  .controller('AthleteSearchCoachesDetailCtrl', function ($scope, $ionicModal, $ionicLoading, $stateParams, MyServices, $state, $ionicScrollDelegate, $ionicPopup) {
    $scope.coaches = {};
    $scope.athleteData = MyServices.getUser();

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
    //get one edit
    if ($stateParams.id) {
      MyServices.getOneCoaches({
        _id: $stateParams.id
      }, function (response) {
        if (response.data) {
          $scope.coaches = response.data;
          $scope.hideLoading();
        } else {
          $scope.showLoading('Error Loading Data!', 1000);
          $scope.coaches = {};
        }
      });
    };

    $ionicModal.fromTemplateUrl('templates/viewImage.html', {
      id: 1,
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.viewImageModal = modal;
    });

    $scope.viewProfile = function (value) {

      $scope.profilePic = value;
      $scope.viewImageModal.show();
    };
    $scope.closeEvent = function () {
      $scope.viewImageModal.hide();
    }

    //check if the request is already send or not start
    $scope.checkRequestStatus = function () {
      $scope.coachConstraints = {};
      $scope.coachConstraints.athlete = $scope.athleteData._id;
      $scope.coachConstraints.coach = $stateParams.id;
      console.log($scope.coachConstraints);
      MyServices.checkRequestStatus($scope.coachConstraints, function (response) {
        console.log(response);
        if (response.value == true) {
          // toastr.success("Request is send successfully.");
          if (response.data.statusCode == 1) {
            //toastr.warning("Request already sent.");
            $scope.disableSubscribe = true
          } else if (response.data.statusCode == 2) {
            //toastr.warning("zdfasdfasdfsfsd.");
            $scope.disableSubscribe = false;
          }
          // else {
          //     $state.go("athlete.serviceForm");
          // }
        } else {
          //toastr.warning("Requestsgsdfgsf already sent.");
          $scope.disableSubscribe = true;
        }
      })
    }
    //check if the request is already send or not end

    $scope.checkRequestStatus();
    console.log($scope.athleteData._id);
    //function to check if the athlete filled the service form or not start
    if ($scope.athleteData._id) {
      MyServices.getMyServiceform({
        athleteId: $scope.athleteData._id
      }, function (response) {
        if (response.value == true) {
          // $scope.myServiceForm = response.data;
          $scope.formData = response.data;
          console.log($scope.formData);
          $scope.formData.dob = moment($scope.formData.dob).toDate();
        } else {
          // $scope.formData = {};
        }
      })
    }
    //function to check if the athlete filled the service form or not end



    $ionicModal.fromTemplateUrl('templates/athlete-modal/service-form.html', {
      scope: $scope,
      animation: 'slide-in-up',
    }).then(function (modal) {
      $scope.modal = modal;
    });
    $scope.subscribeNow = function () {
      $scope.modal.show();
    };
    $scope.closeModal = function () {
      $scope.modal.hide();
    };

    $scope.formData = {};
    $scope.formData.name = $scope.athleteData.name;
    $scope.formData.surname = $scope.athleteData.surname;
    $scope.formData.dob = moment($scope.athleteData.dob).toDate();
    $scope.formData.otherSporting = [{}];
    $scope.formData.personalBests = [{}];

    $scope.addSporting = function () {
      $scope.formData.otherSporting.push({});
      $ionicScrollDelegate.resize();
    };
    $scope.removeSporting = function (pos) {
      if ($scope.formData.otherSporting.length > 1) {
        $scope.formData.otherSporting.splice(pos, 1);
        $ionicScrollDelegate.resize();
      } else {
        $scope.formData.otherSporting = [{}];
      }
    };

    $scope.addBests = function () {
      $scope.formData.personalBests.push({});
      $ionicScrollDelegate.resize();
    };
    $scope.removeBests = function (pos) {
      if ($scope.formData.personalBests.length > 1) {
        $scope.formData.personalBests.splice(pos, 1);
        $ionicScrollDelegate.resize();
      } else {
        $scope.formData.personalBests = [{}];
      }
    };

    $scope.submitServiceForm = function (ServiceData) {
      console.log("ServiceData", ServiceData);
      ServiceData.athlete = $scope.athleteData._id;
      ServiceData.coach = $stateParams.id;
      MyServices.saveAthleteServiceForm(ServiceData, function (response) {
        if (response.value) {
          $scope.reqestToCoach();
        } else {
          $scope.showLoading('Error sending request!', 2000);
        }
      });
    };

    $scope.reqestToCoach = function (data) {
      $scope.showLoading('Please wait...', 15000);
      $scope.reqData = {
        reason: data,
        coach: $stateParams.id,
        athlete: $scope.athleteData._id
      };
      MyServices.sendRequestToCoach($scope.reqData, function (response) {
        if (response.value === true) {
          $scope.hideLoading();
          $scope.showLoading('Request Sent Successfully!', 2000);
          $scope.closeModal();
          $state.go('app.athlete-search-coaches');
        }
      });
    };

  })

  .controller('AthleteCoachCtrl', function ($scope, $ionicModal) {
    $scope.coach = [{
      name: 'Matt',
      surname: 'Smith',
      image: 'img/img-placeholder.png',
      acceptedDate: new Date('13 May, 2016'),
      renewalDate: new Date('12 June, 2016'),
      subscriptionType: 'Monthly'
    }, {
      name: 'John',
      surname: 'Damon',
      image: 'img/img-placeholder.png',
      acceptedDate: new Date('17 August, 2016'),
      renewalDate: new Date('16 August, 2017'),
      subscriptionType: 'Annual'
    }];
  })

  .controller('AthleteCoachDetailCtrl', function ($scope, $ionicModal, $ionicScrollDelegate, MyServices, $ionicPopup, $state, $ionicLoading) {
    $scope.athleteData = MyServices.getUser();
    var athleteId = $scope.athleteData._id;
    $scope.unsubscribe = {};

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

    $scope.myCoachProfile = undefined;
    if (athleteId) {
      MyServices.getMyCoach({
        athleteId: athleteId
      }, function (response) {
        if (response.value === true) {
          $scope.myCoachProfile = response.data;
          $scope.hideLoading();
        } else {
          $scope.myCoachProfile = "";
          $scope.hideLoading();
          // $scope.showLoading('Error Loading Data!', 3000);
        }
      });
    };

    $ionicModal.fromTemplateUrl('templates/viewImage.html', {
      id: 1,
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.viewImageModal = modal;
    });

    $scope.viewProfile = function (value) {

      $scope.profilePic = value;
      $scope.viewImageModal.show();
    };
    $scope.closeEvent = function () {

      $scope.viewImageModal.hide();
    }

    ///Unsub coach start
    $scope.Unsubscription = function (athleteCoachId) {
      $scope.unsubscribe._id = athleteCoachId;
      $scope.unsubscribe.athleteID = athleteId;
      $scope.data = {};
      var myPopup = $ionicPopup.show({
        template: '<textarea auto-grow type="password" ng-model="data.reason"><textarea>',
        title: '<h4>Unsubscription!</h4>',
        subTitle: 'Please enter some reason',
        scope: $scope,
        buttons: [{
          text: 'Cancel'
        }, {
          text: '<b>Reject</b>',
          type: 'button-assertive',
          onTap: function (e) {
            $scope.unsubscribeCoach($scope.data);
          }
        },]
      });
    };

    $scope.unsubscribeCoach = function (val) {
      $scope.unsubscribe.status = "Unsubscribe";
      $scope.unsubscribe.reason = val.reason;
      MyServices.Unsubscribeacoach($scope.unsubscribe, function (response) {
        if (response.value === true) {
          $state.go('app.athlete-search-coaches');
        }
      });
    };
    ///Unsub coach end

  })

  .controller('AthleteNotificationsCtrl', function ($scope, MyServices, $ionicModal, $ionicScrollDelegate, $ionicPopup, $state, $ionicLoading) {

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

    $scope.athleteData = MyServices.getUser();
    var i = 0;

    var athlete = $scope.athleteData._id;
    $ionicModal.fromTemplateUrl('templates/reason.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modalReason = modal;
    });

    $scope.showReason = function (value) {
      $scope.unsubReason = value;
      console.log("hiii", $scope.unsubReason, value)
      $scope.modalReason.show();
    }

    $scope.closeEvent = function () {
      $scope.modalReason.hide();
    }

    //Fucntion for notification of athlete start
    $scope.showAthleteNotification = function (athlete) {
      $scope.totalItems = undefined;
      $scope.athletenotifications = undefined;
      $scope.currentPage = 1;
      MyServices.getAthleteNotification({
        Id: athlete,
        page: $scope.currentPage
      }, ++i, function (response, ini) {
        if (ini == i) {
          if (response.value == true) {
            $scope.hideLoading();
            $scope.isAthlete = true;
            $scope.athletenotifications = response.data.results;;
            $scope.notificationCount = response.data.unreadcount;
            $scope.maxRow = response.data.count;
            $scope.totalItems = response.data.total;

          } else {
            $scope.athletenotifications = [];
            $scope.hideLoading();
          }
        }

      });
    };
    $scope.showAthleteNotification(athlete);
    //Fucntion for notification of athlete end

    //read notification start
    $scope.readNotification = function () {
      $scope.totalItems = undefined;
      $scope.athletenotifications = undefined;
      $scope.coachnotifications = undefined;
      $scope.currentPage = 1;

      MyServices.readathleteNotification({
        Id: athlete,
        page: $scope.currentPage
      }, ++i, function (response, ini) {
        if (ini == i) {
          if (response.value == true) {
            $scope.isAthlete = true;
            $scope.athletenotifications = response.data.results;
            $scope.maxRow = response.data.options.count;
            $scope.totalItems = response.data.total;
            $scope.showAthleteNotification(athlete);

          } else {
            $scope.athletenotifications = [];
          }
        }
      })
    }
    //read notification end


    $scope.reason = function () {
      $scope.data = {};
      var myPopup = $ionicPopup.show({
        template: '<textarea auto-grow type="password" ng-model="data.message"><textarea>',
        title: '<h4>Reject Competition!</h4>',
        subTitle: 'Please enter some reason',
        scope: $scope,
        buttons: [{
          text: 'Cancel'
        }, {
          text: '<b>Reject</b>',
          type: 'button-assertive',
          onTap: function (e) {
            console.log($scope.data.message);
          }
        },]
      });
    };

    $scope.readNotification();

    $ionicModal.fromTemplateUrl('templates/athlete-modal/modal-paynow.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });
    $scope.closePayNow = function () {
      $scope.modal.hide();
    };
    //pay subscription start
    $scope.openPayNow = function (coachdata) {
      console.log("$scope.athletenotifications", $scope.athletenotifications);
      $scope.formData = {};
      $scope.formData.coachPrice = coachdata.coach.coachAskingPrice;
      $scope.coachAthleyteId = coachdata._id;
      $scope.modal.show();
    };
    $scope.paySubscription = function (subscriptionData) {
      if (subscriptionData.subscriptionType == "Yearly") {
        subscriptionData.coachAskingPrice = subscriptionData.coachPrice * 11;
      } else {
        subscriptionData.coachAskingPrice = subscriptionData.coachPrice;
      }
      subscriptionData._id = $scope.coachAthleyteId;
      subscriptionData.status = "Active";

      //var athleteId = ._id;

      var subscriptionObj = {};
      var updateAthleteCoachingObj = {};
      updateAthleteCoachingObj = subscriptionData;
      $.jStorage.set('updateAthleteCoachingObj', updateAthleteCoachingObj);

      subscriptionData.userId = $scope.athleteData._id;
      subscriptionData.email = $scope.athleteData.email;
      subscriptionData.name = $scope.athleteData.name;
      subscriptionData.surname = $scope.athleteData.surname;
      subscriptionData.currency = "GBP";
      subscriptionData.amount = subscriptionData.coachAskingPrice;

      subscriptionObj = subscriptionData;

      subscriptionObj.coachName = $scope.athletenotifications[0].athletecoach.coach.name;
      subscriptionObj.coachSurname = $scope.athletenotifications[0].athletecoach.coach.surname;
      subscriptionObj.coachId = $scope.athletenotifications[0].athletecoach.coach._id;
      console.log("subscriptionData", subscriptionData);
      $.jStorage.set('emailObj', subscriptionObj);
      MyServices.paynowMobile(subscriptionData, function (data) {
        console.log("subscriptionData 1", data);
        if (data.value === true) {
          // console.log("m back");
          // window.location.href = data.data;
          // var formData = {};
          // formData.id = $.jStorage.get('user')._id;
          // alert("its working");

          // var options = {
          //   location: 'yes',
          //   clearcache: 'yes',
          //   toolbar: 'no'
          // };
          var options = "location=no,toolbar=no";
          var target = "_blank";
          var url = "";
          $scope.finalURL = data.data;
          var ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
          ref.addEventListener('loadstop', function (event) {
            var url = event.url;
            console.log(url);

            url = event.url.split("?")[0];
            if (url == "http://coachmentor.wohlig.com/error") {
              ref.close();
              var alertPopup = $ionicPopup.alert({
                template: '<h4 style="text-align:center;">Some Error Occurred. Payment Failed</h4>'
              });
              alertPopup.then(function (res) {
                alertPopup.close();
                $state.go('app.athlete-profile');
              });
            } else if (url == "http://coachmentor.wohlig.com/thankyou") {
              ref.close();
              $state.go('app.athlete-profile');
            }
          });
        }
      })


      // $scope.payRp = function (order) {
      //   console.log(order);
      //   var options = {
      //     location: 'yes',
      //     clearcache: 'yes',
      //     toolbar: 'no'
      //   };
      //   var target = "_blank";
      //   var url = "";
      //   $scope.finalURL = data.data;
      //   var ref = cordova.InAppBrowser.open($scope.finalURL, target, options);
      //   ref.addEventListener('loadstop', function (event) {
      //     var url = event.url;
      //     console.log(url);
      //     if (url == "http://coachmentor.wohlig.com/error") {
      //       ref.close();
      //       var alertPopup = $ionicPopup.alert({
      //         template: '<h4 style="text-align:center;">Some Error Occurred. Payment Failed</h4>'
      //       });
      //       alertPopup.then(function (res) {
      //         alertPopup.close();
      //         $state.go('app.athlete-profile');
      //       });
      //     } else if (url == "http://coachmentor.wohlig.com/thankyou") {
      //       ref.close();
      //       $state.go('app.athlete-profile');
      //     }
      //   });

      // };


      // MyServices.paySubscription(subscriptionData, function (response) {
      //   if (response.value == true) {
      //     $scope.closePayNow();
      //     $state.go('app.athlete-coach-detail');
      //   } else {
      //     $scope.closePayNow();
      //   }
      // })
    };
    //pay subscription end

  })


  .controller('AthleteTrainingDiaryCtrl', function ($scope, $ionicModal, $ionicLoading, uiCalendarConfig, MyServices, $ionicScrollDelegate, $timeout, $filter, $location) {

    // console.log($scope.athleteData);
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

    $scope.athleteNoteData = {};
    //Feedback Modal
    $ionicModal.fromTemplateUrl('templates/athlete-modal/notes.html', {
      id: 1,
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.noteModal = modal;
    });
    $scope.openNotes = function (activityNote) {
      // console.log(activityNote);
      $scope.athleteNoteData = activityNote.athleteNoteData;
      $scope.coachNoteData = activityNote.coachNoteData;
      $scope.noteID = activityNote.noteID;
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
      console.log("notedata", notedata);
      $scope.athleteData = MyServices.getUser();
      $scope.athleteNoteData.athleteId = $scope.athleteData._id,
        $scope.athleteNoteData._id = $scope.noteID,
        $scope.athleteNoteData.notesAthlete = {
          sharedNote: notedata.sharedNote,
          personalNote: notedata.personalNote
        }
      MyServices.saveNote($scope.athleteNoteData, function (data) {
        if (data.value == true) {
          $scope.closeNotes();
          console.log("Note saved successfully");
          _.each($scope.applyNotesCSS, function (n, i) {
            if (n._id == data.data._id) {
              $scope.applyNotesCSS[i].status = true;
            }
          })
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
    $scope.injury = [];

    $scope.generateDiary = function (aspects, competitions, tests, injury) {
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

      for (var l = 0; l < injury.length; l++) {
        $scope.injury.push({
          type: 'clickable',
          title: "Injury",
          name: injury[l].name,
          start: moment(injury[l].injuryDate).toDate(),
          end: moment(injury[l].resumeTrainingDate).toDate(),
          allDay: true,
          className: ['injuries'],
          details: injury[l].prescribingPractitioner,
          sort: "j"
        });
      }
    };

    $scope.applyNotesCSS = [];
    $scope.generatePlan = function (startDate, phases, trainingActivity, trainingActivityNotes) {
      $scope.trainingPhasesData = [];
      var k = 0;
      var count = 0;

      for (var i = 0; i < phases.length; i++) {
        if (i % 2 == 1) {
          phaseType = 'tp-odd';
        } else {
          phaseType = 'tp-even';
        }
        for (var l = 0; l < phases[i].duration; l++) {
          count = count + phases[i].duration;
          $scope.trainingPhasesData.push({
            name: phases[i].title,
            phaseNumber: i + l + 1,
            className: phaseType,
            activities: []
          });
        }
      }

      for (var w = 0; w < count; w++) {
        var loopStart = 0 + k;
        var loopDuration = 7;
        var loopEnd = loopDuration + k;

        // console.log('Loop Start:', loopStart, 'Loop End:', loopEnd);

        // for (var j = loopStart; j < loopEnd; j++) {
        //   if (trainingActivity[j].name == 'Rest Day') {
        //     if (trainingActivityNotes[j].notesAthlete.sharedNote != "" || trainingActivityNotes[j].notesAthlete.personalNote != "" || trainingActivityNotes[j].notesCoach.sharedNote != "" || trainingActivityNotes[j].notesCoach.personalNote != "") {
        //       $scope.applyNotesCSS[j] = {};
        //       $scope.applyNotesCSS[j].status = true;
        //       $scope.applyNotesCSS[j]._id = trainingActivityNotes[j]._id;
        //       $scope.trainingPhasesData[w].activities.push({
        //         _id: trainingActivity[j]._id,
        //         name: trainingActivity[j].name,
        //         detail: 'No Training',
        //         volume: '',
        //         intensity: '',
        //         startDate: moment(startDate).add(j, 'days').toDate(),
        //         noteID: trainingActivityNotes[j]._id,
        //         athleteNoteData: trainingActivityNotes[j].notesAthlete,
        //         coachNoteData: trainingActivityNotes[j].notesCoach
        //       });
        //     } else {
        //       $scope.applyNotesCSS[j] = {};
        //       $scope.applyNotesCSS[j].status = false;
        //       $scope.applyNotesCSS[j]._id = trainingActivityNotes[j]._id;
        //       $scope.trainingPhasesData[w].activities.push({
        //         _id: trainingActivity[j]._id,
        //         name: trainingActivity[j].name,
        //         detail: 'No Training',
        //         volume: '',
        //         intensity: '',
        //         startDate: moment(startDate).add(j, 'days').toDate(),
        //         noteID: trainingActivityNotes[j]._id,
        //         athleteNoteData: trainingActivityNotes[j].notesAthlete,
        //         coachNoteData: trainingActivityNotes[j].notesCoach
        //       });
        //     }
        //   } else {
        //     if (trainingActivityNotes[j].notesAthlete.sharedNote != "" || trainingActivityNotes[j].notesAthlete.personalNote != "" || trainingActivityNotes[j].notesCoach.sharedNote != "" || trainingActivityNotes[j].notesCoach.personalNote != "") {
        //       $scope.applyNotesCSS[j] = {};
        //       $scope.applyNotesCSS[j].status = true;
        //       $scope.applyNotesCSS[j]._id = trainingActivityNotes[j]._id;
        //       console.log("hsdfjskdfjkasjkjskdjkl", $scope.applyNotesCSS[j]);
        //       $scope.trainingPhasesData[w].activities.push({
        //         _id: trainingActivity[j]._id,
        //         name: trainingActivity[j].name,
        //         detail: trainingActivity[j].detail,
        //         volume: trainingActivity[j].volume,
        //         intensity: trainingActivity[j].intensity,
        //         startDate: moment(startDate).add(j, 'days').toDate(),
        //         noteID: trainingActivityNotes[j]._id,
        //         athleteNoteData: trainingActivityNotes[j].notesAthlete,
        //         coachNoteData: trainingActivityNotes[j].notesCoach
        //       });
        //     } else {
        //       $scope.applyNotesCSS[j] = {};
        //       $scope.applyNotesCSS[j].status = false;
        //       $scope.applyNotesCSS[j]._id = trainingActivityNotes[j]._id;
        //       $scope.trainingPhasesData[w].activities.push({
        //         _id: trainingActivity[j]._id,
        //         name: trainingActivity[j].name,
        //         detail: trainingActivity[j].detail,
        //         volume: trainingActivity[j].volume,
        //         intensity: trainingActivity[j].intensity,
        //         startDate: moment(startDate).add(j, 'days').toDate(),
        //         noteID: trainingActivityNotes[j]._id,
        //         athleteNoteData: trainingActivityNotes[j].notesAthlete,
        //         coachNoteData: trainingActivityNotes[j].notesCoach
        //       });
        //     }
        //   }
        // }

        for (var j = loopStart; j < loopEnd; j++) {

          if (trainingActivity[j] != undefined && trainingActivity[j].name == 'Rest Day') {
            if (trainingActivityNotes[j].notesAthlete.sharedNote != "" || trainingActivityNotes[j].notesAthlete.personalNote != "" || trainingActivityNotes[j].notesCoach.sharedNote != "" || trainingActivityNotes[j].notesCoach.personalNote != "") {
              $scope.applyNotesCSS[j] = {};
              $scope.applyNotesCSS[j].status = true;
              // console.log("status 1", $scope.applyNotesCSS[j].status);
              $scope.applyNotesCSS[j]._id = trainingActivityNotes[j]._id;
              $scope.trainingPhasesData[w].activities.push({
                _id: trainingActivity[j]._id,
                name: trainingActivity[j].name,
                detail: 'No Training',
                volume: '',
                intensity: '',
                startDate: moment(startDate).add(j, 'days').toDate(),
                noteID: trainingActivityNotes[j]._id,
                athleteNoteData: trainingActivityNotes[j].notesAthlete,
                coachNoteData: trainingActivityNotes[j].notesCoach
              });
            } else {
              $scope.applyNotesCSS[j] = {};
              $scope.applyNotesCSS[j].status = false;
              // console.log("status 2", $scope.applyNotesCSS[j].status);
              $scope.applyNotesCSS[j]._id = trainingActivityNotes[j]._id;
              $scope.trainingPhasesData[w].activities.push({
                _id: trainingActivity[j]._id,
                name: trainingActivity[j].name,
                detail: 'No Training',
                volume: '',
                intensity: '',
                startDate: moment(startDate).add(j, 'days').toDate(),
                noteID: trainingActivityNotes[j]._id,
                athleteNoteData: trainingActivityNotes[j].notesAthlete,
                coachNoteData: trainingActivityNotes[j].notesCoach
              });
            }

          } else if (trainingActivity[j] != undefined) {
            if (trainingActivity[j] != undefined && (trainingActivityNotes[j].notesAthlete.sharedNote != "" || trainingActivityNotes[j].notesAthlete.personalNote != "" || trainingActivityNotes[j].notesCoach.sharedNote != "" || trainingActivityNotes[j].notesCoach.personalNote != "")) {
              $scope.applyNotesCSS[j] = {};
              $scope.applyNotesCSS[j].status = true;
              // console.log("status 3", $scope.applyNotesCSS[j].status);
              $scope.applyNotesCSS[j]._id = trainingActivityNotes[j]._id;
              $scope.trainingPhasesData[w].activities.push({
                _id: trainingActivity[j]._id,
                name: trainingActivity[j].name,
                detail: trainingActivity[j].detail,
                volume: trainingActivity[j].volume,
                intensity: trainingActivity[j].intensity,
                startDate: moment(startDate).add(j, 'days').toDate(),
                noteID: trainingActivityNotes[j]._id,
                athleteNoteData: trainingActivityNotes[j].notesAthlete,
                coachNoteData: trainingActivityNotes[j].notesCoach
              });
            } else {
              $scope.applyNotesCSS[j] = {};
              $scope.applyNotesCSS[j].status = false;
              // console.log("status 4", $scope.applyNotesCSS[j].status);
              $scope.applyNotesCSS[j]._id = trainingActivityNotes[j]._id;
              $scope.trainingPhasesData[w].activities.push({
                _id: trainingActivity[j]._id,
                name: trainingActivity[j].name,
                detail: trainingActivity[j].detail,
                volume: trainingActivity[j].volume,
                intensity: trainingActivity[j].intensity,
                startDate: moment(startDate).add(j, 'days').toDate(),
                noteID: trainingActivityNotes[j]._id,
                athleteNoteData: trainingActivityNotes[j].notesAthlete,
                coachNoteData: trainingActivityNotes[j].notesCoach
              });
            }
          } else {
            break;
          }
        }
        if ($scope.trainingPhasesData[w] == undefined) {
          break;
        }
        k = k + loopDuration;
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


    MyServices.getMyPlan($scope.formData, function (data) {
      if (data.value === true) {
        $scope.hideLoading();
        console.log(data);
        if (data.data.TrainingPlan) {
          $scope.showPlan = true;
          $scope.trainingActivity = data.data.TrainingActivity;
          $scope.trainingPlan = data.data.TrainingPlan[0];
          $scope.trainingPhases = data.data.TrainingPlan[0].phase;
          $scope.trainingActivityNotes = data.data.TrainingActivityNotes;
          $scope.generatePlan($scope.trainingPlan.startDate, $scope.trainingPhases, $scope.trainingActivity, $scope.trainingActivityNotes);
          $scope.generateDiaryPhases($scope.trainingPlan.startDate, $scope.trainingPhases);
          $scope.generateDiary(data.data.Aspect, data.data.Competition, data.data.Test, data.data.Injury);
          console.log($scope.trainingPlan.startDate);
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

    $scope.trainingDiary = [$scope.phase, $scope.aspects, $scope.competitions, $scope.tests, $scope.injury];

  })

  .controller('AthleteRegistrationCtrl', function ($scope, $state, $ionicPopup, MyServices, $ionicLoading, $filter, $ionicModal) {

    $scope.formData = {};

    $scope.gender = ['Male', 'Female'];

    $scope.athleteFocus = [
      'Sprinting', 'Middle Distance', 'Endurance', 'Throws', 'Jumps', 'Hurdles', 'Race Walking', 'Hill/Fell Running', 'Cross Country', 'Triathlon', 'Team Sport'
    ];

    $scope.maxDate = $filter('date')(new Date(), 'yyyy-MM-dd');

    $scope.onlyAplha = /^[a-zA-Z_]+$/;
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
      MyServices.register(formData, function (data) {
        if (data.value === true) {
          $scope.formData = {};
          $scope.hideLoading();
          $scope.regPop = $ionicPopup.show({
            // template: '<p>Thank you for registering with Coach Mentor. We have received your registration and you will shortly receive a message on your registered email with a verification link. Please follow the verification link to activate your athlete account. Please fill out your other personal details in your own time.</p>',
            template: '<p>Registration Successful!</p>',
            title: 'Thank you',
            scope: $scope,
            buttons: [{
              type: 'button-positive',
              text: 'OK'
            }]
          });
          $scope.modal2.hide();
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
    $ionicModal.fromTemplateUrl('templates/athlete-modal/static-page.html', {
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
          $scope.showLoading('Loading Failed!', 2000);
        }
      });
      $scope.modal.show();
    };
    $scope.closeModal = function () {
      $scope.modal.hide();
    };

  })


  .controller('ServiceFormCtrl', function ($scope, $state, $ionicPopup, MyServices, $ionicLoading, $filter, $ionicModal) {

  })

  ;

//end of Athlete controller
