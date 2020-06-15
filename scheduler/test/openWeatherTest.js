import assert from 'assert'
import { isPrecipitating } from '../src/services/openWeather.js'

describe('Open Weather', () => {
  it('should detect precipitation', () => {
    [200, 300, 400, 500, 600]
      .map(x => x.toString())
      .forEach(x => assert(isPrecipitating({ id: x })))
  })

  it('should not detect precipitation', () => {
    [100, 700]
      .map(x => x.toString())
      .forEach(x => assert(!isPrecipitating({ id: x })))
  })
})
