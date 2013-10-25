'use strict';

angular.module('demo', ['ngResource', 'ngAnimate'])
  .factory('ItemsDB', function($resource) {
    return $resource('/items/:id',
      {id: '@id'}, {
        get: {method: 'GET', isArray: true },
        add: {method: 'POST'},
        delete: {method: 'DELETE'}
      }
    );
  })
  .controller('Listing', ['$scope', 'ItemsDB', function($scope, ItemsDB) {

    ItemsDB.get(function(data) {
      $scope.items = data;
    });

    $scope.addItem = function() {
      var item = {
        name: $scope.newItem.name,
        description: $scope.newItem.description
      };
      ItemsDB.add(item, function(data) {
        item._id = data._id;
        $scope.items.push(item);
        $scope.newItem = {
          name: null,
          description: null
        }
      });
    };

    $scope.removeItem = function (item) {
      ItemsDB.delete({id:item._id}, function() {
        $scope.items.splice($scope.items.indexOf(item), 1);
      })
    };

  }]);

