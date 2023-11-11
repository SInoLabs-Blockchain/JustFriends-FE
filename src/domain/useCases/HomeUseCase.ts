import { Post } from "src/domain/models/home/Post";

export interface HomeUseCase {
  getPosts(prop: object): Promise<Post[]>;
  createPost(prop: object): Promise<Post>;
}
