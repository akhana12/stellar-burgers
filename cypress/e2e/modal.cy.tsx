/// <reference types="cypress" />

import ingredients from '../fixtures/ingredients.json';
import { SELECTORS } from '../support/SELECTORS';

describe('Проверка открытия,закрытия и содержимого модального окна ингредиента', () => {
  beforeEach(() => {
    // мокирование запроса списка ингредиентов
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.visit('/');
    cy.wait('@getIngredients');

    // находим ингредиент типа "main" в тестовых данных
    const ingredient = ingredients.data.find((item) => item.type === 'main');
    if (!ingredient) {
      throw new Error('Ингредиент не найден в тестовых данных');
    }

    // кликаем по ингредиенту для открытия модального окна
    cy.get(`[data-testid=${SELECTORS.INGREDIENT}]`)
      .contains(ingredient.name)
      .click();

    // проверяем, что модальное окно открылось и содержит имя ингредиента
    cy.get(`[data-testid=${SELECTORS.MODAL}]`)
      .should('be.visible')
      .and('contain', ingredient.name);
  });

  it('Закрытие модального окна по нажатию клавиши Escape', () => {
    // нажимаем клавишу Escape
    cy.get('body').type('{esc}');

    // проверяем, что модальное окно закрылось
    cy.get(`[data-testid=${SELECTORS.MODAL}]`).should('not.exist');
  });

  it('Закрытие модального окна по кнопке', () => {
    // нажимаем кнопку закрытия
    cy.get(`[data-testid=${SELECTORS.MODAL_CLOSE_BUTTON}]`).click();

    // проверяем, что модальное окно закрылось
    cy.get(`[data-testid=${SELECTORS.MODAL}]`).should('not.exist');
  });

  it('Закрытие модального окна при клике на оверлей', () => {
    // кликаем по области вне модального окна
    cy.get('body').click('topLeft');
    // проверяем, что модальное окно закрылось
    cy.get('#modals').find(SELECTORS.MODAL).should('not.exist');
  });
});
