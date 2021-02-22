const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const cors = require('cors');
app.use(cors());
const multer = require('multer');
var fullPath = ''

function traverseDir(dir, bool) {
    var directory = [];
    var filePath = [];
    fs.readdirSync(dir).forEach(file => {
        fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            directory.push(fullPath)
            traverseDir(fullPath);
        } else {
            filePath.push(fullPath)
        }
    });
    if (bool === true)
        return directory
    else
        return filePath
}

function splitPath(path) {
    const temp = path.split('\\');
    return temp[1];
}

var defaultPath = '';
// getting port this way
port = process.env.PORT || process.argv[2] || 5000;

// folder for the root level of the site
app.use('/public', express.static('public'));

app.get('/folderList', (req, res) => {
    var path = traverseDir('public', true)
    defaultPath = splitPath(path[0]);
    res.json({
        folderPath: path
    })
})

app.get('/:path', (req, res) => {
    var host = 'http://localhost:5000/';
    var resp = [];
    var parameters = '';
    if (req.params.path === 'default') {
        parameters = defaultPath
    } else {
        parameters = req.params.path
    }
    var filePath = traverseDir('public/' + parameters, false)
    for (var i = 0; i < filePath.length; i++) {
        var temp = {
            srcUrl: host + filePath[i].replace(/\\/g, "/"),
            previewUrl: host + filePath[i].replace(/\\/g, "/")
        }
        resp.push(temp)
    }
    res.json({
        response: resp
    })
})

app.post('/upload/:path', (req, res) => {
    var storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './public/' + req.params.path);
        },
        filename: function (req, file, callback) {
            callback(null,Date.now() + '-'+ file.originalname);
        }
    });
    var upload = multer({ storage: storage }).any();
    upload(req,res,function(err) {
        if(err) {
            console.log(err);
            return res.end("Error uploading file.");
        } else {
           console.log(req.body);
           req.files.forEach( function(f) {
             console.log(f);
             res.json({
                response: "Upload success"
            })
             // and move file to final destination...
           });
           res.end("File has been uploaded");
        }
    });
});



app.listen(port, function () {
    console.log('app up on port: ' + port);
});

// console.log(traverseDir('public'));