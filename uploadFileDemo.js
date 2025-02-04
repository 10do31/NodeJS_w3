// "Formidable" is a module for file uploads.
// Include the Formidable module to parse the uploaded file once it reaches the server.
// When the file is uploaded and parsed, it gets placed on a temporary folder on your computer.
// The path to this directory can be found in the "files" object, the third argument in the parse() method's callback function.
// To move the file to the folder of your choice, use the File System module, and rename the file.
// The fs module will move the file to the current folder.
// Credit to w3schools tutorial for scripts.
// This script writes an HTML form, with an upload field.
var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

http.createServer(function (req, res) {
    if (req.url == '/fileupload') {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            var oldpath = files.filetoupload.filepath;
            var newpath = 'C:/Users/d_oti/' + files.filetoupload.originalFilename;
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
                res.write('File uploaded and moved successfully!');
                res.end();
            });
        });
    } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload"><br>');
        res.write('<input type="submit">');
        res.write('</form>');
        return res.end();
    }
}).listen(9000);