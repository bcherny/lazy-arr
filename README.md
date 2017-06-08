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

Lazy-arr supports 2 usage patterns:

1. Call it with just a generator function:

  ```js
  import { lazy } from 'lazy-arr'
  lazy(index => index + 1)
  ```

2. Call it with a generator function and an initial value:

  ```js
  import { lazy } from 'lazy-arr'
  let seq = lazy([0])(index => index + seq[index - 1])
  ```

*Note: When I use the word "generator", I mean a regular function that takes an array index and returns a value. I don't mean an [ES2015 generator function](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/function*).*

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

## License

MIT
