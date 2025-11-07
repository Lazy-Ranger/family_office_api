import { Request, Response } from "express";
import { httpException, httpOK } from "../../../utils/http";
import { ILoginUser } from "../interfaces";
import AuthServiceInstance, { IAuthService } from "../services/auth.service";

class AuthController {
  private readonly authService: IAuthService;

  constructor() {
    this.authService = AuthServiceInstance;
  }

  loginUser = async (req: Request, res: Response) => {
    const accountLoginReq:ILoginUser = req.body;
    try {
      const loggedInUser = await this.authService.login(accountLoginReq);

      httpOK(res, loggedInUser);
    } catch (err) {
      httpException(res, err, `[AuthController:] cannot login user account`);
    }
  };
}

export default new AuthController();
