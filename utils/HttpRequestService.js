var HttpRequest = require('HttpRequestUtils.js');
import config from './config'

class HttpService {
    
    constructor() {
        this.$path = {
            code2Session: 'wx/code2Session',
            updateWxUserInfo:'wx/updateWxUserInfo'
        }
    }

    //code2Session
    code2Session(code, response) {
        HttpRequest.GET(this.$path.code2Session + "/" + config.appId + "/" + config.appSecret + "/" + code, null, response)
    }

    //user
    updateWxUserInfo(user, response){
        user.wxOpenId = getApp().globalData.openId
        HttpRequest.PUT(this.$path.updateWxUserInfo, user, response)
    }
}

export default HttpService