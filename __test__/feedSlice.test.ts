import { configureStore } from '@reduxjs/toolkit';
import feedReducer, {
  fetchFeeds,
  initialState
} from '../src/services/slices/feedsSlice';
import { mockFeedResponse } from './mock-data';

describe('тестируем feedSlice', () => {
  let store = configureStore({
    reducer: { feed: feedReducer },
    preloadedState: { feed: initialState },
  });

  const resetStore = (preloadedState = initialState) => {
    store = configureStore({
      reducer: { feed: feedReducer },
      preloadedState: { feed: preloadedState },
    });
  };

  beforeEach(() => {
    resetStore();
  });

  it('должен корректно обрабатывать fetchFeeds.pending', () => {
    store.dispatch({ type: fetchFeeds.pending.type });
    const { isLoading, error } = store.getState().feed;
    expect(isLoading).toBe(true);
    expect(error).toBe(null);
  });

  it('должен корректно обрабатывать fetchFeeds.fulfilled', () => {
    store.dispatch({
      type: fetchFeeds.fulfilled.type,
      payload: mockFeedResponse
    });

    const { isLoading, feedInfo, error } = store.getState().feed;
    expect(isLoading).toBe(false);
    expect(feedInfo).toEqual(mockFeedResponse);
    expect(error).toBe(null);
  });

  it('должен корректно обрабатывать fetchFeeds.rejected', () => {
    const mockError = 'Failed to fetch feed';

    store.dispatch({
      type: fetchFeeds.rejected.type,
      error: { message: mockError }
    });

    const { isLoading, error } = store.getState().feed;
    expect(isLoading).toBe(false);
    expect(error?.message).toBe(mockError);
  });
});
