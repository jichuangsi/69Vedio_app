const getters = {
  /*go_data: state => state.go_data,
  go_index: state => state.go_index*/
  homeVideosList: state => state.latestVideos.homeVideosList,
  homeVideosPage: state => state.latestVideos.homeVideosPage,
  latestVideosList: state => state.latestVideos.latestVideosList,
  latestVideosPage: state => state.latestVideos.latestVideosPage,
  payVideosList: state => state.latestVideos.payVideosList,
  payVideosPage: state => state.latestVideos.payVideosPage,
  playVideosList: state => state.latestVideos.playVideosList,
  commentVideosPage: state => state.latestVideos.commentVideosPage,
  commentVideosList: state => state.latestVideos.commentVideosList,
  likeVideosPage: state => state.latestVideos.likeVideosPage,
  likeVideosList: state => state.latestVideos.likeVideosList,
  myVideosPage: state => state.latestVideos.myVideosPage,
  myVideosList: state => state.latestVideos.myVideosList,
  mylikeVideosPage: state => state.latestVideos.mylikeVideosPage,
  mylikeVideosList: state => state.latestVideos.mylikeVideosList,
  buyVideosPage: state => state.latestVideos.buyVideosPage,
  buyVideosList: state => state.latestVideos.buyVideosList,
  Popularity: state => state.latestVideos.Popularity,
}

export default getters;
