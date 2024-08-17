/// <reference types="cypress" />

import order from '../fixtures/order.json';
import { SELECTORS } from '../support/SELECTORS';
import { findIngredientByType } from '../support/commands';

describe('Проверка оформления заказа', () => {
  beforeEach(() => {
    // мокирование запроса списка ингредиентов
    cy.mockIngredients();

    // мокирование запроса данных пользователя
    cy.mockUser();

    // мокирование создания заказа
    cy.mockNewOrder();

    // подставляем токен авторизации
    cy.setCookie('accessToken', 'Bearer fake-access-token');

    cy.visit('/');

    cy.wait('@getIngredients');
    cy.wait('@getUser');
  });

  it('Оформление заказа', () => {
    // находим булку в тестовых данных
    const bun = findIngredientByType('bun');
    // находим ингредиент начинки в тестовых данных
    const filling = findIngredientByType('main');

    // добавляем булку
    cy.addIngredientToConstructor(bun.name);

    // добавляем начинку
    cy.addIngredientToConstructor(filling.name);

    // нажимаем кнопку оформить заказ
    cy.getByTestid(SELECTORS.SEND_ORDER_BUTTON).click();

    // проверяем, что модальное окно открылось и содержит номер заказа
    cy.getByTestid(SELECTORS.MODAL)
      .should('be.visible')
      .and('contain', order.order.number);

    // закрываем модальное окно
    cy.getByTestid(SELECTORS.MODAL_CLOSE_BUTTON).click();

    // проверяем, что конструктор пуст
    cy.get(SELECTORS.CONSTRUCTOR_ELEMENT_ROW).should('not.exist');
  });
});
