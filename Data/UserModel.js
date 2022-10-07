import mongoose from "mongoose";

export const userRegister = {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
};

const UserSchema = new mongoose.Schema(userRegister);

export const UserModel =  mongoose.model("users", UserSchema);
