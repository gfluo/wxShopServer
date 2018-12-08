/**
 * Summary: 发送请求
 * Auth: zoroshow@outlook.com
 * Date: 2018/11/23
 */
const request = require('request');
const fs = require('fs');

async function get(params) {
    let { url } = params;
    return new Promise((resolve, reject) => {
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(body);
            }
            reject(error);
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
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(body);
            }
            reject(error);
        });
    })
}

async function uploadFile(params) {
    let { url, filename, filedir } = params;
    console.log(filedir);
    return new Promise((resolve, reject) => {
        try {
            request.post({
                url: url + `&type=image`,
                formData: {
                    buffer: {
                        value: fs.createReadStream(filedir),
                        nonce: '',
                        options: {
                            filename: filename,
                            contentType: 'image/JPG'
                        }
                    },
                },
            }, function optionalCallback(err, httpResponse, body) {
                if (err) {
                    reject(err)
                }
                if (httpResponse.statusCode == 200) {
                    resolve(body);
                }
                reject(httpResponse.statusCode);
            });
        } catch (e) {
            reject(e);
        }
    })
}

async function imgDownload(params) {
    let { url, filedir } = params;
    return new Promise((resolve, reject) => {
        request(url).pipe(fs.createWriteStream(filedir));
        resolve();
    })
}

exports.imgDownload = imgDownload;
exports.get = get;
exports.post = post;
exports.uploadFile = uploadFile;