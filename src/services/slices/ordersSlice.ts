import { TOrder } from '@utils-types';
import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { getOrdersApi, orderBurgerApi, TNewOrderResponse } from '@api';
import { RootState } from '../store';

interface OrdersState {
  orders: TOrder[];
  isLoading: boolean;
  error: SerializedError | null;
}

const initialState: OrdersState = {
  orders: [],
  isLoading: false,
  error: null
};

// получение заказов
const fetchOrders = createAsyncThunk<TOrder[]>(
  'orders/fetchOrders',
  async () => {
    const data = await getOrdersApi();
    return data;
  }
);

// отправка заказа
const sendOrder = createAsyncThunk<TNewOrderResponse, string[]>(
  'orders/sendOrder',
  async (ingredients: string[]) => {
    const data = await orderBurgerApi(ingredients);
    return data;
  }
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
    builder
      .addCase(sendOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendOrder.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  }
});

export default ordersSlice.reducer;

export { fetchOrders, sendOrder };

export const selectOrders = (state: RootState) => state.orders.orders;
export const selectLoading = (state: RootState) => state.orders.isLoading;
export const selectError = (state: RootState) => state.orders.error;
