import { Auth, Challenge, Profile } from "../models/auth";

export interface AuthUseCase {
  connectWallet(walletAddress?: string): Promise<Challenge>;
  login(walletAddress?: string, sig?: any): Promise<Auth>;
  getMe(accessToken: string): Promise<Profile | null>;
}
