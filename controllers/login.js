import crypto from "crypto"
import mongoose from "mongoose";
import { UserModel } from "../Data/UserModel.js";

export default (req, res) => {
  const secret = process.env.SECRET;
  const sha256Hasher = crypto.createHmac("sha256", secret);


  const { mail: email, password: password } = req.body;
  let hashPassworld = sha256Hasher.update(password).digest('hex')
  req.session.auth = false;
  mongoose.connect('mongodb://localhost:27017/users',
  {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => {
      checkUser(email, hashPassworld).then((auth) => {
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
      if (user && user.password  == password){
        auth = true;
      }
      return auth;
    } catch (error) {
      console.log(error.message);
      return auth;
    }
  };
};
