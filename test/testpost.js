var expect = require('chai').expect;
var server = require('../web/basic-server.js');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var path = require('path');
var supertest = require('supertest');
var initialize = require('../web/initialize.js');

initialize(path.join(__dirname, '/testdata'));

archive.initialize({
  archivedSites: path.join(__dirname, '/testdata/sites'),
  list: path.join(__dirname, '/testdata/sites.txt')
});

var request = supertest.agent(server);

describe('server', function() {
  describe('GET /', function () {
    it('should return the content of index.html', function (done) {
      // just assume that if it contains an <input> tag its index.html
      request
        .get('/')
        .expect(200, /<input/, done);
    });
  });

  describe('archived websites', function () {
    describe('POST', function () {
      it('should append submitted sites to \'sites.txt\'', function(done) {
        var url = 'www.example.com';

        // Reset the test file and process request
        fs.closeSync(fs.openSync(archive.paths.list, 'w'));

        request
          .post('/')
          .type('form')
          .send({ url: url })
          .expect(302, function (err) {
            if (!err) {
              var fileContents = fs.readFileSync(archive.paths.list, 'utf8');
              expect(fileContents).to.equal(url + '\n');
            }

            done(err);
          });
      });
    });
  });
});