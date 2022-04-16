import { ArrayMultimap } from "@teppeis/multimaps";
import assert from "assert";

const map = new ArrayMultimap();
assert.strictEqual(map.size, 0);
