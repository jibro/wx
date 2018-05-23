//index.js
//获取应用实例
import API from '../../api/index.js'
const app = getApp()
Page({
  data: {
    datalist: {},
    showModal: false
  },
  getData: function () {
    API.getLetterList().then(res => {
      if (res.data.success) {
        this.setData({
          datalist: res.data.data
        })
      }
      console.log(res);
    })
  },
  onLoad: function () {
    this.getData();
  },
  godetail: function (e) {
    if (e.currentTarget.dataset.replyuserid) {
      wx.navigateTo({
        url: `../mydetail/index?letterid=${e.currentTarget
  .dataset.letterid}`
      })
    }
  }
})
