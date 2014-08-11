angular.module('SnipeItStatusApp.services', []).
    factory('snipeItStatusAPIservice', function($http) {

        var snipeItStatusAPI = {};

        snipeItStatusAPI.getStatusList = function() {
            return $http({
                method: 'GET',
                url: API_URL+'/status'
            });
        };

        return snipeItStatusAPI;
    });