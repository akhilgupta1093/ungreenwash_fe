import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { stat } from 'fs';
import { RootState, AppThunk } from '../../app/store';

const cannedQuestions = [
  "What are the firm's climate-related targets, pledges, and commitments?",
  "What are regulatory and legal challenges and risk specifically related to climate change, environment, and sustainability?",
  "How are manufacturing and production processes made more sustainable, green, and environmentally-friendly?",
  "Does the firm benefit from subsidies, tax reductions or other monetary benefits that incentivice decarbonization?",
  "How is the firm affected by extreme weather events or natural disasters, such as droughts, floods, wildfires, storms, or severe snowfall?",
  "Does the firm buy or sell credits that are related to emissions cap-and-trade programs?",
  "Is the firm affected by shifts in customer demand for green, carbon-free, sustainable products and services?",
  "Does the firm require additional land use to expand production in the future?",
  "Which environmental concerns, especially related to climate change, could affect the firms public perception, reputation, or image?",
  "How are the firms climate-related goals and sustainability efforts affected by the availability of new technologies?",
  "Does the issue green debt to finance its sustainability initatives?",
  "Does the firm implement energy efficiency programs to reduce overall energy use?",
  "How is the firm affected by carbon and GHG prices, corresponding cap-and-trade programs, or participating in emission trading schemes?",
  "What are the firm's policies in terms of sustainable water use, water consumption, and water efficiency?",
  "Does the firm set science-based targets that are approved by the Science Based Targets initiative (SBTi)?",
  "Has the firm established a dedicated sustainability committee, board, or equivalent body charged with governance of sustainability-related risks and opportunities?",
  "How is the supply chain affected by extreme weather events or natural disasters, such as droughts, floods, wildfires, storms, or severe snowfall?",
  "What are the firm's absolute scope 1, scope 2, and scope 3 greenhouse gas (GHG) emissions?",
  "What is the role of climate-related scenario analysis in the assessment of climate risks and opportunities?",
  "How is management compensation and renumeration linked to climate- and sustainability targets?",
]

const dspimCannedQuestions = [
  "Have there been any instances of local resistance related to environmental concerns? (Either by individuals or NGO's boycotts)",
  "In the last 5 years has the company been under the National Green Tribunal (NGT) Scanner for any environmental non compliances or gross negligence?",
  "Has the company integrated concepts of circularity in its operations, in end-use or promotes sustainable consumption of its products?",
  "Does the company report its carbon footprint/GHG Inventory?",
  "Does the company implement the recommendations of the Task Force on Climate‑related Financial Disclosures (TCFD)?",
  "Describe the short term climate target",
  "Describe the long term climate target",
  "Describe the Net zero/Carbon neutral strategy briefly",
  "Does the company's existing products/services or its R&D of new products and technologies include environmental considerations?",
  "Describe the products or services introduced/in the pipeline keeping in mind growing consumer interest in environmentally sustainable products",
  "Does the company engage with its suppliers and have measureable outcomes on environmental and social themes? Are data points available to support these interactions?",
]

export interface QuestionState {
  currentQuestion: string;
  searchHistory: string[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: QuestionState = {
  currentQuestion: "",
  searchHistory: dspimCannedQuestions,
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
      if (state.searchHistory.includes(action.payload)) {
        state.searchHistory.splice(state.searchHistory.indexOf(action.payload), 1);
      }
      state.searchHistory.unshift(action.payload);
    }
  }
});

export const { setQuestion, addToSearchHistory } = questionSlice.actions;
export const selectQuestion = (state: RootState) => state.question.currentQuestion;
export const selectSearchHistory = (state: RootState) => state.question.searchHistory;

export default questionSlice.reducer;
