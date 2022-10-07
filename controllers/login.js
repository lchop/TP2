import cryto from "crypto-js";
import mongoose from "mongoose";
import { UserModel } from "../Data/UserModel.js";

export default (req, res) => {
  const { mail: e, password: p } = req.body;
  req.session.auth = false;
  mongoose.connect('mongodb://localhost:27017/users',
  {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => {
      checkUser(e,p).then((auth) => {
        if(auth){
          req.session.auth = true;
          res.redirect(301,"/dashboard");

        }
        else{
          req.session.auth = false;
          req.session.message = "Attention vous n'êtes pas authentifié";
          res.redirect(301,"/");

        }
      })

    });

  async function checkUser(email, password){
    let auth = false;
    try {
      const user = await UserModel.findOne({email: email});
      if (user && user.password == password){
        auth = true;
      }
      return auth;
    } catch (error) {
      console.log(error.message);
      return auth;
    }
  };
};
