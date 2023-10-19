import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface TestState {
  name: string;
}

const initialState: TestState = {
  name: 'Phong',
};

export const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    saveName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { saveName } = testSlice.actions;

export default testSlice.reducer;
