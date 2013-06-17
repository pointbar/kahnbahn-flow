'use strict';

var module = angular.module('KBFlow', ['KBFlow.filters', 'KBFlow.services', 'KBFlow.directives', 'KBFlow.controllers']);

module.factory('lists', function(TrelloServ) {
  var listsName = [];
  var trelloLists = TrelloServ.lists(function() {
    angular.copy(trelloLists.lists, listsName);
  });
  return listsName;
});

module.factory('cards', function(TrelloServ) {
  var cards = [];
  var trelloList = JSON.parse(localStorage.getItem('trelloLists'));
  angular.forEach(trelloList, function(value){
    cards.push(TrelloServ[value['id']]());
  });
  return cards;
});

module.config(['$routeProvider', function($routeProvider) {
  var defaultUrl = "/cards";
  // -TODO- ext
  if (localStorage.getItem('trelloToken') === null || localStorage.getItem('trelloKey') === null) {
    defaultUrl = "/trello-auth";
  }
  $routeProvider.when('/cards', {templateUrl:'partials/Cards.html', controller:'Cards'});
  $routeProvider.when('/trello-auth', {templateUrl:'partials/trello-auth.html', controller:'TrelloAuth'});
  $routeProvider.otherwise({redirectTo: defaultUrl});
}]).
config(['$httpProvider', function($httpProvider) {
  // unlock CORS to access Trello API
  // $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);