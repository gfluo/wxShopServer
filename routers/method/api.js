const platformWx = require('../../app/platform/wx/index');
const source = require('../../app/source/index');
const utilSelf = require('../../util/util');
const path = require('path');
class Main {
    static async merchandiseOnline(ctx, next) {
        try {
            let mList = await source.merchandiseList({ limit: 1 });
            for (let i = 0; i < mList.length; i++) {
                let m = mList[i];
                let wxOnlinePostData = {
                    product_base: {
                        "buy_limit": m.limit_buy_num
                    }
                };
                let cidInfo = await source.wxCidMatch(m.cat_id);
                if (cidInfo) {
                    wxOnlinePostData.product_base.category_id = [];
                    wxOnlinePostData.product_base.category_id.push(cidInfo.wxSubInfo.id);
                    wxOnlinePostData.product_base.name = m.goods_name;
                    let goods_img_dir = await source.imgDownload({
                        url: m.goods_img,
                        filedir: `${m.goods_id}_goods_img.jpg`
                    });
                    let main_img = await platformWx.uploadImg({
                        filename: `${m.goods_id}_goods_img.jpg`,
                        filedir: goods_img_dir,
                    });
                    wxOnlinePostData.product_base.main_img = main_img;
                    wxOnlinePostData.product_base.img = [];
                    ///console.log(wxOnlinePostData.product_base);
                    let goods_thumb_dir = await source.imgDownload({
                        url: m.goods_thumb,
                        filedir: `${m.goods_id}_goods_thumb.jpg`
                    });
                    let gtd = await platformWx.uploadImg({
                        filename: `${m.goods_id}_goods_thumb.jpg`,
                        filedir: goods_thumb_dir,
                    })
                    wxOnlinePostData.product_base.img.push(gtd);
                    let goods_original_img = await source.imgDownload({
                        url: m.original_img,
                        filedir: `${m.goods_id}_goods_original_img.jpg`
                    });
                    let goi = await platformWx.uploadImg({
                        filename: `${m.goods_id}_goods_original_img.jpg`,
                        filedir: goods_original_img,
                    });
                    wxOnlinePostData.product_base.detail = [];
                    wxOnlinePostData.product_base.detail.push({
                        "img": goi
                    })
                    wxOnlinePostData.product_base.detail.push({
                        "text": m.keywords
                    })
                    wxOnlinePostData.product_base.detail.push({
                        "text": `次级分类id信息${cidInfo.secondCid.cid} -- ${cidInfo.secondCid.name}`
                    })
                    wxOnlinePostData.product_base.detail.push({
                        "text": `顶级分类id信息${cidInfo.topCid.cid} -- ${cidInfo.topCid.name}`
                    })
                    console.log(wxOnlinePostData.product_base);
                    wxOnlinePostData.delivery_info = {
                        "delivery_type": 0,
                        "template_id": 0,
                        "express": [
                            {
                                "id": 10000027,
                                "price": 100
                            },
                            {
                                "id": 10000028,
                                "price": 100
                            },
                            {
                                "id": 10000029,
                                "price": 100
                            }
                        ]
                    }
                    let onlineRes = await platformWx.merchandiseOnline(wxOnlinePostData);
                    ctx.body = onlineRes;
                    ///console.log(wxOnlinePostData);
                } else {
                    console.error('微信平台没有对应的分类信息');
                }
            }
        } catch (e) {
            console.error(e);
        }
    }

    static async merchandiseGetByStatus(ctx, next) {
        ///console.log('fuck');
        let { status } = ctx.request.body;
        try {
            platformWx.getMerchandise({ status });
            ctx.body = {
                code: 0,
                data: {
                    msg: 'Welcome everyone!'
                }
            }
        } catch (e) {

        }
    }

    static async uploadImg(ctx, next) {
        let { filename } = ctx.request.body;
        try {
            platformWx.uploadImg({ filename });
            ctx.body = {
                code: 0,
                data: {
                    msg: 'Welcome everyone!'
                }
            }
        } catch (e) {

        }
    }

    static async getMaterial(ctx, next) {
        let { platform } = ctx.request.body;
        let materialFile = path.join(__dirname, `../../app/platform/${platform}/material.json`);
        try {
            let material = await utilSelf.readJson(materialFile);
            ctx.body = JSON.parse(material);
        } catch (e) {
            ctx.body = {
                code: 0,
                data: {
                    msg: e.message
                }
            }
        }
    }
}

module.exports = Main;