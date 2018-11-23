const path = require('path');
const fs = require('fs');
const utilSelf = require('../../../util/util');
const requestSelf = require('../../request/index');
const { url } = require('./remote');
class Main {
    static async getAccessToken() {
        let secretFile = path.join(__dirname, '../../../private/wxSecret.json');
        try {
            let jsonStr = await utilSelf.readJson(secretFile);
            const secretInfo = JSON.parse(jsonStr);
            let requestUrl = 
                url.accessToken + `?grant_type=client_credential&appid=${secretInfo.appid}&secret=${secretInfo.secret}`;
            let result = await requestSelf.get({url: requestUrl});
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = Main;