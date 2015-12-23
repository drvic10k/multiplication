var express = require('express');
var xml2js = require('xml2js');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/directives'));
app.use(express.static(__dirname + '/templates'));
app.use(express.static(__dirname + '/controllers'));
app.use(express.static(__dirname + '/modules'));
app.use(express.static(__dirname + '/services'));

var rankingsFile = 'rankings.xml';

app.get('/rankings', function(req, res) {
  var rankings = [];

  fs.readFile(rankingsFile, function(err, data) {
    if (err) {
      res.send(JSON.stringify(rankings.slice(0, 10)));
    } else {
      {
        var parser = new xml2js.Parser({
          explicitArray: false
        });
        parser.parseString(data, function(err, result) {
          if (err) {
            res.send(JSON.stringify(rankings.slice(0, 10)));
          } else {
            if (result.root.entry !== undefined) {
              if (result.root.entry.constructor !== Array) {
                rankings.push(result.root.entry);
              } else {
                rankings = result.root.entry;
              }
            }

            rankings.sort(function(a, b) {
              return a.record - b.record;
            });

            res.send(JSON.stringify(rankings.slice(0, 10)));
          }
        });
      }
    }
  });

});

app.post('/rankings', function(req, res) {
  var newRecord = req.body;
  var builder = new xml2js.Builder();

  fs.readFile(rankingsFile, function(err, data) {
    if (err) {
      if (err.code == 'ENOENT') {
        data = builder.buildObject([]);
      } else {
        res.send(err);
      }
    }

    var rankings = [];
    var duplicate = false;
    var parser = new xml2js.Parser({
      explicitArray: false
    });

    parser.parseString(data, function(err, result) {
      if (result.root.entry !== undefined) {
        if (result.root.entry.constructor !== Array) {
          rankings.push(result.root.entry);
        } else {
          rankings = result.root.entry;
        }
        var same = rankings.filter(function(item) {
          return item.firstName === newRecord.firstName &&
            item.lastName === newRecord.lastName &&
            item.class === newRecord.class;
        })[0];
        var index = rankings.indexOf(same);
        if (index > -1) {
          if (same.record > newRecord.record) {
            rankings.splice(index, 1);
          } else {
            duplicate = true;
          }
        }
      }

      if (!duplicate) {
        rankings.push(newRecord);
        result.root = {
          entry: rankings
        };
        console.log(newRecord.record);
      }

      var xml = builder.buildObject(result);
      fs.writeFile(rankingsFile, xml, function(err) {
        if (err) {
          res.send(err);
        } else {
          res.sendStatus(200);
        }
      });
    });
  });
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

var port = process.env.PORT || 1337;

var server = app.listen(port, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});
