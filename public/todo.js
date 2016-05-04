/*global angular alert*/
angular.module('todoApp', [])
  .controller('appController', function ($http, $interval) {
    var app = this
    Name()
    $interval(function () {
      Name()
    }, 30000)
    ip()
    speed()
    subnet()
    interf()
    interfstatus()
    $interval(function () {
      speed()
    // console.log(app.speed[0].speeds.download)
    }, 15000)
    var dl = 0
    var ul = 0
    setTimeout(function () {
      $interval(function () {
        dl = app.speed[0].speeds.download
        ul = app.speed[0].speeds.upload
        console.log(dl + ' + ' + ul)
      }, 5000)
    }, 20000)
    console.log(dl + ' - ' + ul)
    app.load = false
    app.title = 'Monitor'
    // app.ipnetwork = []
    var data = {
      labels: ['Download', 'Upload'],
      datasets: [
        {
          label: 'Speed Test',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [dl, ul],
        }
      ]
    }
    var ctx = document.getElementById('myChart')
    new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            stacked: true
          }]
        }
      }
    })
    app.timee = function (timee) {
      return humanizeDuration(timee)
    }
    function Name () {
      $http.get('/name').then(function success (response) {
        app.name = response.data
      // console.log(app.name)
      })
    }

    function ip () {
      $http.get('/ip').then(function success (response) {
        app.ip = response.data
      // console.log(app.ip)
      })
    }

    function subnet () {
      $http.get('/subnet').then(function success (response) {
        app.subnet = response.data
      // console.log(app.subnet)
      })
    }

    function speed () {
      $http.get('/speed').then(function success (response) {
        app.speed = response.data
      // console.log(app.speed)
      })
    }

    function interf () {
      $http.get('/interface').then(function success (response) {
        app.interf = response.data
      // console.log(response)
      })
    }

    function interfstatus () {
      $http.get('/interfacestatus').then(function success (response) {
        app.interfstatus = response.data
      // console.log(app.speed)
      })
    }
  })
