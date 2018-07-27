const express = require('express');
const fs = require('fs-extra');
const router = express.Router();
const pubController = require('../controllers/pubs');

router.post('/',(req,res,next)=>{ 
  var file = req.files.file;
  fs.readFile(file.path, 'base64', function(err,data){
    if(err){
      log.error("File read error: "+err)
      res.status(500).send("Internal server error!")
    } else {
      file.data=Buffer(data).toString('base64');
    }
    pubController.store(JSON.parse(req.body.result),data).then(
      (success)=>{
        res.json(success);
      },
      (error)=>{
        res.status(400).json(error);
      }
    );
  });
});


/*router.post('/',(req,res,next)=>{ 
 var path = req.files.file.path;
 var category = new pubsModels();
        category.image.data = fs.readFileSync(path);
        category.image.contentType = 'image/png';
        category.save(function (err) {
            if (err) throw new Error(err);
            res.sendStatus(200)
        });*/
  /*pubController.store(JSON.parse(req.body.result),path).then(
    (success)=>{
      res.json(success);
    },
    (error)=>{
      res.status(400).json(error);
    }
  );*/
//});

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

  router.post('/listByName', (req, res, next)=> {
    pubController.listByName(req.body).then(
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

//Image Store Folder
  /* var rand = Math.random().toString();  
  fs.rename(req.files.file.path, path.resolve('./public/images/'+rand+req.files.file.name), function (err) {
    if (err) throw err; 
    pubController.updateUrlImage(success.data._id,path.resolve('./public/images/'+success.data._id+req.files.file.name)).then(
      (ok)=>{ res.send(ok);},
      (no)=>{ res.send(no);}
    )
  });
  
  //res.sendFile('https://routerbar.herokuapp.com/images/'+rand+req.files.file.name);*/
  