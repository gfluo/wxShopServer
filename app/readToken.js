const fs = require('fs');
module.exports = function (filedir) {
    return new Promise((resolve, reject) => {
        fs.readFile(filedir, 'utf8', (err, filesrc) => {
            if (err)
                reject(err);
            resolve(filesrc);
        })
    })
}
