import config from '../../../utils/config'
import HttpRequestService from '../../../utils/HttpRequestService.js'
Page({
    HttpRequestService: new HttpRequestService,
    data: {
        menu: {
            name: '',
            menuDetails: [],
            steps: [],
            type: '',
            remark: '',
            img: ''
        },
        mainImg: '',
        stepImg: [],
        mainLoading: false,
        saveLoading: false,
        stepImgLoading: null
    },
    onLoad: function(options) {
        this.pushDetail();
        this.pushStep();
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
        menuCopy.steps.splice(index, 1);
        this.setData({
            menu: menuCopy
        });
        let stepImgCopy = this.data.stepImg;
        stepImgCopy.splice(index, 1);
        this.setData({
            stepImg: stepImgCopy
        });
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
    uploadImg(event) {
        let type = event.currentTarget.dataset.type;
        let index = event.currentTarget.dataset.index;
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success: (res) => {
                const tempFilePaths = res.tempFilePaths
                this.loading(type, index)
                wx.uploadFile({
                    url: config.basePath + 'oss/upload',
                    filePath: tempFilePaths[0],
                    name: 'file',
                    formData: {
                        type: type
                    },
                    success: (res) => {
                        const data = JSON.parse(res.data);
                        if (data.code === "10000") {
                            const img = data.data
                            switch (type) {
                                case "main":
                                    this.setData({
                                        'menu.img': img
                                    });
                                    break;
                                case "step":
                                    let menuCopy = this.data.menu;
                                    menuCopy.steps[index].img = img;
                                    this.setData({
                                        menu: menuCopy
                                    });
                                    break;
                            }
                            this.refreshImg(img, type, index)
                        }
                    },
                    complete: () => {
                        this.unLoading();
                    }
                })
            }
        })
    },
    /**
     * 提交菜谱
     */
    confirm() {
        this.setData({
            saveLoading: true
        });
        this.HttpRequestService.saveMenu(this.data.menu, {
            success: (data, msg) => {

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
                    saveLoading: false
                });
            }
        })

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
    },
    /**
     * 修改备注
     */
    changeRemark(event) {
        this.setData({
            'menu.remark': event.detail
        })
    },
    /**
     * 刷新页面图片
     */
    refreshImg(img, type, index) {
        this.loading(type, index)
        this.HttpRequestService.getOssImg(img, {
            success: (data, msg) => {
                switch (type) {
                    case 'main':
                        this.setData({
                            mainImg: data
                        });
                        break;
                    case 'step':
                        let stepImgCopy = this.data.stepImg;
                        stepImgCopy[index] = data
                        this.setData({
                            stepImg: stepImgCopy
                        })
                        break;
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
                this.unLoading()
            }
        })
    },
    /**
     * 加载按钮
     */
    loading(type, index) {
        switch (type) {
            case "main":
                this.setData({
                    mainLoading: true
                })
                break;
            case "step":
                this.setData({
                    stepImgLoading: index
                })
                break;
        }
    },
    /**
     * 取消加载
     */
    unLoading() {
        this.setData({
            mainLoading: false,
            stepImgLoading: null
        })
    }
})