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


/**
 * 功用：将 Date 转化为指定格式的String
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)可以用 1-2 个占位符，年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * <script>
 *      formatDate(new Date(), "yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423
 *      formatDate(new Date(), "yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
 *      formatDate(new Date(), "yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
 *      formatDate(new Date(), "yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
 *      formatDate(new Date(), "yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 * </script>
 */
window.formatDate = function (date, fmt) {
    var _that = new Date(date);
    var o = {
        "M+": _that.getMonth() + 1, //月份
        "d+": _that.getDate(), //日
        "h+": _that.getHours() % 12 == 0 ? 12 : _that.getHours() % 12, //小时
        "H+": _that.getHours(), //小时
        "m+": _that.getMinutes(), //分
        "s+": _that.getSeconds(), //秒
        "q+": Math.floor((_that.getMonth() + 3) / 3), //季度
        "S": _that.getMilliseconds() //毫秒
    };
    var week = {
        "0": "/u65e5",
        "1": "/u4e00",
        "2": "/u4e8c",
        "3": "/u4e09",
        "4": "/u56db",
        "5": "/u4e94",
        "6": "/u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (_that.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[_that.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}