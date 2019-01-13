var app = angular.module("MyWeatherApp", ['ngRoute']);


app.config(function ($routeProvider) {
    $routeProvider
    .when('/',
    {
        controller: 'MyWeatherController',
        templateUrl: 'templates/data.html'
    })
});

app.controller("MyWeatherController", function ($scope, $http) {

    localStorage.setItem('name', 'qatif');
    console.log(localStorage.getItem('name'));

    // Function to search by city name.
    $scope.cityName = '';
    $scope.search = function () {
        $http.get('http://api.apixu.com/v1/current.json?key=46114ce99ca14871b8963021191301&q=' + $scope.cityName).then(function(response){
        console.log(response.data);    
        $scope.cityData = response.data.location.name;
        $scope.cityTemp = response.data.current.temp_c + '°';
        $scope.cityWind = response.data.current.wind_kph +' kph';
        $scope.cityHumidity = response.data.current.humidity + '%';
        $scope.cityIcon = response.data.current.condition.icon;
        $scope.cityCondition = response.data.current.condition.text;
        $scope.cityDay =  response.data.current.is_day;
        });
    }

    // Function to get user current location 
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((function(position){
            console.log(position.coords.longitude.toFixed(6) + '    ' + position.coords.latitude.toFixed(6));
            
            // Using Google API.
            $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+position.coords.latitude.toFixed(6)+','+position.coords.longitude.toFixed(6)+'&key=AIzaSyDzgPZGicdxjiHLFVem3lDIxR_XAVSEZus').then(function(loc){
                console.log(loc.data.results);
                
                for (var i = 0; i < loc.data.results.length; i++){  
                    //console.log(loc.data.results[i].address_components[0].types[0]);
                    if ( loc.data.results[i].address_components[0].types[0] == "locality") {
                        console.log(loc.data.results[i].address_components[0].long_name);
                        $scope.cityName = loc.data.results[i].address_components[0].long_name;
                    }
                }

                $http.get('http://api.apixu.com/v1/current.json?key=46114ce99ca14871b8963021191301&q=' + $scope.cityName).then(function(response){   
                    $scope.cityData = response.data.location.name;
                    $scope.cityTemp = response.data.current.temp_c + '°';
                    $scope.cityWind = response.data.current.wind_kph +' kph';
                    $scope.cityHumidity = response.data.current.humidity + '%';
                    $scope.cityIcon = response.data.current.condition.icon;
                    $scope.cityCondition = response.data.current.condition.text;
                });

            });
            
        }));
        console.log("yes")
    } else {
        console.log("geolocation is not supporter by this browser.");
    }  

    // Function to transition the backgroun based on the timing of the city.
    $scope.is_it_day = function () {
        if ($scope.cityDay === 0) {
            console.log("is is night there");
            return {
                "background-color" : "#ffc7ba",
                "-webkit-transition": "background-color 2s ease-out",
                "-moz-transition":" background-color 2s ease-out",
                "-o-transition": "background-color 2s ease-out",
                "transition": "background-color 2s ease-out"
            };
        } else {
            console.log("it is day there");
        }
    }

    $scope.CityNameStyle = {
        "position": "relative",
        "padding": "5%",
        "color": "rgb(232, 142, 5)",
        "text-transform": "uppercase",
        "font-weight": "900",
        "font-size": "9vw",
        "letter-spacing": ".1rem",
    }

    $scope.CityTempStyle = {
        "line-height": "10rem",
        "padding": "5%",
        "color": "#b36b00",
        "font-weight": "700",
        "font-size": "24vw",
        "letter-spacing": ".1rem",
        "animation": "fadeIn 600ms ease-out",
        "transition": ".6s",
        "backface-visibility": "hidden",
        /* text-align: center; */
        "align-self": "center",
    }

    $scope.CityHumidityStyle = {
        "color": "#b36b00",
        "font-weight": "400",
        "font-size": "15px",
        "letter-spacing": ".2rem",
        "animation": "fadeIn 700ms ease-out",
        "backface-visibility": "hidden",
    }
});