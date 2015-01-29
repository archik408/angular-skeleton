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
