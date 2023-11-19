import { Post } from "src/domain/models/home/Post";
import { Profile } from "../models/auth";

export interface GetUserResponse {
  currentPage: number;
  total: number;
  totalPages: number;
  users: Profile[];
}

export interface HomeUseCase {
  getPosts(prop: object): Promise<Post[]>;
  createPost(prop: object): Promise<Post>;
  getUsers(prop: object): Promise<GetUserResponse>;
}
