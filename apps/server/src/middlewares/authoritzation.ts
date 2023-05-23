import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

function authMiddleware(req: Request, res: Response, next: NextFunction): any {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        throw new Error('Authorization header missing')
    }
    const token = authHeader.split(' ')[1]

    if (!token) {
        throw new Error('Authorization token not found')
    }
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    if (!process.env.JWT_SECRET) {
        throw new Error('missing credentials JWS token')
    }
    try {
        // eslint-disable-next-line turbo/no-undeclared-env-vars
        const decodedToken = jwt.verify(token.toString(), process.env.JWT_SECRET) as JwtPayload

        delete decodedToken.password


        req.body.auth = decodedToken
        return next()
    } catch (e) {
        if (e instanceof Error) {
            return res.status(404).json({ message: e.message })
        }
    }
}

export default authMiddleware
