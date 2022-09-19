import { transformRequest, transformResponse } from '../../src/helpers/data'

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
  describe('transformResponse', () => {
    test('是string但不是JSON字符串就什么也不做', () => {
      const a = '{a: 2}'
      expect(transformResponse(a)).toBe('{a: 2}')
    })
    test('是string但不是JSON字符串就什么也不做', () => {
      const a = '{"a": 1}'
      console.log(transformResponse(a))
      const b = transformResponse(a)
      expect(b.a).toBe(1)
    })

    test('如果data不是字符串就什么也不做', () => {
      const a = { a: 2 }
      expect(transformResponse(a)).toBe(a)
    })
  })
})
