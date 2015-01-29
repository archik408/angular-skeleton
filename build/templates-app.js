angular.module('templates-app', ['main_page/main.tpl.html']);

angular.module("main_page/main.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("main_page/main.tpl.html",
    "<div>{{hello}} World!</div>");
}]);
