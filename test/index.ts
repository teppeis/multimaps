import assert = require('assert');
import {ListMultimap} from '../src';

describe('ListMultimap', () => {
  it('should be a function', () => {
    assert(typeof ListMultimap === 'function');
  });
  it('size: 0', () => {
    const map = new ListMultimap<string, string>();
    assert(map.size === 0);
  });
  it('get: empty array', () => {
    const map = new ListMultimap<string, string>();
    assert.deepEqual(map.get('foo'), []);
  });
  it('put, get and size', () => {
    const map = new ListMultimap<string, string>();
    assert(map.put('foo', 'a') === true);
    assert.deepEqual(map.get('foo'), ['a']);
    assert(map.size === 1);

    assert(map.put('foo', 'b') === true);
    assert.deepEqual(map.get('foo'), ['a', 'b']);
    assert(map.size === 2);

    assert(map.put('bar', 'c') === true);
    assert.deepEqual(map.get('bar'), ['c']);
    assert(map.size === 3);
  });
  it('has()', () => {
    const map = new ListMultimap<string, string>();
    assert(map.has('foo') === false);
    map.put('foo', 'a');
    assert(map.has('foo') === true);
  });
  it('clear()', () => {
    const map = new ListMultimap<string, string>();
    assert(map.size === 0);
    map.put('foo', 'a');
    map.clear();
    assert(map.size === 0);
    assert(map.has('foo') === false);
  });
  it('delete()', () => {
    const map = new ListMultimap<string, string>();
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
  it('deleteKeyValue()', () => {
    const map = new ListMultimap<string, string>();
    map.put('foo', 'a');
    map.put('foo', 'b');
    map.put('bar', 'b');
    assert(map.deleteKeyValue('foo', 'b') === true);
    assert(map.size === 2);
    assert.deepEqual(map.get('foo'), ['a']);
    assert.deepEqual(map.get('bar'), ['b']);

    assert(map.deleteKeyValue('foo', 'b') === false);
    assert(map.size === 2);
  });
  it('deleteKeyValue() deletes only one value', () => {
    const map = new ListMultimap<string, string>();
    map.put('foo', 'a');
    map.put('foo', 'a');
    assert(map.deleteKeyValue('foo', 'a') === true);
    assert(map.size === 1);
    assert.deepEqual(map.get('foo'), ['a']);
  });
  it('keys()', () => {
    const map = new ListMultimap<string, string>();
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
    const map = new ListMultimap<string, string>();
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
    const map = new ListMultimap<string, string>();
    map.put('foo', 'b');
    map.put('bar', 'c');
    map.put('foo', 'a');
    const actual = Array.from(map.entries());
    assert.deepEqual(actual, [['foo', 'b'], ['foo', 'a'], ['bar', 'c']]);
  });
});
