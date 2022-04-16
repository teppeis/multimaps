"use strict";

const { ArrayMultimap } = require("@teppeis/multimaps");
const assert = require("assert");

const map = new ArrayMultimap();
assert.strictEqual(map.size, 0);
