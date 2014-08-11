angular.module('SnipeItApp', [
    'SnipeItApp.controllers',
    'SnipeItAssetApp.services',
    'SnipeItLocationApp.services',
    'SnipeItStatusApp.services',
    'SnipeItModelApp.services',
    'ngRoute'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when("/asset", {templateUrl: "partials/asset/index.html", controller: "assetIndexController"}).
        when("/asset/:id", {templateUrl: "partials/asset/view.html", controller: "assetViewController"}).
        when("/asset/:id/checkin", {templateUrl: "partials/asset/checkin.html", controller: "assetCheckinController"}).
        when("/asset/:id/checkout", {templateUrl: "partials/asset/checkout.html", controller: "assetCheckoutController"}).
        when("/asset/:id/repare", {templateUrl: "partials/asset/repare.html", controller: "assetRepareController"}).
        when("/asset/:id/edit", {templateUrl: "partials/asset/edit.html", controller: "assetEditController"}).
        otherwise({redirectTo: '/asset'});
}]);