'use strict';

var zenContactApp = angular.module('zenContact.app', ['zenContact.services', 'ngRoute']);

zenContactApp.config(function ($routeProvider) {
    $routeProvider.when('/list',            {templateUrl: 'view/list.html',     controller: 'ContactListController'});
    $routeProvider.when('/edit',            {templateUrl: 'view/edit.html',     controller: 'ContactEditController'});
    $routeProvider.when('/edit/:id',        {templateUrl: 'view/edit.html',     controller: 'ContactEditController'});
    $routeProvider.otherwise({redirectTo: '/list'});
});

zenContactApp.run(function ($rootScope, $location) {
    $rootScope.location = $location;
});

