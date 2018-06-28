import {Multimap} from './multimap';

export class SetMultimap<K, V> extends Multimap<K, V, Set<V>> {
  protected newValues(): Set<V> {
    return new Set();
  }
  protected cloneValues(values: Set<V>): Set<V> {
    return new Set(values);
  }
  protected addValue(value: V, values: Set<V>): boolean {
    const prev = values.size;
    values.add(value);
    return prev !== values.size;
  }
  protected countValues(values: Set<V>): number {
    return values.size;
  }
  protected deleteValue(value: V, values: Set<V>): boolean {
    return values.delete(value);
  }
  protected hasValue(value: V, values: Set<V>): boolean {
    return values.has(value);
  }
  get [Symbol.toStringTag](): string {
    return 'SetMultimap';
  }
}
