const express = require('express');
const router = express.Router();

const userController = require('../controllers/users');

router.get('/', (req,res,next)=>{  
    res.send('hello Fucking world');
  });

  router.post('/Login', (req,res,next)=>{   
    userController.login(req.body).then(
      (success)=>{
        res.json(success);
      },
      (error)=>{
        res.status(400).json(error);
      }
    );
  });
  
  router.post('/LoginStore', (req,res,next)=>{  
    userController.store(req.body).then(
      (success)=>{
        res.json(success);
      },
      (error)=>{
        res.status(400).json(error);
      }
    );
  });

  router.get('/listUsers', (req,res,next)=>{   
    userController.list(req.body).then(
      (success)=>{
        res.json(success);
      },
      (error)=>{
        res.status(400).json(error);
      }
    );
  });
module.exports = router;

  