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

    fc.aboutFilm = function (id) {
      var p2 = movieService.getOneFilm(id);
      p2.then(function (response) {
        console.log(response);
      }).catch(function (error) {
        console.log(error);
      });
    };
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
    service.getOneFilm = function (id) {
      var response = $http({
        method: "GET",
        url: "https://ghibliapi.herokuapp.com/films/" + id,
      });
      return response;
    };
  }
})();
