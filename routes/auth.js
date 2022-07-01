const express = require("express");
const User = require("../models/User")
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.get("/auth", (req, res) => {
  res.send("auth");
});

router.post("/createuser", 
  [body('name', "invalid name").isLength({min : 1}),
  body('email', "invalid mail").isEmail(),
  body('password', "invalid password").isLength({ min: 5 }),],
  async (req, res) =>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try{

      let user = await User.findOne({email : req.body.email})
      
      if(user){
        return res.status(400).json({error : "email already exits"})
      }
      user = await User.create({
        name: req.body.name,
        password: req.body.password,
        email : req.body.email
      })
      res.json(user);
      
    }catch(error){
      console.error(error.message);
      res.status(500).send("something went wrong");
    }
    

    // console.log(req.body);

})

module.exports = router;