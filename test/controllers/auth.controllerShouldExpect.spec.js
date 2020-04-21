var authController = require('../../controllers/auth.controller')
var expect = require('chai').expect;
var should = require('chai').should(); // should() is a function that needs to be executed
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.should();

describe('AuthController', function () {
    beforeEach('this function sets up roles', function settingUpRoles() {
        console.log('Running beforeEach()');
        authController.setRoles(['user']);
    });
    describe('isAuthorized', function () {
        it('Should return false if not authorized', () => {
            var isAuth = authController.isAuthorized('admin');
            expect(isAuth).to.be.false;
        })
        it('Should return true if authorized', () => {
            authController.setRoles(['user', 'admin']);
            var isAuth = authController.isAuthorized('admin');
            isAuth.should.be.true;
        })
    })
    describe('isAuthorizedAsync', function () {
        it('Should return false if not authorized', function (done) {
            // use to override mocha internal timeout of 2000ms
            // avoiding arrow functions keeps the 'this' keyword scoped properly
            // this.timeout(2500);
            authController.isAuthorizedAsync('admin',
                function (isAuth) {
                    isAuth.should.be.false;
                    done();
                });
        })
        it('Should return true if authorized', function (done) {
            authController.isAuthorizedAsync('user',
                function (isAuth) {
                    isAuth.should.be.true;
                    done();
                });
        })
    })
    describe('isAuthorizedPromise', function () {
        it('Should return false if not authorized', function () {
            return authController.isAuthorizedPromise('admin').should.eventually.be.false;
        })
    })
});