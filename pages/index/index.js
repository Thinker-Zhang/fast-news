//index.js
Page({
  data: {
    navbar: [{
      type: 'gn',
      name: '国内'
    }, {
      type: 'gj',
      name: '国际'
    }, {
      type: 'cj',
      name: '财经'
    }, {
      type: 'yl',
      name: '娱乐'
    }, {
      type: 'js',
      name: '军事'
    }, {
      type: 'ty',
      name: '体育'
    }, {
      type: 'other',
      name: '其他'
    }], // 新闻分类
    currentTab: 0, // 当前分类
    newsList: [], // 新闻列表
    hotNews: null, // 热门新闻
  },
  // 页面加载监听函数
  onLoad() {
    // 获取默认新闻列表（国内）
    this.getNewsList('gn');
  },
  // 下拉刷新
  onPullDownRefresh() {
    let navbar = this.data.navbar,
      idx = this.data.currentTab;
    // 重新获取当前新闻列表
    this.getNewsList(navbar[idx].type, () => {
      wx.stopPullDownRefresh();
    });
  },
  // 切换导航栏
  navbarTap(e) {
    let navbar = this.data.navbar,
      idx = e.currentTarget.dataset.idx;
    // 获取当前新闻列表
    this.getNewsList(navbar[idx].type);
    this.setData({
      currentTab: idx
    })
  },
  // 进入新闻详情页
  ToNewsDetail(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../details/details?id=' + id,
    })
  },
  // 根据新闻分类获取列表
  getNewsList(type, callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: type
      },
      success: res => {
        // console.log(res.data)
        if (res.data.code === 200) {
          let newsList = res.data.result;
          newsList.forEach(item => {
            item.date = item.date.substring(0, 10) + ' ' + item.date.substring(11, 16); // 处理新闻发布日期
          })
          let hotNews = newsList.shift();
          this.setData({
            newsList,
            hotNews
          })
        }
      },
      fail: err => {
        console.log(err)
        wx.showToast({
          title: '请求失败',
          icon: 'loading'
        })
      },
      complete: () => {
        typeof callback === 'function' && callback(); // 回调函数
      }
    })
  }
})