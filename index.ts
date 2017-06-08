export function lazy<T>(array: T[]): (fn: Fn<T>) => T[]
export function lazy<T>(fn: Fn<T>): T[]

/**
 * Returns an array that look just like a regular JavaScript array, but is computed lazily.
 *
 * @param array (Optional) Initial value
 * @param fn Function that takes a numerical index, and returns a value
 */
export function lazy<T>(arg: T[] | Fn<T>) {

  if (Array.isArray(arg)) {
    return lazyInternal(arg)
  }

  return lazyInternal<T>([])(arg)
}

export type Fn<T> = (index: number) => T

function lazyInternal<T>(array: T[]) {
  return (fn: Fn<T>) => {
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
