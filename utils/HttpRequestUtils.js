import config from './config'

var params = {}

var response = {
    start: function() {
        // start
    },
    success: function(data, msg) {
        // success
    },
    fail: function(code, msg) {
        // fail
    },
    complete: function() {
        // complete
    },
}

//GET请求
function GET(path, params, response) {
    request('GET', path, params, "FORM", response)
}

//POST请求
function POST(path, params, response) {
    request('POST', path, params, "JSON", response)
}

//PUT请求
function PUT(path, params, response) {
    request('PUT', path, params, "JSON", response)
}

//DELETE请求
function DELETE(path, params, response) {
    request('DELETE', path, params, "FORM", response)
}

/**
 * 跳转欢迎页
 */
function toStartPage(){
    wx.reLaunch({
        url: '/pages/index/index'
    })
}

function request(method, path, params, contentType, response) {
    // 请求开始(捕获不重写方法异常)
    try {
        response.start()
    } catch (e) {}

    var header = {
        'content-type': contentType == 'JSON' ? 'application/json' : 'application/x-www-form-urlencoded'
    }
    let nowToken = getApp().globalData.token
    if (nowToken != null && nowToken.length > 0) {
        header.token = nowToken
    }

    wx.request({
        url: config.basePath + path,
        data: params,
        method: method,
        // 设置请求的 header
        header: header,
        success: function(res) {
            if (res.statusCode = 200) {
                if (res.data.code == 10000) {
                    response.success(res.data.data, res.data.msg);
                } else if (res.data.code == 10001 || res.data.code == 1) {
                    toStartPage()
                } else {
                    response.fail(res.data.code, res.data.msg)
                }
            } else {
                toStartPage()
            }
        },
        fail: function() {
            toStartPage()
        }
    })
}

module.exports = {
    GET: GET,
    POST: POST,
    PUT: PUT,
    DELETE: DELETE
}