//https://api.openweathermap.org/data/2.5/weather?q=Madhubani&appid=5ec5a004f1231f0b99ce494b13920455

(function () {
  "use strict";

  angular
    .module("my-app", [])
    .controller("myController", myController)
    .service("apiService", apiService)
    .directive("apiData", dataDirective);

    function dataDirective() { 
      var ddo = {
        templateUrl : "weatherData.html",
        // scope : {
        //   data : "<"
        // },
        // controller : errorController,
        // controllerAs : "error",
        // bindToController: true,
      } 
      return ddo;
    }

    // function errorController() { 
    //   var error = this;

    //   console.log(error);
    //   error.coldOrNot = function() {
    //     var feeling = "acha mausam hai"
    //     if(error.data.main.feels_like < 20) { 
    //       feeling = "Bhai itni thand? :o"
    //       return feeling;
    //     }
    //     return feeling;
    //   }
    // }

    myController.$inject = ["apiService"];
    function myController(apiService) { 
      var my = this;
      my.location = "";
      my.finalData = "";
      my.err = "";
      my.dataIsLoaded = false;
      my.getWeather = function() { 
        var data = apiService.findWeatherData(my.location);
        data.then(
          function(res) { 
            my.finalData = res.data;
            my.dataIsLoaded = true;
            my.err = "";
          }
        ).catch(
          function(err) {
            my.err = err.data.message;
            my.dataIsLoaded = false;
          }
        )
      }
    }

    apiService.$inject = ["$http"];
    function apiService($http) { 
      var as = this;
      as.findWeatherData = function(city) { 
        var data = $http({
          method : "GET",
          url : "https://api.openweathermap.org/data/2.5/weather?q=" + city +"&appid=5ec5a004f1231f0b99ce494b13920455&units=metric"
        })
        return data;
      }
    }
    
})();
