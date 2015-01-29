angular.module('trueimpact.main_page', ['trueimpact', 'ui.router'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('main', {
            url: '/main',
            controller: 'MainPageController',
            templateUrl: 'main_page/main.tpl.html'
        });
    }])
    .controller('MainPageController', ['$scope', function ($scope) {
        $scope.hello = "Hello";

    }]);
