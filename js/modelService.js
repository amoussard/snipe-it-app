angular.module('SnipeItModelApp.services', []).
    factory('snipeItModelAPIservice', function($http) {

        var snipeItModelAPI = {};

        snipeItModelAPI.getModelsList = function() {
            return $http({
                method: 'GET',
                url: 'http://api.snipeit.local:3000/model'
            });
        };

        return snipeItModelAPI;
    });