export interface Post {
  userId: number;
  content: string;
  contentHash?: string;
  type: string;
  preview?: string;
  createdAt: string
}
