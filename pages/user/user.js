import HttpRequestService from '../../utils/HttpRequestService.js'
const DateFormat = require('../../utils/DateFormat.js')

Page({
    HttpRequestService: new HttpRequestService,
    data: {
        userInfo: {},
        minDate: new Date('1900-1-1').getTime(),
        maxDate: new Date().getTime(),
        showSexPopup: false,
        showBirthdayPopup: false,
        sexColums: ['未知', '男', '女'],
        birthdayDate: new Date().getTime(),
        birthdayStr: '',
        genderChinese: ''
    },

    /**
     * 页面加载时获取用户信息存至Storage
     */
    onLoad: function() {
        if (!wx.getStorageSync('userInfo')) {
            this.HttpRequestService.getUser({
                success: (data, msg) => {
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
        } else {
            this.setData({
                userInfo: wx.getStorageSync('userInfo')
            })
        }
    },
    /**
     * 界面渲染完毕设置性别选择器指针
     */
    onShow() {
        //设置性别
        this.setGender(this.data.gender)
        //设置生日
        this.setBirthday(this.data.birthday)
        this.setGenderPickerCursor(this.data.gender)
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
    sexPick(event) {
        const {
            index
        } = event.detail
        this.HttpRequestService.updateGender(index, {
            success: (data, msg) => {
                wx.showToast({
                    title: msg,
                    icon: 'none',
                    duration: 2000
                })
                let key = 'userInfo.gender'
                this.setData({
                    [key]: index
                })
                wx.setStorageSync('userInfo', this.data.userInfo)
                this.closeSexPopup()
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
     * 关闭性别选择器
     */
    closeSexPopup() {
        this.setGenderPickerCursor(this.data.gender)
        this.setData({
            showSexPopup: false
        })
    },
    /**
     * 生日选择器弹层
     */
    showBirthdayPopup(event) {
        this.setData({
            showBirthdayPopup: true
        })
    },
    /**
     * 生日选择Picker取消
     */
    cancelBirthdayPick(pirker) {
        this.closeBirthdayPopup()
    },
    /**
     * 选择生日
     */
    brithdayPick(event) {
        let birthday = new Date(event.detail)
        this.HttpRequestService.updateBirthday(birthday, {
            success: (data, msg) => {
                wx.showToast({
                    title: msg,
                    icon: 'none',
                    duration: 2000
                })
                let birthdayKey = 'userInfo.birthday'
                this.setData({
                    [birthdayKey]: birthday
                })
                this.closeBirthdayPopup()
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
     * 关闭生日选择器
     */
    closeBirthdayPopup() {
        this.setBirthday(wx.getStorageSync('userInfo').birthday)
        this.setData({
            showBirthdayPopup: false
        })
    },
    /**
     * 设置中文性别
     */
    setGender(gender) {
        let genderChinese
        switch (gender) {
            case 0:
                genderChinese = "未知";
                break;
            case 1:
                genderChinese = "男";
                break;
            case 2:
                genderChinese = "女";
                break;
            default:
                genderChinese = "未知";
                break;
        }
        this.setData({
            genderChinese: genderChinese
        })
    },
    /**
     * 设置性别选择器指针
     */
    setGenderPickerCursor(gender) {
        let sexPicker = this.selectComponent("#sexPicker")
        sexPicker.setColumnIndex(0, gender)
    },
    /**
     * 设置生日
     */
    setBirthday(birthday) {
        this.setData({
            birthdayDate: new Date(birthday).getTime(),
            birthdayStr: DateFormat.formatTime(new Date(birthday), DateFormat.type.DATE)
        })
    }
})