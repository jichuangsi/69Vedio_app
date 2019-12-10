import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)

const state = { 
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
}

const getters = {
 go_data: state => state.go_data,
 go_index: state => state.go_index
}

export default new Vuex.Store({

 state,

 mutations,

 getters

})
