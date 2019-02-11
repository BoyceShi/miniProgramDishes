var HttpRequest = require('HttpRequestUtils.js');
import config from './config'

class HttpService {
    constructor() {
        this.$path = {
            code2Session: 'wx/code2Session',
            updateWxUserInfo: 'wx/updateWxUserInfo',
            menu: 'menu',
            cook: 'menu/cook',
            getUser: 'user/get',
            updateNickName: 'user/updateNickName',
            updateGender: 'user/updateGender',
            updateBirthday: 'user/updateBirthday',
            updatePersonalSignature: 'user/updatePersonalSignature',
            getOssImg: 'getOssImg'
        }
    }

    //code2Session
    code2Session(code, response) {
        HttpRequest.GET(this.$path.code2Session + "/" + config.appId + "/" + config.appSecret + "/" + code, null, response)
    }

    //更新用户信息
    updateWxUserInfo(user, response) {
        user.wxOpenId = getApp().globalData.openId
        HttpRequest.PUT(this.$path.updateWxUserInfo, user, response)
    }

    //获取菜谱列表
    getMenuList(pageNo, keyWord, response) {
        HttpRequest.GET(this.$path.menu + "?pageNo=" + pageNo + "&keyWord=" + keyWord, null, response)
    }

    //获取用户信息
    getUser(response) {
        HttpRequest.GET(this.$path.getUser + '/' + getApp().globalData.openId, null, response)
    }

    //更新用户昵称
    updateNickName(nickName, response) {
        HttpRequest.PUT(this.$path.updateNickName + '/' + nickName, null, response)
    }

    //更新用户性别
    updateGender(gender, response) {
        HttpRequest.PUT(this.$path.updateGender + '/' + gender, null, response)
    }

    //更新用户生日
    updateBirthday(birthday, response) {
        HttpRequest.PUT(this.$path.updateBirthday + '/' + birthday, null, response)
    }

    //更新用户个性签名
    updatePersonalSignature(personalSignature, response) {
        HttpRequest.PUT(this.$path.updatePersonalSignature, personalSignature, response)
    }

    //获取菜谱详情
    getMenu(id, response) {
        HttpRequest.GET(this.$path.menu + '/' + id, null, response)
    }

    //保存菜谱
    saveMenu(menu, response) {
        HttpRequest.POST(this.$path.menu, menu, response)
    }

    //删除菜谱
    deleteMenu(id, response) {
        HttpRequest.DELETE(this.$path.menu + '/' + id, null, response)
    }

    //开始烹饪
    cook(id, response) {
        HttpRequest.POST(this.$path.cook + '/' + id, null, response)
    }

    //获取oss图片路径
    getOssImg(fileName, response) {
        HttpRequest.GET(this.$path.getOssImg + "/" + fileName, null, response)
    }
}

export default HttpService