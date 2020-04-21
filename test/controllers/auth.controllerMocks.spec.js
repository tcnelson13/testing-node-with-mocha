var assert = require('assert');
var authController = require('../../controllers/auth.controllerMock')
var expect = require('chai').expect;
var should = require('chai').should(); // should() is a function that needs to be executed
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var sinon = require('sinon');
chai.use(chaiAsPromised);
chai.should();

describe('AuthControllerMock', function () {
    beforeEach('this function sets up roles', function settingUpRoles() {
        console.log('Running beforeEach()');
        // authController.setRoles(['user']);
    });
    describe('isAuthorized', function () {
        var user = {};
        beforeEach(function () {
            user = {
                roles: ['user'],
                isAuthorized: function (neededRole) {
                    return this.roles.indexOf(neededRole) >= 0;
                }
            }
            sinon.spy(user, 'isAuthorized');
            authController.setUser(user);
        });
        it('Should return false if not authorized', () => {
            var isAuth = authController.isAuthorized('admin');
            console.log(user.isAuthorized);
            user.isAuthorized.calledOnce.should.be.true;
            expect(isAuth).to.be.false;
        })
        it('Should return true if authorized', () => {
            authController.setRoles(['user', 'admin']);
            var isAuth = authController.isAuthorized('admin');
            isAuth.should.be.true;
        })
    })
    describe('isAuthorizedAsync', function () {
        // var isAuth = authController.isAuthorized('admin');
        // expect(isAuth).to.be.false;
    })
    describe('isAuthorizedPromise', function () {
        // authController.setRoles(['user', 'admin']);
        // var isAuth = authController.isAuthorized('admin');
        // isAuth.should.be.true;
    })
    describe.only('getIndex', function () {
        var user = {};
        beforeEach(function () {
            user = {
                roles: ['user'],
                isAuthorized: function (neededRole) {
                    return this.roles.indexOf(neededRole) >= 0;
                }
            }
            // the spy keeps the isAuthorized function and executes it
            // sinon.spy(user, 'isAuthorized');
            // authController.setUser(user);
        });
        it('should render index if authorized', function () {
            // the stub completely gets rid of/kills the isAuthorized function
            // as implemented
            var isAuth = sinon.stub(user, 'isAuthorized').returns(true);
            var req = { user: user };
            var res = {
                render: sinon.spy()
            };

            authController.getIndex(req, res);
            isAuth.calledOnce.should.be.true;
            res.render.calledOnce.should.be.true;
            res.render.firstCall.args[0].should.equal('index');
            // console.log(res.render);
        })
        it('should render thow an error from isAuthorized stub', function () {
            var isAuth = sinon.stub(user, 'isAuthorized').throws();
            // we can use stubs to throw a specific type of error
            // var isAuth = sinon.stub(user, 'isAuthorized').throws('ObjectNotDefined');
            var req = { user: user };
            var res = {
                render: sinon.spy()
            };

            authController.getIndex(req, res);
            isAuth.calledOnce.should.be.true;
            res.render.calledOnce.should.be.true;
            res.render.firstCall.args[0].should.equal('error');
        })
        it('should render index with a mock', function () {
            var isAuth = sinon.stub(user, 'isAuthorized').returns(true);
            var req = { user: user };
            var res = {
                render: function () { }
            };
            var mock = sinon.mock(res);
            mock.expects('render').once().withExactArgs('index');

            authController.getIndex(req, res);
            isAuth.calledOnce.should.be.true;

            mock.verify();
        })
    })
});