angular.module('SnipeItApp', [
    'SnipeItApp.controllers',
    'SnipeItApp.services',
    'ngRoute',
    'angucomplete'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when("/asset", {templateUrl: "partials/asset/index.html", controller: "assetIndexController"}).
        when("/asset/:id", {templateUrl: "partials/asset/view.html", controller: "assetViewController"}).
        when("/asset/:id/checkin", {templateUrl: "partials/asset/checkin.html", controller: "assetCheckinController"}).
        when("/asset/:id/checkout", {templateUrl: "partials/asset/checkout.html", controller: "assetCheckoutController"}).
        when("/asset/:id/repare", {templateUrl: "partials/asset/repare.html", controller: "assetRepareController"}).
        otherwise({redirectTo: '/asset'});
}]);