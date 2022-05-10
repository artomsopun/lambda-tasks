import { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/api-error";
import { TokenRequest, Tokens } from "../models/models";
import { Auth } from "../service/service";

class Controller {
    private authService: Auth;
    constructor(authService: Auth) {
        this.authService = authService;
    }

    async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            if(!email || !password) {
                throw ApiError.badRequest("not valid body")
            }
            await this.authService.signUp(email, password);
            return res.status(201).json({
                message: "successfully registrated"
            })
        } catch (error) {
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const email = req.query.email;
            const password = req.query.password;
            if(!email || !password) {
                throw ApiError.badRequest("not valid query params")
            }
            const tokens: Tokens = await this.authService.login(email.toString(), password.toString());
            return res.status(200).json(tokens)
        } catch (error) {
            next(error);
        }
    }

    async refresh(req: TokenRequest, res: Response, next: NextFunction) {
        try {
            const token = req.token;
            if(!token) {
                return next(ApiError.unauthorizedError());
            }
            const tokens = await this.authService.refresh(token)
            return res.status(200).json(tokens)
        } catch (error) {
            next(error);
        }
    }

    async me(req: Request, res: Response, next: NextFunction) {
        try {
            res.json(["123", "123", "123"])
        } catch (error) {
            next(error);
        }
    }
}

export default Controller;