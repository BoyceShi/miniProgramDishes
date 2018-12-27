var HttpRequest = require('HttpRequestUtils.js');
import config from './config'

class HttpService {

    constructor() {
        this.$path = {
            code2Session: 'wx/code2Session',
            updateWxUserInfo: 'wx/updateWxUserInfo',
            getMenuList: '/menu'
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
}

export default HttpService