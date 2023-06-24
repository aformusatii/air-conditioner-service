/* *****************************************************************************
*  Init Angular App
* *****************************************************************************/
window.app = (function(angular) {
    'use strict';
    console.log('Init Angular Js App');

    const app = angular.module('ngAirConditionerCtrl', []);
    app
        .controller('MainController', MainController);

    return app;

})(window.angular);
