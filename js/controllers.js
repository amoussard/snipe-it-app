function isEmpty(map) {
    for(var key in map) {
        if (map.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}

angular.module('SnipeItApp.controllers', []).
    controller('assetsController', function($scope, snipeItAPIservice) {
        $scope.assetsList = [];

        snipeItAPIservice.getAssets()
            .success(function (response) {
                $scope.assetsList = response;
            });

        $scope.update = function (macAddress) {
            snipeItAPIservice.searchOne(macAddress)
                .success(function (response) {
                    console.log(response);
                    console.log(isEmpty(response));

                    $scope.asset = response;
                    if (isEmpty(response)) {
                        $scope.asset = null;
                    }
                });
        };
    });