const express = require('express');
const fs = require('fs-extra');
const router = express.Router();
var path = require("path");
const pubController = require('../controllers/pubs');


router.post('/',(req,res,next)=>{ 
  var rand = Math.random().toString();
  fs.rename(req.files.file.path, './public/images/'+rand+req.files.file.name, function (err) {
    if (err) throw err; 
   /* pubController.updateUrlImage(success.data._id,path.resolve('./public/images/'+success.data._id+req.files.file.name)).then(
      (ok)=>{ res.send(ok);},
      (no)=>{ res.send(no);}
    )*/
  });
  pubController.store(JSON.parse(req.body.result),path.resolve('./public/images/'+rand+req.files.file.name)).then(
    (success)=>{
      res.json(success);
    },
    (error)=>{
      res.status(400).json(error);
    }
  );
});

  router.get('/', (req, res, next)=> {
    pubController.list().then(
      (success)=>{
        res.json(success);
      },
      (error)=>{
        res.status(400).json(error);
      }
    );
  });

  router.get('/:id/show', (req, res, next)=> {
    pubController.listById(req.params.id).then(
      (success)=>{
        res.json(success);
      },
      (error)=>{
        res.status(400).json(error);
      }
    );
  });

  router.delete('/:id',(req,res,next)=>{
    pubController.delete(req.params.id).then(
      (success)=>{
        res.json(success);
      },
      (error)=>{
        res.status(400).json(error);
      }
    )  
  })

  router.put('/',(req,res,next)=>{
    pubController.update(req.body).then(
      (success)=>{
        res.json(success);
      },
      (error)=>{
        res.status(400).json(error);
      }
    )  
  })

  module.exports = router;

  