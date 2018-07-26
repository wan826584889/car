import Vue from 'vue';
import Vuex from 'vuex';


import index from './modeules/index';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        car: index
    }
})