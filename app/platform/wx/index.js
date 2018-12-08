const path = require('path');
const readToken = require('../../readToken');
const utilSelf = require('../../../util/util');
const requestSelf = require('../../request/index');
const fs = require('fs');
const { url } = require('./remote');
class Main {
    static async getToken() {
        try {
            let wxTokenInfo = {};
            let filesrc = await readToken(path.join(__dirname, './token.json'));    ///token字符串化
            if (!filesrc) {
                await this.getAccessToken();
                filesrc = await readToken(path.join(__dirname, './token.json'));
                wxTokenInfo = JSON.parse(filesrc);
            } else {
                wxTokenInfo = JSON.parse(filesrc);
                let now = new Date().getTime();
                if (now > wxTokenInfo.expire) { ///token已经过期
                    await this.getAccessToken();
                    filesrc = await readToken(path.join(__dirname, './token.json'));
                    wxTokenInfo = JSON.parse(filesrc);
                };
            }

            return wxTokenInfo.access_token;
        } catch (e) {
            throw (e)
        }
    }

    static async getAccessToken() {
        let secretFile = path.join(__dirname, '../../../private/wxSecret.json');
        try {
            let jsonStr = await utilSelf.readJson(secretFile);
            const secretInfo = JSON.parse(jsonStr);
            let requestUrl =
                url.accessToken + `?grant_type=client_credential&appid=${secretInfo.appid}&secret=${secretInfo.secret}`;
            let result = await requestSelf.get({ url: requestUrl });
            ///console.log(result);
            let tokenInfo = JSON.parse(result);
            ///console.log(tokenInfo);
            let wxTokenInfo = {
                access_token: tokenInfo["access_token"],
                expire: new Date().getTime() + 7140 * 1000
            }
            fs.writeFileSync(path.join(__dirname, './token.json'), JSON.stringify(wxTokenInfo));
        } catch (e) {
            throw (e);
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
        let { filename, filedir } = params;
        console.log(filename);
        console.log(filedir);
        try {
            let token = await Main.getToken();
            let requestUrl =
                url.uploadImg + `?access_token=${token}`;
            let result = await requestSelf.uploadFile({
                url: requestUrl,
                filedir: filedir,
                filename: filename
            });
            console.log(`wx图片上传结果${result}`);
            let uploadSuccess = JSON.parse(result);
            return uploadSuccess.url;
        } catch (e) {
            throw e;
        }
    }

    static async getCategorySub(cid) {
        try {
            let token = await Main.getToken();
            let requestUrl = url.categorySub + `?access_token=${token}`;
            let postData = {
                cate_id: cid
            }
            let result = await requestSelf.post({ url: requestUrl, postData });
            if (result.errmsg == "ok") {
                return result.cate_list;
            }
            return [];
        } catch (e) {
            throw (e);
        }
    }
}

module.exports = Main;