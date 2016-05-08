/**
 * Created by zhanglicong on 16/5/8.
 */

/******************** facade ***********************
 *
 *   1. 简化类的接口
 *   2. 消除类与使用它的客户代码之间的耦合
 *
 *   门面模式就像GUI系统中，桌面的快捷图标，扮演着把用户引导至某个地方的接口角色。
 *   门面模式可以用来创建便利函数，这些函数为执行各种复杂任务提供类一个简单的接口，它们使代码更容易维护和理解。
 *   判断是否该使用门面模式的关键在于辨认哪些反复成组出现的代码。
 * ************************************************/


/*
 * 1. 例：事件兼容
 * */

function addEvent(ele, type, fn) {
    if( window.addEventListener ){
        ele.addEventListener(type, fn , false);
    }else if( window.attachEvent ){
        ele.attachEvent('on' + type, fn);
    }else{
        ele['on'+ type] = fn;
    }
}


/*
 * 2. 元素样式设置
 * */

function setStyle(elements, prop, val) {
    var i, len;

    for(i = 0, len = elements.length-1; i<len; i++){
        document.getElementById(elements[i]).style[prop] = val;
    }
}

function setCss(eles, styles) {
    for(var prop in styles){
        if(!styles.hasOwnProperty(prop)) continue;
        setStyle(eles, prop, styles[prop]);
    }
}

// 使用：
setCss(['foo', 'bar', 'baz'], {
    color: 'white',
    background: 'black',
    fontSize: '16px'
});
