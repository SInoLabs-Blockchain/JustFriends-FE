import { HomeUseCase } from 'src/domain/useCases/HomeUseCase';
import { Post } from 'src/domain/models/home/Post';
import APIGateWay from '../gateway/APIGateway';
import HomeResource from '../gateway/resource/HomeResource';

export class HomeRepository implements HomeUseCase {
  static create(): HomeUseCase {
    return new HomeRepository();
  }

  async getPosts(): Promise<Post[]> {
    let api = new APIGateWay();
    return api.get(HomeResource.GetPosts());
  }
}