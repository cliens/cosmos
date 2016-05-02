/**
 * Created by zhanglicong on 16/4/30.
 */

//
/******************** singleton ***********************
*
*   1. 划分命名空间
*   2. 私有化成员（私有属性、方法惯用下划线开头）
*
* ************************************************/

/*
* 1. 最简单的单体模式
* 优点：
*   简单，易用；
* 缺点：
*   但是体内方法和属性的访问较为麻烦，要通过命名空间引用；
*   单体可以被修改
* */

var person = {

    firstName: 'Zhang',

    lastName: 'San',

    getFullName: function() {
        return person.firstName + person.lastName ; // 体内获取name属性，必须要用person.name或this.name，繁琐
    }

};


/*
 * 2. 借助闭包的单体模式
 * 优点：
 *   体内属性和方法的调用，不再需要命名空间或this ;
 *   可以确保，体内的私有属性和方法不会在外部被使用
 * 缺点：
 *   同1方法一样，脚本加载单体即被创建（对于资源密集和配置开销大单体不利）
 *
 * */

var person2 = (function(){

    var firstName = 'Li'
        , lastName = 'Si' ;

    function getFullName() {
        return firstName + lastName;
    }

    return {
        getFullName: getFullName ,
        name: 'wang'
    }

})();



/*
 * 3. 惰性加载单体
 * 优点：
 *   体内属性和方法的调用，不再需要命名空间或this ;
 *   可以确保，体内的私有属性和方法不会在外部被使用
 * 缺点：
 *   同1方法一样，脚本加载单体即被创建（对于资源密集和配置开销大单体不利）
 *   代码复杂，创建单体的代码不够直观，且不易于理解
 *
 * */

var person3 = (function(){

    var uniqueInstance;     // 用于存储实例单体， 查询实例是否已经创建时候使用
    function constructor() {

        var firstName = 'Li'
            , lastName = 'Si' ;

        function getFullName() {
            return firstName + lastName;
        }

        return {
            getFullName: getFullName ,
            name: 'wang'
        }

    }

    return {
        getInstance: function() {
            if( !uniqueInstance ){
                uniqueInstance = constructor();
            }

            return uniqueInstance;
        }
    }


})();


/*
 * 4. 分支单体
 * 优点：
 *   可以根据条件返回不同单体（例如用来做浏览器兼容） ;
 *
 * */

var person4 = (function() {

    var module1 = {
        firstName: 'Zhang' ,
        lastName: 'San' ,
        getFullName:  function() {
            return this.firstName + this.lastName;
        }
    };

    var module2 = {
        firstName: 'Li' ,
        lastName: 'Si' ,
        getFullName:  function() {
            return this.firstName + this.lastName;
        }
    };


    // return (someCondition) ? module1 : module2;

})();