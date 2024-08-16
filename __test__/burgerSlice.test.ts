import burgerReducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  cleanAll
} from '../src/services/slices/burgerSlice';
import { bun, filling, sauce } from './mock-data';

describe('тестируем burgerSlice', () => {
  const initialState = {
    ingredients: [],
    isLoading: false,
    error: null
  };

  it('должен корректно обрабатывать экшен addIngredient', () => {
    const action = addIngredient(filling);
    const state = burgerReducer(initialState, addIngredient(filling));
    expect(state.ingredients).toContainEqual(filling);
  });

  it('должен корректно обрабатывать экшен removeIngredient', () => {
    const state = burgerReducer(
      { ...initialState, ingredients: [bun, filling] },
      removeIngredient(filling.id)
    );
    expect(state.ingredients).toEqual([bun]);
  });

  it('должен корректно обрабатывать экшен moveIngredient', () => {
    const state = burgerReducer(
      { ...initialState, ingredients: [bun, filling, sauce] },
      moveIngredient({ itemId: sauce.id, direction: 'up' })
    );
    expect(state.ingredients).toEqual([bun, sauce, filling]);
  });

  it('должен очищать все ингредиенты при вызове cleanAll', () => {
    const state = burgerReducer(
      {
        ...initialState,
        ingredients: [bun, filling, sauce]
      },
      cleanAll()
    );
    expect(state.ingredients).toEqual([]);
  });
});
