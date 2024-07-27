import { FC } from 'react';
import { Preloader } from '@ui';
import { IngredientDetailsUI } from '@ui';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import {
  getIngredients,
  getIsLoading
} from '../../services/slices/ingredientsSlice';

export const IngredientDetails: FC = () => {
  const isLoading = useSelector(getIsLoading);
  const ingredients = useSelector(getIngredients);
  const id = useParams().id;
  const ingredientData = ingredients.find((i) => i._id === id);

  if (isLoading) {
    return <Preloader />;
  }

  if (!ingredientData) return;

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
