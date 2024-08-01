import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  fetchOrders,
  selectLoading,
  selectOrders
} from '../../services/slices/ordersSlice';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(selectOrders);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    if (!orders.length) {
      dispatch(fetchOrders());
    }
  }, []);
  if (isLoading) return <Preloader />;

  return <ProfileOrdersUI orders={orders} />;
};
