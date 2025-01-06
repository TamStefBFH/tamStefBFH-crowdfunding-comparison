"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sortList_1 = require("../utils/utilityAnalysis/sortList");
describe('sortList', function () {
    test('should correctly sort the list in ascending order', function () {
        var list = [
            { score: 3 },
            { score: 1 },
            { score: 2 },
        ];
        var result = (0, sortList_1.sortList)(list, 'asc');
        expect(result).toEqual([
            { score: 1 },
            { score: 2 },
            { score: 3 },
        ]);
    });
    test('should correctly sort the list in descending order', function () {
        var list = [
            { score: 3 },
            { score: 1 },
            { score: 2 },
        ];
        var result = (0, sortList_1.sortList)(list, 'desc');
        expect(result).toEqual([
            { score: 3 },
            { score: 2 },
            { score: 1 },
        ]);
    });
    test('should correctly sort the list in descending order when no parameter is set', function () {
        var list = [
            { score: 3 },
            { score: 1 },
            { score: 2 },
        ];
        var result = (0, sortList_1.sortList)(list);
        expect(result).toEqual([
            { score: 3 },
            { score: 2 },
            { score: 1 },
        ]);
    });
});
