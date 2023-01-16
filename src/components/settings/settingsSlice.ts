import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface SettingsState {
  compare: boolean;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: SettingsState = {
  compare: false,
  status: 'idle',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Define a reducer for the selected companies
    toggleCompare: (state) => {
      state.compare = !state.compare;
    }
  },
});

export const { toggleCompare } = settingsSlice.actions;
export const compare = (state: RootState) => state.settings.compare;

export default settingsSlice.reducer;
