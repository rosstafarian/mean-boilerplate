app.controller('NavBarLoginController', function($scope, $http, IdentityService, NotifierService, AuthService, $location) {
    $scope.identity = IdentityService;
    $scope.signin = function(username, password) {
        if(!username || !password) {
            NotifierService.error('Please enter a Username and Password');
        }
        else {
            AuthService.authenticateUser(username, password).then(function(success) {
                if(success) {
                    NotifierService.notify('You have successfully signed in');
                    $location.path('/');
                } else {
                    NotifierService.error('Username/Password combination incorrect');
                }
            });
        }
    };
    $scope.signout = function() {
        AuthService.logoutUser().then(function() {
            $scope.username = "";
            $scope.password = "";
            NotifierService.notify('You have successfully signed out');
            $location.path('/');
        });
    };
});