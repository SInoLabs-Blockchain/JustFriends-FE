import { Post } from 'src/domain/models/home/Post';

export interface HomeUseCase {
  getPosts(): Promise<Post[]>;
}
