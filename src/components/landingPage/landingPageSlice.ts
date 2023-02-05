import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface LandingPageState {
  password: string;
}

const initialState: LandingPageState = {
  password: "",
};

export const landingPageSlice = createSlice({
  name: 'landingPage',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setPassword: (state, action: PayloadAction<string>) => {
        state.password = action.payload.toLowerCase();
    },
  },
});

export const { setPassword } = landingPageSlice.actions;
export const selectPassword = (state: RootState) => state.landingPage.password;

export default landingPageSlice.reducer;
