import { FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { useLocation, useParams } from 'react-router-dom';
import {
  fetchOrders,
  selectLoading,
  selectOrders
} from '../../services/slices/ordersSlice';
import { getFeedSelector } from '../../services/slices/feedsSlice';
import { getIngredients } from '../../services/slices/ingredientsSlice';
import { TIngredient, TOrder } from '@utils-types';
import { OrderInfoUI, Preloader } from '@ui';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const number = Number(useParams().number);
  const ingredients = useSelector(getIngredients);
  const feed = useSelector(getFeedSelector);
  const orders = useSelector(selectOrders);
  const isLoading = useSelector(selectLoading);

  const location = useLocation();

  useEffect(() => {
    if (!order) return;
    dispatch(fetchOrders());
  }, []);

  const allOrders = [...feed.orders, ...orders];

  const order = allOrders.find((i: TOrder) => i.number === number);

  const orderData = order
    ? {
        createdAt: order.createdAt,
        ingredients: order.ingredients,
        _id: order._id,
        status: order.status,
        name: order.name,
        updatedAt: order.updatedAt,
        number: order.number
      }
    : null;

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (isLoading) {
    return <Preloader />;
  }

  if (!orderInfo) return;

  return <OrderInfoUI orderInfo={orderInfo} />;
};
