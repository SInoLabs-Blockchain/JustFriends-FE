export interface Challenge {
  challenge: string;
}

export interface Auth {
  accessToken: string;
}

export interface Profile {
  userId: number;
  walletAddress: string;
  username: string;
  avatarUrl: string;
  coverUrl: string;
}
