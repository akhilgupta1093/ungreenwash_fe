import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import bodyReducer from '../components/body/bodySlice';
import counterReducer from '../features/counter/counterSlice';
import companyReducer from '../components/company/companySlice';
import filterReducer from '../components/filter/filterSlice';
import questionReducer from '../components/questionInput/questionSlice';

export const store = configureStore({
  reducer: {
    body: bodyReducer,
    counter: counterReducer,
    company: companyReducer,
    filter: filterReducer,
    question: questionReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
