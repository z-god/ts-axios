const toString = Object.prototype.toString

export const isArray = Array.isArray

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

// export function isPlainObject(val: any): val is Object {
//   return val !== null && typeof val === 'object'
// }

export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

export const extend = Object.assign
