/// <reference types="cypress" />

import ingredients from '../fixtures/ingredients.json';
import order from '../fixtures/order.json';
import { SELECTORS } from '../support/SELECTORS';

describe('Проверка оформления заказа', () => {
  beforeEach(() => {
    // мокирование запроса списка ингредиентов
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );

    // мокирование запроса данных пользователя
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );

    // мокирование создания заказа
    cy.intercept('POST', '/api/orders', {
      statusCode: 200,
      body: order
    }).as('createOrder');

    // подставляем токен авторизации
    cy.setCookie('accessToken', 'Bearer fake-access-token');

    // переход на главную страницу
    cy.visit('/');

    // ожидание загрузки данных ингредиентов и пользователя
    cy.wait('@getIngredients');
    cy.wait('@getUser');
  });

  it('Оформление заказа', () => {
    // находим булку в тестовых данных
    const bun = ingredients.data.find((item) => item.type === 'bun');
    if (!bun) {
      throw new Error('Булка не найдена в тестовых данных');
    }
    // находим ингредиент начинки в тестовых данных
    const filling = ingredients.data.find((item) => item.type === 'main');
    if (!filling) {
      throw new Error('Ингредиент начинки не найден в тестовых данных');
    }

    // добавляем булку
    cy.get(`[data-testid=${SELECTORS.INGREDIENT}]`)
      .contains(bun.name)
      .parents('li')
      .within(() => {
        cy.get('button').click({ force: true });
      });

    // добавляем начинку
    cy.get(`[data-testid=${SELECTORS.INGREDIENT}]`)
      .contains(filling.name)
      .parents('li')
      .within(() => {
        cy.get('button').click({ force: true });
      });

    // нажимаем кнопку оформить заказ
    cy.get(`[data-testid=${SELECTORS.SEND_ORDER_BUTTON}]`).click();

    // проверяем, что модальное окно открылось и содержит номер заказа
    cy.get(`[data-testid=${SELECTORS.MODAL}]`)
      .should('be.visible')
      .and('contain', order.order.number);

    // закрываем модальное окно
    cy.get(`[data-testid=${SELECTORS.MODAL_CLOSE_BUTTON}]`).click();

    // проверяем, что конструктор пуст
    cy.get('.constructor-element__row').should('not.exist');
  });
});
