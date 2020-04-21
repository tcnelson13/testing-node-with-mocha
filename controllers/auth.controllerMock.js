function AuthControllerMock() {
    var roles;
    var user;
    function setRoles(role) {
        roles = role;
        user.roles = role;
    }

    function setUser(inUser) {
        user = inUser;
    }

    function isAuthorized(neededRole) {
        if (user) {
            // user.isAuthorized(neededRole);
            return user.isAuthorized(neededRole);
        }
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
        // force an error
        // res.render('not found');
        try {
            if (req.user.isAuthorized('admin')) {
                return res.render('index');
            }
            res.render('notAuth');
        } catch (error) {
            res.render('error');
        }


    }

    return {
        isAuthorized, isAuthorizedAsync, isAuthorizedPromise,
        setRoles, getIndex, setUser
    };
}

module.exports = AuthControllerMock();