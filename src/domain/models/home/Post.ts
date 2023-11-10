export interface Post {
  userId: number;
  content: string;
  contentHash?: string;
  type: number;
  preview?: string;
}
