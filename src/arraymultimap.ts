import type { CollectionOperator } from "./multimap.js";
import { Multimap } from "./multimap.js";

export class ArrayMultimap<K, V> extends Multimap<K, V, V[]> {
  constructor(iterable?: Iterable<[K, V]>) {
    super(new ArrayOperator(), iterable);
  }

  get [Symbol.toStringTag](): string {
    return "ArrayMultimap";
  }
}

class ArrayOperator<V> implements CollectionOperator<V, V[]> {
  create(): V[] {
    return [];
  }

  clone(collection: V[]): V[] {
    return collection.slice();
  }

  add(value: V, collection: V[]): boolean {
    collection.push(value);
    return true;
  }

  size(collection: V[]): number {
    return collection.length;
  }

  delete(value: V, collection: V[]): boolean {
    const index = collection.indexOf(value);
    if (index > -1) {
      collection.splice(index, 1);
      return true;
    }
    return false;
  }
  has(value: V, collection: V[]): boolean {
    return collection.includes(value);
  }
}
