var assert = require('assert');
var should = require('chai').should();

describe('Basic Mocha Test', function () {
    it('should throw errors', function () {
        assert.equal(3, 3);
    })
    it('should deal with objects', function () {
        var obj = { name: 'Tom', goalCar: 'Porsche 911 GTS' };
        var objB = { name: 'Tom', goalCar: 'Porsche 911 GTS' };
        var objC = obj;

        // We can check properties on objects to equal a value
        // obj.should.have.property('goalCar').equal('Ferrari');

        // We can check if objects are equal, and while they appear equal
        // this is expecting the objects to be the same object, so this fails
        // obj.should.equal(objB);

        // This comparison will succeed
        obj.should.equal(objC);

        // This comparison will succeed with the deep flag
        obj.should.deep.equal(objB);
    })
    it('should allow testing nulls', function () {
        // should has a problem...null is not an Object
        var iAmNull = null;
        // this fails
        // iAmNull.should.not.exist;

        // this is an approach to dealing with null checks
        should.not.exist(iAmNull);
    })
});