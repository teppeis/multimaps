"use strict";

const { ArrayMultimap } = require("@teppeis/multimaps");
const assert = require("node:assert/strict");

const map = new ArrayMultimap();
assert.equal(map.size, 0);
