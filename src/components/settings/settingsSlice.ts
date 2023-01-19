import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface SettingsState {
  compare: boolean;
  modal: boolean;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: SettingsState = {
  compare: false,
  modal: false,
  status: 'idle',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Define a reducer for the selected companies
    setCompare: (state, action: PayloadAction<boolean>) => {
        state.compare = action.payload;
    },
    setModal: (state, action: PayloadAction<boolean>) => {
        state.modal = action.payload;
    },
  },
});

export const { setCompare, setModal } = settingsSlice.actions;
export const selectModal = (state: RootState) => state.settings.modal;
export const selectCompare = (state: RootState) => state.settings.compare;

export default settingsSlice.reducer;
