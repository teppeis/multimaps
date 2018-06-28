import {Multimap} from './multimap';

export class ArrayMultimap<K, V> extends Multimap<K, V, V[]> {
  protected newValues(): V[] {
    return [];
  }
  protected cloneValues(values: V[]): V[] {
    return values.slice();
  }
  protected addValue(value: V, values: V[]): boolean {
    values.push(value);
    return true;
  }
  protected countValues(values: V[]): number {
    return values.length;
  }
  protected deleteValue(value: V, values: V[]): boolean {
    const index = values.indexOf(value);
    if (index > -1) {
      values.splice(index, 1);
      return true;
    }
    return false;
  }
  protected hasValue(value: V, values: V[]): boolean {
    return values.indexOf(value) > -1;
  }
  get [Symbol.toStringTag](): string {
    return 'ArrayMultimap';
  }
}
