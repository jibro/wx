const baseURL = "https://raincoming.applinzi.com";
const fetch = function (url, method, data){
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${baseURL + url}`,
      method: method,
      data: data,
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "wxtoken": wx.getStorageSync('wxtoken') || null
      },
      success: (res) => {
        resolve(res);
        if (res.data.status === 401) {
          wx.navigateTo({
            url: '../index/index'
          })
        } else if (res.data.status === 403) {
          wx.showModal({
            title: '提示',
            content: '需重新授权登录',
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../index/index'
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          });
        }
      },
      error: (error) => {
        reject(error);
      }
    })
  })
}
export default {
  saveUserInfo(params) {
    return fetch('/api/user/saveUserInfo', 'post', params)
  },
  getUserInfo(params) {
    return fetch('/api/user/getUserInfo', 'post', params)
  },
  addNewLetter(params) {
    return fetch('/api/letter/addNewLetter', 'post', params)
  },
  getLetterList(params) {
    return fetch('/api/letter/letterList', 'get', params)
  },
  getLetterOne(params) {
    return fetch('/api/letter/letterOne', 'get', params)
  },
  updateLetterOne(params) {
    return fetch('/api/letter/updateLetterOne', 'post', params)
  },
  searchTheLetter(params) {
    return fetch('/api/letter/searchTheLetter', 'post', params)
  }
}