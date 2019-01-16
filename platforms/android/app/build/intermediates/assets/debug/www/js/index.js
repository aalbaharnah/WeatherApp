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

    $scope.weather_icons = [
        {
            "code": 1000,
            "day": "Sunny",
            "night": "Clear",
            "icon": "fas fa-sun"
        },
        {
            "code": 1003,
            "day": "Partly cloudy",
            "night": "Partly cloudy",
            "icon": "fas fa-cloud-sun"
        },
        {
            "code": 1006,
            "day": "Cloudy",
            "night": "Cloudy",
            "icon": "fas fa-cloud"
        },
        {
            "code": 1009,
            "day": "Overcast",
            "night": "Overcast",
            "icon": "fas fa-cloud"
        },
        {
            "code": 1030,
            "day": "Mist",
            "night": "Mist",
            "icon": "fab fa-cloudversify"
        },
        {
            "code": 1063,
            "day": "Patchy rain possible",
            "night": "Patchy rain possible",
            "icon": "fas fa-cloud-sun-rain"
        },
        {
            "code": 1066,
            "day": "Patchy snow possible",
            "night": "Patchy snow possible",
            "icon": "fas fa-cloud-meatball"
        },
        {
            "code": 1069,
            "day": "Patchy sleet possible",
            "night": "Patchy sleet possible",
            "icon": "fas fa-cloud-meatball"
        },
        {
            "code": 1072,
            "day": "Patchy freezing drizzle possible",
            "night": "Patchy freezing drizzle possible",
            "icon": "fas fa-tint"
        },
        {
            "code": 1087,
            "day": "Thundery outbreaks possible",
            "night": "Thundery outbreaks possible",
            "icon": "fas fa-poo-storm"
        },
        {
            "code": 1114,
            "day": "Blowing snow",
            "night": "Blowing snow",
            "icon": "far fa-snowflake"
        },
        {
            "code": 1117,
            "day": "Blizzard",
            "night": "Blizzard",
            "icon": "far fa-snowflake"
        },
        {
            "code": 1135,
            "day": "Fog",
            "night": "Fog",
            "icon": "fas fa-grip-lines"
        },
        {
            "code": 1147,
            "day": "Freezing fog",
            "night": "Freezing fog",
            "icon": "fab fa-mixcloud"
        },
        {
            "code": 1150,
            "day": "Patchy light drizzle",
            "night": "Patchy light drizzle",
            "icon": "fas fa-cloud-rain"
        },
        {
            "code": 1153,
            "day": "Light drizzle",
            "night": "Light drizzle",
            "icon": "fas fa-cloud-rain"
        },
        {
            "code": 1168,
            "day": "Freezing drizzle",
            "night": "Freezing drizzle",
            "icon": "fas fa-cloud-rain"
        },
        {
            "code": 1171,
            "day": "Heavy freezing drizzle",
            "night": "Heavy freezing drizzle",
            "icon": "fas fa-cloud-showers-heavy"
        },
        {
            "code": 1180,
            "day": "Patchy light rain",
            "night": "Patchy light rain",
            "icon": "fas fa-cloud-rain"
        },
        {
            "code": 1183,
            "day": "Light rain",
            "night": "Light rain",
            "icon": "fas fa-cloud-rain"
        },
        {
            "code": 1186,
            "day": "Moderate rain at times",
            "night": "Moderate rain at times",
            "icon": "fas fa-cloud-showers-heavy"
        },
        {
            "code": 1189,
            "day": "Moderate rain",
            "night": "Moderate rain",
            "icon": "fas fa-cloud-showers-heavy"
        },
        {
            "code": 1192,
            "day": "Heavy rain at times",
            "night": "Heavy rain at times",
            "icon": "fas fa-cloud-showers-heavy"
        },
        {
            "code": 1195,
            "day": "Heavy rain",
            "night": "Heavy rain",
            "icon": "fas fa-cloud-showers-heavy"
        },
        {
            "code": 1198,
            "day": "Light freezing rain",
            "night": "Light freezing rain",
            "icon": "fas fa-cloud-rain"
        },
        {
            "code": 1201,
            "day": "Moderate or heavy freezing rain",
            "night": "Moderate or heavy freezing rain",
            "icon": "fas fa-cloud-showers-heavy"
        },
        {
            "code": 1204,
            "day": "Light sleet",
            "night": "Light sleet",
            "icon": "fas fa-cloud-showers-heavy"
        },
        {
            "code": 1207,
            "day": "Moderate or heavy sleet",
            "night": "Moderate or heavy sleet",
            "icon": "fas fa-cloud-showers-heavy"
        },
        {
            "code": 1210,
            "day": "Patchy light snow",
            "night": "Patchy light snow",
            "icon": "far fa-snowflake"
        },
        {
            "code": 1213,
            "day": "Light snow",
            "night": "Light snow",
            "icon": "far fa-snowflake"
        },
        {
            "code": 1216,
            "day": "Patchy moderate snow",
            "night": "Patchy moderate snow",
            "icon": "far fa-snowflake"
        },
        {
            "code": 1219,
            "day": "Moderate snow",
            "night": "Moderate snow",
            "icon": "far fa-snowflake"
        },
        {
            "code": 1222,
            "day": "Patchy heavy snow",
            "night": "Patchy heavy snow",
            "icon": "fas fa-snowflake"
        },
        {
            "code": 1225,
            "day": "Heavy snow",
            "night": "Heavy snow",
            "icon": "far fa-snowflake"
        },
        {
            "code": 1237,
            "day": "Ice pellets",
            "night": "Ice pellets",
            "icon": "far fa-snowflake"
        },
        {
            "code": 1240,
            "day": "Light rain shower",
            "night": "Light rain shower",
            "icon": "fas fa-cloud-showers-heavy"
        },
        {
            "code": 1243,
            "day": "Moderate or heavy rain shower",
            "night": "Moderate or heavy rain shower",
            "icon": "fas fa-cloud-showers-heavy"
        },
        {
            "code": 1246,
            "day": "Torrential rain shower",
            "night": "Torrential rain shower",
            "icon": "fas fa-cloud-showers-heavy"
        },
        {
            "code": 1249,
            "day": "Light sleet showers",
            "night": "Light sleet showers",
            "icon": "fas fa-cloud-showers-heavy"
        },
        {
            "code": 1252,
            "day": "Moderate or heavy sleet showers",
            "night": "Moderate or heavy sleet showers",
            "icon": "fas fa-cloud-showers-heavy"
        },
        {
            "code": 1255,
            "day": "Light snow showers",
            "night": "Light snow showers",
            "icon": "far fa-snowflake"
        },
        {
            "code": 1258,
            "day": "Moderate or heavy snow showers",
            "night": "Moderate or heavy snow showers",
            "icon": "far fa-snowflake"
        },
        {
            "code": 1261,
            "day": "Light showers of ice pellets",
            "night": "Light showers of ice pellets",
            "icon": "far fa-snowflake"
        },
        {
            "code": 1264,
            "day": "Moderate or heavy showers of ice pellets",
            "night": "Moderate or heavy showers of ice pellets",
            "icon": "fas fa-snowflake"
        },
        {
            "code": 1273,
            "day": "Patchy light rain with thunder",
            "night": "Patchy light rain with thunder",
            "icon": "fas fa-poo-storm"
        },
        {
            "code": 1276,
            "day": "Moderate or heavy rain with thunder",
            "night": "Moderate or heavy rain with thunder",
            "icon": "fas fa-poo-storm"
        },
        {
            "code": 1279,
            "day": "Patchy light snow with thunder",
            "night": "Patchy light snow with thunder",
            "icon": "fas fa-poo-storm"
        },
        {
            "code": 1282,
            "day": "Moderate or heavy snow with thunder",
            "night": "Moderate or heavy snow with thunder",
            "icon": "fas fa-poo-storm"
        }
    ];

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
                for (var i = 0; i < $scope.weather_icons.length; i++) {
                    if ($scope.weather_icons[i].code == $scope.code) {
                        $scope.fontawsome = $scope.weather_icons[i].icon + ' fa-4x';
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
                "background-color": "#4DD0E1",
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