/**
 * Created by zhanglicong on 16/5/1.
 */

/******************** Factory ***********************
 *
 *   1. 不需要关注类带具体实现，减少耦合（通过抽象父类，把成员对象实例化推迟到子类中进行）
 *   2. 有助于创建模块化的代码
 *
 * ************************************************/


/*
 * 1. 简单工厂模式
 * 优点：
 *   简单；
 * 缺点：
 *   新添加的类，还是要代码工厂上的添加
 * */

// 用于确保类是否实现了应有的方法
var Phone = new Interface('Phone', ['assemble','pack']);

    // phone工厂，对象的具体创建只要在这里进行就行
var phoneFactory = {

    createPhone: function(type) {
        var phone;
        switch(type) {
            case 'touchPhone':
                phone = new TouchPhone();
                break;
            default :
                phone = new PhysicalKeyPhone();
                break;
        }
        Interface.ensureImplements(phone, Phone);  // 这样可以确保添加的新类，拥有类需要用到的方法
        return phone;
    }

};


function PhoneShop() {}

PhoneShop.prototype = {
    sell: function(type) {
        return phoneFactory.createPhone(type);
    }
};


var phoneShop1 = new PhoneShop();
phoneShop1.sell('touchPhone');



/*
 * 2. 工厂模式
 * 优点：
 *   便于用于实例化的类不能在开发期间确定，只能在运行期间确定的情况
 * 缺点：
 *   只有在某些场合下，创建和维护工厂所带来的复杂性才物有所值：
 *      1. 动态实现：创建一些用不同方式实现同一接口的对象
 *      2. 节省设置开销：如果对象需要进行复杂的设置且彼此相关的设置
 *      3. 用许多小对象组成一个大对象：
 * */

function PhoneShop() {}

PhoneShop.prototype = {
    sell: function(brand) {
        return this.createPhone(type);
    },
    createPhone: function() {
        throw new Error('Unsupported operation on an abstract class.');
    }
};


var AppleShop = function(){};
extend(AppleShop, PhoneShop);

AppleShop.prototype.createPhone = function(type) {

    var phone;
    switch(type){
        case 'iPhone6s' :
            phone = new IPhone6s(); break;
        case 'iPhone6Plus' :
            phone = new IPhone6Plus(); break;
        default :
            phone = new IPhone6();
    }

    Interface(phone, Phone);
    return phone;

};



var appleShop = new PhoneShop();
appleShop.sell('iPhone6s');




/*===================================== Interface的模拟实现 =============== START =============================*/

// Constructor
/*
 * @param name String 接口的名字
 * @param methods Array 接口里面定义的方法
 */
var Interface = function(name, methods){
    //如果购造函数的参数不等于2个，那么抛出异常
    if (arguments.length != 2) {
        throw new Error("Interface constructor called with " + arguments.length +
            "arguments,but expected exactyl 2.")
    }
    this.name = name;
    this.methods = [];
    //方法数组，保证传进来的methods数组中，每一个元素都是字符串类型
    for (var i = 0, len = methods.length; i < len; i++) {
        if (typeof methods[i] !== "string") {
            throw new Error("Interface constructor expects methods names to bo " +
                "passed in asastring.");
        }
        this.methods.push(methods[i]);
    }
};

//Static class methods
Interface.ensureImplements = function(object){
    //如果参数少于2个，抛出异常，object是待判断实现接口的对象
    if (arguments.length < 2) {
        throw new Error("Function Interface.ensureImplements called with " + arguments.length +
            "arguments,but expected at least 2.");
    }
    for (var i = 1, len = arguments.length; i < len; i++) {
        //inter_face为接口，一定要实现Interface类
        //书中使用interface，因是JavaScript中保留字，所以暂替换为inter_face
        var inter_face = arguments[i];
        if (inter_face.constructor !== Interface) {
            throw new Error("Function Interface.ensureImplementsexpects arguments " +
                "two and above to be instances of Interface.");
        }
        for (var j = 0, methodsLen = inter_face.methods.length; j < methodsLen; j++) {
            //对象中是否含有接口中定义的方法
            var method = inter_face.methods[j];
            if (!object[method] || typeof object[method] !== 'function') {
                throw new Error("Function Interface.ensureImplements: object " +
                    "does not implements the " +
                    inter_face.name +
                    "interface.Method " +
                    method +
                    "was not found.");
            }
        }
    }
};

// ======>> 调用:

//定义接口Composite，实现add,remove,getChild三种方法
var Composite = new Interface('Composite',['add','remove','getChild']);
//定义接口FormItem,实现save方法
var FormItem = new Interface('FormItem',['save']);
//判断对象是否实现了上述两个接口
var object = new Class();
Interface.ensureImplements(object, Composite, FormItem);

/*----------------------------- Interface的模拟实现 --------------- END -------------------*/


