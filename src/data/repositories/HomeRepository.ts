import { HomeUseCase } from "src/domain/useCases/HomeUseCase";
import { Post } from "src/domain/models/home/Post";
import APIGateWay from "../gateway/APIGateway";
import HomeResource from "../gateway/resource/HomeResource";

export class HomeRepository implements HomeUseCase {
  static create(): HomeUseCase {
    return new HomeRepository();
  }

  async getPosts({ type, page, limit }: any): Promise<Post[]> {
    let api = new APIGateWay();
    return api.get(`${HomeResource.POST_ROUTES.LIST_OF_POSTS}?type=${type}&page=${page}&limit=${limit}`);
  }

  async createPost({
    content,
    type,
    preview,
    accessToken,
  }: any): Promise<Post> {
    let api = new APIGateWay({ Authorization: `Bearer ${accessToken}` });
    return api.post(HomeResource.POST_ROUTES.DEFAULT, {
      content,
      type,
      preview,
    });
  }
}
