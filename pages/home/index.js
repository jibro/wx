//index.js
//获取应用实例
import API from '../../api/index.js'
import util from '../../utils/util.js'
const app = getApp()
Page({
  data: {
    adata: {},
    showModal: false
  },
  getData: function () {
    API.getLetterOne().then(res => {
      if (res.data.success && res.data.data.length > 0) {
        this.setData({
          adata: res.data.data[0]
        })
      }
      console.log(res);
    })
  },
  onLoad: function () {
    this.getData();
  },
  //事件处理函数
  newItem: function() {
    wx.navigateTo({
      url: '../new/new'
    })
  },
  mylist: function () {
    wx.navigateTo({
      url: '../mylist/index'
    })
  },
  changeItem: function () {
    this.getData();
  },
  replyItem: function () {
    this.setData({
      showModal: true
    })
  },
  hideModal: function () {
    this.setData({
      showModal: false
    })
  },
  replySubmit: function (e) {
    console.log(e.detail.value)
    let formdata = e.detail.value;
    if (!formdata.replycontent || !formdata.replysignname) {
      util.toast('不可以为空哦');
      return;
    }
    API.updateLetterOne({
      replycontent: formdata.replycontent,
      replysignname: formdata.replysignname,
      letterid: this.data.adata.letterid
    }).then(res => {
      console.log(res);
      if (res.data.success) {
        this.hideModal();
        this.getData();
      }
    })
  }
})
