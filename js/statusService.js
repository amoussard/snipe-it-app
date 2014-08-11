angular.module('SnipeItStatusApp.services', []).
    factory('snipeItStatusAPIservice', function($http) {

        var snipeItStatusAPI = {};

        snipeItStatusAPI.getStatusList = function() {
            return $http({
                method: 'GET',
                url: 'http://api.snipeit.local:3000/status'
            });
        };

        return snipeItStatusAPI;
    });