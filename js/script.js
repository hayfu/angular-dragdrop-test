var module = angular.module('my-app', []);
//Draggable directive
module.directive('draggable', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      element[0].addEventListener('dragstart', scope.handleDragStart, false);
      element[0].addEventListener('dragend', scope.handleDragEnd, false);
    }
  }
});
//Droppable directive
module.directive('droppable', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      element[0].addEventListener('drop', scope.handleDrop, false);
      element[0].addEventListener('dragover', scope.handleDragOver, false);
    }
  }
});
//Our controlller 
module.controller("MainController", ['$scope', function ($scope) {

    $scope.drag_types = ["img/1.png" ,"img/2.png","img/3.png"];
    $scope.items = [];
    
    $scope.handleDragStart = function(e){
        this.style.opacity = '0.4';
		console.log(this.innerHTML)
        e.dataTransfer.setData('text/plain', this.innerHTML.getAttribute('src'));
    };
    
    $scope.handleDragEnd = function(e){
        this.style.opacity = '1.0';
    };
    
    $scope.handleDrop = function(e){
		this.className = 'drop';
		console.log(e)
        e.preventDefault();
        e.stopPropagation();
        var dataText = e.dataTransfer.getData('text/plain');		
        $scope.$apply(function() {
            $scope.items.push(dataText);
        });
        console.log(e)
    };
    
    $scope.handleDragOver = function (e) {
		this.className = 'active';
        e.preventDefault(); 
        e.dataTransfer.dropEffect = 'move';  
        return false;
  };        
}]);