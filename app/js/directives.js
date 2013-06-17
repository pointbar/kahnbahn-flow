'use strict';

/* Directives */

angular.module('KBFlow.directives', []).
  directive('flowChart', [function() {
    return {
      restrict: 'E',
      scope: '=data',
      template: '<canvas id="canvas" height="450" width="1000"></canvas>',
      link: function(scope, elm, attrs) {
        var lineChartData = {
          labels : ["1","2","March","April","May","June","July"],
          datasets : [
            {
              fillColor : "rgba(220,220,220,.5)",
              strokeColor : "rgba(220,220,220,1)",
              pointColor : "rgba(220,220,220,1)",
              pointStrokeColor : "#fff",
              data : [35,58,60,40,56,55,90]
            },
            {
              fillColor : "rgba(151,187,205,.5)",
              strokeColor : "rgba(151,187,205,1)",
              pointColor : "rgba(151,187,205,1)",
              pointStrokeColor : "#fff",
              data : scope.data
            }
          ]
        };
        var myLine = new Chart(document.getElementById("canvas").getContext("2d")).Line(lineChartData, {bezierCurve: false});

      }
    };
  }]);
