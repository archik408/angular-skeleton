angular.module('trueimpact', [
    'templates-app',
    'ui.router',
    'trueimpact.main_page'
])
    .config(['$urlRouterProvider',
        function ($urlRouterProvider) {
            $urlRouterProvider.otherwise('/main');
        }])
    .controller('AppController', ['$scope', function ($scope) {
        $scope.pageTitle = 'Project';
    }]);
;angular.module('trueimpact.main_page', ['trueimpact', 'ui.router'])
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
