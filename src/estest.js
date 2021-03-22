// function* gen(x){
//     var y = yield x + 2;
//     console.log(y)
//     return y;
//   }

//   const it = gen(1)
//   const r = it.next()
//   console.log(r)
//   it.next(r.value)
let it, i = 0
const generator = () => {
    const generator = function* (name) {
        const x = yield Promise.resolve(name + 1)
        console.log(x)
        const y = yield Promise.resolve(name + 2)
        console.log(y)
        const m = yield Promise.resolve(name + 3)
        console.log(m)
        const n = yield Promise.resolve(name + 4)
        console.log(n)
    }
    let co = generator => {
        it = generator.next(i++).value
        console.log(it)
        if (it) {
            it.then(res => {
                co(generator)
            })
        } else {
            return
        }
    }
     co(generator('Co-Generator'))
}

generator()