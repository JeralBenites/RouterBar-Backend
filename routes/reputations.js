const express = require('express');
const router = express.Router();

const reputationController = require('../controllers/reputations');

router.post('/', (req,res,next)=>{  
    reputationController.store(req.body).then(
      (success)=>{
        res.json(success);
      },
      (error)=>{
        res.status(400).json(error);
      }
    );
  });

  router.get('/', (req, res, next)=> {
    reputationController.list().then(
      (success)=>{
        res.json(success);
      },
      (error)=>{
        res.status(400).json(error);
      }
    );
  });

  router.get('/:id/show', (req, res, next)=> {
    reputationController.listById(req.params.id).then(
      (success)=>{
        res.json(success);
      },
      (error)=>{
        res.status(400).json(error);
      }
    );
  });

  router.delete('/:id',(req,res,next)=>{
    reputationController.delete(req.params.id).then(
      (success)=>{
        res.json(success);
      },
      (error)=>{
        res.status(400).json(error);
      }
    )  
  })

  router.put('/',(req,res,next)=>{
    reputationController.update(req.body).then(
      (success)=>{
        res.json(success);
      },
      (error)=>{
        res.status(400).json(error);
      }
    )  
  })

  module.exports = router;

  