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


    controller('assetIndexController', function($scope, snipeItAssetAPIservice) {
        $scope.update = function (macAddress) {
            snipeItAssetAPIservice.searchOne(macAddress)
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

    controller('assetViewController', function($scope, $routeParams, $location, snipeItAssetAPIservice) {
        $scope.id = $routeParams.id;

        snipeItAssetAPIservice.getAsset($scope.id)
            .success(function (response) {
                if (isEmpty(response)) {
                    $location.path("/asset");
                }
                $scope.asset = response;
                $scope.asset.status.class = STATUS_TO_CLASS[$scope.asset.status.id];
                $scope.newBarcode = CryptoJS.MD5(
                    ($scope.asset.serial ? $scope.asset.serial : '')
                    +($scope.asset.macAddress ? $scope.asset.macAddress : '')
                    +($scope.asset.model.id ? $scope.asset.model.id : '')
                ).toString();
            });

        $scope.generateBarcode = function() {
            snipeItAssetAPIservice.generateBarcode($scope.asset)
                .success(function (response) {
                    if (isEmpty(response)) {
                        $location.path("/asset");
                    }
                    $scope.asset.barcode = response.barcode;
                });
        }
    }).

    controller('assetCheckinController', function($scope, $routeParams, $location, snipeItAssetAPIservice) {
        $scope.id = $routeParams.id;

        snipeItAssetAPIservice.getAsset($scope.id)
            .success(function (response) {
                if (isEmpty(response)) {
                    $location.path("/asset");
                }
                $scope.asset = response;
                $scope.asset.status.class = STATUS_TO_CLASS[$scope.asset.status.id];
            });

        $scope.checkin = function () {
            $scope.loading = true;

            snipeItAssetAPIservice.checkin($scope.asset.id, $scope.note)
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

    controller('assetRepareController', function($scope, $routeParams, $location, snipeItAssetAPIservice) {
        $scope.id = $routeParams.id;

        snipeItAssetAPIservice.getAsset($scope.id)
            .success(function (response) {
                if (isEmpty(response)) {
                    $location.path("/asset");
                }
                $scope.asset = response;
                $scope.asset.status.class = STATUS_TO_CLASS[$scope.asset.status.id];
            });

        $scope.repare = function () {
            $scope.loading = true;

            snipeItAssetAPIservice.repare($scope.asset.id, $scope.note)
                .success(function (response) {
                    if (isEmpty(response)) {
                        $location.path("/asset");
                    }

                    if (response.success) {
                        $scope.responses = {
                            message: 'Send to Exabit for repair success',
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

    controller('assetCheckoutController', function($scope, $routeParams, $location, snipeItAssetAPIservice, snipeItLocationAPIservice) {
        $scope.id = $routeParams.id;

        snipeItAssetAPIservice.getAsset($scope.id)
            .success(function (response) {
                if (isEmpty(response)) {
                    $location.path("/asset");
                }
                $scope.asset = response;
                $scope.asset.status.class = STATUS_TO_CLASS[$scope.asset.status.id];
                $scope.updateLocation = false;
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

        $scope.chooseLocation = function (location) {
            $scope.asset.location = location;
            $scope.updateLocation = false;
        };

        $scope.checkout = function () {
            $scope.loading = true;

            snipeItAssetAPIservice.checkout($scope.asset, $scope.note)
                .success(function (response) {
                    if (isEmpty(response)) {
                        $location.path("/asset");
                    }

                    if (response.success) {
                        $scope.responses = {
                            message: 'Send to '+$scope.asset.location.name+' with success',
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

    controller('assetBarcodeController', function($scope, $routeParams, $location, snipeItAssetAPIservice) {
        $scope.id = $routeParams.id;
        $scope.barcode = snipeItAssetAPIservice.getBarcode($scope.id);
    }).

    controller('assetEditController', function($scope, $routeParams, $location, snipeItAssetAPIservice, snipeItStatusAPIservice, snipeItModelAPIservice, snipeItLocationAPIservice) {
        $scope.id = $routeParams.id;

        snipeItAssetAPIservice.getAsset($scope.id)
            .success(function (response) {
                if (isEmpty(response)) {
                    $location.path("/asset");
                }
                $scope.asset = response;
                $scope.asset.status.class = STATUS_TO_CLASS[$scope.asset.status.id];
                $scope.updateLocation = false;
            });

        snipeItStatusAPIservice.getStatusList()
            .success(function (response) {
                for (var i in response) {
                    response[i].class = STATUS_TO_CLASS[response[i].id];
                }
                $scope.statusList = response;
            });

        snipeItModelAPIservice.getModelsList()
            .success(function (response) {
                $scope.modelsList = response;
            });

        $scope.modifyLocation = function () {
            $scope.updateLocation = true;
        };

        $scope.filterLocations = function (locationName) {
            snipeItLocationAPIservice.search(locationName)
                .success(function (response) {
                    $scope.locations = response;
                });
        };

        $scope.chooseStatus = function (status) {
            $scope.asset.status = status;
        };

        $scope.chooseModel = function (model) {
            $scope.asset.model = model;
        };

        $scope.chooseLocation = function (location) {
            $scope.asset.location = location;
            $scope.updateLocation = false;
        };

        $scope.save = function () {
            $scope.loading = true;

            snipeItAssetAPIservice.save($scope.asset)
                .success(function (response) {
                    if (isEmpty(response)) {
                        $location.path("/asset");
                    }

                    if (response.success) {
                        $scope.responses = {
                            message: $scope.asset.name+' saved with success',
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

    controller('assetAddController', function($scope, $routeParams, $location, snipeItAssetAPIservice, snipeItModelAPIservice, snipeItLocationAPIservice) {
        $scope.asset = {};
        $scope.updateLocation = false;

        snipeItModelAPIservice.getModelsList()
            .success(function (response) {
                $scope.modelsList = response;
            });

        $scope.modifyLocation = function () {
            $scope.updateLocation = true;
        };

        $scope.filterLocations = function (locationName) {
            snipeItLocationAPIservice.search(locationName)
                .success(function (response) {
                    $scope.locations = response;
                });
        };

        $scope.chooseModel = function (model) {
            $scope.asset.model = model;
        };

        $scope.chooseLocation = function (location) {
            $scope.asset.location = location;
            $scope.updateLocation = false;
        };

        $scope.create = function () {
            $scope.loading = true;
            $scope.responses = null;

            if (!$scope.asset.model || !$scope.asset.model.id) {
                $scope.responses = {
                    message: 'Error : The model must be chosen.',
                    class: 'alert-danger',
                    icon: 'glyphicon glyphicon-remove'
                };
                $scope.loading = false;
                return;
            }

            if (!$scope.asset.location || !$scope.asset.location.id) {
                $scope.responses = {
                    message: 'Error : The location must be chosen.',
                    class: 'alert-danger',
                    icon: 'glyphicon glyphicon-remove'
                };
                $scope.loading = false;
                return;
            }

            snipeItAssetAPIservice.create($scope.asset)
                .success(function (response) {
                    if (response.success) {
                        snipeItAssetAPIservice.getAsset(response.id)
                            .success(function (response) {
                                $scope.asset = response;

                                $scope.responses = {
                                    message: $scope.asset.name+' saved with success with the barcode : '+$scope.asset.barcode,
                                    class: 'alert-success',
                                    icon: 'glyphicon glyphicon-ok'
                                };
                            });

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
    });