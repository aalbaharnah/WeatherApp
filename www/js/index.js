var app = angular.module("MyWeatherApp", ['ui.router', 'ngAnimate']);

// Routing to the main body page.
app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/main');
    $stateProvider
        .state('main', {
            url: '/main',
            templateUrl: 'templates/data.html'
        })
        .state('favcity', {
            url: '/search',
            controller: 'MyWeatherController',
            templateUrl: 'templates/search.html'
        })
});


app.controller("MyWeatherController", function ($scope, $http, $timeout) {

    // Get cities from localStorage.
    $scope.cities = JSON.parse(localStorage.city);
    
    $scope.addCity = function () {
        $scope.errtxt = '';
        if (!$scope.addIt) {
            return;
        }
        if ($scope.cities.indexOf($scope.addIt) == -1) {
            $scope.cities.push($scope.addIt);
            localStorage.setItem('city' , JSON.stringify($scope.cities));
        } else {
            $scope.errtxt = 'The city is already in the list.'
        }

    }
    $scope.getFav = function (city) {
        var fav = localStorage.getItem("name");
        if (fav == city) {
            return true;
        }
        else {
            return false;
        }
    }

    $scope.removeCity = function (x) {
        $scope.cities.splice(x, 1);
        localStorage.setItem('city' , JSON.stringify($scope.cities));
    }

    $scope.favorCity = function (x) {
        console.log(x);
        console.log($scope.cities[x]);
        localStorage.setItem('name', $scope.cities[x]);
        return { 'content': '' }
    }

    $scope.loading = false;
    // Function to get the city name data.
    $scope.getAllData = function (name) {
        $http.get('http://api.apixu.com/v1/current.json?key=46114ce99ca14871b8963021191301&q=' + name)
            .then(function (response) {
                $scope.loading = true;
                $timeout(function () {
                    $scope.loading = false;
                }, 1100)
                console.log(response.data);
                $scope.cityData = response.data.location.name;
                $scope.cityTemp = response.data.current.temp_c + '°';
                $scope.cityWind = response.data.current.wind_kph + ' kph';
                $scope.cityHumidity = response.data.current.humidity + '%';
                $scope.cityIcon = response.data.current.condition.icon;
                $scope.cityCondition = response.data.current.condition.text;
                $scope.cityDay = response.data.current.is_day;
                $scope.code = response.data.current.condition.code;
                $http.get('../json/weather_icons.json').then(function(res){
                    for (var i=0; i<res.data.length; i++){
                        if (res.data[i].code == $scope.code){
                            console.log(res.data[i].icon);
                            console.log(res.data[i].day);
                            $scope.fontawsome =  res.data[i].icon;
                        }
                    }
                });
            });
    }

    $scope.getAllData(localStorage.getItem('name'));



    // Function to get user current location.
    $scope.getMeHome = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((function (position) {
                console.log(position.coords.longitude.toFixed(6) + '    ' + position.coords.latitude.toFixed(6));
    
                // Using Google API.
                $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude.toFixed(6) + ',' + position.coords.longitude.toFixed(6) + '&key=AIzaSyDzgPZGicdxjiHLFVem3lDIxR_XAVSEZus')
                    .then(function (loc) {
                        console.log(loc.data.results);
                        for (var i = 0; i < loc.data.results.length; i++) {
                            //console.log(loc.data.results[i].address_components[0].types[0]);
                            if (loc.data.results[i].address_components[0].types[0] == "locality") {
                                console.log(loc.data.results[i].address_components[0].long_name);
                                $scope.cityName = loc.data.results[i].address_components[0].long_name;
                            }
                        }
                        $scope.getAllData($scope.cityName);
                    });
            }));
            console.log("yes")
        } else {
            console.log("geolocation is not supporter by this browser.");
        }
    }

    // Function to search by city name.
    $scope.cityName = '';
    $scope.search = function () {
        $scope.getAllData($scope.cityName);
    }
    

    // Function to transition the backgroun based on the timing of the city.
    $scope.is_it_day = function () {
        if ($scope.cityDay === 0) {
            console.log("is is night there");
            return {
                "background-color": "#4DD0E1",
                "-webkit-transition": "background-color 2s ease-out",
                "-moz-transition": " background-color 2s ease-out",
                "-o-transition": "background-color 2s ease-out",
                "transition": "background-color 2s ease-out"
            };
        } else {
            console.log("it is day there");
        }
    }

    $scope.getIcon = function () {
        
    }

    $scope.share = function () {
        console.log("it is a click");
        document.addEventListener("deviceready", function(){
            window.plugins.socialsharing.share('City Name: '+ $scope.cityData + ', condition: ' + $scope.cityCondition + ', temperature: ' + $scope.cityTemp, null, 'http:'+$scope.cityIcon, null);
        }, false);
    }
});