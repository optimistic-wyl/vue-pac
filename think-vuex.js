/**
 * Vuex使用
 * 
 * Vue.use(Vuex)
 * 
 * const store = new Vuex.Store({
 *  state: {
 *      counter: 0
 *  },
 *  mutations: {
 *      add(state, payload){
 *          state.counter += payload
 *      }
 *  },
 *  actions: {
 *      add({commit}) {
 *          setTimeout(() => {
 *              commit('add')
 *          }, 2000)
 *      }
 *  },
 *  getters: {
 *      doubleCounter(state) {
 *          return state.count * 2
 *      }
 *  }
 * })
 * 
 * 页面中使用：$store.state.XXX
 */


 let Vue

 class Store {
    constructor(ops) {
        // 将state变成响应式
        /* this.state = new Vue({
            data: ops.state
        }) */
        // 源码中会包装一下
        this._vm = new Vue({
            data: {
                $$state: ops.state
            }
        })

        this._mutations = ops.mutations
        this._actions = ops.actions

        // 执行dispatch报错，考虑this的指向问题
        this.commit = this.commit.bind(this)
        this.dispatch = this.dispatch.bind(this)

        this.getters = {}

        const gts = ops.getters
        const _that = this
        for(let item in gts) {
            Object.defineProperty(this.getters, item, {
                get(){
                    return gts[item](_that.state)
                },
                set() {
                    this.getters[item] = gts[item](_that.state)
                }
            })
        }  
    }

    get state() {
        return this._vm._data.$$state
    }

    set state(v) {
        console.error('please use replactState to reset state')
    }

    commit(type, payload) {
        const fn = this._mutations[type]
        if (!fn) {
            console.error('error')
        }

        fn(this.state, payload)
    }

    dispatch(type, payload) {
        const fn = this._actions[type]
        if (!fn) {
            console.error('error')
        }

        fn(this, payload)
    }
 }

 function install(_Vue) {
    Vue = _Vue
    Vue.mixin({
        beforeCreate(){
            if (this.$options.store) {
                // console.log(this.$options.store)
                Vue.prototype.$store = this.$options.store
            }
        }
    })
 }

 export default {Store, install}