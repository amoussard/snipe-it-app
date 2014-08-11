angular.module('SnipeItLocationApp.services', []).
    factory('snipeItLocationAPIservice', function($http) {

        var snipeItLocationAPI = {};

        snipeItLocationAPI.search = function(s) {
            return $http({
                method: 'GET',
                url: 'http://api.snipeit.local:3000/location/search',
                params: {
                    s: s
                }
            });
        };

        return snipeItLocationAPI;
    });