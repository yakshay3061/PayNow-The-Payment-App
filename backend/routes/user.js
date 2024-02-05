const express = require('express');
const router = express.Router();


const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../config')
const {User, Account} = require('../db')
const authMiddleware = require('./Middlewares/jwtAuthMiddleware');
const zod = require('zod');
 

// const deleteDB = async () => {
//     await User.deleteMany({});
//     await Account.deleteMany({}); 
// }

// deleteDB();  

const userSignupSchema = zod.object({
    userName : zod.string().email(),
    password : zod.string(),
    firstName : zod.string(),
    lastName : zod.string(),
})  

const userUpdateSchema = zod.object({
    userName : zod.string().optional(),
    password : zod.string().optional(),
    firstName : zod.string().optional(), 
    lastName : zod.string().optional(),
})
 

const validateUpdateUserData = (req, res, next) => {
    const body = req.body;
     
    try {
        userUpdateSchema.parse(body);
        
        next();
    } catch (error) {
        res.status(400).json({error : 'fails input validations '});
    }
} 



const validateSignupData = (req, res, next) => {
    const body = req.body;
    console.log(body);
    try {
        userSignupSchema.parse(body);
        next();
    } catch (error) { 
        console.log(error);
        res.status(400).json({error : 'Invalid Input format'});
    }
} 





router.post('/signup', validateSignupData, async  (req, res, next) => {
    console.log('hited backend');
    const body = req.body;
    console.log(body); 
    
    const user = await User.findOne({
        userName : body.userName,
    })


    if(user){
        return res.json({
            msg : 'email already taken / Incorrect Input'
        });
    }

    const dbUser = await User.create({
        userName : body.userName,
        password : body.password,
        firstName : body.firstName,
        lastName : body.lastName,
    });

    const userId = dbUser._id;

    const userAccount = await Account.create({
        userId,
        balance : 1 + Math.random()*10000,
    })

    const token = jwt.sign({userId : dbUser._id}, JWT_SECRET);

    console.log(token);

    res.json({
        message : 'user created successfully',
        token : token,
    })
})


router.post('/signin', authMiddleware, async (req, res, next) => {
    const body = req.body;

    console.log("hitted signin route");
    console.log(body);

    const userExist = await User.findOne({
        userName : body.userName,
        password : body.password,
    })

    if(!userExist){
        res.json({
            message : 'user does not exist / signup',
        })
    }

    res.json({
        message : 'logged in successfully',
    })

});


router.put('/',validateSignupData, authMiddleware, async (req, res, next) => {
    const body = req.body;

    const updateUser = await updateOne(req.body, {id : req.userId});

    res.json({
        message : "updated successfully"
    });

});



router.get('/bulk', authMiddleware, async (req, res, next) => {
    const filter = req.query.filter || "";

    console.log("hitted to the bulk endpoint");

    const users = await User.find({
       $or: [{
            firstName : {"$regex" : filter}
       }, {
        lastName : {"$regex" : filter}
       }
       ]
    })

    res.json({
        user : users.map(user => ({
            userName : user.userName, 
            firstName : user.firstName, 
            lastName : user.lastName,
            _id : user._id,
        }))
    })


})


module.exports = router;