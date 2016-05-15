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