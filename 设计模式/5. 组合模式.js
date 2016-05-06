/**
 * Created by zhanglicong on 16/5/6.
 */
/******************** composite ***********************
 *
 *   1. 可以用同样的方法处理对象的集合与其中的子对象。有助于弱化各个对象之间的耦合
 *   2. 可以用来把一批子对象组织成树形结构，并且使整棵树都可遍历
 *   3. 特别适合于动态的HTML界面
 *
 *  只有同时具备如下两个条件才适合使用组合模式：
 *    1. 存在一批组织成某种体系的对象
 *    2. 希望对这批对象或其中的一部分对象实施一个操作
 *
 *                **
 *           *  组合对象 *
 *                **
 *            /         \
 *
 *          **          叶子对象
 *   **  组合对象 **
 *          **
 *      ／       \
 *   叶子对象    叶子对象
 *
 * ************************************************/

/*
 * 1. 最简单的单体模式
 * 优点：
 *   不必编写大量手工遍历数组或其它数据结构的粘合代码，只需对最顶层的对象执行操作，子对象会自动传递。
 *   使用组合模式组织起来的对象形成了一个出色的体系。
 * 缺点：
 *   对象调用的任何操作都会被传递到子对象，层次体系很大的话，系统的性能将会受到影响。
 *
 *   单体可以被修改
 * */

var Composite = new Interface('Composite', ['add', 'remove', 'getChild']);
var GalleryItem = new Interface('GalleryItem', ['hide', 'show']);

var DynamicGallery = function(id) {

    this.children = [];

    this.element = document.createElement('div');
    this.element.id = id;
    this.element.className = 'dynamic-gallery';

};

DynamicGallery.prototype = {
    constructor: DynamicGallery,

    // 组合对象类接口
    add: function(child) {
        Interface.ensureImplements('child', Composite, GalleryItem);
        this.children.push(child);
        this.element.appendChild(child.getElement());
    },
    remove: function(child) {
        for(var node, i = 0; node = this.getChild(i); i++){
            if(node = child){
                this.children.splice(i, 1);
                break;
            }
        }
        this.element.removeChild(child.getElement());
    },
    getChild: function(i) {
        return this.children[i];
    },

    // 叶子对象应该继承的接口
    hide: function() {
        for(var node, i = 0; node = this.getChild(i); i++){
            node.hide();
        }
        this.element.style.display = 'none';
    },
    show: function() {
        this.element.style.display = 'block';
        for(var node, i = 0; node = this.getChild(i); i++){
            node.show();
        }
    },
    // helper方法
    getElement: function() {
        return this.element;
    }

};

var GalleryImage = function(src) {
    this.element = document.createElement('img');
    this.element.className = 'gallery-image';
    this.element.src = src;
};

GalleryImage.prototype = {

    add: function() {},
    remove: function() {},
    getChild: function() {},

    hide: function() {
        this.element.style.display = 'none';
    },
    show: function () {
        this.element.style.display = ''; // 重置属性为默认属性
    },

    // helper方法
    getElement: function() {
        return this.element;
    }

};


// 使用示例：
var topGallery  = new DynamicGallery('top-gallery');
topGallery.add(new GalleryImage('/img/image1.jpg'));
topGallery.add(new GalleryImage('/img/image2.jpg'));
topGallery.add(new GalleryImage('/img/image3.jpg'));

var vacationPhotos = new DynamicGallery('vacation-photos');
for(var i = 0; i<30; i++){
    vacationPhotos.add(new GalleryImage('/img/image'+ i +'.jpg'));
}

topGallery.add(vacationPhotos);
topGallery.show();
vacationPhotos.hide();




