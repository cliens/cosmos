/**
 * Created by zhanglicong on 16/4/30.
 */

/******************** chaining ***********************
 *
 *   可以对同一个对象，连续进行操作
 *
 * ************************************************/

/*
 * 1. 最简单的链式调用
 * */

function Person(name, age) {
    this.name = name || '' ;
    this.age = age || 0;
}

Person.prototype.setAge = function(age) {
    this.age = age;
    return this;
};

Person.prototype.setName = function(name) {
    this.name = name;
    return this;
};

// 遇到get时候无法继续链式调用
Person.prototype.getName = function() {
    return this.name;
};

// 可以通过回调进行操作，继续使用链式调用
Person.prototype.getAge = function(callback) {
    if(callback && typeof callback === 'function'){
        callback.call(this, this.age);
        return this;
    }
    return this.age;
};


// 使用
var person = new Person('Zhang', 18);
person.setName('ZhangSan').setAge(19).getName();  // "ZhangSan";

person.setName('ZhangSan').setAge(19).getAge(function(){return this}).setName('LiSi');  // "{name:'Lisi', age: 19}";
