import { Random } from 'random-js'

export function integerRangeRandom () {
  let engine =  new Random()
  return function (minInteger, maxInteger) {
    return engine.integer(minInteger, maxInteger)
  }
}
