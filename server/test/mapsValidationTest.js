import assert from 'assert'
import mapsValidation from '../src/services/mapsValidation.js'
import {
  working,
  lowConfidence,
  notFound,
  somethingElse
} from './fixture/mapsResponses.js'

describe('Maps Validation', () => {
  it('should validate a correct response', () => {
    assert(mapsValidation(working))
  })

  it('should not validate an incorrect response', () => {
    assert(!mapsValidation(lowConfidence))
  })

  it('should not validate a not found response', () => {
    assert(!mapsValidation(notFound))
  })

  it('should not validate a random response', () => {
    assert(!mapsValidation(somethingElse))
  })
})
