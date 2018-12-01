const path = require('path');
const readToken = require('../../readToken');
const utilSelf = require('../../../util/util');
const requestSelf = require('../../request/index');
const fs = require('fs');
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
            let tokenInfo = JSON.parse(result);
            console.log(tokenInfo);
            let wxTokenInfo = {
                token: tokenInfo["access_token"],
                createDate: new Date().getTime() + 7200 * 1000
            }
            fs.writeFileSync(path.join(__dirname, './token.json'), JSON.stringify(wxTokenInfo));
        } catch (e) {
            console.error(e);
        }
    }

    static async merchandiseOnline() {
        let testInfoFile = path.join(__dirname, './addTest.json');
        try {
            let infoSrc = await utilSelf.readJson(testInfoFile);
            let info = JSON.parse(infoSrc);
            let filesrc = await readToken(path.join(__dirname, './token.json'));
            console.log(filesrc);
            let wxTokenInfo = JSON.parse(filesrc);
            let now = new Date().getTime();
            if (now > wxTokenInfo.expire) { ///token已经过期
                ///await this.getAccessToken();
            };
            filesrc = await readToken(path.join(__dirname, './token.json'));
            console.log(filesrc);
            wxTokenInfo = JSON.parse(filesrc);
            console.log(wxTokenInfo);
            let requestUrl =
                url.merchandiseAdd + `?access_token=${wxTokenInfo.access_token}`;
            console.log(requestUrl);
            let result = await requestSelf.post({ url: requestUrl, postData: info });
            console.log(result);
        } catch (e) {
            console.error(e);
        }
    }

    static async getMerchandise(params) {
        let { status } = params;
        try {
            let filesrc = await readToken(path.join(__dirname, './token.json'));
            let wxTokenInfo = JSON.parse(filesrc);
            let now = new Date().getTime();
            if (now > wxTokenInfo.expire) { ///token已经过期
                ///await this.getAccessToken();
            };
            filesrc = await readToken(path.join(__dirname, './token.json'));
            wxTokenInfo = JSON.parse(filesrc);
            let requestUrl =
                url.merchandise + `?access_token=${wxTokenInfo.access_token}`;
            console.log(requestUrl);
            let result = await requestSelf.post({ url: requestUrl, postData: { status: status } });
            console.log(result);
        } catch (e) {
            console.error(e);
        }
    }

    static async uploadImg(params) {
        let { filename } = params;
        try {
            let filesrc = await readToken(path.join(__dirname, './token.json'));
            let wxTokenInfo = JSON.parse(filesrc);
            let requestUrl =
                url.uploadImg + `?access_token=${wxTokenInfo.access_token}`;
            let result = await requestSelf.uploadFile({
                url: requestUrl,
                filedir: path.join(__dirname, `../../../public/${filename}`),
                filename: filename
            });
            let uploadSuccess = JSON.parse(result);
            let materialStr = await utilSelf.readJson(path.json(__dirname, './material.json'));
            let material = JSON.parse(materialStr);
            material[filename] = uploadSuccess.url;
            fs.writeFileSync(path.join(__dirname, './material.json'), JSON.stringify(material));
        } catch (e) {

        }
    }
}

module.exports = Main;