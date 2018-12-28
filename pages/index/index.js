import HttpRequestService from '../../utils/HttpRequestService.js'

Page({
    HttpRequestService: new HttpRequestService,
    /**
     * 页面的初始数据
     */
    data: {
        menuList: function() {
            return []
        },
        pageNo: 1,
        keyWord: '',
        isBottom: false,
        loading: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.searchMenuList({
            success: (data, msg) => {
                this.setData({
                    menuList: data,
                    loading: false
                })
            },
            fail: (code, msg) => {
                this.setData({
                    loading: false
                })
                wx.showToast({
                    title: msg,
                    icon: 'none',
                    duration: 2000
                })
            }
        })
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        this.setData({
            pageNo: 1,
            isBottom: false
        })
        this.searchMenuList({
            success: (data, msg) => {
                this.setData({
                    menuList: data,
                    loading: false
                })
                wx.stopPullDownRefresh();
            },
            fail: (code, msg) => {
                this.setData({
                    loading: false
                })
                wx.showToast({
                    title: msg,
                    icon: 'none',
                    duration: 2000
                })
                wx.stopPullDownRefresh();
            }
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        if (!this.data.isBottom) {
            this.setData({
                pageNo: ++this.data.pageNo
            })
            this.searchMenuList({
                success: (data, msg) => {
                    this.setData({
                        loading: false
                    })
                    if (data.length > 0) {
                        this.setData({
                            menuList: this.data.menuList.concat(data)
                        })
                    } else {
                        this.setData({
                            isBottom: true
                        })
                    }
                },
                fail: (code, msg) => {
                    this.setData({
                        loading: false
                    })
                    wx.showToast({
                        title: msg,
                        icon: 'none',
                        duration: 2000
                    })
                }
            })
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },

    /**
     * 搜索
     */
    onSearch: function(event) {
        this.setData({
            keyWord: event.detail,
            pageNo: 1,
            isBottom: false
        })
        this.searchMenuList({
            success: (data, msg) => {
                this.setData({
                    menuList: data,
                    loading: false
                })
            },
            fail: (code, msg) => {
                this.setData({
                    loading: false
                })
                wx.showToast({
                    title: msg,
                    icon: 'none',
                    duration: 2000
                })
            }
        });
    },

    /**
     * 初始化页面数据
     */
    searchMenuList(response) {
        this.setData({
            loading: true
        })
        this.HttpRequestService.getMenuList(this.data.pageNo, this.data.keyWord, response);
    }
})