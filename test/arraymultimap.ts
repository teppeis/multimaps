import { ArrayMultimap } from "../src";
import { makeIterator } from "./lib/makeiterator";

// eslint-disable-next-line import/order
import assert = require("assert");

describe("ArrayMultimap", () => {
  describe("constructor", () => {
    it("is a function", () => {
      assert(typeof ArrayMultimap === "function");
    });
    it("is called with no args", () => {
      const map = new ArrayMultimap<string, string>();
      assert(map.size === 0);
    });
    it("is called with Iterable<[K, V]>", () => {
      const iterable = {
        [Symbol.iterator](): Iterator<[string, string]> {
          return makeIterator([
            ["foo", "b"],
            ["bar", "c"],
            ["foo", "a"],
          ]);
        },
      };
      const map = new ArrayMultimap<string, string>(iterable);
      assert(map.size === 3);
      assert.deepEqual(map.get("foo"), ["b", "a"]);
      assert.deepEqual(map.get("bar"), ["c"]);
    });
  });
  it("@@toStringTag()", () => {
    const map = new ArrayMultimap<string, string>();
    assert(map.toString() === "[object ArrayMultimap]");
  });
  it("size: 0", () => {
    const map = new ArrayMultimap<string, string>();
    assert(map.size === 0);
  });
  it("get: empty array", () => {
    const map = new ArrayMultimap<string, string>();
    assert.deepEqual(map.get("foo"), []);
  });
  it("put, get and size", () => {
    const map = new ArrayMultimap<string, string>();
    assert(map.put("foo", "a") === true);
    assert.deepEqual(map.get("foo"), ["a"]);
    assert.equal(map.size, 1);

    assert(map.put("foo", "b") === true);
    assert.deepEqual(map.get("foo"), ["a", "b"]);
    assert.equal(map.size, 2);

    assert(map.put("bar", "c") === true);
    assert.deepEqual(map.get("bar"), ["c"]);
    assert.equal(map.size, 3);

    map.get("foo").push("d");
    assert.deepEqual(map.get("foo"), ["a", "b"]);
  });
  it("putAll(key, values)", () => {
    const map = new ArrayMultimap<string, string>();
    map.put("foo", "a");
    assert(map.putAll("foo", ["b", "c"]) === true);
    assert.deepEqual(map.get("foo"), ["a", "b", "c"]);
  });
  it("putAll() empty", () => {
    const map = new ArrayMultimap<string, string>();
    assert(map.putAll("foo", []) === false);
    assert(map.size === 0);
  });
  it("putAll(multimap)", () => {
    const map = new ArrayMultimap<string, string>();
    map.putAll("foo", ["a", "b"]);
    map.putAll("bar", ["c"]);
    const actual = new ArrayMultimap<string, string>();
    actual.putAll(map);
    assert.deepEqual(actual.get("foo"), ["a", "b"]);
    assert.deepEqual(actual.get("bar"), ["c"]);
    assert(actual.size === 3);
  });
  it("has()", () => {
    const map = new ArrayMultimap<string, string>();
    assert(map.has("foo") === false);
    map.put("foo", "a");
    assert(map.has("foo") === true);
    assert(map.has("bar") === false);
  });
  it("hasEntry()", () => {
    const map = new ArrayMultimap<string, string>();
    assert(map.hasEntry("foo", "a") === false);
    map.put("foo", "a");
    assert(map.hasEntry("foo", "a") === true);
    assert(map.hasEntry("foo", "b") === false);
  });
  it("clear()", () => {
    const map = new ArrayMultimap<string, string>();
    assert(map.size === 0);
    map.put("foo", "a");
    map.clear();
    assert(map.size === 0);
    assert(map.has("foo") === false);
  });
  it("delete()", () => {
    const map = new ArrayMultimap<string, string>();
    map.put("foo", "a");
    map.put("foo", "b");
    map.put("bar", "c");
    assert(map.delete("foo") === true);
    assert(map.size === 1);
    assert(map.has("foo") === false);
    assert(map.has("bar") === true);

    assert(map.delete("foo") === false);
    assert(map.size === 1);
  });
  it("deleteEntry()", () => {
    const map = new ArrayMultimap<string, string>();
    map.put("foo", "a");
    map.put("foo", "b");
    map.put("bar", "b");
    assert(map.deleteEntry("foo", "b") === true);
    assert(map.size === 2);
    assert.deepEqual(map.get("foo"), ["a"]);
    assert.deepEqual(map.get("bar"), ["b"]);

    assert(map.deleteEntry("foo", "b") === false);
    assert(map.size === 2);
  });
  it("deleteEntry() deletes only one value", () => {
    const map = new ArrayMultimap<string, string>();
    map.put("foo", "a");
    map.put("foo", "a");
    assert(map.deleteEntry("foo", "a") === true);
    assert(map.size === 1);
    assert.deepEqual(map.get("foo"), ["a"]);
  });
  it("keys()", () => {
    const map = new ArrayMultimap<string, string>();
    map.put("foo", "b");
    map.put("bar", "c");
    map.put("foo", "a");
    const iter = map.keys();
    assert.deepEqual(iter.next(), { value: "foo", done: false });
    assert.deepEqual(iter.next(), { value: "bar", done: false });
    assert.deepEqual(iter.next(), { value: undefined, done: true });
    assert.deepEqual(iter.next(), { value: undefined, done: true });
  });
  it("entries() is an Iterator", () => {
    const map = new ArrayMultimap<string, string>();
    map.put("foo", "b");
    map.put("bar", "c");
    map.put("foo", "a");
    const iter = map.entries();
    assert.deepEqual(iter.next(), { value: ["foo", "b"], done: false });
    assert.deepEqual(iter.next(), { value: ["foo", "a"], done: false });
    assert.deepEqual(iter.next(), { value: ["bar", "c"], done: false });
    assert.deepEqual(iter.next(), { value: undefined, done: true });
    assert.deepEqual(iter.next(), { value: undefined, done: true });
  });
  it("entries() is an Iterable", () => {
    const map = new ArrayMultimap<string, string>();
    map.put("foo", "b");
    map.put("bar", "c");
    map.put("foo", "a");
    const actual = Array.from(map.entries());
    assert.deepEqual(actual, [
      ["foo", "b"],
      ["foo", "a"],
      ["bar", "c"],
    ]);
  });
  it("is an Iterable", () => {
    const map = new ArrayMultimap<string, string>();
    map.put("foo", "b");
    map.put("bar", "c");
    map.put("foo", "a");
    const actual = Array.from(map);
    assert.deepEqual(actual, [
      ["foo", "b"],
      ["foo", "a"],
      ["bar", "c"],
    ]);
  });
  it("values() is an Iterator", () => {
    const map = new ArrayMultimap<string, string>();
    map.put("foo", "b");
    map.put("bar", "c");
    map.put("foo", "a");
    const iter = map.values();
    assert.deepEqual(iter.next(), { value: "b", done: false });
    assert.deepEqual(iter.next(), { value: "a", done: false });
    assert.deepEqual(iter.next(), { value: "c", done: false });
    assert.deepEqual(iter.next(), { value: undefined, done: true });
    assert.deepEqual(iter.next(), { value: undefined, done: true });
  });
  it("values() is an Iterable", () => {
    const map = new ArrayMultimap<string, string>();
    map.put("foo", "b");
    map.put("bar", "c");
    map.put("foo", "a");
    const actual = Array.from(map.values());
    assert.deepEqual(actual, ["b", "a", "c"]);
  });
  it("forEach()", () => {
    const map = new ArrayMultimap<string, string>();
    map.put("foo", "b");
    map.put("bar", "c");
    map.put("foo", "a");
    const result: any[] = [];
    const ret = map.forEach(function (value, key, m) {
      // tslint:disable-next-line:no-invalid-this
      assert(this === map);
      result.push([value, key, m]);
    });
    assert(ret === undefined);
    assert.deepEqual(result, [
      ["b", "foo", map],
      ["a", "foo", map],
      ["c", "bar", map],
    ]);
  });
  it("forEach(), thisArg", () => {
    const map = new ArrayMultimap<string, string>();
    map.put("foo", "b");
    const obj = {};
    let actual: any;
    map.forEach(function (value, key, m) {
      // tslint:disable-next-line:no-invalid-this
      actual = this;
    }, obj);
    assert(actual === obj);
  });
  it("asMap()", () => {
    const map = new ArrayMultimap<string, string>();
    map.put("foo", "b");
    map.put("bar", "c");
    map.put("foo", "a");
    const actual = map.asMap();
    assert(actual instanceof Map);
    assert.deepEqual(
      actual,
      new Map([
        ["foo", ["b", "a"]],
        ["bar", ["c"]],
      ])
    );
    const foo = actual.get("foo");
    if (!foo) throw new Error();
    foo.push("d");
    assert.deepEqual(map.get("foo"), ["b", "a"]);
  });
});
