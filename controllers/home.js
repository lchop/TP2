import { getViewsPath } from "../utils/utils.js";

export default (req, res) => {
  if (req.session.auth) {
    res.redirect(301,"/dashboard");
    return;
  }
  if(req.session.message){
    console.log(req.session.message);
  }
  res.sendFile("home.html", { root: getViewsPath() });
};
