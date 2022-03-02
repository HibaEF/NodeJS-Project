var express = require('express');
var router = express.Router();
var Contact = require("../model/contact");

/* GET home page. */
/* GET users listing. */
router.get('/', function(req, res, next) {
  Contact.find(function(err,data){
    if (err) throw err;
    res.render("getAllContact.twig",{data});

  }); 
 
  });

  //Display form add page
  router.get('/add', function(req, res, next) {
    res.render("addContact.twig");
  });

  //Ajouter

  router.post('/addAction', function(req, res, next) {
    console.log(req.body);
    var contact = new Contact(
      {
        FullName : req.body.fullname,
        Phone : req.body.phone

      }
    )
    contact.save();
      res.redirect('/contact/');
  });

  //Delete contact 
  router.get('/delete/:id', function(req, res, next){
   //lire id url
    var id=req.params.id;
    Contact.findOneAndRemove({_id:id}, (err)=> {
      if(err) throw err;

    })
    res.redirect('/contact');
  });
   //Update contact
   router.get('/update/:id',(req,res,next)=>{
    var id =req.params.id;
    Contact.findById({_id:id},(err,data)=>{
        if(err) throw err;

        res.render("updateContact.twig",{data});

    })
})
// 1ere methode de update :
router.post('/update',(req, res, next)=>{
  let id = req.body.id;
  Contact.findById({_id:id},function(err, doc){
    doc.FullName =req.body.FullName;
    doc.Phone = req.body.Phone;
    doc.save();
  });
  res.redirect("/contact/")

});

// 2eme methode de update :
router.post('/updateAction/:id', function(req, res, next) {
 


  console.log(req.body);
  var id = req.params.id;
  console.log(id);
  var data ={
    FullName : req.body.FullName,
    Phone : req.body.Phone
  }
  Contact.findByIdAndUpdate({_id:id},data,(err) => {
    if (err) throw err;
  })
  res.redirect('/contact');
});
//rechercher a travers le nom:
  
   
router.get('/search',(req,res)=>{  
  try {  
  Contact.find({FullName:{'$regex':req.query.search}},(err,data)=>{  
  if(err){  
    console.log(err);  
  }else{  
    res.render('getAllContact.twig',{data:data});  
  }  
  })  
  } catch (error) {  
  console.log(error);  
  }  
  });











// router.put('/update/:id', function(req, res, next) {
//   var id =req.params.id;
//   var data ={
//     FullName : req.body.fullname,
//     Phone : req.body.phone
//   }
//   Contact.findByIdAndUpdate({_id:id},data,(err)=>{
//       if(err) throw err;
//   })
//   res.redirect("/contact/");
// });
 


module.exports = router;