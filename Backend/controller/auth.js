const User = require('../models/user');
const bcrypt = require("bcrypt");
// FUNCTION TO LOGIN USER
exports.login=async(req,res)=>{
    
    const {email,password} = req.credential;

    console.log(email+password);


    User.countDocuments({email}, function (err, count){ 
        if(count>0){
                
           User.findOne({email}, function(err, userFromDB) {
                    res.status(200).json(userFromDB);
         })}else {
             res.status(400).json({Error:"Wrong Password"});
         }
    });
}

// FUNCTION TO SIGN UP USER
exports.signup=(req,res)=>{
    
   const {email,password} = req.credential;

   console.log(email + password);

    User.countDocuments({email}, function (err, count){ 
        if(count>0){
                res.status(403).json({Error: "Please Login"}); 
        }
        else{
          const user = new User({
              email,password
          });
          user.save(function(err,result){
            console.log(result);  
            res.status(200).json({id : result._id});
          });
        }
    });



}

// FUNCTION TO DELETE ACCOUNT
exports.deleteAccount = async (req,res)=>{
    const email = req.body.email;

    const data =await  User.deleteOne({email});
    const record = await Profile.deleteOne({email});
    const matches = await Match.deleteMany({matchFrom:email});
    const matchesto = await Match.deleteMany({matchTo:email});
    const subs = await Subscription.deleteMany({email});
    await SuperLike.deleteMany({from:email});
    await SuperLike.deleteMany({to:email});
    await Date.deleteMany({from:email});
    await Date.deleteMany({to:email});

    console.log(data);
    console.log(record);
    console.log(matches);
    console.log(matchesto);
    console.log(subs);


    if(data.acknowledged && record.acknowledged && matches.acknowledged && matchesto.acknowledged)
    return res.status(200).json({message:"Profile Deleted Successfully"});
    else
    return res.status(400).json({message:"Some Error Occured"});
}

// FUNCTION TO AUTHENTICATE USER USING GOOGLE


exports.forgotPassword = async (req,res)=>{

    const {email,password} = req.credential;

    console.log(email + password);

 
    User.findOne({email},function(err,result){

        if(result == null) res.status(400).json({message:"User Not Exists"});
        else if(err) res.status(400).json({message:err.message});
        else{
        User.findOneAndUpdate({email},{$set:{password:password}},function (err, results){
            if(err) res.status(400).json({message:err.message});
            else res.status(200).json({message:"Password Change Successfully"});
         });
        }
    })
}


exports.getUser = async (req,res)=>{

   
    var x = []
    User.find({},function(err,result){
             for(var a = 0;a < result.length;a++){
                x.push(result[a].email);
             }     
             x.sort((a,b)=>{
                if(a.subs > b) return 1;
                if(b > a) return -1;
                return 0;
             })

             res.status(200).json(x);
   })
}