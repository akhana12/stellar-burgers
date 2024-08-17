import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer, {
  fetchIngredients,
  initialState
} from '../src/services/slices/ingredientsSlice';
import { mockIngredientsResponse } from './mock-data';

describe('тестируем ingredientsSlice', () => {
  let store = configureStore({
    reducer: { ingredients: ingredientsReducer },
    preloadedState: { ingredients: initialState },
  });

  const resetStore = (preloadedState = initialState) => {
    store = configureStore({
      reducer: { ingredients: ingredientsReducer },
      preloadedState: { ingredients: preloadedState },
    });
  };

  beforeEach(() => {
    resetStore();
  });

  it('должен корректно обрабатывать экшен fetchIngredients.pending', () => {
    store.dispatch({ type: fetchIngredients.pending.type });
    const state = store.getState().ingredients;
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('должен корректно обрабатывать экшен fetchIngredients.fulfilled', () => {
    store.dispatch({
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredientsResponse
    });

    const state = store.getState().ingredients;
    expect(state.ingredients).toEqual(mockIngredientsResponse);
    expect(state.isLoading).toBe(false);
  });

  it('должен корректно обрабатывать экшен fetchIngredients.rejected', () => {
    const mockError = { message: 'Failed to fetch ingredients' };
    store.dispatch({
      type: fetchIngredients.rejected.type,
      error: { message: mockError }
    });

    const state = store.getState().ingredients;
    expect(state.isLoading).toBe(false);
    expect(state.error?.message).toBe(mockError);
  });
});
