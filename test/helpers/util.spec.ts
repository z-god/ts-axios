import { isDate, isPlainObject } from '../../src/helpers/util'

describe('helpers:util', () => {
  describe('isXX', () => {
    test('isDate', () => {
      expect(isDate(new Date())).toBeTruthy()
      expect(isDate(Date.now())).toBeFalsy()
    })

    test('isPlainObject', () => {
      expect(isPlainObject({})).toBeTruthy()
      expect(isPlainObject(new Date())).toBeFalsy()
    })
  })
})
