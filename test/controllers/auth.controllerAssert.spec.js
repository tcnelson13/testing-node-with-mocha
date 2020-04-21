var assert = require('assert');
var authController = require('../../controllers/auth.controller')

describe('AuthController', function () {
    beforeEach('this function sets up roles', function settingUpRoles() {
        console.log('Running beforeEach()');
        authController.setRoles(['user']);
    });
    // labelling the beforeEach functions is usefule for troubleshooting
    // beforeEach('this function is erroring intentionally', function erroringFunction() {
    //     throw ({ error: 'error' })
    // });
    // decsribe.only() lets you run only those tests and this can allow you to focus
    // a specific test.  Isolating tests for troubleshooting.
    // describe.only('isAuthorized', () => {
    describe('isAuthorized', function () {
        it('Should return false if not authorized', () => {
            assert.equal(false, authController.isAuthorized('admin'));
        })
        it('Should return true if authorized', () => {
            authController.setRoles(['user', 'admin']);
            assert.equal(true, authController.isAuthorized('admin'));
        })
        // These show as pending tests that are yet to be built out
        it('Should not allow a get if not authorized');
        it('Should allow get if authorized');
    })
    // .skip() allows us to skip over tests that may need work or improvement
    // and they show up as pending tests, which is safer than just commenting out tests.
    // you can also embed this.skip() in if/else statements
    // describe.skip('isAuthorizedAsync', function () {
    describe('isAuthorizedAsync', function () {
        it('Should return false if not authorized', function (done) {
            // use to override mocha internal timeout of 2000ms
            // avoiding arrow functions keeps the 'this' keyword scoped properly
            // this.timeout(2500);
            authController.isAuthorizedAsync('admin',
                function (isAuth) {
                    assert.equal(false, isAuth);
                    done();
                });
        })
        it('Should return true if authorized', function (done) {
            authController.isAuthorizedAsync('user',
                function (isAuth) {
                    assert.equal(true, isAuth);
                    done();
                });
        })
    })
});