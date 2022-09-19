import { createError } from '../../src/helpers/error'
import { AxiosRequestConfig, AxiosResponse } from '../../src/index'

describe('helpers:error', () => {
  test('可以用message,config,code,request,respons创建一个Error并且isAxiosError', () => {
    const request = new XMLHttpRequest()
    const config: AxiosRequestConfig = { method: 'post' }
    const response: AxiosResponse = {
      status: 200,
      statusText: 'OK',
      headers: null,
      request,
      config,
      data: { foo: 'bar' }
    }
    const error = createError('boom!', config, '50001', request, response)
    expect(error instanceof Error).toBeTruthy()
    expect(error.message).toBe('boom!')
    expect(error.config).toBe(config)
    expect(error.code).toBe('50001')
    expect(error.request).toBe(request)
    expect(error.response).toBe(response)
    expect(error.isAxiosError).toBeTruthy()
  })
})
