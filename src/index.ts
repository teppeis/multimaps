export class ListMultimap<K, V> {
  public size = 0;
  private map: Map<K, V[]> = new Map();

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

  has(key: K): boolean {
    return this.map.has(key);
  }

  delete(key: K): boolean {
    this.size -= this.get(key).length;
    return this.map.delete(key);
  }

  deleteKeyValue(key: K, value: V): boolean {
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
}
