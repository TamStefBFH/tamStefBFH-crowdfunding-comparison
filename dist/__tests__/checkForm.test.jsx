"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var checkForm_1 = require("../utils/utilityAnalysis/checkForm");
describe('checkForm', function () {
    test('should return true when all attributes are set, weights are numbers, sum of weights is 100, and no duplicate criteria', function () {
        var params = [
            { criteria: 'price-performance', weight: '30' },
            { criteria: 'quality', weight: '20' },
            { criteria: 'flexibility', weight: '20' },
            { criteria: 'additional-services', weight: '10' },
            { criteria: 'location', weight: '20' },
        ];
        expect((0, checkForm_1.checkForm)(params)).toBeTruthy();
    });
    test('should return error message when some attributes are not set', function () {
        var params = [
            { criteria: '', weight: '30' },
            { criteria: 'quality', weight: '20' },
        ];
        expect((0, checkForm_1.checkForm)(params)).toEqual('Some attributes are not set - Please check your input');
    });
    test('should return error message when some weights are not numbers', function () {
        var params = [
            { criteria: 'price-performance', weight: '30' },
            { criteria: 'quality', weight: 'not a number' },
        ];
        expect((0, checkForm_1.checkForm)(params)).toEqual('Some attributes are not numbers - Please check your input');
    });
    test('should return error message when sum of weights is not 100', function () {
        var params = [
            { criteria: 'price-performance', weight: '30' },
            { criteria: 'quality', weight: '20' },
            { criteria: 'flexibility', weight: '20' },
        ];
        expect((0, checkForm_1.checkForm)(params)).toEqual('Sum of weights is not 100% - Please check your input');
    });
    test('should return error message when some criteria are duplicate', function () {
        var params = [
            { criteria: 'price-performance', weight: '30' },
            { criteria: 'price-performance', weight: '30' },
        ];
        expect((0, checkForm_1.checkForm)(params)).toEqual('Some criteria are double - Please check your input');
    });
});
