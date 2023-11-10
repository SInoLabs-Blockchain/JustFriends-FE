import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Profile {
  username: string;
  avatarUrl: string;
  walletAddress: string;
  coverUrl: string;
  userId: number;
}
interface AuthState {
  accessToken: string;
  profile: Profile | null;
}

const initialState: AuthState = {
  accessToken: "",
  profile: {
    username: "",
    avatarUrl: "",
    walletAddress: "",
    coverUrl: "",
    userId: -1,
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
