/* *****************************************************************************
*  Main Controller
* *****************************************************************************/
const MainController = function($rootScope, $scope, $http) {
    console.log('MainController');

    $scope.acProperties = {};

    $scope.$watch('acProperties.power', changeHandler($scope, $http));
    $scope.$watch('acProperties.quiet', changeHandler($scope, $http));
    $scope.$watch('acProperties.lights', changeHandler($scope, $http));
    $scope.$watch('acProperties.fanSpeed', changeHandler($scope, $http));
    $scope.$watch('acProperties.swingVert', changeHandler($scope, $http));

    $scope.increaseTemperature = function() {
        $scope.acProperties.temperature++;
        setProperties($scope, $http);
    }

    $scope.decreaseTemperature = function() {
        $scope.acProperties.temperature--;
        setProperties($scope, $http);
    }

    loadProperties($rootScope, $scope, $http);
}

const changeHandler = function($scope, $http) {

    const handler = function(newValue, oldValue) {
        if (typeof oldValue === 'undefined') {
            // old value not set, exit
            return;
        }

        if (newValue === oldValue) {
            // same value, exit
            return;
        }

        console.log('change', newValue, oldValue);
        setProperties($scope, $http);
    }

    return handler;
}



const loadProperties = function($rootScope, $scope, $http) {

    $http({
        method: 'GET',
        url: 'properties'
    }).then(function successCallback(response) {
        console.log('response.data', response.data);

        const acProperties = response.data;
        $scope.acProperties = acProperties;

        $scope.acProperties.power = toTrueFalse(acProperties.power);
        $scope.acProperties.quiet = toTrueFalse(acProperties.quiet);
        $scope.acProperties.lights = toTrueFalse(acProperties.lights);
        $scope.acProperties.turbo = toTrueFalse(acProperties.turbo);
        $scope.acProperties.sleep = toTrueFalse(acProperties.sleep);

    }, function errorCallback(response) {
        showError(response);
    });

}

const setProperties = function($scope, $http) {

    $http({
        method: 'POST',
        url: 'properties',
        data: {
            power: toOnOff($scope.acProperties.power),
            quiet: toOnOff($scope.acProperties.quiet),
            lights: toOnOff($scope.acProperties.lights),
            fanSpeed: $scope.acProperties.fanSpeed,
            temperature: $scope.acProperties.temperature,
            swingVert: $scope.acProperties.swingVert
        }
    }).then(function successCallback(response) {
        showInfo('Applied.');

    }, function errorCallback(response) {
        showError(response);
    });
}