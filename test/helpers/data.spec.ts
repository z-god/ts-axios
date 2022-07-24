import { transformRequest } from '../../src/helpers/data'

describe('helpers:data', () => {
  describe('transformRequest', () => {
    test('普通对象转JSON字符串', () => {
      const a = { a: 1 }
      expect(transformRequest(a)).toBe('{"a":1}')
    })

    test('不是普通对象直接返回', () => {
      const a = new URLSearchParams('a=b')
      expect(transformRequest(a)).toBe(a)
    })
  })
})
