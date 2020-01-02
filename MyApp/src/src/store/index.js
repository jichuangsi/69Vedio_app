import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import latestVideos from './modules/latestVideos';

Vue.use(Vuex)

/*const state = {
    go_data: [],
    go_index: 0
}


const mutations = {
    set_data(state,val){
        state.go_data = val
    },
    set_index(state,val){
        state.go_index = val
    }
}*/

export default new Vuex.Store({

 /*state,

 mutations,*/

 modules:{
   latestVideos,
 },
 getters
})
