import { Request, Response } from "express";
import userModel from "../models/userModel";
import CryptoJS from "crypto-js";
import { uuid } from "uuidv4";
import User, { IUser } from './../models/userModel';
import roleModel from "../models/roleModel";

var jwt = require('jsonwebtoken');

export const login = async (req: Request, res: Response) => {
    try {
        const emailInput = req.body.email;
        const passwordInput = req.body.password;

        const user = await userModel.findOne({ email: { $eq: emailInput } });
        const userRole = await roleModel.findOne({_id: user?.role})
        if (!user) {
            return res.status(404).json({
                success: true,
                statuscode: 401,
                responseStatus: "User account is not found",
            });
        } else {
            const crypterPassword = user.password;
            const bytes = CryptoJS.AES.decrypt(crypterPassword, "secret key 123");
            const decryptedPassword: string = JSON.parse(
                bytes.toString(CryptoJS.enc.Utf8)
            );
            if (decryptedPassword != passwordInput) {
                return res.status(500).json({
                    success: true,
                    statuscode: 500,
                    responseStatus: "User account or password incorrect",
                });
            } else {
                const access_token = jwt.sign(
                    {
                        _id: user._id,
                    },
                    "process.env.JWT_TOKEN_SECRET",
                    { expiresIn: Date.now() + 60 * 60 * 1000 }
                );
                const refresh_token = jwt.sign(
                    {
                        _id: user._id,
                    },
                    "process.env.JWT_REFRESH_TOKEN_SECRET",
                    { expiresIn: Date.now() + 30 * 24 * 60 * 60 * 1000 }
                );

                res.cookie("access_token", access_token, {
                    maxAge: 300000,
                    httpOnly: true,
                });
                res.cookie("refresh_token", refresh_token, {
                    maxAge: 300000,
                    httpOnly: true,
                });
                res.cookie("role", userRole?.roleName, {
                    maxAge: 300000,
                    httpOnly: true,
                });
                res.status(200).json({
                    authenticated: true,
                    success: true,
                    statuscode: 200,
                    access_token: access_token,
                    refresh_token: refresh_token,
                    role: userRole?.roleName,
                    responseStatus: "Login successfully",
                });
            }
        }
    } catch (error: any) {
        res.status(401).json({
            message: "An error occurred",
            error: error.message,
        })
    }
}

export const register = async(req: Request, res: Response) => {
    try {
        const roleID = await roleModel.findOne({roleName: req.body.roleName});
        const ciphertext = CryptoJS.AES.encrypt(
            JSON.stringify(req.body.password),
            "secret key 123"
          ).toString();
        const user: IUser = new User({
            _id: uuid(),
            email: req.body.email,
            password: ciphertext,
            userName: req.body.userName,
            dOb: req.body.dob,
            role: roleID?.id,
        })
        await user.save();
        return res.status(201).json("User created");
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
}
