import HttpRequestService from '../../utils/HttpRequestService.js'

Page({
    HttpRequestService: new HttpRequestService,
    data: {
        userInfo: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function() {
        this.HttpRequestService.getUser({
            success: (data, msg) => {
                switch (data.gender) {
                    case 0:
                        data.genderChinese = "未知";
                        break;
                    case 1:
                        data.genderChinese = "男";
                        break;
                    case 2:
                        data.genderChinese = "女";
                        break;
                }
                wx.setStorageSync('userInfo', data)
                this.setData({
                    userInfo: data
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
    },

 /**
     * 生命周期函数--监听页面显示
     */
    onShow:function(){
        this.setData({
            userInfo: wx.getStorageSync('userInfo')
        })
    }
})