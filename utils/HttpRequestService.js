var HttpRequest = require('HttpRequestUtils.js');
import config from './config'

class HttpService {

    constructor() {
        this.$path = {
            code2Session: 'wx/code2Session',
            updateWxUserInfo: 'wx/updateWxUserInfo',
            getMenuList: 'menu',
            getUser: 'user/get',
            updateNickName: 'user/updateNickName',
            updateGender: 'user/updateGender',
            updateBirthday: 'user/updateBirthday',
            updatePersonalSignature: 'user/updatePersonalSignature',
            getIngredients: '/ingredients'
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
        HttpRequest.GET(this.$path.getMenuList + "?pageNo=" + pageNo + "&keyWord=" + keyWord, null, response)
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
    //获取食材列表
    getIngredients(pageNo, keyWord, response) {
        HttpRequest.GET(this.$path.getIngredients + "?pageNo=" + pageNo + "&keyWord=" + keyWord, null, response)
    }
}

export default HttpService