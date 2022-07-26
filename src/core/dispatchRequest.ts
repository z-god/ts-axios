import { transformRequest, transformResponse } from '../helpers/data'
import { processHeaders } from '../helpers/headers'
import { buildURL } from '../helpers/url'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'
import xhr from '../xhr'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResPonseData(res)
  })
}

// 处理配置
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

// 处理url params
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url!, params)
}

// 处理body
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformResPonseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}
