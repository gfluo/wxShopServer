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
            let result = await requestSelf.get({ url: requestUrl });
        } catch (e) {
            console.error(e);
        }
    }

    static async getMerchandise(params) {
        let { status } = params;
        try {
            let requestUrl =
                url.merchandise + `?access_token=16_003zA4Rm_2QViLiHUK7sOqz5YrTmFjhD5dxvjfnqktvHriINY2UprGW6NqZaESq4XiakDTUoImprx_oHtiTB8NS8x9F6zw9v6CNlFbjiIrQCJzjsOEsh3zBhB4tIgDO5x-yrblrPMNQlhks7JULbAHAUFW`;
            let result = await requestSelf.post({ url: requestUrl, postData: { status: status } });
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = Main;