const express = require('express');
const router  = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const upload = require('../configs/cloudinary');



const logInPromise = (user, req) => new Promise((resolve,reject) => {
    req.login(user, (err) => {
        if (err) return reject('Something went wrong');
        resolve(user);
      });
});  


/* GET home page */
router.post('/signup',upload.single('file'),(req, res, next) => {
    
    const {username, password, name, lastname, telephone, email, isProf, professionType, userTag, location} = req.body;
    
    const imgProfile = req.file.url;
    

    if (!username || !password) {
        res.status(400).json({ message: 'Provide username and password' });
        return;
    }
    
    User.findOne({ username })
    .then( user => {
       
        if(user) throw new Error('The username already exists');
        
        
        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);

        const theUser = new User({
          username,
          password: hashPass,
          name,
          lastname,
          telephone,
          email,
          isProf,
          professionType,
          //userTags,
          imgProfile,
//           location: {
        
// type: 'Point',
// coordinates:[40.4378698,-3.8196207]
//         }
         });
    
        
        return theUser.save().then( user => {
            return logInPromise(user,req)
        })
        .then(user => res.status(200).json(user))
    })
    .catch(e => res.status(500).json({message:e.message}));
});

router.post('/login', (req, res, next) => {
    const {username, password} = req.body;
  
    if (!username || !password) {
      res.status(400).json({ message: 'Provide username and password' });
      return;
    }

    User.findOne({ username })
    .then( user => {
        if(!user) throw new Error('The username does not exist');
        if(!bcrypt.compareSync(password, user.password)) throw new Error('The password is not correct');
        return logInPromise(user,req);    
    })
    .then(user => res.status(200).json(user))
    .catch(e => res.status(500).json({message:e.message}));

});


router.get('/loggedin', (req, res) => {
    if(req.user){
        return res.status(200).json(req.user);
    }else{
        return res.status(400).json({message:"You should loggin first"});
    }
});

router.get('/logout', (req, res) => {
    if(req.user){
        req.logout();
        return res.status(200).json({message:"User logged out"});
    }else{
        return res.status(400).json({message:"You should loggin first"});
    }
});



module.exports = router;
