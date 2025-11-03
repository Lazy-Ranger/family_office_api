export function valueToBoolean(value?: unknown): boolean {
  if (
    value === undefined ||
    value === null ||
    value === '' ||
    value === 0 ||
    Number.isNaN(value) ||
    value === false
  ) {
    return false;
  }
  return true;
}