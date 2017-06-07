# lazy-arr [![Build Status][build]](https://circleci.com/gh/bcherny/lazy-arr) [![npm]](https://www.npmjs.com/package/lazy-arr) [![mit]](https://opensource.org/licenses/MIT)

[build]: https://img.shields.io/circleci/project/bcherny/lazy-arr.svg?branch=master&style=flat-square
[npm]: https://img.shields.io/npm/v/lazy-arr.svg?style=flat-square
[mit]: https://img.shields.io/npm/l/lazy-arr.svg?style=flat-square

> Arrays that look just like regular JavaScript arrays, but are computed lazily. Like Scala or Haskell's lazy streams (see https://stackoverflow.com/a/44333876/435124).

## Install

```sh
npm i lazy-arr -S
```

## Example

```js
import { lazy } from 'lazy-arr'

let fibs = lazy([0, 1])(_ => fibs[_ - 1] + fibs[_ - 2])

fibs[0]  // 0
fibs[1]  // 1
fibs[10] // 55
```

## License

MIT
