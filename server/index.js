const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');


// const glob = require("glob");

// var getDirectories = function (src, callback) {
//   glob(src + '/**/*', callback);
// };
// getDirectories('public', function (err, res) {
//   if (err) {
//     console.log('Error', err);
//   } else {
//     console.log(res);
//   }
// });

var fullPath = ''

function traverseDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            // console.log(fullPath);
            traverseDir(fullPath);
        } else {
            console.log(fullPath);
        }
    });
}


// getting port this way
port = process.env.PORT || process.argv[2] || 5000;

// folder for the root level of the site
app.use('/public', express.static('public'));

app.listen(port, function () {
    console.log('app up on port: ' + port);
});

traverseDir('public');
