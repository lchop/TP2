import {UserModel} from "../Data/UserModel.js";
import crypto from "crypto"
import mongoose from "mongoose";

export default async (req, res) => {
  const secret = process.env.SECRET;
  const sha256Hasher = crypto.createHmac("sha256", secret);

  const { firstName: fn, lastName: ln, email:e, password:p, password_confirm: pc } = req.body;
  if (pc !== p){
    req.session.message = "user not added, passworld not identical";
    req.flash('message', 'user not added, passworld not identical');
    res.redirect(301,"/message");
    return;
  }
  let hashPassword = sha256Hasher.update(p).digest('hex');
  if (!fn && !ln && !e && !hashPassword){
    req.session.message = "user not added, empty variable";
    req.flash('message', 'user not added, empty variable');
    res.redirect(301,"/message");
    return;
  }
  await mongoose.connect('mongodb://localhost:27017/users',
  {
      useNewUrlParser: true,
      useUnifiedTopology: true
  })
  let test = await checkUser(e);
  if (test){
    req.session.message = "user not added, user already exist";
    req.flash('message', 'user not added, user already exist');
    res.redirect(301,"/message");
    return;
  }

  await addUser();
  
  async function addUser(){
    try {
        await UserModel.insertMany({
          firstName : fn,
          lastName :ln,
          email: e,
          password : hashPassword
        });
    } catch (error) {
      console.log(error.message);
      
    }
  };

  async function checkUser(email){
    let alreadyExist = false;
    try {
      const user = await UserModel.findOne({email: email});
      if (user){
        alreadyExist = true;
      }
      return alreadyExist;
    } catch (error) {
      console.log(error.message);
      return alreadyExist;
    }
  };

  req.session.message = "user added";
  req.flash('message', 'user added !');
  res.redirect(301,"/message");
};


