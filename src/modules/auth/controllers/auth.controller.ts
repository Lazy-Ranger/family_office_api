import { Request, Response } from "express";
import { httpException, httpOK } from "../../../utils/http";
// import { LoginUserDTO, RegisterUserDTO } from "../dtos";
import AuthServiceInstance, { IAuthService } from "../services/auth.service";

class AuthController {
  private readonly authService: IAuthService;

  constructor() {
    this.authService = AuthServiceInstance;
  }

  registerUser = async (req: Request, res: Response) => {
    const createAccountReq = req.body;

    try {
      const loggedInUser = await this.authService.createAccount(
        createAccountReq
      );

      httpOK(res, loggedInUser);
    } catch (err) {
      httpException(res, err, `[AuthController:] cannot create user account`);
    }
  };

  loginUser = async (req: Request, res: Response) => {
    const accountLoginReq = req.body;

    try {
      const loggedInUser = await this.authService.login(accountLoginReq);

      httpOK(res, loggedInUser);
    } catch (err) {
      httpException(res, err, `[AuthController:] cannot login user account`);
    }
  };
}

export default new AuthController();
