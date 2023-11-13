import { Profile } from "../models/auth";

export interface ProfileUseCase {
  editProfile(
    accessToken: string,
    avatarUrl: string,
    username: string,
    coverUrl: string
  ): Promise<Profile | null>;
}
