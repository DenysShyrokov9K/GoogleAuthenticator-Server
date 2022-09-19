const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const speakeasy = require('speakeasy');
// @route   get api/users/test
// @desc    test User
// @access  Public
router.get('/test',(req,res) => res.json({msg:"this is test"}));

// @route   POST api/users
// @desc    Register User
// @access  Public
router.post('/', async (req,res) => {
    try{
        const { userAddress , userhex} = req.body;
        let user = await User.findOne({ userAddress });
        if(user){
            if(user.check === 1)
                return res.json(0);
            else {
                user.check = 1;
                user.hex = hex;
                user.save();
                return res.json(1);
            }
        }else{
            user = new User({
                userAddress: userAddress,
                userhex: userhex,
                check: 1
            });
            user.save();
            return res.json(1);
        }
    }catch(err){
        console.error(err)
    }
})

router.post('/checkQrCode', async (req,res) => {
    try{
        const { userAddress} = req.body;
        let user = await User.findOne({ userAddress });
        if(user){
            return res.json(user.check)
        }else{
            return res.json(0);
        }
    }catch(err){
        console.error(err)
    }
})


router.post('/verifyCode',async(req,res) => {
    try{
        const { userAddress,checkCode } = req.body;
        let user = await User.findOne({ userAddress });
        if(user){
            if(user.check === 1){
                const isVerified = speakeasy.totp.verify({
                    secret: user.userhex,
                    encoding: "hex",
                    token: checkCode,
                    window: 1,
                });
                return res.json(isVerified);
            }
        }
    }catch(err){
        console.error(err);
    }
})



module.exports = router;