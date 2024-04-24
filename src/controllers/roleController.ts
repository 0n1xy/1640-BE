import { Request, Response } from "express";
import { uuid } from "uuidv4";
import Role, { IRole } from "../models/roleModel";


export const createRole = async(req: Request, res: Response) => {
    try {
        const role: IRole = new Role({
            _id: uuid(),
            roleName: req.body.roleName,
        })
        await role.save();
        return res.status(201).json("Role created");
    } catch (e: any) {
        return res.status(500).json({ message: e.message });
    }
}

export const displayAllRole = async(req: Request, res: Response) => {
    try {
        const role = await Role.find()
        if (!role) {
          return res.status(200).json({
            message: "Can't find any role",
          });
        } else {
          return res.send({
            data: role,
          });
        }
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}

export const displayRoleID = async(req: Request, res: Response) => {
    try {
        const role = await Role.findById(req.params);
        if (!role) {
            return res.status(404).json({
              message: `cannot find any role with id ${role}`,
            });
          } else {
            return res.status(200).json(role);
          }
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateRole = async (req: Request, res: Response) => {
    try {
      const findRolebyID = req.params;
      if (!findRolebyID) {
        return res.status(404).json({
          message: `cannot find any role with id ${findRolebyID}`,
        });
      } else {
        await Role.findByIdAndUpdate(findRolebyID, req.body);
        return res.status(200).json("Role updated");
      }
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
};

export const deleteRole = async (req: Request, res: Response) => {
    try {
      const findRoleID = await Role.findById(req.params);
      if (!findRoleID) {
        return res.status(404).json({
          message: `cannot find any role with id ${findRoleID}`,
        });
      } else {
        const role = await Role.find({ roleID: findRoleID });
        await Role.findByIdAndDelete(findRoleID);
        return res.status(200).json("Role deleted");
      }
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };