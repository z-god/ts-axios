import { isDate } from '../../src/helpers/util'

describe('helpers:util', () => {
  describe('isXX', () => {
    test('Date', () => {
      expect(isDate(new Date())).toBeTruthy()
      expect(isDate(Date.now())).toBeFalsy()
    })
  })
})
