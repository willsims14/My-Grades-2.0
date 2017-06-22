"use strict";


app.factory("AuthFactory", function(apiUrl, RootFactory, $q, $http){
    var global_user = {};

    let setCurrentUser = function(user){
        global_user = user;
    };

    let getCurrentUser = function(){
        return global_user;
    };

    let registerUser = function(new_user){
        setCurrentUser(new_user);
        return $q((resolve, reject) => {
            $http({
                url: `${apiUrl}/register`,
                method: "POST",
                data: {
                    "username": new_user.username,
                    "password": new_user.password,
                    "first_name": new_user.first_name,
                    "last_name": new_user.last_name
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    'Authorization': "Token " + RootFactory.getToken()
                }
            })
            .then((res) => {
                RootFactory.setToken(res.data.token);
                if (res.data.token !== ""){
                    resolve(res);
                }else{
                    reject(res);
                }
            }).catch((error) => {
                reject(error);
            });
        });
    };

    let loginUser = function(user){
        setCurrentUser(user);
        return $q((resolve, reject) => {
            $http({
                url: `${apiUrl}/api-token-auth/`,
                method: "POST",
                data: {
                    "username": user.username,
                    "password": user.password
                }
            }).then( function(res) {
                RootFactory.setToken(res.data.token);
                resolve(res);
            }).catch( function(error){
                reject(error);
            });
        });
    };


    return {registerUser, loginUser, getCurrentUser};

});