import userReducer, {
  getUserThunk,
  updateUserThunk,
  logoutUserThunk,
  registerUserThunk,
  loginUserThunk,
  initialState
} from '../src/services/slices/userSlice';
import { TUser } from '../src/utils/types';
import { configureStore } from '@reduxjs/toolkit';
import { mockUser } from './mock-data';

describe('тестируем userSlice', () => {
  let store = configureStore({
    reducer: { user: userReducer },
    preloadedState: { user: initialState },
  });

  const resetStore = (preloadedState = initialState) => {
    store = configureStore({
      reducer: { user: userReducer },
      preloadedState: { user: preloadedState },
    });
  };

  beforeEach(() => {
    resetStore();
  });

  // тесты для getUserThunk
  it('должен корректно обрабатывать экшен getUserThunk.pending', () => {
    store.dispatch({ type: getUserThunk.pending.type });
    const state = store.getState().user;
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('должен корректно обрабатывать экшен getUserThunk.fulfilled', () => {
    store.dispatch({
      type: getUserThunk.fulfilled.type,
      payload: mockUser
    });
    const state = store.getState().user;
    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(mockUser.user);
  });

  it('должен корректно обрабатывать экшен getUserThunk.rejected', () => {
    const mockError = 'Failed to fetch user';
    store.dispatch({
      type: getUserThunk.rejected.type,
      error: { message: mockError }
    });
    const state = store.getState().user;
    expect(state.isLoading).toBe(false);
    expect(state.error?.message).toBe(mockError);
  });
  // тесты для updateUserThunk
  it('должен корректно обрабатывать экшен updateUserThunk.pending', () => {
    store.dispatch({ type: updateUserThunk.pending.type });
    const state = store.getState().user;
    expect(state.isLoading).toBe(true);
  });

  it('должен корректно обрабатывать экшен updateUserThunk.fulfilled', () => {
    const updatedUser = {
      ...mockUser.user,
      name: 'Жак'
    };

    store.dispatch({
      type: updateUserThunk.fulfilled.type,
      payload: { user: updatedUser }
    });

    const state = store.getState().user;

    expect(state.isLoading).toBe(false);
    expect(state.isLogout).toBe(false);
    expect(state.error).toBe(null);
    expect(state.user).toEqual(updatedUser);
  });

  it('должен корректно обрабатывать экшен updateUserThunk.rejected', () => {
    const mockError = 'Failed to update user';
    store.dispatch({
      type: updateUserThunk.rejected.type,
      error: { message: mockError }
    });
    const state = store.getState().user;
    expect(state.isLoading).toBe(false);
    expect(state.isLogout).toBe(false);
    expect(state.error?.message).toBe(mockError);
  });

  // тесты для registerUserThunk
  it('должен корректно обрабатывать экшен registerUserThunk.pending', () => {
    store.dispatch({ type: registerUserThunk.pending.type });
    const state = store.getState().user;
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
    expect(state.isAuthenticated).toBe(false);
  });

  it('должен корректно обрабатывать экшен registerUserThunk.fulfilled', () => {
    store.dispatch({ type: registerUserThunk.fulfilled.type });
    const state = store.getState().user;
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.isAuthenticated).toBe(false);
  });

  it('должен корректно обрабатывать экшен registerUserThunk.rejected', () => {
    const mockError = 'Failed to register user';
    store.dispatch({
      type: registerUserThunk.rejected.type,
      error: { message: mockError }
    });
    const state = store.getState().user;
    expect(state.isLoading).toBe(false);
    expect(state.error?.message).toBe(mockError);
    expect(state.isAuthenticated).toBe(false);
  });

  // тесты для loginUserThunk
  it('должен корректно обрабатывать экшен loginUserThunk.pending', () => {
    store.dispatch({ type: loginUserThunk.pending.type });
    const state = store.getState().user;
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
    expect(state.isAuthenticated).toBe(false);
  });

  it('должен корректно обрабатывать экшен loginUserThunk.fulfilled', () => {
    store.dispatch({
      type: loginUserThunk.fulfilled.type,
      payload: mockUser
    });

    const state = store.getState().user;

    expect(state.isLoading).toBe(false);
    expect(state.isAuthenticated).toBe(true);
    expect(state.error).toBe(null);
    expect(state.user).toEqual(mockUser.user);
  });

  it('должен корректно обрабатывать экшен loginUserThunk.rejected', () => {
    const mockError = 'Failed to login';
    store.dispatch({
      type: loginUserThunk.rejected.type,
      error: { message: mockError }
    });
    const state = store.getState().user;
    expect(state.isLoading).toBe(false);
    expect(state.isAuthenticated).toBe(false);
    expect(state.error?.message).toBe(mockError);
  });

  // тесты для logoutUserThunk
  it('должен корректно обрабатывать экшен logoutUserThunk.pending', () => {
    store.dispatch({ type: logoutUserThunk.pending.type });
    const state = store.getState().user;
    expect(state.isLoading).toBe(true);
  });

  it('должен корректно обрабатывать экшен logoutUserThunk.fulfilled', () => {
    store.dispatch({
      type: logoutUserThunk.fulfilled.type
    });

    const state = store.getState().user;

    expect(state.isLoading).toBe(false);
    expect(state.isInit).toBe(false);
    expect(state.isLogout).toBe(true);
    expect(state.error).toBe(null);
    expect(state.user).toBe(null);
  });

  it('должен корректно обрабатывать экшен logoutUserThunk.rejected', () => {
    const mockError = 'Failed to logout';
    store.dispatch({
      type: logoutUserThunk.rejected.type,
      error: { message: mockError }
    });
    const state = store.getState().user;
    expect(state.isLoading).toBe(false);
    expect(state.isLogout).toBe(false);
    expect(state.error?.message).toBe(mockError);
  });
});
