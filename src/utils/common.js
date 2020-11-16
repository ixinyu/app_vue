/**
 *js调用APP
 * @params {*} Obj  传给app参数
 * messageName 为ios和安卓端提供的方法名
 */
// vue 与安卓和ios交互 ：调用安卓和ios方法
export function JSToNativeAPP(messageName, params, callback) {
  params = params || ''
  const isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1
  // const isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  if (isAndroid) {
    if (params) {
      if (typeof params === 'object') {
        params = JSON.stringify(params)
      }
    }
    // callback 直接拿到该方法的返回值，传递参数为字符串
    callback(window.test[messageName](params))
    // window.安卓方法名
    // window.test[messageName](params)
    // window.android.test[messageName](params)
  } else {
    window.webkit.messageHandlers[messageName].postMessage(params)
  }
}

