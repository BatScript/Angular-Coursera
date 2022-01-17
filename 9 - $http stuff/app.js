//https://ghibliapi.herokuapp.com/films/

(function () {
  "use strict";
  angular
    .module("my-app", [])
    .controller("first-controller", firstController)
    .service("movieService", movieService);
  firstController.$inject = ["movieService"];
  function firstController(movieService) {
    var fc = this;
    var p = movieService.getFilms();
    p.then(function (response) {
      fc.value = response.data;
    }).catch(function (error) {
      fc.value = error;
    });
  }

  movieService.$inject = ["$http"];
  function movieService($http) {
    var service = this;
    service.getFilms = function () {
      var response = $http({
        method: "GET",
        url: "https://ghibliapi.herokuapp.com/films/",
      });
      return response;
    };
  }
})();
