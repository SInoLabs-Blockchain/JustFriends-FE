import { Profile } from "../models/auth";
import { Post } from "src/domain/models/home/Post";

export interface ProfileUseCase {
  editProfile(
    accessToken: string,
    avatarUrl: string,
    username: string,
    coverUrl: string
  ): Promise<Profile | null>;

  getPosts(accessToken: string, contentHashes: any): Promise<Post[]>;
}
