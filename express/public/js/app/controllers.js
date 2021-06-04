'use strict';

zenContactApp.controller('ContactListController', ['$scope', 'contactService', 'Contact', function ($scope, contactService, Contact) {

  $scope.contacts = Contact.query();

  if (typeof io !== 'undefined') {
    var socket = io.connect();
    socket.on('contacts', function (contacts) {
      $scope.$apply(function () {
        $scope.contacts = contacts;
      });
    });
  }
}]);

zenContactApp.controller('ContactEditController', ['$scope', 'contactService', '$routeParams', '$location', 'Contact', function ($scope, contactService, $routeParams, $location, Contact) {
  if ($routeParams.id) {

    $scope.contact = Contact.get({id: $routeParams.id});
  } else {
    $scope.contact = new Contact();
  }

  $scope.saveContact = function (contact) {


    if (typeof contact.id !== "undefined") {
      contact.$update(function () {
        $location.path("/list");
      });
    } else {
      Contact.save(contact, function () {
        $location.path("/list");
      });
    }
  }
}]);
