const Router = require('koa-router');
const apiController = require('./method/api');
const router = new Router({
    prefix: '/api'
})

router.post('/merchandiseOnline', apiController.merchandiseOnline);     ///上传商品
router.post('/merchandiseGetByStatus', apiController.merchandiseGetByStatus);   ///根据状态获取商品 
module.exports = router;