import HttpRequestService from '../../utils/HttpRequestService.js'

Page({
    HttpRequestService: new HttpRequestService,
    
    data: {
        ingredientsList: function () {
            return []
        },
        pageNo: 1,
        keyWord: '',
        isBottom: false,
        loading: false
    },

    /**
     * 初始化页面数据
     */
    searchIngredientsList(response) {
        this.setData({
            loading: true
        })
        this.HttpRequestService.getMenuList(this.data.pageNo, this.data.keyWord, response);
    }
})