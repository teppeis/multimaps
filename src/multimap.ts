export abstract class Multimap<K, V, I extends Iterable<V>> {
  private size_ = 0;
  private map: Map<K, I> = new Map();

  constructor(iterable?: Iterable<[K, V]>) {
    if (iterable) {
      for (const [key, value] of iterable) {
        this.put(key, value);
      }
    }
    return this;
  }

  get size(): number {
    return this.size_;
  }

  get(key: K): I {
    const values = this.map.get(key);
    if (values) {
      return this.cloneValues(values);
    } else {
      return this.newValues();
    }
  }

  protected abstract newValues(): I;
  protected abstract cloneValues(values: I): I;
  protected abstract addValue(value: V, values: I): boolean;
  protected abstract countValues(values: I): number;
  protected abstract deleteValue(value: V, values: I): boolean;
  protected abstract hasValue(value: V, values: I): boolean;

  put(key: K, value: V): boolean {
    let values = this.map.get(key);
    if (!values) {
      values = this.newValues();
    }
    if (!this.addValue(value, values)) {
      return false;
    }
    this.map.set(key, values);
    this.size_++;
    return true;
  }
  putAll(key: K, values: I): boolean;
  putAll(multimap: Multimap<K, V, I>): boolean;
  putAll(arg1: K | Multimap<K, V, I>, arg2?: I): boolean {
    let pushed = 0;
    if (arg2) {
      const key = arg1 as K;
      const values = arg2;
      for (const value of values) {
        this.put(key, value);
        pushed++;
      }
    } else if (arg1 instanceof Multimap) {
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
    return this.hasValue(value, this.get(key));
  }

  delete(key: K): boolean {
    this.size_ -= this.countValues(this.get(key));
    return this.map.delete(key);
  }

  deleteEntry(key: K, value: V): boolean {
    const current = this.get(key);
    if (!this.deleteValue(value, current)) {
      return false;
    }
    this.map.set(key, current);
    this.size_--;
    return true;
  }

  clear(): void {
    this.map.clear();
    this.size_ = 0;
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

  abstract get [Symbol.toStringTag](): string;

  asMap(): Map<K, I> {
    const ret = new Map<K, I>();
    for (const key of this.keys()) {
      ret.set(key, this.cloneValues(this.get(key)));
    }
    return ret;
  }
}
