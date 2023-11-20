export interface Post {
  userId: number;
  content: string;
  contentHash?: string;
  type: string;
  preview?: string;
  createdAt: string;
  totalDownvote?: number;
  totalUpvote?: number;
  totalSupply?: number;
  isVoted?: boolean;
  voteType?: boolean;
  user?: any;
  price?: string;
  isOwner?: boolean;
}
