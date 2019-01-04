import HttpRequestService from '../../utils/HttpRequestService.js'

Page({
  HttpRequestService: new HttpRequestService,

  /**
   * 页面的初始数据
   */
  data: {
    personalSignature: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      personalSignature: wx.getStorageSync('userInfo').personalSignature
    })
  },

  /**
   * 更新用户昵称
   */
  updatePersonalSignature(value) {
    let personalSignature = value.detail;
    this.HttpRequestService.updatePersonalSignature(personalSignature, {
      success: (data, msg) => {
        let userInfo = wx.getStorageSync('userInfo')
        userInfo.personalSignature = personalSignature
        wx.setStorageSync("userInfo", userInfo)
        wx.showToast({
          title: msg,
          icon: 'none',
          duration: 2000
        })
      },
      fail: (code, msg) => {
        wx.showToast({
          title: msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
})