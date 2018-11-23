/**
 * Summary: 发送请求
 * Auth: zoroshow@outlook.com
 * Date: 2018/11/23
 */
const request = require('request');

async function get(params) {
    let { url } = params;
    return new Promise((resolve, reject) => {
        request(url, function (error, response, body) {
            console.log(body)//打印百度首页html内容
        })
    });
}

exports.get = get;