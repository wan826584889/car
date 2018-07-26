import Vue from 'vue'
import { Lazyload } from 'mint-ui'
import Main from './components/App.vue'
import router from './router/index'
import store from './store/index'
Vue.use(Lazyload)
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(Main)
})