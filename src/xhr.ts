import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig) {
  // 解构获取配置项，并赋予初始值
  const { data = null, url, method = 'get', headers } = config

  // 创建request对象
  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)

  Object.keys(headers).forEach(name => {
    if (data === null && name.toLowerCase() === 'content-type') {
      delete headers[name]
    } else {
      request.setRequestHeader(name, headers[name])
    }
  })

  request.send(data)
}
