var app = angular.module('prototype', ['ngSanitize', 'ui.select']);

app.directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter, {'event': event});
                });
                event.preventDefault();
            }
        });
    };
});

app.filter('propsFilter', function() {
    return function(items, props) {
        var out = [];

        if (angular.isArray(items)) {
            items.forEach(function(item) {
                var itemMatches = false;

                var keys = Object.keys(props);
                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                        itemMatches = true;
                        break;
                    }
                }

                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            // Let the output be the input untouched
            out = items;
        }

        return out;
    };
});

app.controller('SearchController', function($scope) {

    $scope.advancedOn = false;
    $scope.summaryPresent = false;
    $scope.groupsActive = true;
    $scope.titleActive = false;
    $scope.codeActive = false;
    $scope.disciplineActive = false;
    $scope.statusActive = false;
    $scope.metaActive = false;
    $scope.mustActive = true;
    $scope.mustNotActive = false;
    $scope.shouldActive = false;
    $scope.selectedType = "Title";
    $scope.advancedInput = '';
    $scope.inProjects = true;
    $scope.disciplineSelected = "Select Discipline";
    $scope.statusSelected = "Select Status";
    $scope.metaSelected = "Select Metadata";
    $scope.metaInput = '';
    $scope.projectInput = '';

    $scope.projects = [];
    $scope.projectsInput = {};
    $scope.projectsInput.projects = [];
    $scope.titles = [];
    $scope.codes = [];
    $scope.disciplines = [];
    $scope.statuses = [];
    $scope.metadata = [];
    $scope.metaExamples = [];
    $scope.statusExamples = [];
    $scope.disciplineExamples = [];
    $scope.availableProjects = ["Group 1", "Group 2", "Group 3", "Group 4", "Really big group name for testings"];

    $scope.setGroupsActive = function() {
        $scope.groupsActive = true;
        $scope.titleActive = false;
        $scope.codeActive = false;
        $scope.disciplineActive = false;
        $scope.statusActive = false;
        $scope.metaActive = false;
    }

    $scope.setTitleActive = function() {
        $scope.groupsActive = false;
        $scope.titleActive = true;
        $scope.codeActive = false;
        $scope.disciplineActive = false;
        $scope.statusActive = false;
        $scope.metaActive = false;
    }

    $scope.setCodeActive = function() {
        $scope.groupsActive = false;
        $scope.titleActive = false;
        $scope.codeActive = true;
        $scope.disciplineActive = false;
        $scope.statusActive = false;
        $scope.metaActive = false;
    }

    $scope.setDisciplineActive = function() {
        $scope.groupsActive = false;
        $scope.titleActive = false;
        $scope.codeActive = false;
        $scope.disciplineActive = true;
        $scope.statusActive = false;
        $scope.metaActive = false;
    }

    $scope.setStatusActive = function() {
        $scope.groupsActive = false;
        $scope.titleActive = false;
        $scope.codeActive = false;
        $scope.disciplineActive = false;
        $scope.statusActive = true;
        $scope.metaActive = false;
    }

    $scope.setMetaActive = function() {
        $scope.groupsActive = false;
        $scope.titleActive = false;
        $scope.codeActive = false;
        $scope.disciplineActive = false;
        $scope.statusActive = false;
        $scope.metaActive = true;
    }

    $scope.deleteTitleFromSearch = function (title) {
        var index = $scope.titles.indexOf(title);
        if(index > -1) {
            $scope.titles.splice(index, 1);
        }
    }

    $scope.deleteCodeFromSearch = function (code) {
        var index = $scope.codes.indexOf(code);
        if(index > -1) {
            $scope.codes.splice(index, 1);
        }
    }

    $scope.deleteDisciplineFromSearch = function (discipline) {
        var index = $scope.disciplines.indexOf(discipline);
        if(index > -1) {
            $scope.disciplines.splice(index, 1);
        }
    }

    $scope.deleteStatusFromSearch = function (status) {
        var index = $scope.statuses.indexOf(status);
        if(index > -1) {
            $scope.statuses.splice(index, 1);
        }
    }

    $scope.deleteMetaFromSearch = function (meta) {
        var index = $scope.metadata.indexOf(meta);
        if(index > -1) {
            $scope.metadata.splice(index, 1);
        }
    }

    $scope.deleteProjectFromSearch = function (project) {
        var index = $scope.projects.indexOf(project);
        if(index > -1) {
            $scope.projects.splice(index, 1);
        }
    }

    $scope.addTermToSearch = function (prefix) {
        if($scope.advancedInput || $scope.disciplineActive == true || $scope.statusActive == true || $scope.metaActive == true) {
            if ($scope.titleActive == true) {
                var advancedInputItem = {prefix: prefix, value: $scope.advancedInput};
                var test = $scope.titles.indexOf($scope.advancedInput);
                $scope.titles.push(advancedInputItem);
                $scope.advancedInput = "";
                document.getElementById("title_input").style.background = "white";
                document.getElementById("title_input").placeholder = "Input Title";
            }
            if ($scope.codeActive == true) {
                var advancedInputItem = {prefix: prefix, value: $scope.advancedInput};
                $scope.codes.push(advancedInputItem);
                $scope.advancedInput = "";
                document.getElementById("code_input").style.background = "white";
                document.getElementById("code_input").placeholder = "Input Code";
            }
            if ($scope.disciplineActive == true && $scope.disciplineSelected != "Select Discipline") {
                var advancedInputItem = {prefix: prefix, value: $scope.disciplineSelected};
                $scope.disciplines.push(advancedInputItem);
            }
            if ($scope.statusActive == true && $scope.statusSelected != "Select Status") {
                var advancedInputItem = {prefix: prefix, value: $scope.statusSelected};
                $scope.statuses.push(advancedInputItem);
            }
            if ($scope.metaActive == true && $scope.metaSelected != "Select Metadata") {
                if ($scope.metaInput) {
                    var meta = $scope.metaSelected + ": " + $scope.metaInput;
                    var advancedInputItem = {prefix: prefix, value: meta};
                    $scope.metadata.push(advancedInputItem);
                    $scope.metaInput = "";
                    document.getElementById("meta_input").style.background = "white";
                    document.getElementById("meta_input").placeholder = "Input Metadata";
                } else {
                    document.getElementById("meta_input").style.background = "#fbbbb9";
                    document.getElementById("meta_input").placeholder = "Please input value...";

                }
            }
        } else {
            if($scope.titleActive == true) {
                document.getElementById("title_input").style.background = "#fbbbb9";
                document.getElementById("title_input").placeholder = "Please input value...";
            }
            if($scope.codeActive == true) {
                document.getElementById("code_input").style.background = "#fbbbb9";
                document.getElementById("code_input").placeholder = "Please input value...";
            }
        }
    }

    $scope.addProjectToSearch = function (item) {
        var prefix = 'in';
        if($scope.inProjects == false) {
            prefix = 'notin';
        }
        var projectInputItem = { prefix: prefix, value: item };
        $scope.projects.push(projectInputItem);
    }

    $scope.addProjectsToSearch = function (prefix) {
        for(var i = 0; i < $scope.projectsInput.projects.length; i++) {
            var projectInputItem = { prefix: prefix, value: $scope.projectsInput.projects[i] }
            $scope.projects.push(projectInputItem);
        }
        $scope.projectsInput = [];
    }

    $scope.addProjectToSearchArray = function (item) {
        $scope.projectsInput.projects.push(item);
    }

    $scope.toggleAdvanced = function () {
        if($scope.advancedOn == true) {
            $scope.advancedOn = false;
            document.getElementById("multi-input").style.background = "#ffffff";

        } else {
            $scope.advancedOn = true;
            document.getElementById("multi-input").style.background = "#f3f3f3";
        }

    }

});