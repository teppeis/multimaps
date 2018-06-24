"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
var lib_1 = require("../lib");
describe('ListMultimap', function () {
    it('should be a function', function () {
        assert_1.default(typeof lib_1.ListMultimap === 'function');
    });
    it('size: 0', function () {
        var map = new lib_1.ListMultimap();
        assert_1.default(map.size === 0);
    });
    it('get: empty array', function () {
        var map = new lib_1.ListMultimap();
        assert_1.default.deepEqual(map.get('foo'), []);
    });
    it('put, get and size', function () {
        var map = new lib_1.ListMultimap();
        assert_1.default(map.put('foo', 'a') === true);
        assert_1.default.deepEqual(map.get('foo'), ['a']);
        assert_1.default(map.size === 1);
        assert_1.default(map.put('foo', 'b') === true);
        assert_1.default.deepEqual(map.get('foo'), ['a', 'b']);
        assert_1.default(map.size === 2);
    });
});
