const { User, Document } = require('../models/models');
var express = require('express');
const router = express.Router();
const hashPassword = require('../helper/passwordHash');

// GET all documents for logged-in user
// Returns json object with documents user owns is collaborating on.
router.get('/user/:userId', function(req, res) {
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

// GET specific document
// Retrieves a specific document from the document and passes the information
// as a JSON object to the Document Landing Page component.
router.get('/docs/:docId', (req, res)=> {
  Document.findById(req.params.docId)
  .populate('owner')
  .populate('collabs')
  .exec((err, doc) => {
    if (err) {
      console.log(err);
      res.json({ success: false });
    } else {
      res.json({success: true, doc: doc});
    }
  });
});

// POST save document
// Saves the document's text and returns a JSON object with the same document
router.post('/docs/save/:docId', (req, res)=> {
  var text = req.body.text;
  Document.findById(req.params.docId, (err, doc) =>{
    if (err) {
      console.log("ERROR ALERT", err);
      res.json({success: false});
    } else {
      doc.text = text;
      var newHist = {
        text: text,
        timestamp: new Date()
      };
      doc.history.unshift(newHist);
      doc.save();
      console.log("THIS IS THE DOC", doc);
      res.json({success: true, doc: doc});
    }
  });
});

//TODO: decide - are the passwords hashed already?
// POST create new document
// Creates a new document in database with title and password entered from New Document Modal
// Returns a document object upon success
router.post('/docs/new', (req, res) => {
  var password = hashPassword(req.body.password);
  var title = req.body.title;
  var owner = req.body.owner; //user id
  var newDoc = new Document({
    title: title,
    owner: owner,
    dateCreated: new Date(),
    password: password,
    text: '',
    collabs: [],
    history: []
  });
  newDoc.save()
  .then((doc) => {
    res.json({success: true, doc: doc});
  })
  .catch((err)=> {
    console.log(err);
    res.json({success: false});
  });
});

//checkpassword route through query called password
//queries: password and userid
// GET check document password
router.get('/docs/check/:docId', (req, res) => {
  var pass = req.query.password;
  Document.findById(req.params.docId, (err, doc) => {
    if (err) {
      console.log(err);
      res.json({success: false});
    }
    else {
      if (doc.password === pass) {
        doc.collabs.push(req.query.userId); //add user as collaborator
        doc.save();
        res.json({success: true, doc: doc});
      }
      else {
        console.log("ACCESS DENIED");
        res.json({success: false});
      }
    }
  });
});

router.post('/docs/add-collab', (req, res) => {
  Document.findById(req.body.docId, (err, doc) => {
    if (err){
      console.log(err);
      res.json({success: false, message: err});
    } else if (!doc){
      console.log("NO DOC");
      res.json({success: false, message: "No such document was found"});
    } else {
      const docPassword = hashPassword(req.body.docPwd);
      if(doc.password !== docPassword){
        console.log("PASSWORD FAILURE");
        res.json({success: false, message: "Incorrect password"});
      } else {
        doc.collabs.push(req.body.userId);
        doc.save();
        res.redirect('/user/' + req.body.userId);
      }
    }
  });
});


// get the user object
router.get('/users/:userId', (req, res) => {
  User.findById(req.params.userId, (err, user) => {
    if (err) {
      res.json({success: false, message: err});
    }
    else if (!user) {
      res.json({success: false, message: "No such user was found"});
    }
    else {
      res.json({success: true, user: user});
    }
  });
});

module.exports = router;
