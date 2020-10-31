const fs = require('fs');
const http = require('http');
const path = require('path');

let filesObj = {
    pdf: 'https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg',
    txt: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Icon_Text.svg',
    dir: 'https://upload.wikimedia.org/wikipedia/commons/5/59/OneDrive_Folder_Icon.svg',
    jpg: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Google_Photos_icon.svg',
    png: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Google_Photos_icon.svg',
    js: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg',
    docx:'https://upload.wikimedia.org/wikipedia/commons/f/fb/.docx_icon.svg',
}

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readdir('../../../newFolder', (err, files) => {
        if (err) throw err;
        let myFiles = '';

        files.forEach((file) => {
            let fileKey = path.extname(file).slice(1);
            console.log(fileKey);
            myFiles += `<img src='${filesObj[fileKey]}' width=5% height=5%>${file.split('.')[0]}<br><br>`;
        });
        res.end(`<h3>${myFiles}</h3>`);
    });
})

server.listen(3000, () => {
    console.log('listening to port 3000')
});
