angular.module('SnipeItModelApp.services', []).
    factory('snipeItModelAPIservice', function($http) {

        var snipeItModelAPI = {};

        snipeItModelAPI.getModelsList = function() {
            return $http({
                method: 'GET',
                url: API_URL+'/model'
            });
        };

        return snipeItModelAPI;
    });