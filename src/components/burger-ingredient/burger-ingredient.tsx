import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { addIngredient } from '../../services/slices/burgerSlice';
import { useDispatch } from '../../services/store';
import { nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const dispatch = useDispatch();

    const location = useLocation();

    const handleAdd = () => {
      const ingredientWithId: TConstructorIngredient = {
        ...ingredient,
        id: nanoid()
      };
      dispatch(addIngredient(ingredientWithId));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
