import { ArrayMultimap, SetMultimap } from "@teppeis/multimaps";
import assert from "node:assert/strict";

const arraymap = new ArrayMultimap<string, number>();
assert(arraymap.put("foo", 1));
assert(arraymap.put("foo", 2));
assert(arraymap.put("foo", 1));
assert.deepEqual(arraymap.get("foo"), [1, 2, 1]);
assert.equal(arraymap.size, 3);

const setmap = new SetMultimap<string, number>();
assert(setmap.put("foo", 1));
assert(setmap.put("foo", 2));
assert.equal(setmap.put("foo", 1), false);
const set: Set<number> = setmap.get("foo");
assert(set instanceof Set);
assert.deepEqual(set, new Set([1, 2]));
assert.deepEqual(Array.from(set), [1, 2]);
assert.equal(setmap.size, 2);
