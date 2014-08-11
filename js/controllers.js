var STATUS_OUT_FOR_DIAGNOSTICS = 1;
var STATUS_OUT_FOR_REPAIR = 2;
var STATUS_BROKEN_NOT_FIXABLE = 3;
var STATUS_LOST_STOLEN = 4;
var STATUS_READY_TO_DEPLOY = 5;
var STATUS_TESTING = 6;
var STATUS_DEPLOYED = 7;

var STATUS_TO_CLASS = {
    1: 'btn-warning',
    2: 'btn-warning',
    3: 'btn-danger',
    4: 'btn-danger',
    5: 'btn-primary',
    6: 'btn-info',
    7: 'btn-success'
};

function isEmpty(map) {
    for(var key in map) {
        if (map.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}

angular.module('SnipeItApp.controllers', []).


    controller('assetIndexController', function($scope, snipeItAPIservice) {
        $scope.update = function (macAddress) {
            snipeItAPIservice.searchOne(macAddress)
                .success(function (response) {
                    $scope.asset = response;
                    if (isEmpty(response)) {
                        $scope.asset = null;
                    }
                });
        };

        $scope.reset = function () {
            $scope.asset = null;
            $scope.macAddress = '';
        }
    }).

    controller('assetViewController', function($scope, $routeParams, $location, snipeItAPIservice) {
        $scope.id = $routeParams.id;

        snipeItAPIservice.getAsset($scope.id, true)
            .success(function (response) {
                if (isEmpty(response)) {
                    $location.path("/asset");
                }
                $scope.asset = response;
                $scope.asset.status.class = STATUS_TO_CLASS[$scope.asset.status.id];
            });
    }).

    controller('assetCheckinController', function($scope, $routeParams, snipeItAPIservice) {
        $scope.id = $routeParams.id;

        snipeItAPIservice.getAsset($scope.id)
            .success(function (response) {
                $scope.asset = response;
                $scope.asset.status.class = STATUS_TO_CLASS[$scope.asset.status.id];
            });

        $scope.checkin = function () {
            $scope.loading = true;

            snipeItAPIservice.checkin($scope.asset.id, $scope.note)
                .success(function (response) {
                    if (isEmpty(response)) {
                        $location.path("/asset");
                    }

                    if (response.success) {
                        $scope.responses = {
                            message: $scope.asset.name + ' is back home with success',
                            class: 'alert-success',
                            icon: 'glyphicon glyphicon-ok'
                        };
                    } else {
                        $scope.responses = {
                            message: 'Error : ' + response.error,
                            class: 'alert-danger',
                            icon: 'glyphicon glyphicon-remove'
                        };
                    }
                    $scope.loading = false;
                    $scope.finish = true;
                });
        };
    }).

    controller('assetRepareController', function($scope, $routeParams, snipeItAPIservice) {
        $scope.id = $routeParams.id;

        snipeItAPIservice.getAsset($scope.id)
            .success(function (response) {
                $scope.asset = response;
                $scope.asset.status.class = STATUS_TO_CLASS[$scope.asset.status.id];
            });

        $scope.repare = function () {
            $scope.loading = true;

            snipeItAPIservice.repare($scope.asset.id, $scope.note)
                .success(function (response) {

                    if (isEmpty(response)) {
                        $location.path("/asset");
                    }

                    if (response.success) {
                        $scope.responses = {
                            message: 'Send to Exabit for repair sucess',
                            class: 'alert-success',
                            icon: 'glyphicon glyphicon-ok'
                        };
                    } else {
                        $scope.responses = {
                            message: 'Error : ' + response.error,
                            class: 'alert-danger',
                            icon: 'glyphicon glyphicon-remove'
                        };
                    }
                    $scope.loading = false;
                    $scope.finish = true;
                });
        };
    }).

    controller('assetCheckoutController', function($scope, $routeParams, snipeItAPIservice, snipeItLocationAPIservice) {
        $scope.id = $routeParams.id;

        snipeItAPIservice.getAsset($scope.id)
            .success(function (response) {
                $scope.asset = response;
                $scope.asset.status.class = STATUS_TO_CLASS[$scope.asset.status.id];
                $scope.updateLocation = false;
                $scope.locations = [];
            });

        $scope.modifyLocation = function () {
            $scope.updateLocation = true;
        };

        $scope.updateLocations = function (locationName) {
            snipeItLocationAPIservice.search(locationName)
                .success(function (response) {
                    $scope.locations = response;
                });
        };

        $scope.checkout = function () {
            $scope.loading = true;
            console.log($scope.asset);
        };
    });