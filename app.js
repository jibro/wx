//app.js
App({
  onLaunch: function () {
    wx.checkSession({
      success: function () {
          //session 未过期，并且在本生命周期一直有效
        },
        fail: function () {
          //登录态过期
          wx.navigateTo({
            url: '../index/index'
          })
        }
    })
  }
})