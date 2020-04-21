function AuthController() {
    var roles;
    function setRoles(role) {
        roles = role;
    }

    function isAuthorized(neededRole) {
        return roles.indexOf(neededRole) >= 0;
    }

    function isAuthorizedAsync(neededRole, cb) {
        setTimeout(function () {
            cb(roles.indexOf(neededRole) >= 0)
        }, 100);
    }

    function isAuthorizedPromise(neededRole) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve(roles.indexOf(neededRole) >= 0)
            }, 100);
        })
    }

    function getIndex(req, res) {
        // res.render('not found');
        res.render('index');
    }

    return { isAuthorized, isAuthorizedAsync, isAuthorizedPromise, setRoles, getIndex };
}

module.exports = AuthController();