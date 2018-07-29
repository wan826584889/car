import Vue from 'vue';
import VueRouter from 'vue-router';
import Detail from '../components/Detail.vue'
import Img from '../components/Img.vue';
import Main from '../components/Main.vue';
import Color from '../components/Color.vue';
import Type from '../components/Type.vue';
const routes = [{
    path: '/',
    component: Main
}, {
    path: '/detail',
    component: Detail
}, {
    path: '/img',
    component: Img
}, {
    path: '/color',
    component: Color
}, {
    path: '/type',
    component: Type
}]

Vue.use(VueRouter);
export default new VueRouter({
    routes
})