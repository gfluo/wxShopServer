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
}

module.exports = Main;