import { ArrayMultimap } from "@teppeis/multimaps";
import { strict as assert } from "assert";

const map = new ArrayMultimap();
assert.equal(map.size, 0);
