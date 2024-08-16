import { configureStore } from '@reduxjs/toolkit';
import ordersReducer, {
  fetchOrders,
  initialState,
  sendOrder
} from '../src/services/slices/ordersSlice';
import { mockOrders, mockNewOrderResponse } from './mock-data';

describe('тестируем ordersSlice', () => {
  let store = configureStore({
    reducer: { orders: ordersReducer },
    preloadedState: { orders: initialState },
  });

  const resetStore = (preloadedState = initialState) => {
    store = configureStore({
      reducer: { orders: ordersReducer },
      preloadedState: { orders: preloadedState },
    });
  };

  beforeEach(() => {
    resetStore();
  });

  it('должен корректно обрабатывать экшен fetchOrders.pending', () => {
    store.dispatch({ type: fetchOrders.pending.type });
    const state = store.getState().orders;
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('должен корректно обрабатывать экшен fetchOrders.fulfilled', () => {
    store.dispatch({ type: fetchOrders.fulfilled.type, payload: mockOrders });
    const state = store.getState().orders;
    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(mockOrders);
  });

  it('должен корректно обрабатывать экшен fetchOrders.rejected', () => {
    const mockError = 'Failed to fetch orders';
    store.dispatch({
      type: fetchOrders.rejected.type,
      error: { message: mockError }
    });
    const state = store.getState().orders;
    expect(state.isLoading).toBe(false);
    expect(state.error?.message).toBe(mockError);
  });

  it('должен корректно обрабатывать экшен sendOrder.pending', () => {
    store.dispatch({ type: sendOrder.pending.type });
    const state = store.getState().orders;
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('должен корректно обрабатывать экшен sendOrder.fulfilled', () => {
    store.dispatch({
      type: sendOrder.fulfilled.type,
      payload: mockNewOrderResponse
    });
    const state = store.getState().orders;
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(null);
  });

  it('должен корректно обрабатывать экшен sendOrder.rejected', () => {
    const mockError = 'Failed to send order';
    store.dispatch({
      type: sendOrder.rejected.type,
      error: { message: mockError }
    });
    const state = store.getState().orders;
    expect(state.isLoading).toBe(false);
    expect(state.error?.message).toBe(mockError);
  });
});
