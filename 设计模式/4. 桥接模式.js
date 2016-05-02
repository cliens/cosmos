/**
 * Created by zhanglicong on 16/5/2.
 */

/******************** bridge ***********************
 *
 *   1. 该模式最容易付诸实施
 *   2. 将抽象与实现隔离开来，以便二者独立变化
 *
 * ************************************************/


/*
 * 1. 事件驱动接口桥接例子
 * 优点：
 *   不和事件对象绑定在一起，扩大API的适用范围；
 *   单元测试运行这个API也只需要传个ID和回调函数就可以了
 * */

// elem.addEventListener('click', getPictureByIdBridge);

function getPictureById(id, callback) {
    $.get('/picture?id=' + id, function(res) {
        callback(res.picture);
    })
}

function getPictureByIdBridge(e) {
    getPictureById(this.id, function(picture) {
        console.log(picture);
    })
}


/*
 * 2. 对象桥接例子
 * 桥接模式的思想原则就是不要烂用继承，继承是编译即定的他无法改变父的实现
 * 场景描述：
 *      我们的教学，教学可在普通教室进行，也可以在多媒体教室进行；教学的内容有英语，语文，物理，数学等; 当然说，普通教室是什么都
 *  可以教的，多媒体教室也是什么课程都可以用的，而且使用起来，效果更好，学生更喜欢；在这里，用哪个地方上课，是种方式，而上什么课是
 *  内容；方式下有怎么完成一堂课的实现；如果只是采用继承的方式，那么每个内容都得自己实现，这样会产生很多重复的代码；这时我们可以采
 *  用桥接的模式，对方式跟内容进行各自的实现；之后方式再与实现使用”聚合方式“关联起来；
 * */

function Course() {}

Course.prototype = {
    chinese: function () {
        return '语文';
    },
    english: function () {
        return '英文';
    },
    physics: function () {
        return '物理';
    }
};

function Ordinary(course) {
    this.course = course;
    this.where = '普通教室';
}

Ordinary.prototype = {
    chinese: function() {
        console.log('在 ' + this.where + '上' + this.course.chinese());
    },
    english: function() {
        console.log('在 ' + this.where + '上' + this.course.english());
    },
    physics: function() {
        console.log('在 ' + this.where + '上' + this.course.physics());
    }
};

function Multimedia(course) {
    this.course = course;
    this.where = '多媒体教室';
}

Multimedia.prototype = {
    chinese: function() {
        console.log('在 ' + this.where + '上' + this.course.chinese());
        console.log('唐诗宋词朗诵……');
    },
    english: function() {
        console.log('在 ' + this.where + '上' + this.course.english());
        console.log('请戴好耳机认真听……')
    },
    physics: function() {
        console.log('在' + this.where + '上' + this.course.physics());
        console.log('正在进行物理实验……');
    }
};



// ===================> 使用: >>
var course = new Course();

// 普通教室
var classroom = new Ordinary(course);
classroom.chinese();

// 多媒体教室
classroom = new Multimedia(course);
classroom.chinese();


