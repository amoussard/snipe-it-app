angular.module('SnipeItApp.services', []).
    factory('snipeItAPIservice', function($http) {

        var snipeItAPI = {};

        snipeItAPI.getAssets = function() {
            return $http({
                method: 'GET',
                url: 'http://192.168.2.18:3000/hardware'
            });
        };

        snipeItAPI.searchOne = function(macAddress) {
            return $http({
                method: 'GET',
                url: 'http://192.168.2.18:3000/hardware/findOne',
                params: {
                    macAddress: macAddress
                }
            });
        };

        snipeItAPI.getAsset = function(id, withLogs) {
            var request = {
                method: 'GET',
                url: 'http://192.168.2.18:3000/hardware/'+id
            }
            if (withLogs) {
                request.params = {
                    withLogs: true
                }
            }
            return $http(request);
        };

        snipeItAPI.checkin = function(id, note) {
            return $http({
                method: 'POST',
                url: 'http://192.168.2.18:3000/hardware/'+id+'/checkin',
                data: {
                    note: note
                }
            });
        };

        snipeItAPI.repare = function(id, note) {
            return $http({
                method: 'POST',
                url: 'http://192.168.2.18:3000/hardware/'+id+'/repare',
                data: {
                    note: note
                }
            });
        };

        return snipeItAPI;
    });