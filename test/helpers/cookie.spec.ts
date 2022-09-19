import cookie from '../../src/helpers/cookie'
describe('helps:cookie', () => {
  test('可以读取cookie', () => {
    document.cookie = 'foo=newmen'
    expect(cookie.read('foo')).toBe('newmen')
  })

  test('如果cookie不存在返回null', () => {
    document.cookie = 'foo=newmen'
    expect(cookie.read('anyone')).toBeNull()
  })
})
