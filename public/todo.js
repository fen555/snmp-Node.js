/*global angular alert*/
angular.module('todoApp', [])
  .controller('appController', function ($http) {
    var app = this
    Name()
    ip()
    app.title = 'Monitor'
    // app.ipnetwork = []

    function Name () {
      $http.get('/name').then(function success (response) {
        app.name = response.data
        console.log(app.name)
      })
    }

    function ip () {
      $http.get('/ip').then(function success (response) {
        app.ip = response.data
        console.log(app.ip)
      })
    }


  })
