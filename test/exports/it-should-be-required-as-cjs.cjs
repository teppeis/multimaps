"use strict";

const { ArrayMultimap } = require("@teppeis/multimaps");
const { strict: assert } = require("assert");

const map = new ArrayMultimap();
assert.equal(map.size, 0);
