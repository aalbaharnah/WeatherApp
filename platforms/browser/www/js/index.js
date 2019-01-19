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
    if (localStorage.city) {
        console.log('yes');
        $scope.cities = JSON.parse(localStorage.city);
    } else {
        var init_cities = ['london', 'paris', 'saihat'];
        var json = JSON.stringify(init_cities);
        localStorage.setItem('city', json);
    }



    // function to add a city to the list in "favcity" page.
    $scope.addCity = function () {
        $scope.errtxt = '';
        if (!$scope.addIt) {
            return;
        }
        if ($scope.cities.indexOf($scope.addIt) == -1) {
            $scope.cities.push($scope.addIt);
            localStorage.setItem('city', JSON.stringify($scope.cities));
        } else {
            $scope.errtxt = 'The city is already in the list.'
        }
    }

    // Function to appoint favorite city in the list in "favcity" page.
    $scope.getFav = function (city) {
        var fav = localStorage.getItem("name");
        if (fav == city) {
            return true;
        }
        else {
            return false;
        }
    }

    // Function to remove a city from the list in "favcity" page.
    $scope.removeCity = function (x) {
        $scope.cities.splice(x, 1);
        localStorage.setItem('city', JSON.stringify($scope.cities));
    }



    // Function to favor a city in the list in "favcity" page.
    $scope.favorCity = function (x) {
        localStorage.setItem('name', $scope.cities[x]);
        return { 'content': '' }
    }

    $scope.loading = false; // Normal state of loading

    // Function to get the city name data from the API.
    $scope.getAllData = function (name) {
        $http.get('http://api.apixu.com/v1/current.json?key=46114ce99ca14871b8963021191301&q=' + name)
            .then(function (response) {
                $scope.loading = true; // Change the loadindg to ture wile retreaving the data.
                // Time out for the animation to finish.
                $timeout(function () {
                    $scope.loading = false;
                }, 1100)

                console.log(response.data); // retreaving data from API.
                $scope.cityData = response.data.location.name;
                $scope.cityTemp = response.data.current.temp_c + '°';
                $scope.cityWind = response.data.current.wind_kph + ' kph';
                $scope.cityHumidity = response.data.current.humidity + '%';
                $scope.cityIcon = response.data.current.condition.icon;
                $scope.cityCondition = response.data.current.condition.text;
                $scope.cityDay = response.data.current.is_day;
                $scope.code = response.data.current.condition.code;
                for (var i = 0; i < forcast.length; i++) {
                    if (forcast[i].code == $scope.code) {
                        $scope.fontawsome = forcast[i].icon + ' fa-4x';
                    }
                }

            });
    }

    // The normal state of showing the fav city in main page.
    $scope.getAllData(localStorage.getItem('name'));

    // Function to get user current location.
    $scope.getMeHome = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((function (position) {
                console.log(position.coords.longitude.toFixed(6) + '    ' + position.coords.latitude.toFixed(6));
                // Using Google API to get the .
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
            console.log("The geolocation is working") // confirm the geolocation is working.
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
            return {
                "background-color": "#0097A7",
                "-webkit-transition": "background-color 2s ease-out",
                "-moz-transition": " background-color 2s ease-out",
                "-o-transition": "background-color 2s ease-out",
                "transition": "background-color 2s ease-out"
            };
        } else {
            return;
        }
    }

    // Function to active the click button to share.  
    $scope.share = function () {
        document.addEventListener("deviceready", function () {
            window.plugins.socialsharing.share('City Name: ' + $scope.cityData + ', condition: ' + $scope.cityCondition + ', temperature: ' + $scope.cityTemp, null, 'http:' + $scope.cityIcon, null);
        }, false);
    }
});