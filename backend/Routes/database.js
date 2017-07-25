const { User, Document } = require('../models/models');
var express = require('express');
const router = express.Router();
const hashPassword = require('../helper/passwordHash');

//get all documents from user with userId
//returns json object of docs user owns and docs s/he is collaborating on
router.get('/user/:userId', function(req, res) {
  console.log('database:', req.params.userId);
  var promises = [
    Document.find({owner: req.params.userId}),
    Document.find({ collabs: { "$in" : [req.params.userId]} })
  ];
  Promise.all(promises)
    .then(docs => {
      res.json({
        success: true,
        ownDocs: docs[0], //all docs the user owns
        collaborating: docs[1] //all docs the user collaborates on
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({success: false});
    });
});

//gets the document with that doc id
router.get('/docs/:docId', (req, res)=> {
  Document.findOne({id: req.params.docId})
  .populate('owner')
  .exec((err, doc) => {
    if (err) {
      console.log(err);
      res.json({ success: false });
    } else {
      res.json({success: true, doc: doc});
    }
  });
});

//save document
//front end will send text
//returns back the doc
router.post('/docs/save/:docId', (req, res)=> {
  var text = req.body.text;
  Document.findOne({id: req.params.docId}, (err, doc) =>{
    if (err) {
      console.log(err);
      res.json({success: false});
    } else {
      doc.text = text;
      doc.save();
      res.json({success: true, doc: doc});
    }
  })

});

//create a new documnet
//returns the whole document object
//are the passwords hashed already?
router.post('docs/new', (req, res) => {
  var password = hashPassword(req.body.password);
  var title = req.body.title;
  var owner = req.body.owner; //user id
  var newDoc = new Document({
    title: title,
    owner: owner,
    dateCreated: new Date(),
    password: password,
  })
  newDoc.save()
  .then((doc) => {
    res.json({success: true, doc: doc});
  })
  .catch((err)=> {
    console.log(err);
    res.json({success: false})
  })
});

//checkpassword route through query called password
//queries: password and userid
router.get('/docs/check/:docId', (req, res) => {
  var pass = req.query.password;
  Document.findById(req.params.docid, (err, doc) => {
    if (err) {
      console.log(err);
      res.json({success: false})
    }
    else {
      if (doc.password === pass) {
        doc.collabs.push(req.query.userId); //add user as collaborator
        doc.save();
        res.json({success: true, doc: doc})
      }
      else {
        console.log("ACCESS DENIED");
        res.json({success: false})
      }
    }
  })


})


module.exports = router;
