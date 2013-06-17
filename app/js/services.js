'use strict';

angular.module('KBFlow.services', ['ngResource']).
  factory('TrelloServ', function($resource) {
    var url = "https://api.trello.com/1/:elem/:elemId/:cards?:params:key:token";
    var trelloList = JSON.parse(localStorage.getItem('trelloLists'));
    var key = localStorage.getItem('trelloKey');
    var token = localStorage.getItem('trelloToken');

    var ressource = {
      lists: {
        method:'GET',
        params: {
          elem: 'boards',
          elemId: '513dfe3e99a3072a670000ca',
          cards: '',
          params: '&lists=open&list_fields=id,name'
        },
        isArray:false
      }
    };

    angular.forEach(trelloList, function(value) {
      ressource[value['id']] = {
        method:'GET',
        params: {
          elem: 'list',
          elemId: value['id'],
          cards: 'cards',
          params: '&fields=idShort'
        },
        isArray:true
      }
    });

    return $resource(url, {
        key: '&key=' + key,
        token: '&token=' + token
      }, ressource)
  });