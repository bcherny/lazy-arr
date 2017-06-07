/**
 * Returns an array that look just like a regular JavaScript array, but is computed lazily.
 *
 * @param array Initial value
 * @param fn Function that takes a numerical index, and returns a value
 */
export function lazy<T>(array: T[]) {
  return (fn: (index: number) => T) => {
    const processed: { [index: string]: true } = {}

    for (let n = 0; n < array.length; n++) {
      processed[n] = true
    }

    return new Proxy(array, {
      deleteProperty(_, n: number) {
        return delete processed[n]
      },
      get(array, key) {
        const _key = +(key as any)
        if (typeof key === 'string' && !Number.isNaN(_key)) {
          if (!(key in processed)) {
            array[_key] = fn(_key)
            processed[key] = true
          }
          return array[_key]
        }
        return array[key as any]
      },
      has(array, index: number) {
        return array.length > index
      },
      set() {
        return false
      }
    })
  }
}
