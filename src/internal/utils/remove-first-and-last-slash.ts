/**
 * Removes leading and trailing slashes from the given string.
 *
 * @param path The string to remove slashes from.
 * @return The string with leading and trailing slashes removed.
 */
export function removeFirstAndLastSlash(path: string): string {
  return path
    .replace(/^\/+/, '')
    .replace(/\/+$/, '');
}
