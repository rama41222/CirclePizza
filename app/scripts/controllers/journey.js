'use strict';

/**
 * @ngdoc function
 * @name justforfunApp.controller:JourneyCtrl
 * @description
 * # JourneyCtrl
 * Controller of the justforfunApp
 */
angular.module('CirclePizza')
  .controller('JourneyCtrl', function ($http, $scope, MAPS_URL, MAPS_API_KEY, toaster) {
    $scope.destination = "Kandy"
    $scope.start = "Matara"
    $scope.destinationString = ""
    $scope.originatingString = ""
    $scope.totalDistance = ""
    $scope.fee = ""
    $scope.duration = ""
    $scope.hasData = false
    $scope.getDirections = function () {

      if($scope.destination === ""|| $scope.start === "") {
          toaster.pop('error', 'Error!', 'Validation Error');
      } else {
        $http.get(MAPS_URL+'origins='+ $scope.start + '&destinations='+ $scope.destination+ '&key=' + MAPS_API_KEY).then(function (locObj) {
          console.log(locObj)

          if(locObj.status == 200) {
            $scope.destinationString = locObj.data.destination_addresses.toString() || ""
            $scope.originatingString = locObj.data.origin_addresses.toString() || ""
            $scope.totalDistance = locObj.data.rows[0].elements[0].distance.text || ""
            $scope.duration = locObj.data.rows[0].elements[0].duration.text || ""
            var distanceInKM = (locObj.data.rows[0].elements[0].distance.value)/2000 || 0
            $scope.fee = distanceInKM * 4.2
            $scope.hasData = true
          } else {
            $scope.hasData = false
            toaster.pop('error', 'Error!', "Incorrect location");
          }
        }).catch(function (e) {
          $scope.hasData = false
          toaster.pop('error', 'Error!', "Incorrect location");
        })
      }
    }
  });


// {
//   "destination_addresses" : [ "Kandy, Sri Lanka" ],
//   "origin_addresses" : [ "Colombo, Sri Lanka" ],
//   "rows" : [
//   {
//     "elements" : [
//       {
//         "distance" : {
//           "text" : "134 km",
//           "value" : 133504
//         },
//         "duration" : {
//           "text" : "3 hours 31 mins",
//           "value" : 12643
//         },
//         "status" : "OK"
//       }
//     ]
//   }
// ],
//   "status" : "OK"
// }

