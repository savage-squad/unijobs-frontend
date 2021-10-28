export function isEmpty<T>(array: Array<T> | null): boolean {
  if (array == null) {
    return true;
  }

  if (array.length <= 0) {
    return true;
  }

  return false;
}
