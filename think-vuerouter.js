/* 1、为什么new vue()创建vue实例时,选项中需要加入router

router作为插件，install方法被调用时，router的实例还没有被创建，所以在
install方法中利用Vue.mixin({})全局混入beforeCreate生命周期钩子，此时有机会
通过this.$options拿到router实例 */

let Vue;
class VueRouter{
    constructor(ops) {
        this.$ops = ops

        const initial = window.location.hash.slice(1) || '/'
        
        // ************将current变成响应式的************
        Vue.util.defineReactive(this, 'current', initial)

        window.addEventListener('hashchange', () => {
            this.current = window.location.hash.slice(1)
        })
    }
}

VueRouter.install = function(_Vue){
    Vue = _Vue
    Vue.mixin({
        beforeCreate() {
            if (this.$options.router) {
                Vue.prototype.$router = this.$options.router
            }
        }
    })

    // 2、注册实现两个组件router-link、router-view
    Vue.component('router-link', {
        props: {},
        render() {
            
        }
    })

    Vue.component('router-view', {
        render(){
            // 获取路由配置
            const routes = this.$router.$ops.routes
            // 获取当前路由(这个current要把它变成响应式的，current变化，这个render就重新执行)
            const cur = this.$router.current
            // 获取当前路由所对应的组件
            let component = null
            const route = routes.find((route) => {
                return route.path === cur
            })
            if (route) {
                component = route.component
            }
            return h(component)
        }
    })
}
