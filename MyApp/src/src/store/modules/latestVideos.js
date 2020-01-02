

const latestVideos = {
  state: {
    latestVideosList: [],
    latestVideosPage: 1,
  },
  mutations: {
    SET_LATEST_VIDEOS_LIST: (state, latestData) => {
      //console.log(state.latestVideosList);
      if(state.latestVideosList.length == 0){
        state.latestVideosList = latestData;
      }else{
        state.latestVideosList = state.latestVideosList.concat(latestData);
      }
      //console.log(state.latestVideosList);
    },
    RESET__LATEST_VIDEOS_LIST: (state, newData) => {
      state.latestVideosList = newData;
    },
    SET_LATEST_VIDEOS_PAGE: (state, latestPage) =>{
      state.latestVideosPage = latestPage;
    }
  },
  actions: {
    /*getClassList({commit}) {
      return new Promise((resolve, reject) => {
        getList()
          .then(function (res) {
            commit('SET_TODAY', res.data.data);
            resolve()
          })
          .catch(function (error) {
            reject(error);
          })
      })
    }*/
  }
};

// 暴露出去
export default latestVideos;
