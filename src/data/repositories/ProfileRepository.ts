import { ProfileUseCase } from "../../domain/useCases/ProfileUseCase";
import APIGateWay from "../gateway/APIGateway";
import ProfileResource from "../gateway/resource/ProfileResource";
import { Profile } from "src/domain/models/auth";
import { Post } from "src/domain/models/home/Post";

export class ProfileRepository implements ProfileUseCase {
  static create(): ProfileUseCase {
    return new ProfileRepository();
  }

  async editProfile(
    accessToken: string,
    avatarUrl: string,
    username: string,
    coverUrl: string
  ): Promise<Profile | null> {
    if (!accessToken) {
      return null;
    }

    let api = new APIGateWay({ Authorization: `Bearer ${accessToken}` });
    return api.put(`${ProfileResource.PROFILE_ROUTES.EDIT_PROFILE}`, {
      avatarUrl,
      username,
      coverUrl,
    });
  }

  async getPosts(contentHashes: string, accessToken: string): Promise<Post[]> {
    let api = new APIGateWay({ Authorization: `Bearer ${accessToken}` });
    return api.post(ProfileResource.PROFILE_ROUTES.LIST_OF_POSTS, {
      contentHashes,
    });
  }

  async getUsers(
    accessToken: string,
    walletAddresses: any
  ): Promise<Profile[]> {
    if (!accessToken) return [];
    let api = new APIGateWay({ Authorization: `Bearer ${accessToken}` });
    return api.post(ProfileResource.PROFILE_ROUTES.GET_USERS, {
      walletAddresses,
    });
  }
}
