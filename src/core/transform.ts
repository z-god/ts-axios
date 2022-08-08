/*
 * @Date: 2022-08-08 20:48:46
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-08-08 21:14:45
 * @FilePath: \ts-axios\src\core\transform.ts
 */
import { AxiosTransFormer } from '../types'

export default function transform(
  data: any,
  headers: any,
  fns?: AxiosTransFormer | AxiosTransFormer[]
): any {
  if (!fns) {
    return data
  }
  if (!Array.isArray(fns)) {
    fns = [fns]
  }

  fns.forEach(fn => {
    data = fn(data, headers)
  })

  return data
}
