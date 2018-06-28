import assert = require('assert');
import {SetMultimap} from '../src/setmultimap';

describe('SetMultimap', () => {
  describe('constructor ', () => {
    it('is a function', () => {
      assert(typeof SetMultimap === 'function');
    });
    it('is called with no args', () => {
      const map = new SetMultimap<string, string>();
      assert(map.size === 0);
    });
    it('is called with Iterable<[K, V]>', () => {
      const iterable = {
        [Symbol.iterator]() {
          const m = new Set<[string, string]>([['foo', 'b'], ['bar', 'c'], ['foo', 'a']]);
          const iter = m.values();
          delete iter[Symbol.iterator];
          return iter;
        },
      };
      const map = new SetMultimap<string, string>(iterable);
      assert(map.size === 3);
      assert.deepEqual(map.get('foo'), new Set(['b', 'a']));
      assert.deepEqual(map.get('bar'), new Set(['c']));
    });
  });
  it('@@toStringTag', () => {
    const map = new SetMultimap<string, string>();
    assert(map.toString() === '[object SetMultimap]');
  });
  it('size: 0', () => {
    const map = new SetMultimap<string, string>();
    assert(map.size === 0);
  });
  it('get: empty set', () => {
    const map = new SetMultimap<string, string>();
    assert.deepEqual(map.get('foo'), new Set());
  });
  it('put, get and size', () => {
    const map = new SetMultimap<string, string>();
    assert(map.put('foo', 'a') === true);
    assert.deepEqual(map.get('foo'), new Set(['a']));
    assert(map.size === 1);

    assert(map.put('foo', 'b') === true);
    assert.deepEqual(map.get('foo'), new Set(['a', 'b']));
    assert(map.size === 2);

    assert(map.put('bar', 'c') === true);
    assert.deepEqual(map.get('bar'), new Set(['c']));
    assert(map.size === 3);

    map.get('foo').add('d');
    assert.deepEqual(map.get('foo'), new Set(['a', 'b']));
  });
  it('putAll(key, values)', () => {
    const map = new SetMultimap<string, string>();
    map.put('foo', 'a');
    assert(map.putAll('foo', new Set(['b', 'c'])) === true);
    assert.deepEqual(map.get('foo'), new Set(['a', 'b', 'c']));
  });
  it('putAll() empty', () => {
    const map = new SetMultimap<string, string>();
    assert(map.putAll('foo', new Set()) === false);
    assert(map.size === 0);
  });
  it('putAll(multimap)', () => {
    const map = new SetMultimap<string, string>();
    map.putAll('foo', new Set(['a', 'b']));
    map.putAll('bar', new Set(['c']));
    const actual = new SetMultimap<string, string>();
    actual.putAll(map);
    assert.deepEqual(actual.get('foo'), new Set(['a', 'b']));
    assert.deepEqual(actual.get('bar'), new Set(['c']));
    assert(actual.size === 3);
  });
  it('has()', () => {
    const map = new SetMultimap<string, string>();
    assert(map.has('foo') === false);
    map.put('foo', 'a');
    assert(map.has('foo') === true);
    assert(map.has('bar') === false);
  });
  it('hasEntry()', () => {
    const map = new SetMultimap<string, string>();
    assert(map.hasEntry('foo', 'a') === false);
    map.put('foo', 'a');
    assert(map.hasEntry('foo', 'a') === true);
    assert(map.hasEntry('foo', 'b') === false);
  });
  it('clear()', () => {
    const map = new SetMultimap<string, string>();
    assert(map.size === 0);
    map.put('foo', 'a');
    map.clear();
    assert(map.size === 0);
    assert(map.has('foo') === false);
  });
  it('delete()', () => {
    const map = new SetMultimap<string, string>();
    map.put('foo', 'a');
    map.put('foo', 'b');
    map.put('bar', 'c');
    assert(map.delete('foo') === true);
    assert(map.size === 1);
    assert(map.has('foo') === false);
    assert(map.has('bar') === true);

    assert(map.delete('foo') === false);
    assert(map.size === 1);
  });
  it('deleteEntry()', () => {
    const map = new SetMultimap<string, string>();
    map.put('foo', 'a');
    map.put('foo', 'b');
    map.put('bar', 'b');
    assert(map.deleteEntry('foo', 'b') === true);
    assert(map.size === 2);
    assert.deepEqual(map.get('foo'), new Set(['a']));
    assert.deepEqual(map.get('bar'), new Set(['b']));

    assert(map.deleteEntry('foo', 'b') === false);
    assert(map.size === 2);
  });
  it('keys()', () => {
    const map = new SetMultimap<string, string>();
    map.put('foo', 'b');
    map.put('bar', 'c');
    map.put('foo', 'a');
    const iter = map.keys();
    assert.deepEqual(iter.next(), {value: 'foo', done: false});
    assert.deepEqual(iter.next(), {value: 'bar', done: false});
    assert.deepEqual(iter.next(), {value: undefined, done: true});
    assert.deepEqual(iter.next(), {value: undefined, done: true});
  });
  it('entries() is an Iterator', () => {
    const map = new SetMultimap<string, string>();
    map.put('foo', 'b');
    map.put('bar', 'c');
    map.put('foo', 'a');
    const iter = map.entries();
    assert.deepEqual(iter.next(), {value: ['foo', 'b'], done: false});
    assert.deepEqual(iter.next(), {value: ['foo', 'a'], done: false});
    assert.deepEqual(iter.next(), {value: ['bar', 'c'], done: false});
    assert.deepEqual(iter.next(), {value: undefined, done: true});
    assert.deepEqual(iter.next(), {value: undefined, done: true});
  });
  it('entries() is an Iterable', () => {
    const map = new SetMultimap<string, string>();
    map.put('foo', 'b');
    map.put('bar', 'c');
    map.put('foo', 'a');
    const actual = Array.from(map.entries());
    assert.deepEqual(actual, [['foo', 'b'], ['foo', 'a'], ['bar', 'c']]);
  });
  it('ListMultimap is an Iterable', () => {
    const map = new SetMultimap<string, string>();
    map.put('foo', 'b');
    map.put('bar', 'c');
    map.put('foo', 'a');
    const actual = Array.from(map);
    assert.deepEqual(actual, [['foo', 'b'], ['foo', 'a'], ['bar', 'c']]);
  });
  it('values() is an Iterator', () => {
    const map = new SetMultimap<string, string>();
    map.put('foo', 'b');
    map.put('bar', 'c');
    map.put('foo', 'a');
    const iter = map.values();
    assert.deepEqual(iter.next(), {value: 'b', done: false});
    assert.deepEqual(iter.next(), {value: 'a', done: false});
    assert.deepEqual(iter.next(), {value: 'c', done: false});
    assert.deepEqual(iter.next(), {value: undefined, done: true});
    assert.deepEqual(iter.next(), {value: undefined, done: true});
  });
  it('values() is an Iterable', () => {
    const map = new SetMultimap<string, string>();
    map.put('foo', 'b');
    map.put('bar', 'c');
    map.put('foo', 'a');
    const actual = Array.from(map.values());
    assert.deepEqual(actual, ['b', 'a', 'c']);
  });
  it('forEach()', () => {
    const map = new SetMultimap<string, string>();
    map.put('foo', 'b');
    map.put('bar', 'c');
    map.put('foo', 'a');
    const result: any[] = [];
    const ret = map.forEach((value, key, m) => {
      result.push([value, key, m]);
    });
    assert(ret === undefined);
    assert.deepEqual(result, [['b', 'foo', map], ['a', 'foo', map], ['c', 'bar', map]]);
  });
  it('forEach(), thisArg', () => {
    const map = new SetMultimap<string, string>();
    map.put('foo', 'b');
    const obj = {};
    let actual: any;
    map.forEach(function(value, key, m) {
      // tslint:disable-next-line:no-invalid-this
      actual = this;
    }, obj);
    assert(actual === obj);
  });
  it('asMap()', () => {
    const map = new SetMultimap<string, string>();
    map.put('foo', 'b');
    map.put('bar', 'c');
    map.put('foo', 'a');
    const actual = map.asMap();
    assert(actual instanceof Map);
    assert.deepEqual(actual, new Map([['foo', new Set(['b', 'a'])], ['bar', new Set(['c'])]]));
    const foo = actual.get('foo');
    if (!foo) throw new Error();
    foo.add('d');
    assert.deepEqual(map.get('foo'), new Set(['b', 'a']));
  });
});
