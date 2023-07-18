const express = require('express');
const ejs = require('ejs')
const path = require('path');
const mongoose = require('mongoose');
const { ObjectID } = require('bson');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://NARIT:cNarit73@cluster0.p42in.mongodb.net/star";
const app = express();
app.set('view engine', 'ejs')
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'backend')))
const script = express();
script.use(express.static(path.join('../views', 'show')));
mongoose.connect(url);
MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  var dbo = db.db("star");
  dbo.collection("info").find({}).toArray(function (err, info) {
    if (err) throw err;
    console.log("success");
    app.get('/search', (req, res) => {
      res.render('search', {  
        infoList: info
      })
    })
    app.get('/show', (req, res) => {
      res.render('show', {
      })
    })
    app.get('/about', (req, res) => {
      res.render('about', {
      })
    })
    app.get('/', (req, res) => {
      res.render('home', {
      })
    })
  });
});
app.listen(4000, function () {
  console.log('server is runing on port');
});
