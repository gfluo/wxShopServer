const platformWx = require('../../app/platform/wx/index');

class Main {
    static async merchandiseOnline(ctx, next) {
        platformWx.getAccessToken();
        ctx.body = {
            code: 0,
            data: {
                msg: 'Welcome everyone!'
            }
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
}

module.exports = Main;