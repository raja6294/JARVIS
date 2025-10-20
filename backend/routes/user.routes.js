import express from "express";
import {Login,logOut,signup,signin}from "../controllers/auth.controller.js";


const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.post("/logout", logOut);
authRouter.post("/login", Login);



export default authRouter;
