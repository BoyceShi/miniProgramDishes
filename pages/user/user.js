import HttpRequestService from '../../utils/HttpRequestService.js'

Page({
    HttpRequestService: new HttpRequestService,
    data: {
        userInfo: {},
        showSexPopup: false,
        sexColums: ["未知", "男", "女"]
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
    onShow: function() {
        this.setData({
            userInfo: wx.getStorageSync('userInfo')
        })
    },
    /**
     * 显示性别选择弹层
     */
    showSexPopup(event) {
        this.setData({
            showSexPopup: true
        })
    },
    /**
     * 性别选择Picker取消
     */
    cancelSexPick(picker) {
        this.closeSexPopup()
    },
    /**
     * 性别选择Picker确认
     */
    sexPick(picker) {

    },
    /**
     * 点击蒙层
     */
    closeSexPopup() {
        this.setData({
            showSexPopup: false
        })
    }
})