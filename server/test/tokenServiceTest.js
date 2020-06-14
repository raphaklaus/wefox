import assert from 'assert'
import {
  tokenGenerator,
  tokenDecrypt
} from '../src/services/tokenService.js'

describe('Token generation', () => {
  it('should return a string', () => {
    assert.strictEqual(
      typeof tokenGenerator(1),
      'string'
    )
  })

  it('should be different each run', () => {
    assert.notStrictEqual(
      tokenGenerator(1),
      tokenGenerator(1)
    )
  })

  it('should be data-reversible', () => {
    assert.strictEqual(
      tokenDecrypt(tokenGenerator(1)),
      'userId_1'
    )
  })
})
