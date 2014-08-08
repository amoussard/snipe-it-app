angular.module('SnipeItApp.services', []).
    factory('snipeItAPIservice', function($http) {

        var snipeItAPI = {};

        snipeItAPI.getAssets = function() {
            return $http({
                method: 'GET',
                url: 'http://snipeit.local/api/hardware'
            });
        };

        snipeItAPI.searchOne = function(macAddress) {
            return $http({
                method: 'GET',
                url: 'http://snipeit.local/api/hardware/searchOne?macAddress='+macAddress
            });
        }

        return snipeItAPI;
    });