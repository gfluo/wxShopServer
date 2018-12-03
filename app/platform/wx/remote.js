/**
 * Summary: 关于微信小店的一些公开信息
 */

module.exports = {
    url: {
        accessToken: `https://api.weixin.qq.com/cgi-bin/token`,
        merchandise: `https://api.weixin.qq.com/merchant/getbystatus`,
        uploadImg: `https://api.weixin.qq.com/cgi-bin/media/uploadimg`,
        merchandiseAdd: `https://api.weixin.qq.com/merchant/create`,
        categorySub: `https://api.weixin.qq.com/merchant/category/getsub`,  ///根据顶级类名获取子类列表
    }
}