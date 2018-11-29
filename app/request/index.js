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

async function post(params) {
    let { url, postData } = params;
    return new Promise((resolve, reject) => {
        request({
            url: url,
            method: "POST",
            json: true,
            headers: {
                "content-type": "application/json",
            },
            body: postData
        }, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body) // 请求成功的处理逻辑
            }
        });
    })
}

exports.get = get;
exports.post = post;