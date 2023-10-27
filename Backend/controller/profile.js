const Profile = require('../models/profile')
var mongoose = require('mongoose');
const geolib = require('geolib');
const getDistance = require("geolib");

// FUNCTION to update Profile
exports.updateProfile = (req, res) => {
  var update = {};
  const headerObject = req.body;
  const email = req.body.email;
  var x = 0;

  // console.log(req.body);

  for (const key in headerObject) {
    var field = `${key}`;
    var value = `${headerObject[key]}`;
    // console.log(value);
    if (
      field != "location" &&
      field != "agePreference" &&
      field != "accept" &&
      field != "host" &&
      field != "connection" &&
      field != "user-agent" &&
      field != "postman-token" &&
      field != "accept-encoding" &&
      field != "content-type" &&
      field != "content-length" &&
      field != "hobbies"
    )
      update[field] = value;
    else if (field == "agePreference") {
      update[field] = [];
      headerObject.agePreference.forEach(function (item) {
        update[field].push(item);
      });
      //   console.log(update[field]);
    } else if (field == "hobbies") {
      update[field] = [];
      headerObject.hobbies.forEach(function (item) {
        update[field].push(item);
      });
    } else if (field == "location") {
      update["location"] = { type: "Point", coordinates: [] };
      headerObject.location.forEach(function (item) {
        update["location"].coordinates.push(item);
      });
    } else if(field == "image")
    {
      update["image"] =  req.body.image;
    }
      
  }

  // console.log(update);

  Profile.findOneAndUpdate(
    { email },
    { $set: update },
    { upsert: true, new: true },
    function (err, success) {
      // console.log(err);

      if (err) return res.status(400).json({ err });
      else {
       // console.log(success);
        return res.status(200).json(success);
      }
    }
  );
};

// FUNCTION TO FETCH USER PROFILE
exports.fetchProfile = (req, res) => {
  // console.log(req.body);

  const email = req.body.email;

  Profile.findOne({ email }, function (err, success) {
    // console.log(success);

    if (err || success == null)
      return res.status(200).json({ id: "Update Your Profile" });

    // console.log(success);
    return res.status(200).json(success);
  });
};

//FUNCTION TO FETCH USER PROFILE ID FROM EMAIL
exports.fetchProfileId = (req,res)=>{
   // console.log(req.body);
    Profile.findOne({email:req.body.email},function(error,r){
        if(error) res.status(400).json({error:error.message});
      //  console.log(r);
        if(r && r.name != null) res.status(200).json({id:r});
        else res.status(400).json({message:"Update Your Profile First"});
    })
}

const matchEmails =  async (email)=>{

 

  var localEmail = [];
  var finalEmail = [];

  localEmail = await Match.find({matchFrom:email});
  for(var i = 0;i<localEmail.length;i++){
      var count = await  Match.count({matchFrom:localEmail[i].matchTo,matchTo:email})
      if(count){
     // console.log(localEmail[i].matchTo);
      finalEmail.push(localEmail[i].matchTo);
      }
 }
 return finalEmail;
}





//FUNCTION TO FETCH ALL PROFILE TO SHOW
exports.allProfile= async (req,res)=>{

 
    var preference = "";
    var age = [18,100];
    var email = req.body.email;
    const finalEmail = await matchEmails(email);

   

   
    Profile.findOne({email},function(err,result){

        
        if(result == null) res.status(400).json({message:"Complete Your Profile"});
        else if(result.name == null) res.status(400).json({message:"Please Update Your Name"});
        else if(result.dob == null) res.status(400).json({message:"Please Update Your Date of Birth"});
        else if(result.location == null) res.status(400).json({message:"Please upload your location"});
        else{
        preference = result.preference;
        age = result.agePreference;
        long = result.location.coordinates[0];
        lat = result.location.coordinates[1];
        var dist = result.distance;

      
        
        

        Profile.find(
            {gender:preference,$and:[{age:{$gt:age[0]}},{age:{$lt:age[1]}}],email:{$ne:email}}).exec(
            function (err,success) {
                if(err) return res.status(400).json({id : "No Profile Found"});
                var arr = [];
                for(var i = 0;i<success.length;i++){


                    const x = geolib.getDistance({latitude:lat,longitude:long},{latitude:success[i].location.coordinates[1],longitude:success[i].location.coordinates[0]});
                   
                   
                ;
                        if(x <= dist && finalEmail.includes(success[i].email) == false)
                        {
                             
                            
                              var cpy = success[i];
                              arr.push({x,cpy});
                        }
                        else{
                          //console.log(success[i].name,x);
                        }
                        
    

                      

                    
                    

                   
                }

       // console.log(arr);

        return res.status(201).json(arr);
      });
    }
  });
};


exports.fetchMultipleProfile = async(req,res)=>{
  const emails=req.body.list;
  const not_email = req.body.email;

  var result = [];
  
  for(var i= 0;i<emails.length;i++)
  {
    if(emails[i].users[0] && emails[i].users[0].email != not_email){
    const d = await  Profile.find({email:emails[i].users[0].email});
      result.push({chat:emails[i],d});
    }
    else if(emails[i].users[1]){
    const d = await  Profile.find({email:emails[i].users[1].email})
    result.push({chat:emails[i],d});
    }
  }
  res.status(200).json(result);

}
