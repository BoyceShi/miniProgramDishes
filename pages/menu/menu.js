import HttpRequestService from '../../utils/HttpRequestService.js'
import Dialog from '../../vant-weapp/dist/dialog/dialog';
Page({
    HttpRequestService: new HttpRequestService,
    data: {
        menu: {}
    },

    onLoad: function(options) {
        this.fetchMenu(options.id);
    },

    /**
     * 开始烹饪
     */
    startCook(event) {
        let that = this;
        Dialog.confirm({
            title: '提示',
            message: '是否确认开始烹饪'
        }).then(() => {
            that.HttpRequestService.cook(that.data.menu.id, {
                success: (data, msg) => {
                    this.fetchMenu(that.data.menu.id)
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
        }).catch(() => {});
    },

    /**
     * 拉取菜谱数据
     */
    fetchMenu(id) {
        this.HttpRequestService.getMenu(id, {
            success: (data, msg) => {
                this.setData({
                    menu: data
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