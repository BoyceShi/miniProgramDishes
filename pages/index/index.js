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
        isBottom: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
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
            }
        })
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        this.data.pageNo = 1;
        this.data.isBottom = false;
        this.searchMenuList({
            success: (data, msg) => {
                this.setData({
                    menuList: data
                })
                wx.stopPullDownRefresh()
            },
            fail: (code, msg) => {
                wx.showToast({
                    title: msg,
                    icon: 'none',
                    duration: 2000
                })
                wx.stopPullDownRefresh()
            }
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        if (!this.data.isBottom) {
            this.data.pageNo++;
            this.searchMenuList({
                success: (data, msg) => {
                    if (data.length > 0) {
                        this.setData({
                            menuList: this.data.menuList.concat(data)
                        })
                    } else {
                        this.data.isBottom = true;
                    }
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
        this.data.keyWord = event.detail;
        this.data.pageNo = 1;
        this.data.isBottom = false;
        this.searchMenuList({
            success: (data, msg) => {
                this.setData({
                    menuList: data
                })
                wx.stopPullDownRefresh()
            },
            fail: (code, msg) => {
                wx.showToast({
                    title: msg,
                    icon: 'none',
                    duration: 2000
                })
                wx.stopPullDownRefresh()
            }
        });
    },

    onCancel(event) {
        this.data.keyWord = '';
    },

    /**
     * 初始化页面数据
     */
    searchMenuList(response) {
        this.HttpRequestService.getMenuList(this.data.pageNo, this.data.keyWord, response);
    }
})