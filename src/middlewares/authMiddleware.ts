import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import jwtDecode from "jwt-decode";
import userModel from "../models/userModel"
import roleModel from "../models/roleModel";

function genarationAccesstoken() {
    const access_token = jwt.sign({}, "process.env.JWT_TOKEN_SECRET", {
        expiresIn: "1s",
    });
    return access_token;
}

async function verifyRefreshToken(refresh_token: any) {
    const very = jwt.verify(
        refresh_token,
        "process.env.JWT_REFRESH_TOKEN_SECRET"
    );
    if (very) return true;
    return false;
}

async function verifyAccessToken(access_token: any) {
    const very = jwt.verify(access_token, "process.env.JWT_TOKEN_SECRET");
    if (very) return true;
    return false;
}

const authMiddleware =  {
    authentication: function(req: Request, res: Response, next: NextFunction) {
        const access_token = req.cookies.access_token as string;
        const refresh_token = req.cookies.refresh_token as string;

        if (!access_token || !refresh_token)
            return res.status(401).json("You are not authenticated");
        const aftervery = verifyAccessToken(access_token);
        const verifyRefreshTokens = verifyRefreshToken(refresh_token);
        if (!aftervery) {
            return res.status(500).json("Token not found");
        } else {
            try {
                const decodedToken: any = jwtDecode(access_token);
                const currentTime = Date.now() / 1000;

                if (decodedToken.exp < currentTime) {
                    if (!verifyRefreshTokens) {
                        return res.status(500).json("Token not found");
                    } else {
                        const newToken = genarationAccesstoken();
                        res.cookie("access_token", newToken, {
                            maxAge: 300000,
                            httpOnly: true,
                        });
                        next();
                        
                    }
                }
                
                next();
            } catch (error) {
                return res.status(500).json("Invalid token");
            }
        }
    },
    isAdmin: async(req: Request, res: Response, next: NextFunction) => {
        const userID = await userModel.findById(req.cookies._id);
        if (userID) {
            const roleID = await roleModel.findById(userID.role)
            if (roleID?.roleName == "Admin") {
                next();
            } else {
                return res.status(403).json("Access denied");
            }
        }
    },
    isUser: async(req: Request, res: Response, next: NextFunction) => {
        const userID = await userModel.findById(req.cookies._id);
        if (userID) {
            const roleID = await roleModel.findById(userID.role)
            if (roleID) {
                next();
            } else {
                return res.status(403).json("Access denied");
            }
        }
    },
    denyGuest: async(req: Request, res: Response, next: NextFunction) => {
        const userID = await userModel.findById(req.cookies._id);
        if (userID) {
            const roleID = await roleModel.findById(userID.role)
            if (roleID?.roleName == "Guest") {
                return res.status(403).json("Access denied");
            } else {
                next();   
            }
        }
    }
};


export default authMiddleware;