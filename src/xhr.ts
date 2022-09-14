import { createError } from './helpers/error'
import { parseHeaders } from './helpers/headers'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from './types'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    // 解构获取配置项，并赋予初始值
    const {
      data = null,
      url,
      method = 'get',
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials
    } = config
    // 创建request对象
    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }
    if (timeout) {
      request.timeout = timeout
    }

    if (withCredentials) {
      console.log(withCredentials)

      request.withCredentials = withCredentials
    }

    console.log('request', request)

    request.open(method.toUpperCase(), url!, true)

    // 接收到响应
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }

      if (request.status === 0) {
        return
      }

      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response)
    }

    request.ontimeout = function handleTimeOut() {
      reject(
        createError(`Timeout of ${request.timeout} ms exceeded`, config, 'ECONNABORTED', request)
      )
    }

    // 网络错误
    request.onerror = function handleError() {
      reject(createError('Network Error', config, null, request))
    }

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    if (cancelToken) {
      cancelToken.promise.then(reason => {
        request.abort()
        reject(reason)
      })
    }

    request.send(data)

    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            reject,
            response
          )
        )
      }
    }
  })
}
