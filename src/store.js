import Vue from "vue";
import CustomVuex from "../think-vuex"
Vue.use(CustomVuex);
//导出⼯⼚函数
export function createStore() {
    return new CustomVuex.Store({
        state: {
            counter: 0
        },
        mutations: {
            add(state, payload){
               state.counter += payload
            }
        },
        actions: {
            add({commit}) {
                setTimeout(() => {
                    commit('add')
                }, 2000)
            }
        },
        getters: {
            doubleCounter(state) {
                return state.counter * 2
            }
        }
    })
}