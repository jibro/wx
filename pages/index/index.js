//index.js
//获取应用实例
import API from '../../api/index.js'
const app = getApp()

Page({
  data: {
    loginCode: ''
  },
  setPlain: function (e) {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.loginCode = res.code;
        this.getUserInfo(e);
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    let params = {
      js_code: this.loginCode,
      rawData: e.detail.rawData,
      signature: e.detail.signature,
      encryptedData: e.detail.encryptedData,
      iv: e.detail.iv
    };
    API.saveUserInfo(params).then(res => {
      console.log(res)
      if (res.data.data.wxtoken) {
        wx.setStorageSync('wxtoken', res.data.data.wxtoken);
        wx.navigateTo({
          url: '../home/index'
        })
      }
    })
  }
})
