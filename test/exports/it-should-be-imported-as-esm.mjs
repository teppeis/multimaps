import { ArrayMultimap } from "@teppeis/multimaps";
import assert from "node:assert/strict";

const map = new ArrayMultimap();
assert.equal(map.size, 0);
