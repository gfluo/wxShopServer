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

                    }
                };
                let wxCidInfo = await source.wxCidMatch(m.cat_id);
                if (wxCidInfo) {
                    wxOnlinePostData.product_base.category_id = [];
                    wxOnlinePostData.product_base.category_id.push(wxCidInfo.id);
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
                    console.log(wxOnlinePostData.product_base);
                    let goods_thumb_dir = await source.imgDownload({
                        url: m.goods_thumb,
                        filedir: `${m.goods_id}_goods_thumb.jpg`
                    });
                    let goods_original_img = await source.imgDownload({
                        url: m.original_img,
                        filedir: `${m.goods_id}_goods_original_img.jpg`
                    });
                }
            }
        } catch (e) {

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