/**
 * Created by zhanglicong on 16/5/8.
 */

/******************** adapter ***********************
 *
 *   1. 可以用来在现有接口和不兼容类之间进行适配，协调两个不同的接口。有助于避免大规模修改现有代码。
 *   2. 所适配的两个方法执行的应该是相似的任务（不然就解决不了问题，或者不能叫适配模式了）
 *
 *   适配模式，亦如其名，是用来完成适配的。就像老式电脑用的都是PS2接口，现在的电脑都是USB接口了。如果你想在现在的电脑上，
 *   使用之前的一个PS2接口的键盘，那你就需要使用一个适配器完成它们之间的转换。
 * ************************************************/

/*
 * 例如： 通过适配器完成prototype与YUI框架之间的互换
 * */

// prototype的$函数的实现
function $() {
    var elements = []
        , element
        , i
        , len;

    for(i = 0, len = arguments.length; i<len; i++){
        element = arguments[i];
        if(typeof element == 'string'){
            element = document.getElementById(element);
        }
        if(len === 1){
            return element;
        }
        elements.push(element);
    }
    return elements;
}

// YUI get函数的实现
YAHOO.util.Dom.get = function(ele) {
    if(YAHOO.lang.isString(ele)){
        return document.getElementById(ele);
    }
    if(YAHOO.lang.isArray(ele)){
        var elements = [];
        for(var i = 0, len = ele.length; i<len; i++){
            elements[elements.length] = YAHOO.util.Dom.get(ele[i]);
        }
        return elements;
    }
    if(ele){
        return ele;
    }
    return null;
};

// 可以看到:
// YUI的get方法具有个参数（参数可以是字符串或HTML元素，或由它们组成的数组）
// prototype的$方法，没有显式参数（可以传入任意参数的字符串或HTML元素）

// 对于prototype转YUI的人，只需要添加 $ ＝ prototypeToYUIAdapter即可
function prototypeToYUIAdapter() {
    return YAHOO.util.Dom.get(arguments);
}

// 对于由YUI转prototype的人，只需要添加 YAHOO.util.Dom.get = YUItoPrototypeAdapter即可
function YUItoPrototypeAdapter(ele) {
    return $.apply(window, ele instanceof Array ? ele: [el]);
}