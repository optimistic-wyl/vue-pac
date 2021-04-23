function test (){
    this.a = 'a'
    /* return {
        a: 'a88888s'
    } */
}

test.prototype.b = 'b'

const t = new test()

console.log(t)
