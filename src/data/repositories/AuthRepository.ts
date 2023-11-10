import { AuthUseCase } from "../../domain/useCases/AuthUseCase";
import APIGateWay from "../gateway/APIGateway";
import AuthResource from "../gateway/resource/AuthResource";
import { Challenge, Auth, Profile } from "src/domain/models/auth";

export class AuthRepository implements AuthUseCase {
  static create(): AuthUseCase {
    return new AuthRepository();
  }

  async connectWallet(walletAddress: string): Promise<Challenge> {
    let api = new APIGateWay();
    return api.post(AuthResource.AUTH_ROUTES.CONNECT_WALLET, {
      walletAddress,
    });
  }

  async login(walletAddress: string, signature: string): Promise<Auth> {
    let api = new APIGateWay();
    return api.post(AuthResource.AUTH_ROUTES.LOG_IN, {
      walletAddress,
      signature,
    });
  }

  async getMe(accessToken: string): Promise<Profile | null> {
    if (!accessToken) {
      return null;
    }
    let api = new APIGateWay({ Authorization: `Bearer ${accessToken}` });
    return api.post(AuthResource.AUTH_ROUTES.GET_ME);
  }
}
