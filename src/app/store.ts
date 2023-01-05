import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import bodyReducer from '../components/body/bodySlice';
import counterReducer from '../features/counter/counterSlice';
import companyReducer from '../components/company/companySlice';
import filterReducer from '../components/filter/filterSlice';
import questionReducer from '../components/questionInput/questionSlice';
import companyProfileReducer from '../components/companyProfile/companyProfileSlice';

export const store = configureStore({
  reducer: {
    body: bodyReducer,
    counter: counterReducer,
    company: companyReducer,
    filter: filterReducer,
    question: questionReducer,
    companyProfile: companyProfileReducer,
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
