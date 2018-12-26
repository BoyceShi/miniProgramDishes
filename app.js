import HttpRequestService from './utils/HttpRequestService.js'

App({
    HttpRequestService: new HttpRequestService,
    onLaunch: function() {
        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                this.HttpRequestService.code2Session(res.code, {
                    success: (data, msg) => {
                        if (data.token) {
                            this.globalData.token = data.token
                        }
                        this.globalData.openId = data.openId
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
    },
    globalData: {
        token: null,
        openId: null
    }
})