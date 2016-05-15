/**
 * Created by zhanglicong on 16/5/15.
 */

/**
 * 翻转参数
 * @param {function(string, *)} iteratorFn
 * @returns {function(*, string)}
 */
function reverseParams(iteratorFn) {
    return function(value, key) { iteratorFn(key, value); };
}


/**
 * 空操作函数。在函数式编程的时候很有用
 ```js
 function foo(callback) {
       var result = calculateResult();
       (callback || noop)(result);
     }
 ```
 */
function noop() {}


/**
 * 判断一个值是不是日期类型
 * @param {*} value 要检查的值.
 * @returns {boolean} 如果value是Date返回true.
 */
function isDate(value) {
    return Object.prototype.toString.call(value) === '[object Date]';
}


/**
 * 判断一个值是不是正则表达式对象.
 * @param {*} value
 * @returns {boolean} 如果value是RegExp返回true.
 */
function isRegExp(value) {
    return Object.prototype.toString.call(value) === '[object RegExp]';
}


/**
 * 判断传入对对象是不是window
 * @param {*} obj
 * @returns {boolean} 如果obj是window返回true.
 */
function isWindow(obj) {
    return obj && obj.window === obj;
}


function isFile(obj) {
    return Object.prototype.toString.call(obj) === '[object File]';
}


function isFormData(obj) {
    return Object.prototype.toString.call(obj) === '[object FormData]';
}


function isBlob(obj) {
    return Object.prototype.toString.call(obj) === '[object Blob]';
}

function nodeName (element) {
    return lowercase(element.nodeName || (element[0] && element[0].nodeName));
}