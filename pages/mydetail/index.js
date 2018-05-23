//index.js
//获取应用实例
import API from '../../api/index.js'
const app = getApp()
Page({
  data: {
    detail: {}
  },
  getDetail: function (options) {
    API.searchTheLetter({ letterid: options.letterid }).then(res => {
      console.log(res);
      if (res.data.data.length > 0) {
        this.setData({
          detail: res.data.data[0]
        })
      }
    })
  },
  onLoad: function (options) {
    this.getDetail(options);
  }
})
