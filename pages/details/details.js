//details.js
Page({
  data: {
    newsDetail: null, // 新闻详情
  },
  // 页面加载监听函数
  onLoad(options) {
    if (options) {
      this.getNewsDetail(options.id);
    }
  },
  // 获取新闻详情
  getNewsDetail(id) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: id
      },
      success: res => {
        // console.log(res.data)
        if (res.data.code === 200) {
          let newsDetail = res.data.result;
          newsDetail.date = newsDetail.date.substring(0, 10) + ' ' + newsDetail.date.substring(11, 16); // 处理新闻发布日期
          this.setData({
            newsDetail
          })
        }
      },
      fail: err => {
        console.log(err)
        wx.showToast({
          title: '请求失败',
          icon: 'loading'
        })
      }
    })
  }
})