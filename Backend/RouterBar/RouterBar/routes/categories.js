const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categories');

router.post('/', (req,res,next)=>{  
    categoryController.store(req.body).then(
      (success)=>{
        res.json(success);
      },
      (error)=>{
        res.status(400).json(error);
      }
    );
  });

  router.get('/', (req, res, next)=> {
    categoryController.list().then(
      (success)=>{
        res.json(success);
      },
      (error)=>{
        res.status(400).json(error);
      }
    );
  });

  router.get('/:id/show', (req, res, next)=> {
    categoryController.listById(req.params.id).then(
      (success)=>{
        res.json(success);
      },
      (error)=>{
        res.status(400).json(error);
      }
    );
  });

  router.delete('/:id',(req,res,next)=>{
    categoryController.delete(req.params.id).then(
      (success)=>{
        res.json(success);
      },
      (error)=>{
        res.status(400).json(error);
      }
    )  
  })

  router.put('/',(req,res,next)=>{
    categoryController.update(req.body).then(
      (success)=>{
        res.json(success);
      },
      (error)=>{
        res.status(400).json(error);
      }
    )  
  })

  module.exports = router;

  