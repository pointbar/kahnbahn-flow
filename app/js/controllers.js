'use strict';

/* Controllers */

angular.module('KBFlow.controllers', ['KBFlow.services']).
  controller('Cards', ['$scope', '$http', 'cards', function($scope, $http, cards) {
    $scope.cards = cards;
  }])
  // -TODO- refacto
  .controller('TrelloAuth', ['$scope', 'lists', function($scope, lists) {
    $scope.trelloToken = localStorage.getItem('trelloToken');
    $scope.trelloKey = localStorage.getItem('trelloKey');
    $scope.trelloLists = JSON.parse(localStorage.getItem('trelloLists'));

    $scope.save = function() {
      localStorage.setItem('trelloToken', $scope.trelloToken);
      localStorage.setItem('trelloKey', $scope.trelloKey);
      localStorage.setItem('trelloLists', JSON.stringify(lists));
    }
    $scope.remove = function() {
      localStorage.removeItem('trelloToken');
      localStorage.removeItem('trelloKey');
      localStorage.removeItem('trelloLists');
      $scope.trelloToken = "";
      $scope.trelloKey = "";
      $scope.trelloLists = "";
    }
  }]);