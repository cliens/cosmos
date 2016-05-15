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
