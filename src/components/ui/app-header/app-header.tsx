import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <>
          <BurgerIcon type={'primary'} />
          <NavLink
            to='/'
            className={({ isActive }) =>
              classNames(
                'text',
                'text_type_main-default',
                'ml-2',
                'mr-10',
                styles.link,
                { [styles.link_active]: isActive }
              )
            }
          >
            Конструктор
          </NavLink>
        </>
        <>
          <ListIcon type={'primary'} />
          <NavLink
            to='/feed'
            className={({ isActive }) =>
              classNames(
                'text',
                'text_type_main-default',
                'ml-2',
                'mr-10',
                styles.link,
                { [styles.link_active]: isActive }
              )
            }
          >
            Лента заказов
          </NavLink>
        </>
      </div>
      <div className={styles.logo}>
        <Logo className='' />
      </div>
      <div className={styles.link_position_last}>
        <ProfileIcon type={'primary'} />
        <NavLink
          to='/profile'
          className={({ isActive }) =>
            classNames(
              'text',
              'text_type_main-default',
              'ml-2',
              'mr-10',
              styles.link,
              { [styles.link_active]: isActive }
            )
          }
        >
          {userName || 'Личный кабинет'}
        </NavLink>
      </div>
    </nav>
  </header>
);
