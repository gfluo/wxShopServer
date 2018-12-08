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
                console.log(body.products_info[3]);
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
                        value: fs.readFileSync(filedir),
                        options: {
                            filename: filename,
                            contentType: 'image/jpg'
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
        let downloadStream = request(url).pipe(fs.createWriteStream(filedir));
        downloadStream.on('end', ()=>{
            console.log(`${url}下载完成`);
            resolve();
        })
        downloadStream.on('error', function(err) {
            reject(err);        
        })
        downloadStream.on("finish", function() {
            console.log(`${filedir}写入成功`);
            downloadStream.end();
            resolve();
        });
    })
}

exports.imgDownload = imgDownload;
exports.get = get;
exports.post = post;
exports.uploadFile = uploadFile;