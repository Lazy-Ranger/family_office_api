import { Request, Response } from "express";
import { httpException, httpOK } from "../../../utils/http";
import { ILoginUser } from "../interfaces";
import AuthServiceInstance, { IAuthService } from "../services/auth.service";

class AuthController {
  private readonly authService: IAuthService;

  constructor() {
    this.authService = AuthServiceInstance;

  }

  registerUser = async (req: Request, res: Response) => {
    try {
      const userData = req.body;
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
  req.socket.remoteAddress ||
  req.ip ||
  '';
  const registeredUser = await this.authService.register(userData, ip || undefined);
      httpOK(res, registeredUser);
    } catch (err) {
      httpException(res, err, `[AuthController:] cannot register new user`);
    }
  };

  loginUser = async (req: Request, res: Response) => {
    const accountLoginReq:ILoginUser = req.body;
    try {
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
  req.socket.remoteAddress ||
  req.ip ||
  '';
  const loggedInUser = await this.authService.login(accountLoginReq, ip || undefined);
      
      httpOK(res, loggedInUser);
    } catch (err) {
      httpException(res, err, `[AuthController:] cannot login user account`);
    }
  };

    logout = async(req: Request, res: Response): Promise<void> => {
    const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
      req.socket.remoteAddress ||
      req.ip ||
      '';
    const userId = Number(req.params.id);
    await this.authService.logout(userId, ip || undefined);
    // await LogActiveService.log(req.user, 'LOGOUT', false);
    res.status(200).send();
  }

}

export default new AuthController();
