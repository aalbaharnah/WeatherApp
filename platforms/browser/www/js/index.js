var app = angular.module("MyWeatherApp", []);

app.controller("MyWeatherController", function ($scope, $http) {


    // Function to search by city name
    $scope.cityName = '';
    $scope.search = function () {
        $http.get('http://api.apixu.com/v1/current.json?key=852bf53e45aa4d15a8c140018190901&q=' + $scope.cityName).then(function(response){
        console.log(response.data);    
        $scope.cityData = response.data.location.name;
        $scope.cityTemp = response.data.current.temp_c + '°';
        $scope.cityWind = response.data.current.wind_kph +' kph';
        $scope.cityHumidity = response.data.current.humidity + '%';
        $scope.cityIcon = response.data.current.condition.icon;
        $scope.cityCondition = response.data.current.condition.text;
        });
    }
    

    // Function to get user current location 
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((function(position){
            console.log(position.coords.longitude.toFixed(6) + '    ' + position.coords.latitude.toFixed(6));
            

            // Using Google API.
            $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+position.coords.latitude.toFixed(6)+','+position.coords.longitude.toFixed(6)+'&key=AIzaSyDzgPZGicdxjiHLFVem3lDIxR_XAVSEZus').then(function(loc){
                console.log(loc.data.results);
                console.log(loc.data.results[0].address_components[3].long_name);
                $scope.cityName = loc.data.results[0].address_components[3].long_name;
                $http.get('http://api.apixu.com/v1/current.json?key=852bf53e45aa4d15a8c140018190901&q=' + $scope.cityName).then(function(response){   
                    $scope.cityData = response.data.location.name;
                    $scope.cityTemp = response.data.current.temp_c + '°';
                    $scope.cityWind = response.data.current.wind_kph +' kph';
                    $scope.cityHumidity = response.data.current.humidity + '%';
                    $scope.cityIcon = response.data.current.condition.icon;
                    $scope.cityCondition = response.data.current.condition.text;
                });

            });
            

            // Using Apixu API.
            /*
            $http.get('http://api.apixu.com/v1/current.json?key=852bf53e45aa4d15a8c140018190901&q='+ position.coords.latitude.toFixed(4) + ',' + position.coords.longitude.toFixed(4)).then(function(some){
            console.log(some.data);
            $scope.cityData = some.data.location.name;
            $scope.cityTemp = some.data.current.temp_c + '°';
            $scope.cityWind = some.data.current.wind_kph +' kph';
            $scope.cityHumidity = some.data.current.humidity + '%';
            $scope.cityIcon = some.data.current.condition.icon;
            $scope.cityCondition = some.data.current.condition.text;
            });*/

        }));
        console.log("yes")
    } else {
        console.log("geolocation is not supporter by this browser.");
    }  

});
