angular.module('SnipeItAssetApp.services', []).
    factory('snipeItAssetAPIservice', function($http) {

        var snipeItAssetAPI = {};

        snipeItAssetAPI.getAssets = function() {
            return $http({
                method: 'GET',
                url: API_URL+'/hardware'
            });
        };

        snipeItAssetAPI.searchOne = function(macAddress) {
            return $http({
                method: 'GET',
                url: API_URL+'/hardware/findOne',
                params: {
                    macAddress: macAddress
                }
            });
        };

        snipeItAssetAPI.getAsset = function(id) {
            return $http({
                method: 'GET',
                url: API_URL+'/hardware/'+id
            });
        };

        snipeItAssetAPI.checkin = function(id, note) {
            return $http({
                method: 'POST',
                url: API_URL+'/hardware/'+id+'/checkin',
                data: {
                    note: note
                }
            });
        };

        snipeItAssetAPI.repare = function(id, note) {
            return $http({
                method: 'POST',
                url: API_URL+'/hardware/'+id+'/repare',
                data: {
                    note: note
                }
            });
        };

        snipeItAssetAPI.checkout = function(asset, note) {
            return $http({
                method: 'POST',
                url: API_URL+'/hardware/'+asset.id+'/checkout',
                data: {
                    location: asset.location.id,
                    note: note
                }
            });
        };

        snipeItAssetAPI.getBarcode = function(id) {
            return API_URL+'/hardware/' + id + '/barcode';
        };

        snipeItAssetAPI.save = function(asset) {
            return $http({
                method: 'PUT',
                url: API_URL+'/hardware/'+asset.id,
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

        snipeItAssetAPI.create = function(asset) {
            return $http({
                method: 'POST',
                url: API_URL+'/hardware',
                data: {
                    name: asset.name,
                    serial: asset.serial,
                    mac: asset.macAddress,
                    model_id: asset.model.id,
                    location_id: asset.location.id,
                    notes: asset.notes
                }
            });
        };

        snipeItAssetAPI.generateBarcode = function(asset) {
            return $http({
                method: 'PUT',
                url: API_URL+'/hardware/'+asset.id+'/barcode'
            });
        };

        return snipeItAssetAPI;
    });