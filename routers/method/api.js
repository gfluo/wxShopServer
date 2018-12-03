const platformWx = require('../../app/platform/wx/index');
const source = require('../../app/source/index');
const utilSelf = require('../../util/util'); 
const path = require('path');
class Main {
    static async merchandiseOnline(ctx, next) {
        try {
            let mList = await source.merchandiseList({limit: 6});
            for (let i = 0; i < mList.length; i++) {
                let m = mList[i];
                source.wxCidMatch(m.cat_id);
            }   
        } catch (e) {

        }
    }

    static async merchandiseGetByStatus(ctx, next) {
        ///console.log('fuck');
        let { status } = ctx.request.body;
        try {
            platformWx.getMerchandise({status});
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
            platformWx.uploadImg({filename});
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