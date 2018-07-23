const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customers');

router.post('/', (req,res,next)=>{  
    customerController.store(req.body).then(
      (success)=>{
        res.json(success);
      },
      (error)=>{
        res.status(400).json(error);
      }
    );
  });

  router.get('/', (req, res, next)=> {
    customerController.list().then(
      (success)=>{
        res.json(success);
      },
      (error)=>{
        res.status(400).json(error);
      }
    );
  });

  router.get('/:id/show', (req, res, next)=> {
    customerController.listById(req.params.id).then(
      (success)=>{
        res.json(success);
      },
      (error)=>{
        res.status(400).json(error);
      }
    );
  });

  router.delete('/:id',(req,res,next)=>{
    customerController.delete(req.params.id).then(
      (success)=>{
        res.json(success);
      },
      (error)=>{
        res.status(400).json(error);
      }
    )  
  })

  router.put('/',(req,res,next)=>{
    customerController.update(req.body).then(
      (success)=>{
        res.json(success);
      },
      (error)=>{
        res.status(400).json(error);
      }
    )  
  })

  module.exports = router;

  