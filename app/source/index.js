const path = require('path');
const { url } = require('./remote');
const requestSelf = require('../request/index');
const utilSelf = require('../../util/util');
const platformWx = require('../platform/wx/index');

class Main {
    static async merchandiseList(params) {
        let { limit } = params;
        let requestUrl = url.merchandiseList + `?limit=${limit}&type=click_count&order=desc`;
        try {
            let mListSrc = await requestSelf.get({ url: requestUrl });
            const resBody = JSON.parse(mListSrc);
            return resBody.data;
        } catch (e) {
            throw (e);
        }
    };

    /**
     * 
     * @param {scid} scid   源商品的最低分类id 
     */
    static async getUpCid(scid, deep) {
        let requestUrl = url.cidGetFromSub + `?id=${scid}`;
        try {
            let upCidSrc = await requestSelf.get({ url: requestUrl });
            const resBody = JSON.parse(upCidSrc);
            if (deep == 2 || deep == 3) {
                return resBody.data[0].parent_id;
            } else {
                return resBody.data[0].parent_id;
            }
        } catch (e) {
            throw (e);
        }
    }

    /**
     * @param {scid} scid 分类id
     */
    static async wxCidMatch(scid) {
        try {
            let thirdCid = await Main.getUpCid(scid, 3);
            let secondCid = await Main.getUpCid(thirdCid, 2);
            ///let topCid = await Main.getUpCid(secondCid, 1);
            let matchInfoSrc = await utilSelf.readJson(path.join(__dirname, './category.json'));
            let matchInfo = JSON.parse(matchInfoSrc);
            if (matchInfo[secondCid]) {
                let wxTopCid = matchInfo[secondCid].wx_cid;
                let wxSubInfo = await platformWx.getCategorySub(wxTopCid);
            }
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = Main;