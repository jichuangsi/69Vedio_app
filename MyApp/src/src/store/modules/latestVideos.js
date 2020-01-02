

const latestVideos = {
  state: {
    homeVideosList: [],
    homeVideosPage: 1,
    latestVideosList: [],
    latestVideosPage: 1,
    payVideosPage: 1,
    payVideosList: [],
    playVideosPage: 1,
    playVideosList: [],
    commentVideosPage: 1,
    commentVideosList: [],
    likeVideosPage: 1,
    likeVideosList: [],
  },
  mutations: {
    //官方
    SET_HOME_VIDEOS_LIST: (state, homeData) => {
      if(state.homeVideosList.length == 0){
        state.homeVideosList = homeData;
      }else{
        state.homeVideosList = state.homeVideosList.concat(homeData);
      }
    },
    RESET__HOME_VIDEOS_LIST: (state, newData) => {
      state.homeVideosList = newData;
    },
    SET_HOME_VIDEOS_PAGE: (state, homePage) =>{
      state.homeVideosPage = homePage;
    },
    //最新上传
    SET_LATEST_VIDEOS_LIST: (state, latestData) => {
      if(state.latestVideosList.length == 0){
        state.latestVideosList = latestData;
      }else{
        state.latestVideosList = state.latestVideosList.concat(latestData);
      }
    },
    RESET__LATEST_VIDEOS_LIST: (state, newData) => {
      state.latestVideosList = newData;
    },
    SET_LATEST_VIDEOS_PAGE: (state, latestPage) =>{
      state.latestVideosPage = latestPage;
    },
    //金币专区
    SET_PAY_VIDEOS_LIST: (state, payData) => {
      if(state.payVideosList.length == 0){
        state.payVideosList = payData;
      }else{
        state.payVideosList = state.payVideosList.concat(payData);
      }
    },
    RESET__PAY_VIDEOS_LIST: (state, newData) => {
      state.payVideosList = newData;
    },
    SET_PAY_VIDEOS_PAGE: (state, payPage) =>{
      state.payVideosPage = payPage;
    },
    //最多播放
    SET_PLAY_VIDEOS_LIST: (state, playData) => {
      if(state.playVideosList.length == 0){
        state.playVideosList = playData;
      }else{
        state.playVideosList = state.playVideosList.concat(playData);
      }
    },
    RESET__PLAY_VIDEOS_LIST: (state, newData) => {
      state.playVideosList = newData;
    },
    SET_PLAY_VIDEOS_PAGE: (state, playPage) =>{
      state.playVideosPage = playPage;
    },
    //最多评论
    SET_COMMENT_VIDEOS_LIST: (state, commentData) => {
      if(state.commentVideosList.length == 0){
        state.commentVideosList = commentData;
      }else{
        state.commentVideosList = state.commentVideosList.concat(commentData);
      }
    },
    RESET__COMMENT_VIDEOS_LIST: (state, newData) => {
      state.commentVideosList = newData;
    },
    SET_COMMENT_VIDEOS_PAGE: (state, commentPage) =>{
      state.commentVideosPage = commentPage;
    },
    //最多喜欢
    SET_LIKE_VIDEOS_LIST: (state, likeData) => {
      if(state.likeVideosList.length == 0){
        state.likeVideosList = likeData;
      }else{
        state.likeVideosList = state.likeVideosList.concat(likeData);
      }
    },
    RESET__LIKE_VIDEOS_LIST: (state, newData) => {
      state.likeVideosList = newData;
    },
    SET_LIKE_VIDEOS_PAGE: (state, likePage) =>{
      state.likeVideosPage = likePage;
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
