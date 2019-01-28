Page({
    data: {
        menu: {
            name: '',
            menuDetails: [],
            steps: [],
            type: '',
            remark: '',
            img: ''
        }
    },
    onLoad: function(options) {
        this.pushDetail();
        this.pushStep();
    },
    onReady: function() {

    },
    onShow: function() {

    },
    /**
     * 新增食材
     */
    pushDetail() {
        let menuCopy = this.data.menu;
        menuCopy.menuDetails.push({
            ingredientName: '',
            num: '',
            unit: ''
        })
        this.setData({
            menu: menuCopy
        })
    },
    /**
     * 删除食材
     */
    removeDetail(event) {
        let menuCopy = this.data.menu;
        let index = event.currentTarget.dataset['index'];
        menuCopy.menuDetails.splice(index, 1)
        this.setData({
            menu: menuCopy
        })
    },

    /**
     * 删除步骤
     */
    removeStep(event) {
        let menuCopy = this.data.menu;
        let index = event.currentTarget.dataset['index'];
        menuCopy.steps.splice(index, 1)
        this.setData({
            menu: menuCopy
        })
    },
    /**
     * 新增步骤
     */
    pushStep() {
        let menuCopy = this.data.menu;
        menuCopy.steps.push({
            description: '',
            img: '',
            sort: ''
        })
        this.setData({
            menu: menuCopy
        })
    },

    /**
     * 上传图片
     */
    uploadImg() {
        // wx.chooseImage({
        //     count: 1,
        //     sizeType: ['original', 'compressed'],
        //     sourceType: ['album', 'camera'],
        //     success(res) {
        //         const tempFilePaths = res.tempFilePaths
        //         wx.uploadFile({
        //             url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
        //             filePath: tempFilePaths[0],
        //             name: 'file',
        //             formData: {
        //                 user: 'test'
        //             },
        //             success(res) {
        //                 const data = res.data
        //                 // do something
        //             }
        //         })
        //     }
        // })
    },
    /**
     * 提交菜谱
     */
    confirm() {
        console.info(this.data.menu)
    },

    /**
     * 修改菜谱名称
     */
    changeMenuName(event) {
        this.setData({
            'menu.name': event.detail
        })
    },

    /**
     * 修改食材名称
     */
    changeIngredientName(event) {
        let index = event.currentTarget.dataset['index'];
        let menuCopy = this.data.menu;
        menuCopy.menuDetails[index].ingredientName = event.detail;
        this.setData({
            menu: menuCopy
        })
    },

    /**
     * 修改食材数量
     */
    changeIngredientNum(event) {
        let index = event.currentTarget.dataset['index'];
        let menuCopy = this.data.menu;
        menuCopy.menuDetails[index].num = event.detail;
        this.setData({
            menu: menuCopy
        })
    },

    /**
     * 修改食材单位
     */
    changeIngredientUnit(event) {
        let index = event.currentTarget.dataset['index'];
        let menuCopy = this.data.menu;
        menuCopy.menuDetails[index].unit = event.detail;
        this.setData({
            menu: menuCopy
        })
    },

    /**
     * 修改步骤描述
     */
    changeSteps(event) {
        let index = event.currentTarget.dataset['index'];
        let menuCopy = this.data.menu;
        menuCopy.steps[index].description = event.detail;
        this.setData({
            menu: menuCopy
        })
    }
})