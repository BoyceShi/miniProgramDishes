import HttpRequestService from '../../utils/HttpRequestService.js'
import Dialog from '../../vant-weapp/dist/dialog/dialog';

Page({
    HttpRequestService: new HttpRequestService,
    data: {
        menuList: function() {
            return []
        },
        pageNo: 1,
        keyWord: '',
        isBottom: false,
        loading: false,
        showActionSheet: false,
        actions: [{
            name: '编辑'
        }, {
            name: '删除'
        }]
    },
    onShow: function(options) {
        this.setData({
            pageNo: 1
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
    },
    /**
     * 长按菜谱项
     */
    longpress(event) {
        let that = this;
        let id = event.currentTarget.dataset['id'];
        wx.showActionSheet({
            itemList: ['编辑', '删除'],
            success(res) {
                if (res.tapIndex === 0) {
                    //TODO
                    //编辑
                    wx.showToast({
                        title: "功能逐步完善中，敬请期待",
                        icon: 'none',
                        duration: 2000
                    })
                } else if (res.tapIndex === 1) {
                    Dialog.confirm({
                        title: '提示',
                        message: '是否要删除该菜谱'
                    }).then(() => {
                        that.HttpRequestService.deleteMenu(id, {
                            success: (data, msg) => {
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
                            },
                            complete: () => {
                                that.searchMenuList({
                                    success: (data, msg) => {
                                        that.setData({
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
                                        that.setData({
                                            loading: false
                                        })
                                    }
                                })
                            }
                        })
                    }).catch(() => {});
                }
            }
        })
    }
})