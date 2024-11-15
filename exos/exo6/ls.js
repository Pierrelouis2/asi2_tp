const {readdir} = require('fs');
const {extname} = require('path');
// commonjs module definition
module.exports = function ls(path,ext,callback){
        readdir(path, (err, files) => {
            if (err) {
                return callback(err);
            }
           result =  files.filter(f => !ext || extname(f) === ext);
           callback(null,result);
        })
}