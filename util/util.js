/**
 * Summary: 提供一些工具函数
 * Auth: zoroshow@outlook.com
 * Date: 2018/11/23
 */
const fs = require('fs');

function readJson(filedir) {
    return new Promise((resolve, reject) => {
        fs.readFile(filedir, 'UTF8', (err, data) => {
            if (err)
                reject(err)
            resolve(data);
        })
    })
}

exports.readJson = readJson;