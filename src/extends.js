function Parent(name){
    this.pname = name
}

Parent.prototype.a = 'paaaaa'

// 方式一
function Child(){
    // this.name = 'cc1'
}

// Child.prototype = {pname: name}
// Child.prototype.__proto__ = Parent.prototype
Child.prototype = new Parent('child')
console.log((new Child()).pname)

// 方式二
function Child2(name){
    Parent.call(this, name)
}

// 方式三
function Child3(name){
    Parent.call(this, name)
}
Child3.prototype = new Parent()

// 方式四 为什么叫原型方式
function factory(obj){
    function F(){}
    F.prototype = obj
    return new F()
}

// child4是一个F的实例对象，原型为F.prototype, 其被设置为Parent实例
var child4 = factory(new Parent("child4444"))

console.log(child4.pname)
console.log('child4', child4.a)

// 方式5 寄生式继承
function factory(obj){
    function F(){}
    F.prototype = obj
    return new F()
}

function subObject(obj) {
    var sub = factory(obj)
    sub.name = 'gar'
    return sub
}

var child5 = subObject(new Parent('child55555'))

// 方式六 寄生组合式继承
function factory(obj){
    function F(){}
    F.prototype = obj
    return new F()
}

function Sub(){
    person.call(this)
}

Sub.prototype = factory(Parent.prototype)
Sub.prototype.constructor = Sub
console.log(Sub.constructor, Sub.prototype.constructor)










