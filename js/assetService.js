angular.module('SnipeItAssetApp.services', []).
    factory('snipeItAssetAPIservice', function($http) {

        var snipeItAssetAPI = {};

        snipeItAssetAPI.getAssets = function() {
            return $http({
                method: 'GET',
                url: 'http://api.snipeit.local:3000/hardware'
            });
        };

        snipeItAssetAPI.searchOne = function(macAddress) {
            return $http({
                method: 'GET',
                url: 'http://api.snipeit.local:3000/hardware/findOne',
                params: {
                    macAddress: macAddress
                }
            });
        };

        snipeItAssetAPI.getAsset = function(id) {
            return $http({
                method: 'GET',
                url: 'http://api.snipeit.local:3000/hardware/'+id
            });
        };

        snipeItAssetAPI.checkin = function(id, note) {
            return $http({
                method: 'POST',
                url: 'http://api.snipeit.local:3000/hardware/'+id+'/checkin',
                data: {
                    note: note
                }
            });
        };

        snipeItAssetAPI.repare = function(id, note) {
            return $http({
                method: 'POST',
                url: 'http://api.snipeit.local:3000/hardware/'+id+'/repare',
                data: {
                    note: note
                }
            });
        };

        snipeItAssetAPI.checkout = function(asset, note) {
            return $http({
                method: 'POST',
                url: 'http://api.snipeit.local:3000/hardware/'+asset.id+'/checkout',
                data: {
                    location: asset.location.id,
                    note: note
                }
            });
        };

        snipeItAssetAPI.save = function(asset) {
            return $http({
                method: 'PUT',
                url: 'http://api.snipeit.local:3000/hardware/'+asset.id,
                data: {
                    name: asset.name,
                    serial: asset.serial,
                    status_id: asset.status.id,
                    model_id: asset.model.id,
                    location_id: asset.location.id,
                    notes: asset.notes
                }
            });
        };

        return snipeItAssetAPI;
    });