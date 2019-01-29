import HttpRequestService from '../../utils/HttpRequestService.js'

Page({
    HttpRequestService: new HttpRequestService,
    data: {
        menuList: function() {
            return []
        },
        pageNo: 1,
        keyWord: '',
        isBottom: false,
        loading: false
    },
    onLoad: function(options) {
        this.searchMenuList({
            success: (data, msg) => {
                this.setData({
                    menuList: data
                })
            },
            fail: (code, msg) => {
                wx.showToast({
                    title: msg,
                    icon: 'none',
                    duration: 2000
                })
            },
            complete: () => {
                this.setData({
                    loading: false
                })
            }
        })
    },
    onPullDownRefresh: function() {
        this.setData({
            pageNo: 1,
            isBottom: false
        })
        this.searchMenuList({
            success: (data, msg) => {
                this.setData({
                    menuList: data
                })
                wx.stopPullDownRefresh();
            },
            fail: (code, msg) => {
                wx.showToast({
                    title: msg,
                    icon: 'none',
                    duration: 2000
                })
                wx.stopPullDownRefresh();
            },
            complete: () => {
                this.setData({
                    loading: false
                })
            }
        })
    },
    onReachBottom: function() {
        if (!this.data.isBottom) {
            this.setData({
                pageNo: ++this.data.pageNo
            })
            this.searchMenuList({
                success: (data, msg) => {
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
                    wx.showToast({
                        title: msg,
                        icon: 'none',
                        duration: 2000
                    })
                },
                complete: () => {
                    this.setData({
                        loading: false
                    })
                }
            })
        }
    },
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
                    menuList: data
                })
            },
            fail: (code, msg) => {
                wx.showToast({
                    title: msg,
                    icon: 'none',
                    duration: 2000
                })
            },
            complete: () => {
                this.setData({
                    loading: false
                })
            }
        });
    },

    /**
     * 菜谱查询
     */
    searchMenuList(response) {
        this.setData({
            loading: true
        })
        this.HttpRequestService.getMenuList(this.data.pageNo, this.data.keyWord, response);
    },
    /**
     * 新增菜谱
     */
    addMenu() {
        wx.navigateTo({
            url: "/pages/menu/menuAdd/menuAdd"
        })
    }
})