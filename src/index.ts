export class ListMultimap<K, V> {
  public size = 0;
  private map: Map<K, V[]> = new Map();

  constructor(iterable?: Iterable<[K, V]>) {
    if (iterable) {
      for (const [key, value] of iterable) {
        this.put(key, value);
      }
    }
    return this;
  }

  get(key: K): V[] {
    const values = this.map.get(key);
    if (values) {
      return values.slice();
    } else {
      return [];
    }
  }

  put(key: K, value: V): boolean {
    let values = this.map.get(key);
    if (!values) {
      values = [];
      this.map.set(key, values);
    }
    values.push(value);
    this.size++;
    return true;
  }
  putAll(key: K, values: V[]): boolean;
  putAll(multimap: ListMultimap<K, V>): boolean;
  putAll(arg1: K | ListMultimap<K, V>, arg2?: V[]): boolean {
    let pushed = 0;
    if (arg2) {
      const key = arg1 as K;
      const values = arg2;
      for (const value of values) {
        this.put(key, value);
        pushed++;
      }
    } else if (arg1 instanceof ListMultimap) {
      for (const [key, value] of arg1.entries()) {
        this.put(key, value);
        pushed++;
      }
    } else {
      throw new Error('unexpected arguments');
    }
    return pushed > 0;
  }

  has(key: K): boolean {
    return this.map.has(key);
  }

  hasEntry(key: K, value: V): boolean {
    return this.get(key).indexOf(value) > -1;
  }

  delete(key: K): boolean {
    this.size -= this.get(key).length;
    return this.map.delete(key);
  }

  deleteEntry(key: K, value: V): boolean {
    const current = this.get(key);
    const index = current.indexOf(value);
    if (index === -1) {
      return false;
    }
    current.splice(index, 1);
    this.map.set(key, current);
    this.size--;
    return true;
  }

  clear(): void {
    this.map.clear();
    this.size = 0;
  }

  keys(): IterableIterator<K> {
    return this.map.keys();
  }

  entries(): IterableIterator<[K, V]> {
    const self = this;
    function* gen(): IterableIterator<[K, V]> {
      for (const [key, values] of self.map.entries()) {
        for (const value of values) {
          yield [key, value];
        }
      }
    }
    return gen();
  }

  values(): IterableIterator<V> {
    const self = this;
    function* gen(): IterableIterator<V> {
      for (const [, value] of self.entries()) {
        yield value;
      }
    }
    return gen();
  }

  forEach<T>(callback: (this: T, alue: V, key: K, map: this) => void, thisArg?: T): void {
    for (const [key, value] of this.entries()) {
      callback.call(thisArg, value, key, this);
    }
  }

  [Symbol.iterator]() {
    return this.entries();
  }

  get [Symbol.toStringTag](): string {
    return 'ListMultimap';
  }

  asMap(): Map<K, V[]> {
    const ret = new Map<K, V[]>();
    for (const key of this.keys()) {
      ret.set(key, this.get(key).slice());
    }
    return ret;
  }
}
