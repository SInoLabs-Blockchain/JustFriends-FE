import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ZERO_ADDRESS } from "src/common/constants";

interface Profile {
  loading?: boolean;
  username?: string;
  avatarUrl?: string;
  walletAddress?: `0x${string}`;
  coverUrl?: string;
  userId?: number;
  isFriend?: boolean;
  totalUpvote?: number;
  totalDownvote?: number;
  totalPost?: number;
}
interface AuthState {
  accessToken: string;
  profile: Profile | null;
}

const initialState: AuthState = {
  accessToken: "",
  profile: {
    loading: true,
    username: "",
    avatarUrl: "",
    walletAddress: ZERO_ADDRESS,
    coverUrl: "",
    userId: -1,
    totalUpvote: -1,
    totalDownvote: -1,
    totalPost: -1,
    isFriend: false,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setProfile: (state, action: PayloadAction<Profile | null>) => {
      state.profile = action.payload;
    },
  },
});

export const { setAuth, setProfile } = authSlice.actions;

export default authSlice.reducer;
