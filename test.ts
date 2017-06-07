import { test } from 'ava'
import { lazy } from './'

test('it gives an array', t => {
  const fibs = lazy([0, 1])(_ => fibs[_ - 1] + fibs[_ - 2])
  t.is(fibs.length, 2)
})

test('it lazy-computes values', t => {
  const fibs = lazy([0, 1])(_ => fibs[_ - 1] + fibs[_ - 2])
  t.is(fibs[10], 55)
})

test('it lazy-computes values', t => {
  const fibs = lazy([0, 1])(_ => fibs[_ - 1] + fibs[_ - 2])
  t.is(fibs[10], 55)
  t.is(fibs.length, 11)
})

test('it efficiently caches previous computations', t => {
  let calls = 0
  const fibs = lazy([0, 1])(_ => {
    calls++
    return fibs[_ - 1] + fibs[_ - 2]
  })
  fibs[10]
  t.is(calls, 9)
  fibs[10]
  t.is(calls, 9)
  fibs[11]
  t.is(calls, 10)
})

test('returns whether or not a given index has been computed', t => {
  const fibs = lazy([0, 1])(_ => fibs[_ - 1] + fibs[_ - 2])
  t.is(1 in fibs, true)
  t.is(5 in fibs, false)
  fibs[10]
  t.is(5 in fibs, true)
})

test('deletes the given index', t => {
  let calls = 0
  const fibs = lazy([0, 1])(_ => {
    calls++
    return fibs[_ - 1] + fibs[_ - 2]
  })
  fibs[10]
  t.is(calls, 9)
  delete fibs[10]
  t.is(calls, 9)
  fibs[10]
  t.is(calls, 10)
})

test('it does not allow directly setting values', t => {
  const fibs = lazy([0, 1])(_ => fibs[_ - 1] + fibs[_ - 2])
  t.throws(() => fibs[5] = 8)
})
