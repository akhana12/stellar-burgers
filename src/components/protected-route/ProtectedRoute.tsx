import React from 'react';
import { useSelector } from '../../services/store';
import { selectLoading, selectUser } from '../../services/slices/userSlice';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectLoading);

  const location = useLocation();

  if (isLoading) return <Preloader />;

  // Если пользователь не авторизован и не должен быть авторизован (т.е. это защищённый маршрут)
  if (!user && !onlyUnAuth) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  // если пользователь авторизован, а маршрут только для неавторизованных
  if (user && onlyUnAuth) {
    const from = location.state?.from || '/';
    return <Navigate replace to={from} />;
  }

  return children;
};
