import { PayloadAction, createSlice, SerializedError } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';
import { RootState } from '../store';

type TBurgerState = {
  ingredients: TConstructorIngredient[];
  isLoading: boolean;
  error: SerializedError | null;
};

export const initialState: TBurgerState = {
  ingredients: [],
  isLoading: false,
  error: null
};

const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      const ingredient = action.payload;

      if (ingredient.type === 'bun') {
        state.ingredients = state.ingredients.filter(
          (item) => item.type !== 'bun'
        );
      }
      state.ingredients.push(action.payload);
    },

    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },

    moveIngredient: (
      state,
      action: PayloadAction<{ itemId: string; direction: 'up' | 'down' }>
    ) => {
      const { itemId, direction } = action.payload;
      const currentIndex = state.ingredients.findIndex(
        (item) => item.id === itemId
      );

      const targetIndex =
        direction === 'up' ? currentIndex - 1 : currentIndex + 1;

      if (targetIndex >= 0 && targetIndex < state.ingredients.length) {
        const newArray = [...state.ingredients];
        [newArray[currentIndex], newArray[targetIndex]] = [
          newArray[targetIndex],
          newArray[currentIndex]
        ];
        state.ingredients = newArray;
      }
    },

    cleanAll: (state) => {
      state.ingredients = [];
    }
  }
});

export const { addIngredient, removeIngredient, cleanAll, moveIngredient } =
  burgerSlice.actions;
export const selectIsLoading = (state: RootState) => state.burger.isLoading;
export const selectIngredient = (state: RootState) => state.burger.ingredients;

export default burgerSlice.reducer;
