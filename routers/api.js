const Router = require('koa-router');
const utilSelf = require('../util/util');
const fs = require('fs');
const path = require('path');
const apiController = require('./method/api');
const router = new Router({
    prefix: '/api'
})

router.post('/merchandiseOnline', apiController.merchandiseOnline);     ///上传商品
router.post('/merchandiseGetByStatus', apiController.merchandiseGetByStatus);   ///根据状态获取商品 
router.post('/uploadImg', apiController.uploadImg); ///上传图片
router.post('/getMaterial', apiController.getMaterial);    ///获取素材
router.get('/', async (ctx, next) => {
    let jsonsrc = JSON.stringify({code: 0});
    fs.writeFileSync(path.join(__dirname, './test.json'), jsonsrc);
    ctx.body= {
        code: 0,
        msg: 'request ok'
    }
})
module.exports = router;