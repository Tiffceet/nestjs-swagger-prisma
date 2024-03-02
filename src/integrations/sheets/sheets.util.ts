/**
 * For checking if the given cell value is blank
 * @param value
 * @returns
 */
export function isBlank(value: string) {
  if (!value) {
    return true;
  }

  if (!String(value).trim()) {
    return true;
  }
  return false;
}

/**
 * For checking if value is Y or y
 * @param value
 */
export function isEnabled(value: string) {
  return String(value).toLowerCase().trim() === 'y';
}
