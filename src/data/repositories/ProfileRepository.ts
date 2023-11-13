import { ProfileUseCase } from "../../domain/useCases/ProfileUseCase";
import APIGateWay from "../gateway/APIGateway";
import ProfileResource from "../gateway/resource/ProfileResource";
import { Profile } from "src/domain/models/auth";

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
}
