const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');



const {Account} = require('../db');
const authMiddleware = require('./Middlewares/jwtAuthMiddleware');
const { default: mongoose } = require('mongoose');

 
router.get('/balance', async (req, res, next) => {
    const body = req.body;
    console.log("balance body: ",req);
    // console.log(req.header); 
    const userId = body.userId;

    const account = await Account.findOne({userId});

    res.json({message : "ok"});
    // res.json({balance : account.balance});
})


// // --------- bad approach , it may happen that the transaction stuck in half way, money is deducted but not credited in receivers account
// // --------- so database will be inconsistent , for that we need to use transactions of mongodb

// router.post('/transfer', async (req, res, next) => {
//     const body = req.body;
//     const {amount, to, userId} = body;

//     const account = await findOne({userId});

//     if(account.balance < amount){
//         return res.status(400).json({message : 'Insufficient balance'});
//     }

//     const toAccount = await findOne({userId : to});
    
//     if(!toAccount){
//         return res.status(400).json({message : 'Invalid account'});
//     }
 

//     account.updateOne({userId}, {$inc : {balance : -amount}} );
//     toAccount.updateOne({to}, {$inc : {balance : amount}});


//     res.json({
//         message : 'Transfer successful',
//     })
 
// })


// ------ money transfer using transaction of mongodb to make sure the database will not be inconsistent
router.post('/transfer',authMiddleware, async (req, res, next) => {
    console.log("hitted transfer endpoint");
    
    const session = await mongoose.startSession();
    console.log("hitted transfer endpoint");
    session.startTransaction();
     

    const body = req.body;
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1]; 
    const decoded = jwt.decode(token);

    const firstName = body.firstName;
    const to = body.to;
    const amount = body.amount;
    const userId = decoded.userId;  
    
    console.log(firstName,to,amount,token, decoded);

    const account = await Account.findOne({userId : userId}).session(session);
    if(!account || account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({message : 'Insufficient balance'});
    }

    const toAccount = await Account.findOne({userId : to}).session(session);
    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({message : 'Invalid account'});
    }

    await Account.updateOne({userId}, {$inc : {balance : -amount}}).session(session);
    await Account.updateOne({userId : to}, {$inc : {balance : amount}}).session(session);

    await session.commitTransaction();

    res.json({message : 'Transaction successful'});

})




module.exports = router;

  