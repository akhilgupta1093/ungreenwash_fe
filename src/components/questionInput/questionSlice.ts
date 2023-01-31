import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { stat } from 'fs';
import { RootState, AppThunk } from '../../app/store';

export interface QuestionState {
  currentQuestion: string;
  searchHistory: string[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: QuestionState = {
  currentQuestion: "",
  searchHistory: [],
  status: 'idle',
};

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Define a reducer for the selected companies
    setQuestion: (state, action: PayloadAction<string>) => {
      state.currentQuestion = action.payload;
    },
    addToSearchHistory: (state, action: PayloadAction<string>) => {
      state.searchHistory.push(action.payload);
    }
  }
});

export const { setQuestion, addToSearchHistory } = questionSlice.actions;
export const selectQuestion = (state: RootState) => state.question.currentQuestion;
export const selectSearchHistory = (state: RootState) => state.question.searchHistory;

export default questionSlice.reducer;
