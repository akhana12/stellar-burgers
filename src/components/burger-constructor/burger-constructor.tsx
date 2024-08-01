import { FC, useMemo, useState } from 'react';
import { TIngredient, TOrder } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  cleanAll,
  selectIngredient,
  selectIsLoading
} from '../../services/slices/burgerSlice';
import { sendOrder } from '../../services/slices/ordersSlice';
import { selectUser } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);
  const burgerIngredients = useSelector(selectIngredient);
  const navigate = useNavigate();
  const [orderModalData, setOrderModalData] = useState<TOrder | null>(null);
  const [error, setError] = useState<string | null>(null);

  const constructorItems = useMemo(() => {
    const bun = burgerIngredients.find((item) => item.type === 'bun');
    const otherIngredients = burgerIngredients.filter(
      (item) => item.type !== 'bun'
    );
    return {
      bun: bun ? { ...bun, id: bun._id } : null,
      ingredients: otherIngredients.map((ingredient) => ({ ...ingredient }))
    };
  }, [burgerIngredients]);

  const onOrderClick = () => {
    if (!constructorItems.bun || !constructorItems.ingredients.length) return;
    if (!user) return navigate('/login');

    const ingredients = [
      constructorItems.bun.id,
      ...constructorItems.ingredients.map((item) => item._id)
    ];

    dispatch(sendOrder(ingredients))
      .unwrap()
      .then((response) => {
        setOrderModalData(response.order);
      })
      .catch((err) => setError(err.message));
  };

  const closeOrderModal = () => {
    dispatch(cleanAll());
    setOrderModalData(null);
  };

  const price = useMemo(() => {
    const bunPrice = constructorItems.bun ? constructorItems.bun.price * 2 : 0;
    const ingredientsPrice = constructorItems.ingredients.reduce(
      (total, ingredient) => total + ingredient.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }, [constructorItems]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={isLoading}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
