class Main {
    static async merchandiseOnline(ctx, next) {
        ctx.body = {
            code: 0,
            data: {
                msg: 'Welcome everyone!'
            }
        }
    }
}

module.exports = Main;