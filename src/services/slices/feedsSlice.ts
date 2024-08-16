import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';
import { getFeedsApi } from '@api';

type TFeedsState = {
  isLoading: boolean;
  feedInfo: TOrdersData;
  error: SerializedError | null;
};

export const initialState: TFeedsState = {
  isLoading: true,
  feedInfo: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  error: null
};

export const fetchFeeds = createAsyncThunk(
  'feed/getFeeds',
  async () => (await getFeedsApi()) as TOrdersData
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeedSelector: (sliceState) => sliceState.feedInfo
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFeeds.fulfilled, (state, action) => {
      state.isLoading = false;
      state.feedInfo = action.payload;
    });
    builder.addCase(fetchFeeds.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchFeeds.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  }
});

export const selectIsLoading = (state: { feed: TFeedsState }) =>
  state.feed.isLoading;
export const getFeedSelector = (state: { feed: TFeedsState }) =>
  state.feed.feedInfo;
export default feedSlice.reducer;
