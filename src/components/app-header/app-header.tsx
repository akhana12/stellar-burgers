import { FC, useEffect, useState } from 'react';
import { AppHeaderUI } from '@ui';
import { selectUser } from '../../services/slices/userSlice';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const user = useSelector(selectUser);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (user) {
      setUserName(user.name);
    } else {
      setUserName(storedUserName || '');
    }
  }, [user]);

  return <AppHeaderUI userName={userName} />;
};
