import { rootReducer } from '../src/services/store'; // Импортируем rootReducer из store
import { configureStore } from '@reduxjs/toolkit';

describe('rootReducer', () => {
  it('должен возвращать корректное начальное состояние при неизвестном экшене', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(initialState).toEqual({
      ingredients: expect.any(Object),
      burger: expect.any(Object),
      feed: expect.any(Object),
      user: expect.any(Object),
      orders: expect.any(Object)
    });
  });

  it('должен корректно инициализировать store', () => {
    const store = configureStore({ reducer: rootReducer });
    expect(store.getState()).toEqual({
      ingredients: expect.any(Object),
      burger: expect.any(Object),
      feed: expect.any(Object),
      user: expect.any(Object),
      orders: expect.any(Object)
    });
  });
});
