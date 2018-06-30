import {Multimap, CollectionOperator} from './multimap';

export class SetMultimap<K, V> extends Multimap<K, V, Set<V>> {
  constructor(iterable?: Iterable<[K, V]>) {
    super(new SetOperator(), iterable);
  }
  get [Symbol.toStringTag](): string {
    return 'SetMultimap';
  }
}

class SetOperator<V> implements CollectionOperator<V, Set<V>> {
  create(): Set<V> {
    return new Set();
  }
  clone(collection: Set<V>): Set<V> {
    return new Set(collection);
  }
  add(value: V, collection: Set<V>): boolean {
    const prev = collection.size;
    collection.add(value);
    return prev !== collection.size;
  }
  size(collection: Set<V>): number {
    return collection.size;
  }
  delete(value: V, collection: Set<V>): boolean {
    return collection.delete(value);
  }
  has(value: V, collection: Set<V>): boolean {
    return collection.has(value);
  }
}
