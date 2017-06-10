var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var fs = require('fs');
var url = require('url');


exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {
    var uri = url.parse(req.url).pathname;
    var filename = path.join(process.cwd(), uri);
      
    // fs.readFile(archive.paths.list, (err, body) => {
    //   if (err) {
    //     throw err;  
    //   } else {
    //     res.write(body.toString)();
    //     console.log(body.toString());
    //   }
    // });
    fs.readFile(__dirname + '/public/index.html', 'utf-8', (err, body) => {
      if (err) {
        throw err;  
      }
      res.writeHeader(200, { 'Content-Type': 'text/html' });
      res.write(body);
      res.end();
    });
    // ask http helper to return requested page or loading.html
  } else if (req.method === 'POST') {
    var result = [];
    req.on('data', chunk => result.push(chunk));
    req.on('end', () => {
      result = result.join().toString().slice(4);
      console.log(archive.paths.list);
      fs.writeFile(archive.paths.list, result, err => {
        if (err) {
          throw err;
        } else {
          console.log('file written');
        }
      });
    });
  }
  //   var inputUrl = new Promise((resolve, reject) => {
  //     var result = [];
  //     console.log(req);
  //     req.on('data', chunk => result.push(chunk));
  //     req.on('end', result.join());
  //     resolve(result);
  //   });
  //   inputUrl.then(url => {
  //     console.log('the url: ', url);
  //     fs.writeFile('test.txt', url, err => {
  //       if (err) {
  //         console.log('failed filewrite');
  //       } else {
  //         console.log('file written');
  //       }
  //     });
  //   });
  // }    

    // let inputUrl = '';
    // req.on('data', chunk => {
    //   inputUrl += chunk;
    // });
    // fs.writeFile('test.txt', inputUrl, err => {
    //   if (err) {
    //     console.log('oh noes');
    //     throw err; 
    //   } else {
    //     console.log('file written');
    //   }
    // });
    // write URL name to file

 // console.log(archive.paths.list);
 // res.end(archive.paths.list);
};

