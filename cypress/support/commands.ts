/// <reference types="./index" />

import { SELECTORS } from './SELECTORS';
import ingredients from '../fixtures/ingredients.json';
import { TTabMode } from '@utils-types';
import order from '../fixtures/order.json';

// поиск ингредиента в моковых данных
export function findIngredientByType(type: TTabMode, excludeName?: string) {
  const ingredient = ingredients.data.find(
    (item) => item.type === type && (!excludeName || item.name !== excludeName)
  );
  if (!ingredient) {
    throw new Error(
      `Ингредиент с типом '${type}' не найден в тестовых данных.`
    );
  }
  return ingredient;
}

// поиск элемента по testId
Cypress.Commands.add('getByTestid', (testId: string) =>
  cy.get(`[data-testid=${testId}]`)
);

// добавление элемента в конструктор
Cypress.Commands.add('addIngredientToConstructor', (ingredientName: string) => {
  cy.getByTestid(SELECTORS.INGREDIENT)
    .contains(ingredientName)
    .parents('li')
    .within(() => {
      cy.get('button').click({ force: true });
    });
});

// интерцепторы
Cypress.Commands.add('mockIngredients', () => {
  cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
    'getIngredients'
  );
});

Cypress.Commands.add('mockUser', () => {
  cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as('getUser');
});

Cypress.Commands.add('mockNewOrder', () => {
  cy.intercept('POST', '/api/orders', {
    statusCode: 200,
    body: order
  }).as('createOrder');
});
