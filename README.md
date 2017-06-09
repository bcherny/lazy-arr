# lazy-arr [![Build Status][build]](https://circleci.com/gh/bcherny/lazy-arr) [![npm]](https://www.npmjs.com/package/lazy-arr) [![mit]](https://opensource.org/licenses/MIT)

[build]: https://img.shields.io/circleci/project/bcherny/lazy-arr.svg?branch=master&style=flat-square
[npm]: https://img.shields.io/npm/v/lazy-arr.svg?style=flat-square
[mit]: https://img.shields.io/npm/l/lazy-arr.svg?style=flat-square

> Arrays that look just like regular JavaScript arrays, but are computed lazily. Like Scala or Haskell's lazy streams. Read more about it in the introductory blog post: https://performancejs.com/post/ewffd34/Introducing:-Lazy-arrays-in-JavaScript.

## Install

```sh
npm i lazy-arr -S
```

## Usage

Lazy-arr takes a function, and uses it to lazily generate values for the array. The function takes a numerical array index (eg. `5`) and should return the value for that index in the array. The function doesn't have to be idempotent, but its return value *will* be cached (you can then delete it from cache, if you want).

It supports 2 usage patterns:

1. Call it with just a function:

  ```js
  import { lazy } from 'lazy-arr'
  lazy(index => index + 1)
  ```

2. Call it with a function and an initial value:

  ```js
  import { lazy } from 'lazy-arr'
  let seq = lazy([0])(index => index + seq[index - 1])
  ```

## Examples

```js
import { lazy } from 'lazy-arr'

// even numbers
let numbers = lazy(_ => _ * 2)
numbers[0] // 0
numbers[5] // 10

// fibonacci numbers (with initial value of [0, 1])
let fibs = lazy([0, 1])(_ => fibs[_ - 1] + fibs[_ - 2])

fibs[0]  // 0
fibs[1]  // 1
fibs[10] // 55
```

## Other operations

```js
import { lazy } from 'lazy-arr'

let numbers = lazy(_ => _ * 2)
numbers[3]   // 6

// membership
2 in numbers // true
3 in numbers // true
4 in numbers // false

// deleting
delete numbers[3]
3 in numbers // false
```

Note that you *cannot* directly set values:

```js
import { lazy } from 'lazy-arr'

let numbers = lazy(_ => _ * 2)
numbers[7] = 3 // THROWS ERROR
```

## License

MIT
