//logs.js
import API from '../../api/index.js'
import util from '../../utils/util.js'
Page({
  data: {
    address: null,
    btnDisabled: false
  },
  formSubmit: function (e) {
    console.log(e.detail.value)
    let formdata = e.detail.value;
    if (!formdata.letter_content || !formdata.letter_signname) {
      util.toast('不可以为空哦');
      return;
    }
    if (!this.btnDisabled) {
      this.setData({
        btnDisabled: true
      })
      API.addNewLetter({
        lettercontent: formdata.letter_content,
        signname: formdata.letter_signname
      }).then(res => {
        console.log(res);
        this.setData({
          btnDisabled: false
        })
        if (res.data.success) {
          wx.navigateTo({
            url: '../mylist/index'
          })
        }
      })
    }
  }
})
