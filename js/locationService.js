angular.module('SnipeItLocationApp.services', []).
    factory('snipeItLocationAPIservice', function($http) {

        var snipeItLocationAPI = {};

        snipeItLocationAPI.search = function(s) {
            return $http({
                method: 'GET',
                url: API_URL+'/location/search',
                params: {
                    s: s
                }
            });
        };

        return snipeItLocationAPI;
    });