"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ListMultimap = /** @class */ (function () {
    function ListMultimap() {
        this.size = 0;
        this.map = new Map();
    }
    ListMultimap.prototype.get = function (key) {
        var values = this.map.get(key);
        if (values) {
            return values.slice();
        }
        else {
            return [];
        }
    };
    ListMultimap.prototype.put = function (key, value) {
        var values = this.map.get(key);
        if (!values) {
            values = [];
            this.map.set(key, values);
        }
        values.push(value);
        this.size++;
        return true;
    };
    return ListMultimap;
}());
exports.ListMultimap = ListMultimap;
