import { NextFunction, Request, Response } from "express";
import * as VolunteerModel from '../models/Volunteers'

const VolunteersController = {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, username, password, email, address, phoneNumber, biography, medicalNeeds } = req.body
            //We need to add hashes to passwords.
            res.status(201).json({
                name,
                username,
                password,
                email,
                address,
                phoneNumber,
                biography,
                medicalNeeds
            })

        } catch (e) {
            next(e)
        }
    },


}

// username: string, 
// name: string, 
// email: string, 
// password: string, 
// phoneNumber: string, 
// biography: string | null,? 
// medicalNeeds: string | null, ?
// address: string


export default VolunteersController